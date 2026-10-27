// Site behavior. Wrapped in a block so nothing leaks into the global scope.
{
  // Warnings for unexpected markup, shown only while previewing locally.
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  const warn = (...args) => { if (isLocal) console.warn('[site]', ...args); };

  // Portfolio menu (<details class="menu">): close on outside click, on
  // Escape, and when keyboard focus leaves it.
  document.addEventListener('click', (e) => {
    document.querySelectorAll('details.menu[open]').forEach((menu) => {
      if (!menu.contains(e.target)) menu.open = false;
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('details.menu[open]').forEach((menu) => {
      const hadFocus = menu.contains(document.activeElement);
      menu.open = false;
      // Only move focus if it was inside the menu, so it isn't lost.
      if (hadFocus) menu.querySelector('summary').focus();
    });
  });
  document.querySelectorAll('details.menu').forEach((menu) => {
    menu.addEventListener('focusout', (e) => {
      if (e.relatedTarget && !menu.contains(e.relatedTarget)) menu.open = false;
    });
  });

  // Home page "Latest" cards: show the newest entry (first <li>) from each
  // section page, so adding an item to music.html etc. updates the home page.
  // The card's existing HTML is the fallback and is kept unless the fetched
  // entry looks complete.
  const entryKey = (el) => {
    const time = el.querySelector('time[datetime]');
    const media = el.querySelector('.entry iframe, .entry a');
    return [time && time.getAttribute('datetime'),
      media && (media.getAttribute('src') || media.getAttribute('href'))].join('|');
  };

  const latestCards = [...document.querySelectorAll('[data-latest]')];
  const refreshes = latestCards.map(async (card) => {
    const url = card.dataset.latest;
    const slot = card.querySelector('.latest-item');
    if (!slot) return warn(`Latest card for ${url} has no .latest-item`);
    try {
      const res = await fetch(url);
      if (!res.ok) return warn(`Latest: ${url} returned ${res.status}; keeping fallback`);
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      const newest = doc.querySelector('ul.index > li');
      if (!newest) return warn(`Latest: no "ul.index > li" in ${url}; keeping fallback`);
      if (!newest.querySelector('time[datetime]') || !newest.querySelector('.entry')) {
        return warn(`Latest: first entry in ${url} needs <time datetime> and .entry; keeping fallback`);
      }
      // Skip if unchanged, so embeds don't reload for nothing.
      if (entryKey(newest) !== entryKey(slot)) slot.innerHTML = newest.innerHTML;
    } catch (err) {
      warn(`Latest: could not load ${url}; keeping fallback`, err);
    }
  });

  // Then order the cards newest-first by their entry's date. Only cards
  // that are out of place get moved, since moving a player reloads it.
  Promise.allSettled(refreshes).then(() => {
    const dateOf = (card) => card.querySelector('.latest-item time[datetime]')?.getAttribute('datetime') || '';
    const sorted = [...latestCards].sort((a, b) => dateOf(b).localeCompare(dateOf(a)));
    sorted.forEach((card, i) => {
      const parent = card.parentElement;
      const here = parent.children[i];
      if (here !== card) parent.insertBefore(card, here);
    });
  });

  // "Now" ticker: Pause/Play button and a steady, calm scroll speed.
  document.querySelectorAll('.ticker').forEach((ticker) => {
    const button = ticker.querySelector('.ticker-toggle');
    const list = ticker.querySelector('.ticker-items');
    if (!button || !list) return warn('Ticker is missing .ticker-toggle or .ticker-items');
    const icon = button.querySelector('.ticker-icon');
    const label = button.querySelector('.ticker-label');

    button.addEventListener('click', () => {
      const paused = ticker.classList.toggle('is-paused');
      // After Play, hover/focus shouldn't re-pause it until they leave the ticker.
      ticker.classList.toggle('is-resumed', !paused);
      if (icon) icon.textContent = paused ? '▶︎' : '❚❚'; // ▶ (text style) / ❚❚
      if (label) label.textContent = paused ? 'Play' : 'Pause';
    });
    ticker.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') ticker.classList.remove('is-resumed');
    });
    ticker.addEventListener('focusout', (e) => {
      if (!ticker.contains(e.relatedTarget)) ticker.classList.remove('is-resumed');
    });

    // About 35px per second however much text the ticker holds. Only
    // recalculated when the list's width actually changes.
    let lastWidth = 0;
    const setSpeed = () => {
      const width = list.offsetWidth;
      if (!width || width === lastWidth) return;
      lastWidth = width;
      ticker.style.setProperty('--ticker-duration', Math.max(width / 35, 10) + 's');
    };
    setSpeed();
    if ('ResizeObserver' in window) new ResizeObserver(setSpeed).observe(list);
  });
}
