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
