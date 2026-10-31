# How to post on the blog

Every blog post is one plain text file in the `_posts` folder. When you add one, the site turns it into a page that matches the rest of the site, adds it to the top of the Blog list and the Blog folder in Desktop view. (Since Oct 31, 2026, the blog lives in Desktop view and isn't in the classic site's menu or home page.) You never touch any HTML.

It goes live about a minute after you save it.

## The easy way: the admin editor (Pages CMS)

1. Go to **nikolascampos.com/admin** (a private shortcut to the editor, worth bookmarking) or **app.pagescms.org**, and sign in with GitHub. The first time, allow it access to the `nikolascampos.com` repository.
2. Open **Blog posts** and click **Add an entry**. Fill in the title, an optional one-line excerpt, and the post itself. The editor has buttons for bold, italics, headings, links and pictures. Check **Poem** for a poem.
3. Click **Save**. The file is named and dated for you, and the post is live about a minute later.

**Drafts** works the same way, but nothing there is published. To publish a draft, copy its text into a new Blog post and delete the draft.

The rest of this guide is the by-hand way, writing the file on github.com. Both make the same kind of file.

## 1. Name the file

```
_posts/2026-11-03-my-post-title.md
```

- Start with the date: year-month-day.
- Then a short name with dashes instead of spaces, all lowercase. This becomes the link: `nikolascampos.com/blog/my-post-title.html`.
- End with `.md`.

## 2. Write the post

Copy this, then replace the parts in quotes and write underneath:

```
---
title: "My post title"
excerpt: "One sentence that shows on the Blog page under the title."
---

Start writing here.

A blank line starts a new paragraph.
A single line break stays a line break, like in a notes app.
```

- The part between the two `---` lines has to be at the very top of the file.
- `excerpt` is optional. Leave it out and the first few lines of the post are used.
- For a poem you want centered, add `verse: true` on its own line under `title`.

## 3. Save it to the site

**On github.com (works from a phone too)**

1. Go to github.com/dadragon4/nikolascampos.com and open the `_posts` folder.
2. Tap **Add file → Create new file**.
3. Type the file name (step 1) and paste your post (step 2).
4. Tap **Commit changes**, then **Commit changes** again.

To fix a typo later, open the post's file, tap the pencil icon, edit, and commit again.

**Writing somewhere else first:** draft in Notes, Google Docs, or anything you like, then paste the text into a new file on github.com as above. (Pasting from Docs loses bold and italics; add them back with the symbols below.)

## Formatting

| You type | You get |
| --- | --- |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `## A heading` | a small heading inside the post |
| `[link text](https://example.com)` | a link |
| `- item` (one per line) | a bulleted list |
| `1. item` | a numbered list |
| `> quoted text` | an indented quote |
| `---` on its own line | a divider line |

## Adding a picture

1. On github.com open the `images/blog` folder and choose **Add file → Upload files**. Drag in the picture and commit. Use a short name with no spaces, like `beach-sunset.jpg`.
2. In your post, put this on its own line:

```
![A short description of the picture](/images/blog/beach-sunset.jpg)
```

The description is read aloud to people using screen readers, so describe what's in the photo. Big phone photos are fine, but they load faster if you shrink them to about 1600 pixels wide first.

## Drafts and scheduling

- **Not ready yet?** Save it in a `_drafts` folder instead of `_posts` (same format, no date needed in the name). Drafts never appear on the site. Move it to `_posts` (with the date) when it's ready.
- **A future date** in the file name means the post stays hidden until the site rebuilds on or after that date (the next time anything is saved).

## If a post doesn't show up

- Wait a minute and refresh.
- Check the file name: date first, `.md` at the end, no spaces.
- Check the top: the `---` lines must be the first thing in the file, and a title containing a colon (`:`) needs quotes around it.
- On github.com, the **Actions** tab (or the little ✕ or ✓ next to your commit) shows whether the site built. A red ✕ means something in the file confused it; the details name the file.
