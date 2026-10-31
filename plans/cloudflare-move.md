# Draft: Moving from GitHub Pages to Cloudflare

*Status: plan draft, Oct 31, 2026. Nothing has been changed.*

## Today

- **Code:** GitHub repo `dadragon4/nikolascampos.com` (stays where it is in every option).
- **Hosting:** GitHub Pages builds the site from `main` with Jekyll (for the blog and sitemap) and serves it with HTTPS.
- **Domain and DNS:** registered at Namecheap, using Namecheap's DNS. The A records point to GitHub, and `www` is a CNAME to `dadragon4.github.io`.
- **Email:** Namecheap **email forwarding** is active (MX records `eforward1–5.registrar-servers.com`, plus an SPF TXT record). ⚠️ This only works while Namecheap runs the DNS, so it must be replaced before or during a move (see step 4).
- **Other DNS records added Oct 31, 2026, which must be copied exactly in any move:**
  - TXT `_github-pages-challenge-dadragon4`, the GitHub domain verification. If it's lost, the domain loses takeover protection.
  - TXT `_dmarc` = `v=DMARC1; p=reject;`, the anti-spoofing email rule.
  - The `hello@nikolascampos.com` forwarder (to Niko's Gmail). It's a Namecheap email-forwarding setting, so it has to be recreated in Cloudflare Email Routing.
- **Admin area:** at a secret address (see CLAUDE.md), hidden but not password-protected. Its editors and stats have their own sign-ins.

## Why move

- **Free, privacy-friendly analytics** (Cloudflare Web Analytics) built into the dashboard.
- **Real login protection** for private pages (Cloudflare Access), instead of only encrypted pages.
- **Room to grow:** Workers (small server code) for an [admin backend](admin-backend.md), R2 storage for media uploads, and contact forms.
- **Speed and control:** a global cache, custom redirects and headers, and preview links for every branch.

**Reasons to stay put:** today's setup works, costs nothing, and has fewer moving parts. Moving only pays off once you want analytics, logins, or an admin.

## Planned: a real login for the admin (Cloudflare Access)

*Note from Oct 31, 2026: Niko wants this when the move happens.* Today the admin is only hidden at a secret address. Anyone with the address can open the menu page and the changelog, though not the editors or stats, which have their own sign-ins. Cloudflare Access would put a real sign-in screen in front of the whole admin folder: a one-time code sent to Niko's email, and nobody else can even load the page.

**What it needs:** Level 1 below (Cloudflare running the DNS). A full move isn't required.

**Steps, once Cloudflare runs the DNS:**
1. In the Cloudflare dashboard, open **Zero Trust**. Choose a team name, and pick the **Free** plan (up to 50 users; Cloudflare may ask for a card, but it isn't charged).
2. Go to **Access**, then **Applications**, then **Add an application**, and choose **Self-hosted**.
3. **Application domain:** `www.nikolascampos.com`, with the admin folder's path (from CLAUDE.md) as the **path**. Add a second entry for the bare `nikolascampos.com` with the same path.
4. **Policy:** Allow, with an include rule of **Emails** = Niko's email address. Session length: for example 1 month.
5. **Login method:** "One-time PIN" (email code) is on by default. GitHub sign-in can be added under **Settings**, then **Authentication**.
6. In the Cloudflare **DNS** settings, set the `www` and root records to **Proxied** (orange cloud), so Access can sit in front. GitHub Pages keeps hosting the site.
7. Test it in a private window: the admin should ask for an email code, and the rest of the site should load normally.
8. Optional, after it works: move the admin back to a simple address like `/admin`, since the login now protects it.

**Things to watch:**
- When the records are proxied, set Cloudflare **SSL/TLS** to **Full** (not Flexible), or the site can redirect in a loop.
- The admin's Changelog page reads the changelog from GitHub, so it keeps working behind Access.
- The Sveltia editor saves straight to GitHub from the browser, so it keeps working behind Access too.

## Two levels of moving

**Level 1: DNS only (small step).** Cloudflare runs the DNS and sits in front, while GitHub Pages keeps hosting. You get analytics, caching and Access, with less risk.

**Level 2: Full move (Cloudflare Pages).** Cloudflare also builds and hosts the site from the same GitHub repo. GitHub Pages is switched off.

## Step-by-step (full move)

1. **Create a free Cloudflare account** and choose "Add a site" → `nikolascampos.com`. Cloudflare scans and copies the existing DNS records.
2. **Check the copied records:**
   - the four A records and the `www` CNAME
   - the MX and SPF records
   Set the GitHub records to "DNS only" (grey cloud) for now.
3. **Prepare the build.** Add a `Gemfile` so Cloudflare can run Jekyll with the same plugins GitHub uses (`jekyll`, `jekyll-sitemap`, `kramdown`).
4. **Replace email forwarding** with **Cloudflare Email Routing** (free). Recreate each forwarding address there (today: `hello@nikolascampos.com` → Niko's Gmail). Then send a test email. Keep the `_dmarc` and `_github-pages-challenge-dadragon4` TXT records.
5. **Switch nameservers at Namecheap:** Domain List → Manage → Nameservers → "Custom DNS", and enter the two Cloudflare nameservers. The switch usually takes minutes to a few hours. The site stays up on GitHub Pages meanwhile.
6. **Create a Cloudflare Pages project** connected to the GitHub repo:
   - Build command: `bundle exec jekyll build`
   - Output folder: `_site`
   - Production branch: `main`
7. **Test the preview address** Cloudflare gives (`*.pages.dev`):
   - every page
   - the blog and a post
   - the sitemap
   - the 404 page
   - the Desktop view
8. **Attach the domains:** add `www.nikolascampos.com` as the main domain and `nikolascampos.com` → redirect to www, in Cloudflare Pages → Custom domains. Cloudflare issues HTTPS automatically.
9. **Turn off GitHub Pages** (repo Settings → Pages) and delete the `CNAME` file.
10. **Update `CLAUDE.md`, `HOW-TO-POST.md` and `CHANGELOG.md`.** Publishing still works the same way: push to `main`, and the site updates.

## Rollback

If anything goes wrong, set Namecheap's nameservers back to "Namecheap BasicDNS" (the old records are still saved there) and turn GitHub Pages back on. The site is back on GitHub within a few hours, and nothing in the repo is lost.

## Costs

The Cloudflare Pages, DNS, Web Analytics, Email Routing and Access (up to 50 users) free tiers cover this site. R2 storage is free up to 10 GB, then about $0.015 per GB a month. The domain stays registered at Namecheap (or can move to Cloudflare Registrar later, which sells domains at cost).

## Risks and checks

- **Email forwarding:** the main risk. Do step 4 before step 5.
- **Jekyll differences:** Cloudflare's build must match GitHub's. Compare the `*.pages.dev` preview page by page before switching domains.
- **HTTPS gap:** a short window while the certificate is issued. Do it at a quiet time.
- **The `www` setup:** keep www as the main address (as set on Oct 31), with the bare domain redirecting, so search results stay consistent.

## Suggested next step

Start with **Level 1 (DNS only) plus Email Routing**, then add **Cloudflare Access for the admin** (see above). It's low risk, unlocks Access, and makes a later full move a small change. Analytics is already handled by GoatCounter.
