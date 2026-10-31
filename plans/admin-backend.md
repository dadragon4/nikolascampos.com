# Draft: An admin backend for nikolascampos.com

*Status: started Oct 31, 2026. Step 1 (analytics, GoatCounter) is wired up and waiting for an account. Step 2 (Pages CMS for blog posts, drafts and images) is set up in `.pages.yml`. Everything else here is still an idea.*

## What it should do

A private page only you can open, where you can:

1. **Write and publish blog posts.** Use a simple editor (bold, italics, headings, images) instead of editing files on GitHub. Save drafts, preview, then publish.
2. **Upload media.** Drag in photos for the Photography page and blog posts, plus audio for a future Desktop music player. Images should be resized automatically so pages stay fast.
3. **Add portfolio items.** Fill in a short form (date, title, Spotify or YouTube link, one-line description) instead of hand-editing `music.html` or `film.html`.
4. **See site analytics.** Visitors per day, the most-read pages, where visitors come from (Google, Instagram, direct), and phone vs. computer, without cookie banners.
5. **Read the changelog.** A section that shows every change to the site as bullets, sorted by date (see the mockup below).

## The catch: the site has no server

GitHub Pages only serves files. It can't run a login system or receive uploads by itself. So an "admin" works in one of two ways: it **saves your changes as commits to the GitHub repo** (and GitHub Pages republishes, like today), or it runs on a service that does have a server.

## Three ways to build it

### Option A: A ready-made Git-based editor (easiest, recommended to start)

- **[Pages CMS](https://pagescms.org)** is a free, hosted editor. You sign in with GitHub, and it shows your blog posts and images as friendly forms. Saving makes a commit, and the site updates about a minute later. Nothing gets added to the website itself.
- Setup is one small settings file (`.pages.yml`) that tells it where posts and images live (`_posts/`, `images/blog/`).
- **Covers:** blog writing, drafts, image uploads, and editing portfolio entries (if we move them into a simple data file).
- **Doesn't cover:** analytics or the changelog view. Those come from Option C's pieces, or a free analytics add-on.
- **Similar options:** Decap CMS or Sveltia CMS. These live at `/admin` on your own site, but need a small sign-in helper (for example, a free Cloudflare Worker).

### Option B: Custom admin on Cloudflare (most control)

After a [move to Cloudflare](cloudflare-move.md), build our own `/admin`:

- **Login:** Cloudflare Access (free for up to 50 people) puts a real sign-in screen in front of `/admin`, using an email code or GitHub login. No passwords stored on the site.
- **Media:** uploads go to Cloudflare R2 (cheap file storage, with a free tier), and the site links to them.
- **Publishing:** a small Cloudflare Worker turns the editor's "Publish" button into a GitHub commit.
- **Analytics:** Cloudflare Web Analytics is free, privacy-friendly and needs no cookie banner. Its numbers can be shown right on the dashboard.
- **Trade-off:** several weekends of work, and more moving parts to maintain.

### Option C: Small add-ons without a full admin

- **Analytics only:** add Cloudflare Web Analytics or [GoatCounter](https://www.goatcounter.com) (free for personal sites, no cookies). Each is one line of code on every page, and comes with its own dashboard.
- **Changelog page:** a private (or public) page that shows `CHANGELOG.md` nicely, built automatically by GitHub Pages.

## Recommended path

1. **Now:** add privacy-friendly analytics (Option C). Ten minutes, and you start collecting data immediately.
2. **Next:** set up Pages CMS (Option A) for blog writing and image uploads.
3. **Later, if wanted:** move to Cloudflare and grow into Option B for one combined dashboard.

## Mockup: the changelog section

The dashboard would read `CHANGELOG.md` and show it like this, newest first, grouped by date, one bullet per change:

> **Changelog**
>
> **Saturday, October 31, 2026**
> - New footer: "Built by hand, with help from Claude."
> - Dark mode, high-contrast, and larger-text support
> - Better Google results: new titles, descriptions, sitemap
> - New "page not found" page
> - Site address now starts with www.
> - Writing and Blog moved to Desktop view; professional About summary
>
> **Tuesday, October 27, 2026**
> - "Latest" on the home page sorts newest-first
> - New Blog (posts written as simple text files)
> - New subtitle "Media. Music. Life." and welcome line
> - Desktop view, About page, new banner
> - Film dates above videos; Interests page removed
>
> **Monday, October 26, 2026**
> - Moved to GitHub Pages with a secure connection
> - Accessibility and quality pass
> - Welcome line and "Now" banner
> - Portfolio menu, Latest section, Photography page
> - Cleanup and first save point

Possible extras: a search box, a filter by area (Design, Content, Behind the scenes), and an "add entry" button that writes to `CHANGELOG.md` for you.

## Open questions for you

- Is the admin only for you, or might someone else (an editor or collaborator) need access?
- Do you want analytics public (a "visitors this month" counter) or private only?
- Will you upload audio files for the Desktop music player? Hosting audio is where storage costs would start to matter.
