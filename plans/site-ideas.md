# Draft: Ideas to round out the site

*Status: idea list, Oct 31, 2026. Pick what appeals, and leave the rest.*

The site now has two sides:
- **Classic view (professional, "book-ish"):** what a new visitor, client or collaborator sees first. Film, Photography, Music, About.
- **Desktop view (personal):** the fun, personal side. Writing, Blog, Now.txt, and more to come.

## Professional side (classic view)

**High value, low effort**
- **Contact.** A clear way to reach you: an email link (for example `hello@nikolascampos.com`, using your existing email forwarding) and links to YouTube, Spotify and Instagram, in the footer or About.
- **Favicon and share image.** A small icon for browser tabs, and a preview image for links shared on iMessage, Instagram and social sites. Needs one photo or logo from you.
- **Photography page content.** It's still a placeholder. Start with 6–12 favorite photos in a clean grid; images are resized automatically for speed.
- **Professional bio photo** on the About section.

**Medium effort**
- **Work / services page.** What you offer (music videos, event coverage, editing, websites), with 2–3 examples each and a "get in touch" link.
- **Project write-ups.** A short behind-the-scenes page for each film (goal, gear, what you learned). Good for clients, and good for Google.
- **Résumé / CV page** (or PDF) for IT and creative roles.
- **Press kit (EPK) for music:** a bio, photos, releases, and links in one place.

**Later**
- **Testimonials** from people you've filmed or worked with.
- **Newsletter sign-up** (Buttondown has a free tier) to announce new releases.

## Personal side (Desktop view)

- **Media Player app.** A Windows Media Player-style window that plays your own audio files, with playlists, album art and a visualizer. Needs audio files from you (see the [admin backend draft](admin-backend.md) for uploads).
- **Photos folder:** casual and behind-the-scenes photos as a slideshow window.
- **Now.txt, extended:** what you're reading, playing and listening to, plus "currently working on". It updates from the home page banner.
- **Games folder:** your Halo / CoD stats, favorite games, or a small built-in game (Minesweeper-style).
- **Guestbook window** where visitors can leave a note. Needs a small service; easiest after a [Cloudflare move](cloudflare-move.md).
- **Desktop personalization:** a wallpaper picker, and a few original wallpapers from your own photos.
- **Easter eggs:** the Recycle Bin holds "deleted drafts", and a hidden folder holds your earliest website versions.
- **Remember the visitor's choice:** if someone picks Desktop view, offer to open it next time.

## Behind the scenes (both sides)

- **Analytics:** privacy-friendly, no cookie banner (Cloudflare Web Analytics or GoatCounter).
- **Shared header and footer:** the header, menu and footer are copied by hand into every page. Using the blog's Jekyll templates for all pages would make menu changes a one-file edit.
- **Automatic checks:** a GitHub Action that runs the W3C validator and a broken-link check on every push, so problems are caught before going live.
- **Image pipeline:** resize and convert uploads to modern formats (WebP/AVIF) automatically.
- **Private area:** see the [password-only page draft](private-two-column.md).

## Suggested order

1. Contact links, favicon and share image (small, visible wins)
2. Photography page content
3. Analytics
4. Work / services page
5. Desktop Media Player
6. Admin backend, private page, and Cloudflare move, as needed

## Needs from you

- Photos (bio, share image, Photography page)
- The email address you want public
- Your Instagram / social links
- Audio files, if you want the Media Player
