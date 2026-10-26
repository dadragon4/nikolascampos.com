# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Nikolas Campos (writing, film, music). Hand-written static HTML with one shared stylesheet. There is no build step, package manager, JavaScript, test suite, or linter, and the folder is not a git repository.

To preview, use the `site` config in `.claude/launch.json` (serves the folder on port 8000), or run:

```bash
python3 -m http.server 8000
```

## Structure

- Every page, including the posts in `writing/`, uses the same skeleton: `.wrap` → `header.site` (name, tagline, nav) → `hr.rule` → content → `footer.site`. Pages in `writing/` use `../` for all site links and the stylesheet.
- **The header, nav, and footer are duplicated by hand in every page (5 top-level + each post).** A nav or footer change means editing all of them identically. The current page's nav link carries `aria-current="page"`. Posts mark "Writing".
- Page titles follow `Section — Nikolas Campos`. The home page is just `Nikolas Campos`. Each page has a `<meta name="description">`.
- Music, Film, and Writing pages share one list pattern: `<ul class="index">` → `<li>` containing `<time datetime="YYYY-MM-DD">` (shown as e.g. `Mar. 31 2025`) plus `<div class="entry">` (a link, Spotify iframe, or YouTube iframe, followed by an `.excerpt`). Newest entries go first. Keep `datetime` in sync with the visible date.
- Posts are `<article class="post">` with `h2.post-title` and `span.meta` (byline and date). Add the `verse` class (`<article class="post verse">`) for line-by-line poems, which centers them. Prose stays left-aligned. A new post also needs an entry in `writing.html`.

## Styling conventions (`css/styles.css`)

- Colors come from `:root` variables (`--paper`, `--ink`, `--ink-soft`, `--accent`, `--rule`). Use these instead of new hex values.
- Serif body text in a 640px centered `.wrap`. Small uppercase monospace is used for `h2.section-label` and dates.
- Embeds are styled by `src` in CSS: YouTube iframes become full-width at 16:9, and Spotify iframes get rounded corners. Don't add inline sizing styles.
- One mobile breakpoint at `max-width: 480px`.
- Unused styles exist for `p.lede` (drop cap), blockquote, and pre/code inside posts.
