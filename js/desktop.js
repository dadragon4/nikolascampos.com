// Desktop (Windows 7-inspired) theme prototype. Each window pulls its content
// live from the regular pages, so there's still only one copy of everything.
// Wrapped in a block so nothing leaks into the global scope.
{
  const $ = (sel, root = document) => root.querySelector(sel);
  const TASKBAR = 40;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)');
  const isSmall = () => innerWidth < 640;

  // Privacy-friendly visit counts with GoatCounter: no cookies, no personal
  // data, no cookie banner needed. Off until GOATCOUNTER is set to the site's
  // GoatCounter code (the "xxx" in xxx.goatcounter.com). Keep the same code in
  // js/site.js and js/desktop.js. Visits while previewing locally aren't counted.
  const GOATCOUNTER = '';
  if (GOATCOUNTER && location.hostname.endsWith('nikolascampos.com')) {
    const counter = document.createElement('script');
    counter.async = true;
    counter.src = 'https://gc.zgo.at/count.js';
    counter.dataset.goatcounter = `https://${GOATCOUNTER}.goatcounter.com/count`;
    document.head.append(counter);
  }

  const ICONS = {
    user: '<svg viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="6" fill="url(#g-user)" stroke="#0d3f73"/><circle cx="24" cy="20" r="7" fill="#fff"/><path d="M11 41c2-8 7-11 13-11s11 3 13 11z" fill="#fff"/><rect x="7" y="7" width="34" height="14" rx="5" fill="#fff" opacity=".25"/></svg>',
    folder: '<svg viewBox="0 0 48 48"><path d="M4 12a3 3 0 0 1 3-3h11l4 4h19a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="url(#g-fold-b)" stroke="#a87a12"/><rect x="10" y="12" width="27" height="22" fill="#fff" stroke="#c9c9c9"/><path d="M14 18h19M14 22h19M14 26h13" stroke="#9cc0e6"/><path d="M3 20h42l-3 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" fill="url(#g-fold)" stroke="#b8860b"/></svg>',
    music: '<svg viewBox="0 0 48 48"><rect x="5" y="5" width="38" height="38" rx="8" fill="url(#g-music)" stroke="#3b1f6e"/><path d="M19 14l16-4v21a5 5 0 1 1-3-4.6V16l-10 2.5V34a5 5 0 1 1-3-4.6z" fill="#fff"/><rect x="6" y="6" width="36" height="16" rx="7" fill="#fff" opacity=".22"/></svg>',
    film: '<svg viewBox="0 0 48 48"><rect x="4" y="9" width="40" height="30" rx="3" fill="#2b2b2b" stroke="#000"/><g fill="#ddd"><rect x="7" y="11" width="4" height="2.5"/><rect x="14" y="11" width="4" height="2.5"/><rect x="21" y="11" width="4" height="2.5"/><rect x="28" y="11" width="4" height="2.5"/><rect x="35" y="11" width="4" height="2.5"/><rect x="7" y="34.5" width="4" height="2.5"/><rect x="14" y="34.5" width="4" height="2.5"/><rect x="21" y="34.5" width="4" height="2.5"/><rect x="28" y="34.5" width="4" height="2.5"/><rect x="35" y="34.5" width="4" height="2.5"/></g><rect x="8" y="16" width="14" height="16" fill="url(#g-sky)"/><rect x="26" y="16" width="14" height="16" fill="url(#g-sky)"/></svg>',
    camera: '<svg viewBox="0 0 48 48"><rect x="15" y="9" width="14" height="7" rx="2" fill="#555"/><rect x="4" y="14" width="40" height="26" rx="5" fill="url(#g-metal)" stroke="#3a3f45"/><circle cx="24" cy="27" r="9.5" fill="#222"/><circle cx="24" cy="27" r="6.5" fill="url(#g-lens)"/><circle cx="21.6" cy="24.6" r="1.8" fill="#fff" opacity=".85"/><rect x="35" y="17" width="5" height="3" rx="1" fill="#ffd34d"/></svg>',
    note: '<svg viewBox="0 0 48 48"><rect x="9" y="6" width="30" height="37" rx="2" fill="#fff" stroke="#7a8aa0"/><rect x="9" y="6" width="30" height="6" rx="2" fill="#6aa7e0"/><path d="M13 18h22M13 23h22M13 28h22M13 33h22M13 38h14" stroke="#9cc0e6"/></svg>',
    book: '<svg viewBox="0 0 48 48"><path d="M10 6h26a3 3 0 0 1 3 3v34H14a4 4 0 0 1-4-4z" fill="url(#g-book)" stroke="#1d2a1a"/><path d="M14 35h25v8H14a4 4 0 0 1 0-8z" fill="#faf9f6" stroke="#1d2a1a"/><rect x="17" y="12" width="16" height="3" rx="1" fill="#e9dfc4"/><rect x="17" y="18" width="11" height="2" rx="1" fill="#e9dfc4" opacity=".7"/></svg>',
  };
  const GLYPH = {
    min: '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x="1.5" y="6" width="7" height="2.2" fill="#fff" stroke="#233" stroke-width=".7"/></svg>',
    max: '<svg viewBox="0 0 10 10" aria-hidden="true"><rect x="1.5" y="1.5" width="7" height="6.5" fill="none" stroke="#233" stroke-width="2.6"/><rect x="1.5" y="1.5" width="7" height="6.5" fill="none" stroke="#fff" stroke-width="1.2"/></svg>',
    close: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6" stroke="#3a0d05" stroke-width="3" stroke-linecap="round"/><path d="M2 2l6 6M8 2l-6 6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
  };

  const APPS = [
    { id: 'about', title: 'About Me', icon: 'user', template: 'desktop-about', size: [520, 360], crumb: 'About Me' },
    { id: 'writing', title: 'Writing', icon: 'folder', src: 'writing.html', pick: ['#writing'], size: [600, 440], crumb: 'Documents ▸ Writing' },
    { id: 'blog', title: 'Blog', icon: 'folder', src: 'blog.html', pick: ['#blog'], size: [600, 440], crumb: 'Documents ▸ Blog' },
    { id: 'music', title: 'Music', icon: 'music', src: 'music.html', pick: ['#music'], size: [600, 560], crumb: 'Music' },
    { id: 'film', title: 'Film', icon: 'film', src: 'film.html', pick: ['#film'], size: [680, 580], crumb: 'Videos ▸ Film' },
    { id: 'photos', title: 'Photography', icon: 'camera', src: 'photography.html', pick: ['#photography'], size: [520, 320], crumb: 'Pictures ▸ Photography', hidden: true }, // hidden for now
    { id: 'site', title: 'About This Site', icon: 'note', template: 'desktop-site', size: [560, 440], crumb: 'Documents ▸ About This Site' },
    { id: 'now', title: 'Now.txt', icon: 'note', src: 'index.html', size: [420, 280], notepad: true },
    { id: 'classic', title: 'Classic Site', icon: 'book', href: 'index.html' },
  ];
  const appById = (id) => APPS.find((a) => a.id === id);
  const warnMissing = (id) => console.warn('[desktop]', `No <template id="${id}"> in desktop.html`);

  // ---- Loading page content ----------------------------------------------
  const pages = new Map();
  const getPage = (url) => {
    if (!pages.has(url)) {
      const p = fetch(url).then((res) => {
        if (!res.ok) throw new Error(`${url} returned ${res.status}`);
        return res.text();
      }).then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        // Make links/embeds absolute so posts in writing/ (../ links) still work.
        doc.querySelectorAll('[href], [src]').forEach((el) => {
          ['href', 'src'].forEach((attr) => {
            const v = el.getAttribute(attr);
            if (v && !v.startsWith('#')) el.setAttribute(attr, new URL(v, url).href);
          });
        });
        return doc;
      });
      p.catch(() => pages.delete(url)); // allow a retry later
      pages.set(url, p);
    }
    return pages.get(url);
  };

  async function fill(rec) {
    const { app, body, status } = rec;
    // Content stored in desktop.html itself (the Desktop's own About Me)
    if (app.template) {
      const tpl = document.getElementById(app.template);
      if (tpl) body.replaceChildren(tpl.content.cloneNode(true));
      else warnMissing(app.template);
      if (status) status.textContent = 'Done';
      return;
    }
    try {
      const doc = await getPage(new URL(app.src, location.href).href);
      if (app.notepad) {
        const items = [...doc.querySelectorAll('.ticker-items:not([aria-hidden]) > li')]
          .map((li) => li.textContent.replace(/\s+/g, ' ').trim());
        const text = document.createElement('textarea');
        text.readOnly = true;
        text.spellcheck = false;
        text.setAttribute('aria-label', 'Now.txt');
        text.value = `What I'm up to right now\r\n------------------------\r\n\r\n${items.join('\r\n')}\r\n`;
        body.replaceChildren(text);
        return;
      }
      const frag = document.createDocumentFragment();
      app.pick.forEach((sel) => {
        const node = doc.querySelector(sel);
        if (node) frag.append(node.cloneNode(true));
      });
      // A link to a regular page (not a post) shows that page's main content.
      if (app.post && !frag.childNodes.length) {
        const main = doc.querySelector('main');
        if (main) [...main.children].forEach((n) => frag.append(n.cloneNode(true)));
      }
      frag.querySelectorAll('.ticker, hr.rule').forEach((n) => n.remove());
      body.replaceChildren(frag);
      if (app.post) {
        const t = $('.post-title', body);
        const folder = new URL(app.src).pathname.includes('/blog/') ? 'Blog' : 'Writing';
        if (t) setTitle(rec, t.textContent.trim(), `Documents ▸ ${folder} ▸ ${t.textContent.trim()}`);
        else {
          const name = doc.title.replace(/\s+—\s+Nikolas Campos.*$/, '').trim() || 'Page';
          setTitle(rec, name, name);
        }
      }
      if (status) {
        const n = body.querySelectorAll('ul.index > li').length;
        status.textContent = n ? `${n} item${n === 1 ? '' : 's'}` : 'Done';
      }
    } catch (err) {
      body.innerHTML = '<p class="win-error">This window couldn’t load. Preview the site through the local server (not by opening the file directly).</p>';
      if (status) status.textContent = 'Error';
      console.warn('[desktop]', err);
    }
  }

  // ---- Windows -------------------------------------------------------------
  const desktop = $('#desktop');
  const tasks = $('#tasks');
  const open = new Map();
  let z = 10;
  let cascade = 0;
  let uid = 0;

  const topmost = () => [...open.values()]
    .filter((r) => !r.win.hidden)
    .sort((a, b) => b.win.style.zIndex - a.win.style.zIndex)[0];

  function setTitle(rec, title, crumb) {
    rec.titleEl.textContent = title;
    rec.label.textContent = title;
    rec.win.setAttribute('aria-label', title);
    if (rec.crumbEl) rec.crumbEl.textContent = `Nikolas Campos ▸ ${crumb || title}`;
  }

  function focusWin(rec) {
    if (!rec) return;
    if (!rec.win.classList.contains('active')) rec.win.style.zIndex = ++z;
    open.forEach((r) => {
      const on = r === rec;
      r.win.classList.toggle('active', on);
      r.task.classList.toggle('active', on);
    });
  }

  function showWin(rec) {
    rec.win.hidden = false;
    focusWin(rec);
    rec.win.focus({ preventScroll: true });
  }

  function minimize(rec) {
    rec.win.hidden = true;
    rec.win.classList.remove('active');
    rec.task.classList.remove('active');
    focusWin(topmost());
  }

  function closeWin(rec) {
    rec.win.remove();
    rec.task.remove();
    open.delete(rec.app.id);
    focusWin(topmost());
  }

  function toggleMax(rec) {
    const max = rec.win.classList.toggle('max');
    rec.maxBtn.setAttribute('aria-label', max ? 'Restore' : 'Maximize');
  }

  function openApp(app) {
    closeStart();
    if (app.href) { location.href = app.href; return; }
    if (open.has(app.id)) { showWin(open.get(app.id)); return; }

    const win = document.createElement('section');
    win.className = 'win';
    win.tabIndex = -1;
    win.setAttribute('role', 'dialog');
    win.innerHTML = `
      <header class="win-bar">
        <span class="win-icon" aria-hidden="true">${ICONS[app.icon]}</span>
        <h2 class="win-title"></h2>
        <div class="win-ctrls">
          <button type="button" class="win-min" aria-label="Minimize">${GLYPH.min}</button>
          <button type="button" class="win-max" aria-label="Maximize">${GLYPH.max}</button>
          <button type="button" class="win-close" aria-label="Close">${GLYPH.close}</button>
        </div>
      </header>
      ${app.notepad
        ? '<div class="win-menu" aria-hidden="true"><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span></div>'
        : `<div class="win-addr"><span class="addr-nav" aria-hidden="true"><i>‹</i><i>›</i></span><span class="addr-field"><span class="addr-icon" aria-hidden="true">${ICONS[app.icon]}</span><span class="addr-crumb"></span></span></div>`}
      <div class="win-body${app.notepad ? ' is-notepad' : ''}"><p class="win-loading">Loading…</p></div>
      ${app.notepad ? '' : '<div class="win-status">Loading…</div>'}`;

    const task = document.createElement('button');
    task.type = 'button';
    task.className = 'task';
    task.innerHTML = `<span class="task-icon" aria-hidden="true">${ICONS[app.icon]}</span><span class="task-label"></span>`;

    const rec = {
      app, win, task,
      titleEl: $('.win-title', win),
      crumbEl: $('.addr-crumb', win),
      body: $('.win-body', win),
      status: $('.win-status', win),
      label: $('.task-label', task),
      maxBtn: $('.win-max', win),
    };
    setTitle(rec, app.title, app.crumb);

    // Size and cascade position
    const [w, h] = app.size;
    const width = Math.min(w, innerWidth - 24);
    const height = Math.min(h, innerHeight - TASKBAR - 24);
    const step = (cascade++ % 6) * 28;
    const left = Math.max(8, Math.min((innerWidth - width) / 2 - 60 + step, innerWidth - width - 8));
    const top = Math.max(8, Math.min(36 + step, innerHeight - TASKBAR - height - 8));
    Object.assign(win.style, { width: `${width}px`, height: `${height}px`, left: `${left}px`, top: `${top}px` });
    if (reduceMotion) win.classList.add('no-anim');

    // Controls
    $('.win-min', win).addEventListener('click', () => minimize(rec));
    rec.maxBtn.addEventListener('click', () => toggleMax(rec));
    $('.win-close', win).addEventListener('click', () => closeWin(rec));
    win.addEventListener('pointerdown', () => focusWin(rec), true);
    win.addEventListener('focusin', () => focusWin(rec));
    win.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('.startmenu:not([hidden])')) closeWin(rec); });
    task.addEventListener('click', () => {
      if (win.hidden) showWin(rec);
      else if (win.classList.contains('active')) minimize(rec);
      else showWin(rec);
    });

    // Dragging by the title bar
    const bar = $('.win-bar', win);
    bar.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('button') || win.classList.contains('max') || isSmall()) return;
      e.preventDefault();
      const sx = e.clientX, sy = e.clientY, ox = win.offsetLeft, oy = win.offsetTop;
      bar.setPointerCapture(e.pointerId);
      document.body.classList.add('dragging');
      const move = (ev) => {
        const x = Math.min(Math.max(ox + ev.clientX - sx, 80 - win.offsetWidth), innerWidth - 80);
        const y = Math.min(Math.max(oy + ev.clientY - sy, 0), innerHeight - TASKBAR - 30);
        win.style.left = `${x}px`;
        win.style.top = `${y}px`;
      };
      const up = () => {
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', up);
        bar.removeEventListener('pointercancel', up);
        document.body.classList.remove('dragging');
      };
      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up);
      bar.addEventListener('pointercancel', up);
    });
    bar.addEventListener('dblclick', (e) => { if (!e.target.closest('button') && !isSmall()) toggleMax(rec); });

    // Links inside a window: site pages open as windows, other sites in a new tab.
    rec.body.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin) { a.target = '_blank'; a.rel = 'noopener'; return; }
      if (!/(\.html|\/)$/.test(url.pathname)) return;
      e.preventDefault();
      const known = APPS.find((ap) => ap.src && new URL(ap.src, location.href).pathname === url.pathname && !ap.notepad);
      openApp(known || {
        id: url.pathname, title: 'Loading…', icon: 'note', src: url.href,
        pick: ['article.post'], size: [580, 540], post: true,
      });
    });

    open.set(app.id, rec);
    desktop.append(win);
    tasks.append(task);
    showWin(rec);
    fill(rec);
  }

  // ---- Desktop icons -------------------------------------------------------
  const iconList = $('#icons');
  APPS.filter((app) => !app.hidden).forEach((app) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'icon';
    btn.innerHTML = `${ICONS[app.icon]}<span></span>`;
    $('span', btn).textContent = app.title;
    // Single click selects, double click opens (like the real thing).
    // Keyboard (Enter/Space) and touch open right away.
    btn.addEventListener('click', (e) => {
      iconList.querySelectorAll('.selected').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (e.detail !== 1 || coarse.matches) openApp(app);
    });
    li.append(btn);
    iconList.append(li);
  });
  iconList.addEventListener('click', (e) => {
    if (!e.target.closest('.icon')) iconList.querySelectorAll('.selected').forEach((b) => b.classList.remove('selected'));
  });

  // ---- Start menu ----------------------------------------------------------
  const orb = $('#orb');
  const menu = $('#startmenu');
  const smItem = (app) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sm-item';
    b.innerHTML = `${ICONS[app.icon]}<span></span>`;
    $('span', b).textContent = app.title;
    b.addEventListener('click', () => openApp(app));
    return b;
  };
  const left = $('#sm-left');
  ['about', 'site', 'now', 'music', 'film', 'writing', 'blog'].forEach((id) => left.append(smItem(appById(id))));
  left.append(Object.assign(document.createElement('hr'), { className: 'sm-sep' }), smItem(appById('classic')));

  const right = $('#sm-right');
  right.innerHTML = `<span class="sm-user" aria-hidden="true">${ICONS.user}</span>`;
  [['Niko', 'about'], ['Documents', 'writing'], ['Music', 'music'], ['Videos', 'film']].forEach(([label, id]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sm-link';
    b.textContent = label;
    b.addEventListener('click', () => openApp(appById(id)));
    right.append(b);
  });
  const shut = document.createElement('a');
  shut.className = 'sm-shutdown';
  shut.href = 'index.html';
  shut.textContent = 'Classic view';
  right.append(shut);

  function closeStart() {
    if (menu.hidden) return;
    menu.hidden = true;
    orb.setAttribute('aria-expanded', 'false');
  }
  orb.addEventListener('click', () => {
    if (!menu.hidden) { closeStart(); return; }
    menu.hidden = false;
    orb.setAttribute('aria-expanded', 'true');
    $('button, a', menu).focus();
  });
  document.addEventListener('pointerdown', (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !orb.contains(e.target)) closeStart();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { closeStart(); orb.focus(); }
  });

  // ---- Tray ----------------------------------------------------------------
  const clock = $('#clock');
  const tick = () => {
    const d = new Date();
    const t = document.createElement('span');
    const dt = document.createElement('span');
    t.textContent = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    dt.textContent = d.toLocaleDateString();
    clock.replaceChildren(t, dt);
  };
  tick();
  setInterval(tick, 15000);

  $('#show-desktop').addEventListener('click', () => {
    const any = [...open.values()].some((r) => !r.win.hidden);
    open.forEach((r) => (any ? minimize(r) : showWin(r)));
  });

  // ---- Boot ------------------------------------------------------------------
  const boot = $('.boot');
  setTimeout(() => {
    document.body.classList.remove('booting');
    if (reduceMotion) boot.remove();
    else setTimeout(() => boot.remove(), 600);
    if (!isSmall()) openApp(appById('about'));
  }, reduceMotion ? 0 : 1600);
}
