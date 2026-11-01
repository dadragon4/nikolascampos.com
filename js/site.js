// Site behavior. Wrapped in a block so nothing leaks into the global scope.
{
  // Warnings for unexpected markup, shown only while previewing locally.
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname);
  const warn = (...args) => { if (isLocal) console.warn('[site]', ...args); };

  // Privacy-friendly visit counts with GoatCounter: no cookies, no personal
  // data, no cookie banner needed. Off until GOATCOUNTER is set to the site's
  // GoatCounter code (the "xxx" in xxx.goatcounter.com). Keep the same code in
  // js/site.js and js/desktop.js. Visits while previewing locally aren't counted.
  const GOATCOUNTER = 'dadragon4';
  if (GOATCOUNTER && location.hostname.endsWith('nikolascampos.com')) {
    const counter = document.createElement('script');
    counter.async = true;
    counter.src = 'https://gc.zgo.at/count.js';
    counter.dataset.goatcounter = `https://${GOATCOUNTER}.goatcounter.com/count`;
    document.head.append(counter);
  }

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

  // Phone menu: the Menu button (shown only on phones) opens and closes the
  // nav. Escape closes it and returns focus to the button. A one-line script
  // in each page's head adds the "js" class right away (so the full nav
  // doesn't flash on load) and removes it again at page load unless this
  // marks "nav-ready", so the links never get stuck hidden.
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    document.documentElement.classList.add('js', 'nav-ready');
    const toggleLabel = navToggle.querySelector('.nav-toggle-label');
    const setOpen = (open) => {
      siteNav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      if (toggleLabel) toggleLabel.textContent = open ? 'Close' : 'Menu';
    };
    navToggle.addEventListener('click', () => setOpen(!siteNav.classList.contains('is-open')));
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !siteNav.classList.contains('is-open')) return;
      const hadFocus = siteNav.contains(document.activeElement) || document.activeElement === navToggle;
      setOpen(false);
      if (hadFocus) navToggle.focus();
    });
  }

  // Show or hide pages from the admin: pages.json (edited in the admin's
  // "Show or hide pages" screen) lists each page as true (shown) or false
  // (hidden). A hidden page's links are removed from the menu, the footer
  // and the home page, and the page asks search engines not to list it.
  // Its address still works for anyone who has the link. The links' "hidden"
  // attributes in the HTML should match pages.json so nothing flashes on load.
  const pagesFile = new URL('../pages.json', document.currentScript?.src || location.href);
  fetch(pagesFile, { cache: 'no-cache' })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((shown) => {
      const keyOf = (href) => {
        const m = new URL(href, location.href).pathname.match(/^\/([\w-]+)\.html$/);
        return m && m[1];
      };
      document.querySelectorAll('nav.site a[href], .sitemap a[href]').forEach((a) => {
        const key = keyOf(a.getAttribute('href'));
        if (!key || typeof shown[key] !== 'boolean') return;
        (a.closest('li') || a).hidden = !shown[key];
      });
      document.querySelectorAll('[data-latest]').forEach((card) => {
        const key = keyOf(card.dataset.latest);
        if (key && shown[key] === false) card.hidden = true;
      });
      if (shown[keyOf(location.href)] === false && !document.querySelector('meta[name="robots"]')) {
        document.head.append(Object.assign(document.createElement('meta'), { name: 'robots', content: 'noindex' }));
      }
    })
    .catch((err) => warn('Could not load pages.json; keeping links as they are', err));

  // Search engine details for films and albums (schema.org VideoObject and
  // MusicAlbum), built from the Film and Music lists so new entries are
  // covered automatically. Google reads structured data added by scripts.
  const me = { '@type': 'Person', name: 'Nikolas Campos', url: 'https://www.nikolascampos.com/' };
  const works = [];
  document.querySelectorAll('#film ul.index > li, #music ul.index > li').forEach((li) => {
    const date = li.querySelector('time[datetime]')?.getAttribute('datetime');
    const frame = li.querySelector('.entry iframe[src]');
    if (!date || !frame) return;
    const description = li.querySelector('.excerpt')?.textContent.trim();
    const src = frame.getAttribute('src');
    const name = (frame.title || '').replace(/^(Watch|Listen to)\s+/, '').replace(/\s+on (YouTube|Spotify)$/, '');
    const yt = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/);
    const album = src.match(/open\.spotify\.com\/embed\/album\/(\w+)/);
    if (yt) {
      works.push({
        '@type': 'VideoObject', name, description: description || name, uploadDate: date,
        thumbnailUrl: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${yt[1]}`,
        url: `https://www.youtube.com/watch?v=${yt[1]}`, creator: me,
      });
    } else if (album) {
      works.push({
        '@type': 'MusicAlbum', name, description, datePublished: date,
        url: `https://open.spotify.com/album/${album[1]}`, byArtist: me,
      });
    }
  });
  if (works.length) {
    const data = document.createElement('script');
    data.type = 'application/ld+json';
    data.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': works });
    document.head.append(data);
  }

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
    // Data Saver on: keep the copy already in the page, skip the extra downloads.
    if (navigator.connection?.saveData) return;
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
