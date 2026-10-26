// Portfolio menu: close it when clicking elsewhere or pressing Escape.
document.addEventListener('click', (e) => {
  document.querySelectorAll('details.menu[open]').forEach((menu) => {
    if (!menu.contains(e.target)) menu.open = false;
  });
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('details.menu[open]').forEach((menu) => {
    menu.open = false;
    menu.querySelector('summary').focus();
  });
});

// Home page "Latest" cards: show the newest entry (first <li>) from each
// section page, so adding an item to music.html etc. updates the home page.
// The HTML already holds a copy as a fallback for when this can't run.
document.querySelectorAll('[data-latest]').forEach(async (card) => {
  const slot = card.querySelector('.latest-item');
  const key = (el) => {
    const time = el.querySelector('time');
    const media = el.querySelector('iframe, .entry a');
    return (time && time.getAttribute('datetime')) + '|' +
      (media && (media.getAttribute('src') || media.getAttribute('href')));
  };
  try {
    const res = await fetch(card.dataset.latest);
    if (!res.ok) return;
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const newest = doc.querySelector('ul.index li');
    // Skip if unchanged, so embeds don't reload for nothing.
    if (newest && key(newest) !== key(slot)) slot.innerHTML = newest.innerHTML;
  } catch (err) {
    // Keep the fallback already in the page.
  }
});

// "Now" ticker: pause/play button and a steady, calm scroll speed.
document.querySelectorAll('.ticker').forEach((ticker) => {
  const button = ticker.querySelector('.ticker-toggle');
  const list = ticker.querySelector('.ticker-items');
  if (!button || !list) return;
  const icon = button.querySelector('.ticker-icon');
  const label = button.querySelector('.ticker-label');

  button.addEventListener('click', () => {
    const paused = !ticker.classList.contains('is-paused');
    ticker.classList.toggle('is-paused', paused);
    // After Play, hover/focus shouldn't re-pause it until they leave the ticker.
    ticker.classList.toggle('is-resumed', !paused);
    button.setAttribute('aria-pressed', String(paused));
    if (icon) icon.textContent = paused ? '▶︎' : '❚❚'; // ▶ (text style) / ❚❚
    if (label) label.textContent = paused ? 'Play' : 'Pause';
  });
  ticker.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse') ticker.classList.remove('is-resumed');
  });
  ticker.addEventListener('focusout', (e) => {
    if (!ticker.contains(e.relatedTarget)) ticker.classList.remove('is-resumed');
  });

  // About 35px per second, however much text the ticker holds.
  const setSpeed = () => {
    const seconds = Math.max(list.offsetWidth / 35, 10);
    ticker.style.setProperty('--ticker-duration', seconds + 's');
  };
  setSpeed();
  if ('ResizeObserver' in window) new ResizeObserver(setSpeed).observe(list);
});
