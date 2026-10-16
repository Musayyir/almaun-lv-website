# Al-Maun Website — Launch Readiness Checklist

*Prepared for the Al-Maun Neighborly Needs board. Tracks everything needed to replace the current almaunlv.org site with the new site.*

---

## Where things stand

The redesigned site is **production-ready** — 16 pages, real Al-Maun photos, real logo + favicon, working navigation, modals, forms **wired to a real backend**, analytics ready, and a committed automated test suite. What remains is the **last mile**: pasting a few account keys, hosting/DNS setup, and final real content from Al-Maun.

**Pages:** Home · Our Story · Programs · NutriPass (Nutrition Passport) · Impact · Events & Prayer · Get Involved · Give · Contact · **Survey** · Youth Conference · In Memoriam · 404 · Privacy · Terms · Donor Policy.

---

## ✅ Done
- [x] Full responsive design, all pages, light/dark themes, accessible base (focus states, alt text, reduced-motion)
- [x] Real Al-Maun logo + designed brand mark & favicon; **crisp vector wordmark** available
- [x] Dropdown nav, working modals (program details, RSVP, volunteer, contact, workshop signup), image lightbox
- [x] **Real program photos** (replaced the AI-generated ones with authentic Al-Maun photos)
- [x] **Survey page** built (email-capture "coming soon", matching their live page) + linked in footer
- [x] **Forms wired to Web3Forms** — contact, volunteer, RSVP, workshop, survey all deliver once the key is set (see step 1); graceful fallback until then
- [x] **Analytics ready** — GA4 loader built into `site.js` (set one ID to enable); SEO meta/OG/Twitter/canonical on every page; `sitemap.xml` + `robots.txt`
- [x] **Automated smoke-test suite** (`test/`) — load errors, mobile+desktop overflow, broken links, SEO basics, mobile menu, modals
- [x] Home promoted to site root (`index.html`); design-directions picker preserved at `directions.html`
- [x] Fact-checked vs live site. ZIP is **89106** (live site's "89121" is a typo)

## 🔌 Last mile — human-gated (see LAUNCH steps below for how)
- [ ] **Web3Forms key** → paste into `site.js` so forms deliver (step 1)
- [ ] **GA4 Measurement ID** → paste into `site.js`; add Search Console (step 2)
- [x] **Donations** — stay on Squarespace; Give buttons point at `https://donate.almaunlv.org/donate-almaun` (subdomain connected and set as the Squarespace site's primary domain, www prefix off, 16 Oct 2026). Old pages on the Squarespace site disabled; donate page is its homepage.
- [ ] **Hosting + DNS** — deploy to Cloudflare Pages, point the domain (steps 4–5)
- [ ] **Remove noindex** at go-live so Google can index (step 6)
- [ ] *(Optional, later)* Lightweight CMS (Decap/Sveltia) so staff self-edit events/text
- [ ] *(Optional, later)* Switch to fee-free donations — a separate step, not needed to launch

## 🚀 LAUNCH steps (the human-gated last mile)

| # | Step | Who | ~Time |
|---|------|-----|-------|
| 1 | **web3forms.com** → get key (use almaun@gmail.com) → paste into `site.js` `WEB3FORMS_KEY` → verify a test submission arrives | You | 10 min |
| 2 | **GA4** property → paste Measurement ID into `site.js` `GA4_ID`; add Search Console + submit sitemap | You | 15 min |
| 3 | Point Give buttons at the Squarespace donate page (keep it on a `donate.` subdomain); verify checkout works | You | 15 min |
| 4 | **Cloudflare Pages** → connect the repo (branch `main`, no build) → confirm the `*.pages.dev` preview | You | 20 min |
| 5 | **DNS cutover** in Squarespace → point almaunlv.org at Cloudflare; keep the donate subdomain on Squarespace (up to 24–48h propagation, reversible) | Domain owner | 15 min |
| 6 | Delete `robots.txt` `Disallow: /` (remove noindex) so Google indexes | You | 5 min |
| 7 | **Verify:** `BASE=https://www.almaunlv.org npm test`, one real test donation, one of each form, phone spot-check | You | 15 min |

## 📄 Final real content from Al-Maun
- [ ] High-resolution **photo originals** + more variety
- [ ] Real current **prayer times** + **office hours** (Jumu'ah 1:00 PM confirmed)
- [ ] **Leadership/staff bios + photos** (Sister Nisaa tribute page already built)
- [ ] **Verified donation impact figures** ($25 = …, etc. are illustrative)
- [ ] Real **event dates** + **Youth Conference** details
- [ ] Legal counsel review of Privacy / Terms / Donor Policy

## ⚖️ Old URL → new page (redirect map — set these up on the new host)
| Old (Squarespace) | New |
|---|---|
| `/home` | `/` |
| `/about` | `/about.html` |
| `/contact` | `/contact.html` |
| `/donate-almaun` | `/give.html` |
| `/nutritionpassport` | `/nutrition-passport.html` |
| `/level-1`, `/level-2`, `/level-3`, `/nutrition-passport-bonus` | `/nutrition-passport.html` (+ `#level-1` … `#bonus`) |
| `/resources-workshops` | `/programs.html` |
| `/youthconference` | `/youth-conference.html` |
| `/survey` | `/survey.html` |
| `/cart` | `/give.html` |

## 🧹 Known follow-up (not blocking launch)
- **Home-page CSS consolidation:** `index.html` carries its own inline copy of the base styles instead of linking `assets/bp.css`. It renders correctly, but shared-component changes must be mirrored into it by hand. The smoke suite now catches any resulting drift. Consolidating it is a clean post-launch task (deferred to avoid changing the approved home page mid-review).

---

*Rough effort for the last mile: ~10–15 focused hours over a couple of days, most of it waiting on DNS propagation and the account setups above — not active work.*
