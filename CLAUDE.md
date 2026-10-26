# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Nikolas Campos (writing, film, music). Hand-written static HTML with one shared stylesheet (`css/styles.css`) and one small script (`js/site.js`). There is no build step, package manager, test suite, or linter. Git repo on `main`, pushed to the private GitHub repo `dadragon4/nikolascampos.com` (`gh` handles auth).

To preview, use the `site` config in `.claude/launch.json`. It runs `.claude/serve.py` on port 8000, a static server that sends `Cache-Control: no-store` so edits show on reload. A plain alternative (browser caching applies) is:

```bash
python3 -m http.server 8000
```

## Structure

- Every page, including the posts in `writing/`, uses the same skeleton: `.wrap` → `header.site` (name, tagline, nav) → `hr.rule` → content → `footer.site`. Pages in `writing/` use `../` for all site links and the stylesheet.
- **The header, nav, footer, and `<head>` links are duplicated by hand in every page (6 top-level + each post).** A change to any of them means editing all of them identically.
- Nav: Home · Portfolio ▾ (Film, Photography, Music) · Writing · Interests · About. The Portfolio dropdown is a `<details class="menu">`. `js/site.js` closes it on outside click or Escape. The current page's link carries `aria-current="page"`. On Film, Photography, and Music, the `<summary>` also gets `class="current"`. Posts mark "Writing".
- Every page links `css/styles.css?v=N`. **Bump `N` on every page after editing the CSS**, or browsers keep serving the cached old stylesheet.
- Home, Music, and Film have a `.ticker` (a scrolling "now" line with a Pause/Play button) between the header and `hr.rule`. Home also has a static `p.welcome` above it. Ticker items are `<li>`s, and the list appears **twice**: the second `<ul>` is an `aria-hidden="true"` duplicate for the seamless loop. Edit both copies identically. CSS adds the `·` separators, and `js/site.js` handles the button and sets a constant speed. With reduced motion, the duplicate and button are hidden and the text is static.
- The home page's "Latest" section has one card per section (`data-latest="music.html"` etc.). `js/site.js` fetches that page and copies its first `ul.index li` into the card. The HTML inside each card is a fallback copy. Refresh it when the newest item changes. The fetch needs the site to be served over http, not opened as a file.
- Page titles follow `Section — Nikolas Campos`. The home page is just `Nikolas Campos`. Each page has a `<meta name="description">`.
- Music, Film, and Writing pages share one list pattern: `<ul class="index">` → `<li>` containing `<time datetime="YYYY-MM-DD">` (shown as e.g. `Mar. 31 2025`) plus `<div class="entry">` (a link, Spotify iframe, or YouTube iframe, followed by an `.excerpt`). Newest entries go first. Keep `datetime` in sync with the visible date.
- Posts are `<article class="post">` with `h2.post-title` and `span.meta` (byline and date). Add the `verse` class (`<article class="post verse">`) for line-by-line poems, which centers them. Prose stays left-aligned. A new post also needs an entry in `writing.html`.

## Styling conventions (`css/styles.css`)

- Colors come from `:root` variables (`--paper`, `--ink`, `--ink-soft`, `--accent`, `--rule`). Use these instead of new hex values.
- Serif body text in a 640px centered `.wrap`. Small uppercase monospace is used for `h2.section-label` and dates.
- Lists scroll with the page. Don't put them in a fixed-height or scrolling box.
- Embeds are styled by `src` in CSS: YouTube iframes become full-width at 16:9, and Spotify iframes get rounded corners. Don't add inline sizing styles.
- One mobile breakpoint at `max-width: 480px`.
- Unused styles exist for `p.lede` (drop cap), blockquote, and pre/code inside posts.
