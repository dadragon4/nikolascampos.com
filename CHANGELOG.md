# nikolascampos.com — Changelog

Everything that changed on the site, in plain language. Newest changes are at the top.

All times are U.S. Eastern Time (EDT). Each time is when a change was saved, not when it was first requested; requests made close together are grouped. Until the site moved to its new host on **Oct 26 at 2:46 PM**, saved changes weren't visible to visitors yet. Everything before that went live together at that moment.

---

## Saturday, October 31, 2026

### 3:34 PM — Site checkup and fixes

Two separate reviews checked the whole site, including the behind-the-scenes setup. Fixes:

- **Phone menu:** the full list of links no longer flashes for a moment each time a new page opens.
- **Desktop view:**
  - New **Services** (briefcase) and **Contact** (envelope) icons, also in the Start menu.
  - A link to a regular page now opens that page in a window instead of an empty one.
- **Home page welcome line:** now reads "I make stories, films, and music, and this is where it all lives."
- **Admin uploads:** only pictures can be uploaded, and file names are cleaned up automatically (for example, "My Photo 1.JPG" becomes "my-photo-1.jpg").
- **Blog:** if a post's one-line summary is left empty, Google and link previews use the start of the post instead. Post dates use Eastern time.
- **Behind the scenes:**
  - The local preview server no longer shows the project's hidden files to other devices on the Wi-Fi.
  - The automatic test build uses exact, locked versions of its tools.
  - The Desktop view's script always loads fresh after an update.

### 3:17 PM — Menu button on phones

- **On phones, the menu now folds away** behind a **Menu** button next to the name. Tap it to show the links as a list that's easy to tap, and tap **Close** to hide them. On computers, the menu looks the same as before.
- **Fix:** right after it went live, the Menu button didn't respond on some phones, because they were still using a saved older copy of the site's script. Phones now always get the latest script, and if it ever fails to load, the links simply show instead of staying hidden.

### 3:13 PM — Admin shortcut

- **nikolascampos.com/admin** now opens the site editor (Pages CMS) directly. It isn't linked anywhere or shown on Google. Only Niko's GitHub account can sign in and make changes.

### 3:04 PM — Services and Contact pages, a footer site map, and the start of an admin

- **New menu:** Home · Film · Music · Services · About · Contact.
- **New Services page (work in progress):** the kinds of work Niko takes on (video, music and audio, live streaming and A/V, websites), with details coming soon.
- **New Contact page** with Niko's email and links to YouTube and Spotify.
- **Site map in the footer** of every page: Site (Home, About, Contact), Work (Film, Music, Services), and Elsewhere (Desktop view, YouTube, Spotify).
- **Photography is hidden for now.** It's out of the menu, the Desktop view and Google until there are photos to show.
- **Visitor counts, ready to switch on.** The site is set up for GoatCounter, a free counter that uses no cookies and collects no personal data. It starts counting once Niko creates an account.
- **Admin editor:** blog posts, drafts and pictures can now be written in a friendly editor (Pages CMS) after signing in with GitHub, instead of editing files by hand. *HOW-TO-POST.md* explains how.

### 10:56 AM — New professional bios, and a personal Desktop About

- **About page:** it's now Niko's full professional bio covering his work as an IT Support Specialist at Valencia College, his degree from UCF in Media Production and Management, more than ten years of making music, and films like *Waiting*.
- **Home page About section:** replaced with a short version of the same bio.
- **Desktop view keeps its own About:**
  - The About Me window shows Niko's personal, casual introduction (Halo, Disney, "thanks, Pop").
  - The story of building the site with AI moved off the professional About page and now lives only in the Desktop's "About This Site" window.
  - The personal side reads differently from the professional bios.
- **Search and sharing:** the About page's description (what Google and link previews show) now describes the professional bio. Behind the scenes, the site tells search engines Niko is an IT Support Specialist at Valencia College, a UCF graduate, and lists his skills.

### 10:37 AM — Professional front door, dark mode, better search results

- **New footer** on every page: "© 2026 Nikolas Campos. Built by hand, with help from Claude."
- **Two sides of the site.** The classic site is now the professional front door: Home, Portfolio (Film, Photography), Music, About. **Writing and Blog moved to the Desktop view**, the personal side. Their pages still work for anyone with a link.
- **More professional About section** on the home page: a short summary of who Niko is and what he does. It also shows in the Desktop view's About Me window.
- **Dark mode.** If your phone or computer is set to dark mode, the site switches to a matching dark version.
- **Easier to read for more people:**
  - The site follows your browser's text-size setting.
  - It uses stronger contrast when your device asks for it, and works with Windows high-contrast mode.
  - Printed pages show just the content.
- **Lighter on slower devices:**
  - The Desktop view drops its glass blur effects when "Reduce transparency" is on.
  - The home page skips extra downloads when Data Saver is on.
- **Better Google results:**
  - Clearer page titles and descriptions.
  - A sitemap that lists every page.
  - A profile that connects the site to Niko's YouTube channel and Spotify artist page.
  - Proper titles and descriptions when links are shared in messages and on social media.
- **New "page not found" page** with links back to the home page and the Desktop view.
- **The site's address now starts with www.** (www.nikolascampos.com). The old address forwards there automatically.
- **Plans drafted** (not built yet): an admin dashboard, a password-only page, a move to Cloudflare, and ideas to round out the site.

## Tuesday, October 27, 2026

### 2:29 PM — "Latest" shows the newest first

- **The home page's "Latest" list now sorts itself by date.** Whichever category had something new most recently (Blog, Writing, Music, or Film) shows first, and the least recently updated shows last. When you post or release something new, its card moves to the top on its own.

### 1:24 PM — New Blog

- **New Blog page.** A new "Blog" link sits in the menu between Writing and About: Home · Portfolio · Music · Writing · Blog · About. Writing keeps the finished pieces; the blog is for looser notes and thoughts.
- **Posts are plain text files.** Each post is a simple text file (Markdown) that can be written from github.com, even on a phone. The site turns it into a page styled like the rest of the site and adds it to the Blog list automatically. A step-by-step guide, *HOW-TO-POST.md*, explains how to write, format, add pictures, and save drafts.
- **First post:** "Welcome to the blog."
- **Home page.** The "Latest" list now has a Blog card showing the newest post.
- **Desktop view.** A new Blog folder in Documents (and in the Start menu) lists the posts; opening one shows it as a document window.

### 1:14 PM — New subtitle, welcome line, and About page text

- **New subtitle** under the name on every page: "Media. Music. Life." (It used to say "Art and literature—things of that nature.")
- **New welcome line** on the home page: "Welcome to my site! I make songs, films, and music, and this is where it all lives." It also shows in the About Me window of the Desktop view.
- **About page rewritten.** Same story about learning to code and rebuilding the site with AI, now tighter and easier to read.
- **This changelog was added** to the project, so there's a plain-language record of every change.

### 12:57 PM — Desktop view, About page, and a new banner

- **New "Desktop view."** A button at the top of every page now opens a second version of the site, styled like a Windows 7-era computer desktop. It has desktop icons, windows you can drag and resize, and a taskbar with a Start button and clock. The windows show the same writing, music, and films as the regular site, so the two always match. "Classic view" in the taskbar takes you back.
- **New About page.** It tells the story of how this site was made: years of learning to code, then rebuilding it with the help of AI. The "About" link in the menu now goes here. It's also on the desktop as "About This Site."
- **New "About me."** The About section at the bottom of the home page now has a longer introduction: writing stories and songs, working in IT by day, Halo by night, trips to Disney, and faith in Jesus.
- **New banner.** The scrolling line on the home page now reads: *Reading: Prince Caspian · Listening to: Worship and Reggaeton · Playing: Dave the Diver, MW4 and Metro 2033 Redux.*
- **Menu order.** Music now comes before Writing: Home · Portfolio · Music · Writing · About.

### 12:40 PM — Film layout, Music in the main menu, Interests removed

- **Backup saved first.** A snapshot of the whole site was saved as "backup-2026-10-27," so the site can always be returned to how it looked before the day's bigger changes.
- **Film page.** Each film's date now sits above its video instead of beside it, so the videos are wider.
- **Music moved to the main menu.** It's now a link of its own instead of being tucked inside the Portfolio dropdown, which now holds Film and Photography.
- **Interests page removed.** It was only a "work in progress" placeholder.

---

## Monday, October 26, 2026

### 2:46 PM — The site moves to its new home, with a secure connection

- **nikolascampos.com now runs on GitHub Pages** instead of Neocities. The site is now updated automatically, about a minute after each change is saved.
- **Secure connection (the padlock).** The site now loads over HTTPS. Visitors who type `http://` or `www.` are sent to the secure address automatically.
- How it happened: the domain was connected at 2:00 PM, after the address records at Namecheap (where the domain is registered) were pointed to GitHub. One leftover record still pointed to Neocities and blocked the security certificate. Once it was removed, the certificate was issued at 2:45 PM.

### 1:51 PM — Published on GitHub, with the code made public

- The site's files are now public at [github.com/dadragon4/nikolascampos.com](https://github.com/dadragon4/nikolascampos.com), and the site went up on GitHub's free hosting.
- Before going public, the personal email address in the change history was swapped for a private GitHub address, so it isn't exposed.

### 1:47 PM — Behind-the-scenes quality pass

Nothing here changes how the site looks. It makes the site easier to use for more people, and sturdier:

- A **"Skip to content"** link appears when you press Tab, so keyboard users can jump past the menu.
- Every **video and song player is labeled** (for example, "Watch Waiting: A Short Film on YouTube") for people using screen readers.
- **Players load only when you scroll near them**, so pages open faster.
- The **Portfolio menu works better with a keyboard.** Escape closes it, and it closes when you move past it.
- The home page's **"Latest" section** keeps showing something sensible even if part of the site fails to load.
- Every page now passes the **official W3C web standards check**.

### 1:00 PM — Welcome line, "Now" banner, and polish

- **The old scrolling marquee was replaced** with two things: a still welcome line ("Welcome, I'm Niko…") and a new scrolling "Now" banner below it.
- **The banner has a Pause/Play button.** It also pauses when you hover over it, and it stays still for people who've set their device to reduce motion.
- **Tighter spacing** between the menu, the banner, and the page content.
- **Thin divider lines** above and below the welcome line and banner, on pages that have them.
- The **"Latest" labels** (MUSIC, WRITING, FILM) are now bold and easier to spot.
- **Tagline punctuation fixed:** "Art and literature—things of that nature."

### 12:11 PM — Portfolio menu, "Latest" section, and Photography page

- **New menu:** Home · Portfolio (a dropdown with Film, Photography, Music) · Writing · Interests · About.
- **New Photography page** (a placeholder for now).
- **New "Latest" section on the home page,** showing the newest song, writing piece, and film. It updates itself when something new is added to those pages.
- **Music page:** the albums now scroll with the page instead of sitting in a small scrolling box.
- **The name at the top** is underlined only when you hover over it.

### 9:50 AM — Cleanup and the first save point

- **Writing posts restyled.** They had been plain word-processor exports with no menu or matching style. They now look like the rest of the site and work on phones.
- **Fixes:**
  - The "About" link now goes to the right place.
  - Dates that didn't match are corrected.
  - The Writing dates now show the year.
  - Videos no longer spill off the side on phones.
  - Every page has the footer.
  - Browser tab titles are consistent.
- **Change tracking started.** Every change is now saved as a step that can be undone. At 9:56 AM, a private backup copy was also put on GitHub.
