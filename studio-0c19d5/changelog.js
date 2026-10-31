// Admin changelog: reads CHANGELOG.md and shows it grouped by day, newest
// first, with a search box. On the live site it reads the file from the
// public GitHub repo (CHANGELOG.md itself isn't published with the site);
// while previewing locally it reads the local copy instead.
{
  const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname) || /^192\.168\./.test(location.hostname);
  const SRC = isLocal
    ? '/CHANGELOG.md'
    : 'https://raw.githubusercontent.com/dadragon4/nikolascampos.com/main/CHANGELOG.md';
  const FILE_URL = 'https://github.com/dadragon4/nikolascampos.com/blob/main/CHANGELOG.md';

  const out = document.getElementById('changelog');
  const status = document.getElementById('cl-status');
  const query = document.getElementById('cl-query');

  // Small Markdown reader for what the changelog uses: ## days, ### entries,
  // bullet lists (nested by two spaces), paragraphs, **bold**, *italic*,
  // `code` and [links](https://...). Text is escaped first, so nothing in
  // the file can inject HTML.
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const inline = (s) => esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>');

  const parse = (text) => {
    const days = [];
    let day = null;
    let entry = null;
    let depth = 0;
    let para = [];
    const closeLists = () => { while (depth > 0) { entry.html += '</li></ul>'; depth--; } };
    const flushPara = () => {
      if (para.length && entry) entry.html += `<p>${inline(para.join(' '))}</p>`;
      para = [];
    };
    const ensureEntry = () => {
      if (!entry) { entry = { title: '', html: '' }; day.entries.push(entry); }
    };

    for (const line of text.split(/\r?\n/)) {
      if (line.startsWith('## ')) {
        if (entry) { flushPara(); closeLists(); }
        day = { title: line.slice(3).trim(), entries: [] };
        days.push(day);
        entry = null;
        continue;
      }
      if (!day) continue; // skip the title and intro above the first day
      if (line.startsWith('### ')) {
        if (entry) { flushPara(); closeLists(); }
        entry = { title: line.slice(4).trim(), html: '' };
        day.entries.push(entry);
        continue;
      }
      const item = line.match(/^(\s*)- (.*)$/);
      if (item) {
        ensureEntry();
        flushPara();
        const level = Math.floor(item[1].length / 2) + 1;
        if (level > depth) {
          while (depth < level) { entry.html += '<ul><li>'; depth++; }
        } else {
          while (depth > level) { entry.html += '</li></ul>'; depth--; }
          entry.html += '</li><li>';
        }
        entry.html += inline(item[2]);
        continue;
      }
      if (!line.trim() || line.trim() === '---') {
        if (entry) { flushPara(); closeLists(); }
        continue;
      }
      ensureEntry();
      closeLists();
      para.push(line.trim());
    }
    if (entry) { flushPara(); closeLists(); }
    return days;
  };

  const render = (days) => {
    out.replaceChildren();
    days.forEach((d, i) => {
      const details = document.createElement('details');
      details.className = 'cl-day';
      details.open = i === 0;
      details.dataset.wasOpen = String(i === 0);
      const summary = document.createElement('summary');
      const h2 = document.createElement('h2');
      h2.textContent = d.title;
      const count = document.createElement('span');
      count.className = 'cl-count';
      count.textContent = `${d.entries.length} update${d.entries.length === 1 ? '' : 's'}`;
      summary.append(h2, count);
      details.append(summary);
      d.entries.forEach((e) => {
        const article = document.createElement('article');
        article.className = 'cl-entry';
        if (e.title) {
          const h3 = document.createElement('h3');
          h3.textContent = e.title;
          article.append(h3);
        }
        const body = document.createElement('div');
        body.innerHTML = e.html; // built from escaped text above
        article.append(body);
        details.append(article);
      });
      out.append(details);
    });
  };

  const total = () => out.querySelectorAll('.cl-entry').length;
  const showAll = () => {
    out.querySelectorAll('.cl-day').forEach((d) => {
      d.hidden = false;
      d.open = d.dataset.wasOpen === 'true';
      d.querySelectorAll('.cl-entry').forEach((e) => { e.hidden = false; });
    });
    status.textContent = `${total()} updates across ${out.querySelectorAll('.cl-day').length} days.`;
  };

  query.addEventListener('input', () => {
    const q = query.value.trim().toLowerCase();
    if (!q) return showAll();
    let matches = 0;
    out.querySelectorAll('.cl-day').forEach((d) => {
      let dayMatches = 0;
      d.querySelectorAll('.cl-entry').forEach((e) => {
        const hit = e.textContent.toLowerCase().includes(q);
        e.hidden = !hit;
        if (hit) dayMatches++;
      });
      d.hidden = dayMatches === 0;
      d.open = dayMatches > 0;
      matches += dayMatches;
    });
    status.textContent = matches
      ? `${matches} update${matches === 1 ? '' : 's'} mention “${query.value.trim()}”.`
      : `No updates mention “${query.value.trim()}”.`;
  });

  fetch(SRC, { cache: 'no-cache' })
    .then((res) => { if (!res.ok) throw new Error(res.status); return res.text(); })
    .then((text) => {
      const days = parse(text);
      if (!days.length) throw new Error('no days found');
      render(days);
      showAll();
    })
    .catch((err) => {
      status.innerHTML = `The changelog couldn’t load right now. <a href="${FILE_URL}">Read it on GitHub</a> instead.`;
      if (isLocal) console.warn('[changelog]', err);
    });
}
