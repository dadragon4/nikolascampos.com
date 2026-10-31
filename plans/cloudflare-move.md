# Draft: Moving from GitHub Pages to Cloudflare

*Status: plan draft, Oct 31, 2026. Nothing has been changed.*

## Today

- **Code:** GitHub repo `dadragon4/nikolascampos.com` (stays where it is in every option).
- **Hosting:** GitHub Pages builds the site from `main` with Jekyll (for the blog and sitemap) and serves it with HTTPS.
- **Domain and DNS:** registered at Namecheap, using Namecheap's DNS. The A records point to GitHub, and `www` is a CNAME to `dadragon4.github.io`.
- **Email:** Namecheap **email forwarding** is active (MX records `eforward1–5.registrar-servers.com`, plus an SPF TXT record). ⚠️ This only works while Namecheap runs the DNS, so it must be replaced before or during a move (see step 4).

## Why move

- **Free, privacy-friendly analytics** (Cloudflare Web Analytics) built into the dashboard.
- **Real login protection** for private pages (Cloudflare Access), instead of only encrypted pages.
- **Room to grow:** Workers (small server code) for an [admin backend](admin-backend.md), R2 storage for media uploads, and contact forms.
- **Speed and control:** a global cache, custom redirects and headers, and preview links for every branch.

**Reasons to stay put:** today's setup works, costs nothing, and has fewer moving parts. Moving only pays off once you want analytics, logins, or an admin.

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
4. **Replace email forwarding** with **Cloudflare Email Routing** (free). Recreate each forwarding address there (for example `hello@nikolascampos.com` → your inbox). Then send a test email.
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

Start with **Level 1 (DNS only) plus Email Routing**. It's low risk, unlocks analytics and Access, and makes a later full move a small change.
