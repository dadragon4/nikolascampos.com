# Website to-dos that need your accounts

*Oct 31, 2026. Done: secret scanning, domain verification, DMARC, hello@ forwarder. Left: GoatCounter. Originally four, a few minutes each. When you finish one, tell Claude in the nikolascampos.com project and it will check it.*

---

## 1. Verify your domain with GitHub (most important, ~10 min)

**Why:** right now, if the site were ever switched off, someone else could claim nikolascampos.com on GitHub. Verifying locks it to your account.

**On GitHub (github.com):**
1. Tap your **profile picture** (top right), then **Settings**.
2. In the left menu, find **Pages** (under "Code, planning, and automation").
3. Tap **Add a domain**, type `nikolascampos.com`, then **Add domain**.
4. GitHub shows a **TXT record** with a **host** like `_github-pages-challenge-dadragon4` and a long **value**. Keep this page open.

**On Namecheap (namecheap.com):**
5. Go to **Domain List**, then **Manage** next to nikolascampos.com.
6. Open the **Advanced DNS** tab.
7. Tap **Add New Record** and choose **TXT Record**.
8. **Host:** `_github-pages-challenge-dadragon4` (just that; Namecheap adds the domain itself).
9. **Value:** paste the long value from GitHub. **TTL:** Automatic.
10. Tap the **green checkmark** to save.

**Back on GitHub:**
11. Wait about 5 minutes, then tap **Verify**. If it fails, wait a few more minutes and try again.
12. **Leave the TXT record in Namecheap forever.** Deleting it undoes the protection.

---

## 2. Stop fake emails from your domain (DMARC, ~3 min)

**Why:** without this, anyone can send emails that look like they come from @nikolascampos.com.

**On Namecheap, Advanced DNS (same page as above):**
1. Tap **Add New Record**, then **TXT Record**.
2. **Host:** `_dmarc`
3. **Value:** `v=DMARC1; p=reject;`
4. **TTL:** Automatic, then the **green checkmark**.

**Don't change** the existing **MX** records or the TXT record starting with `v=spf1`. Those run your email forwarding.

*This strict setting is right because you only receive email at your domain and never send from it. If you ever want to send from it, ask Claude first.*

---

## 3. Email address for the Contact page (~5 min)

**Why:** your Gmail is on the Contact page, where spam bots can find it. A forwarding address like hello@nikolascampos.com still lands in your Gmail but keeps it private.

**On Namecheap:**
1. **Domain List**, then **Manage** next to nikolascampos.com.
2. Find **Redirect Email** (on the Domain tab, or under Email Forwarding).
3. Tap **Add Forwarder**. **Alias:** `hello`. **Forward to:** your Gmail address. Save.
4. From a different email account, send a test to **hello@nikolascampos.com** and check that it arrives in Gmail.

**Then tell Claude:** "Use hello@nikolascampos.com on the Contact page." Claude swaps it in and publishes when you say so.

*Your Gmail stays in the site's public change history on GitHub, so this protects you from now on.*

---

## 4. Visitor counts (GoatCounter, ~5 min)

**Why:** see how many people visit and which pages they read, with no cookies and no cookie banner.

1. Go to **goatcounter.com** and tap **Sign up** (free for personal sites).
2. **Code:** choose a name, for example `nikolascampos`. Your dashboard will be at nikolascampos.goatcounter.com.
3. Enter your email and a password, and finish signing up.

**Then tell Claude:** "My GoatCounter code is ___, turn on analytics." Claude adds it and publishes when you say so. Visits start showing on your dashboard within a minute or two.

---

## Checklist

- [x] 1. Domain verified on GitHub (TXT record left in place)
- [x] 2. DMARC record added
- [x] 3. hello@ forwarder works, and Claude has updated the Contact page
- [ ] 4. GoatCounter account made, and Claude has turned on analytics
- [x] Secret scanning and push protection (done Oct 31)
