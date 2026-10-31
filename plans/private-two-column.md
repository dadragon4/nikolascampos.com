# Draft: A password-only page with a two-column layout

*Status: idea draft, Oct 31, 2026. Nothing here is built.*

## Goal

A private subpage (for example `/private/`) in a two-column layout. Only people with the right token can open it, the token comes from your Git key, and no outside services or APIs are involved.

## Layout ideas

**1. Sidebar and reader (recommended)**

```
┌──────────────┬────────────────────────────────┐
│ NIKO         │  Section title                 │
│              │                                │
│ ▸ Overview   │  Main content: notes, drafts,  │
│ ▸ Drafts     │  works in progress, private    │
│ ▸ Projects   │  links, unreleased music...    │
│ ▸ Files      │                                │
│              │                                │
│ ⏻ Lock       │                                │
└──────────────┴────────────────────────────────┘
```

- The left column is a fixed menu; the right column scrolls.
- On phones, the menu folds into a top bar, and the content goes full width.
- It uses the site's existing fonts and colors, so it feels like a back room of the same house.

**2. Split dashboard.** The left column holds status cards (latest upload, visitor count, to-dos), and the right holds a live preview of the public site.

**3. Notes and preview.** On the left, a list of drafts; on the right, the selected draft rendered the way it would look published. This pairs well with the [admin backend](admin-backend.md).

## Locking it with a token from your Git key

**Important:** GitHub Pages can't check passwords. Any password checked by page code is visible to anyone who opens the page source. So instead of hiding the page, we **encrypt it**:

1. On your Mac, a small script makes a **token from your existing SSH key** (the same kind of key Git and GitHub use). Signing a fixed phrase with your key gives the same result every time, so the token is reproducible but impossible to guess without the key:
   ```bash
   printf 'nikolascampos-private' | ssh-keygen -Y sign -n private -f ~/.ssh/id_ed25519 | shasum -a 256 | cut -c1-32
   ```
2. The same script **encrypts the private page's content** with that token, using the free, open-source tool [StatiCrypt](https://github.com/robinmoisson/staticrypt) or a few lines of standard browser cryptography. It runs locally, with no API calls.
3. Only the **encrypted** page is committed and published. Anyone can download it, but it's unreadable scrambled data.
4. Visiting `/private/` shows a single "Enter token" box. The correct token decrypts the page in the browser. The browser can remember it on that device, and a "Lock" button forgets it.

**Why this fits:** no accounts, no services, no API keys, and it works on GitHub Pages today. The secret never leaves your computer except when you choose to share the token.

**Limits to know:**
- Anyone you give the token to can share it. To revoke access, re-encrypt with a new phrase and re-publish.
- Lose the SSH key (or the phrase) and you can't re-create the token. Keep a backup of the token in your password manager.
- Use a long token (32+ characters, as above). Encrypted pages can be attacked offline by guessing, so short passwords are weak.
- Keep truly sensitive material off the web entirely. Treat this as a locked door, not a bank vault.

## Alternatives

| Option | Real security | Uses outside services | Effort |
|---|---|---|---|
| **Encrypted page + Git-key token** (above) | Good, with a long token | No | Low |
| **Cloudflare Access** (after a [Cloudflare move](cloudflare-move.md)) | Strong: real sign-in, per-person access, revocable | Yes (Cloudflare) | Low to medium |
| Password checked by JavaScript | None: visible in the page source | No | Low (don't do this) |
| Private GitHub Pages site | Strong | Yes (paid GitHub plan) | Medium |

## Suggested next step

Pick a layout (sidebar and reader is the most flexible), then build `/private/` with placeholder content and the encryption script. Have the script add a note to `CHANGELOG.md`, and keep `/private/` out of the sitemap and search results.

## Open questions

- What goes on the private page? Drafts, unreleased music, a to-do board, family photos? This decides whether the encrypted page is enough or Cloudflare Access is worth it.
- Is it just for you, or will you share the token with a few people?
