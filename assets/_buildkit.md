# Al-Maun site — BUILD KIT (canonical header/footer, modal API, verified facts)

Use this verbatim when building any new page so the whole site is consistent. Skin = "Block Party" (warm cream/green/marigold/tomato, Sora + DM Sans, rounded cards, tape/stamp/marker accents). All shared CSS is in `assets/bp.css`; all shared JS (dropdown nav, mobile nav, modals, lightbox) is in `assets/site.js`.

## <head> — include on every page
```html
<link rel="stylesheet" href="assets/bp.css">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```
Before `</body>`: `<script src="assets/site.js" defer></script>`
Keep the tiny inline theme-apply script if you copy it from blockparty.html (prevents dark-mode flash). Fonts load via bp.css.

## Canonical HEADER (paste verbatim; set aria-current="page" on the matching nav item for this page)
```html
<header class="header" id="top">
  <div class="container header__in">
    <a class="brand" href="blockparty.html" aria-label="Al-Maun Neighborly Needs, home">
      <img class="brand__logo brand__logo--light" src="images/logo-green.png" alt="Al-Maun Neighborly Needs" width="667" height="266">
      <img class="brand__logo brand__logo--dark" src="images/logo-white.png" alt="" aria-hidden="true" width="800" height="305">
    </a>
    <nav class="nav" id="nav" aria-label="Primary">
      <ul class="nav__list">
        <li class="nav__item has-dd">
          <a class="nav__link" href="about.html">Our Story</a>
          <button class="nav__toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Our Story submenu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
          <div class="dd">
            <a class="dd__link" href="about.html#ab-name">Mission</a>
            <a class="dd__link" href="about.html#ab-heritage">Our History</a>
            <a class="dd__link" href="about.html#ab-people">Leadership</a>
            <a class="dd__link" href="about.html#ab-trust">Transparency</a>
          </div>
        </li>
        <li class="nav__item has-dd">
          <a class="nav__link" href="programs.html">Programs</a>
          <button class="nav__toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Programs submenu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
          <div class="dd dd--programs">
            <a class="dd__link" href="programs.html#food"><span class="dd__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 11h17a8.5 8.5 0 0 1-17 0Z"/><path d="M8 7.5c0-1 1-1.2 1-2.2M12 7c0-1 1-1.2 1-2.2M16 7.5c0-1 1-1.2 1-2.2"/></svg></span>Food &amp; Nutrition</a>
            <a class="dd__link" href="programs.html#health"><span class="dd__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg></span>Free Health Clinic</a>
            <a class="dd__link" href="programs.html#education"><span class="dd__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9 12 5l9.5 4L12 13 2.5 9Z"/><path d="M6.5 10.7V15c0 1.2 2.5 2.2 5.5 2.2s5.5-1 5.5-2.2v-4.3"/></svg></span>Education &amp; Workshops</a>
            <a class="dd__link" href="programs.html#reentry"><span class="dd__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11 12 5l8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg></span>Stabilization &amp; Reentry</a>
            <a class="dd__link" href="programs.html#youth"><span class="dd__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8.5 14a4 4 0 0 0 7 0"/></svg></span>Youth Development</a>
            <a class="dd__link" href="programs.html#community"><span class="dd__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20"/><circle cx="10" cy="8" r="3"/><path d="M20 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 5.2a3 3 0 0 1 0 5.6"/></svg></span>Community &amp; Culture</a>
          </div>
        </li>
        <li class="nav__item"><a class="nav__link" href="nutrition-passport.html">NutriPass</a></li>
        <li class="nav__item"><a class="nav__link" href="impact.html">Impact</a></li>
        <li class="nav__item has-dd">
          <a class="nav__link" href="get-involved.html">Get Involved</a>
          <button class="nav__toggle" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Get Involved submenu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
          <div class="dd">
            <a class="dd__link" href="get-involved.html#volunteer">Volunteer</a>
            <a class="dd__link" href="get-involved.html#goods">Donate Goods</a>
            <a class="dd__link" href="get-involved.html#partners">Partners</a>
          </div>
        </li>
      </ul>
    </nav>
    <div class="header__cta">
      <button class="icon-btn theme-toggle" id="themeBtn" type="button" aria-label="Toggle dark mode">
        <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        <svg class="moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
      </button>
      <span class="header__soc">
        <a class="icon-btn" href="https://instagram.com/almaunlv_official" target="_blank" rel="noopener" aria-label="Al-Maun on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
        <a class="icon-btn" href="https://www.facebook.com/almaun.org/" target="_blank" rel="noopener" aria-label="Al-Maun on Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.7-1.5H18V.2C17.5.1 16.3 0 15 0c-2.7 0-4.5 1.6-4.5 4.6V6H8v3h2.5v9H14z"/></svg></a>
      </span>
      <a class="btn btn--cta" href="give.html">Donate</a>
      <button class="icon-btn burger" id="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div>
  </div>
</header>
```

## Canonical FOOTER (paste verbatim)
```html
<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        <img class="footer__logo" src="images/logo-white.png" alt="Al-Maun Neighborly Needs">
        <p class="footer__tag">The humanitarian arm of Masjid As-Sabur, serving the Historic Westside of Las Vegas since 2003. Neighbors helping neighbors &mdash; measured in small kindnesses.</p>
        <a class="footer__soc" href="https://instagram.com/almaunlv_official" target="_blank" rel="noopener" aria-label="Al-Maun on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> @almaunlv_official</a>
        <a class="footer__soc" href="https://www.facebook.com/almaun.org/" target="_blank" rel="noopener" aria-label="Al-Maun on Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.7-1.5H18V.2C17.5.1 16.3 0 15 0c-2.7 0-4.5 1.6-4.5 4.6V6H8v3h2.5v9H14z"/></svg> facebook.com/almaun.org</a>
      </div>
      <div>
        <h4>Explore</h4>
        <nav class="footer__nav" aria-label="Footer">
          <a href="about.html">Our Story</a>
          <a href="programs.html">Programs</a>
          <a href="nutrition-passport.html">NutriPass</a>
          <a href="impact.html">Impact</a>
          <a href="events.html">Events &amp; Prayer</a>
          <a href="get-involved.html">Get Involved</a>
          <a href="contact.html">Contact</a>
        </nav>
      </div>
      <div>
        <h4>Visit &amp; Contact</h4>
        <address>
          711 Morgan Ave<br>
          Las Vegas, NV 89106<br>
          <a href="tel:+17026472500">(702) 647-2500</a><br>
          <a href="mailto:almaun@gmail.com">almaun@gmail.com</a>
        </address>
        <div class="footer__jum"><b>Jumu&#39;ah &middot; Fridays 1:00 PM</b><span>All are welcome at Masjid As-Sabur.</span></div>
      </div>
      <div>
        <h4>Give &amp; Support</h4>
        <address>
          Registered 501(c)(3)<br>
          EIN 32-0087926<br>
          Zakat-eligible &amp; tax-deductible<br>
          <a href="give.html">Make a donation &rarr;</a>
        </address>
      </div>
    </div>
    <div class="footer__bar">
      <span>&copy; 2003&ndash;2026 Al-Maun Neighborly Needs. All kindnesses welcome.</span>
      <span class="footer__legal"><a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a> &middot; <a href="donor-policy.html">Donor Policy</a></span>
      <span class="proto">Redesign prototype &mdash; not the official Al-Maun website</span>
    </div>
  </div>
</footer>
```
Note: footer now has a 4-column top (brand / Explore / Visit / Give). If bp.css `.footer__top` is a 3-col grid, add a tiny page-scoped style so it lays out 4 across on desktop and wraps on mobile, or reuse an existing auto-fit grid.

## MODAL API (assets/site.js)
- Trigger: `data-modal-open="MODAL_ID"` on any element opens `#MODAL_ID`.
- Form that opens a modal on submit: `<form data-modal-success="MODAL_ID"> …required fields… </form>`
- Modal markup:
```html
<div class="modal" id="MODAL_ID" role="dialog" aria-modal="true" aria-labelledby="MODAL_ID-title" hidden>
  <div class="modal__backdrop" data-modal-close></div>
  <div class="modal__panel" role="document">
    <button class="modal__x" type="button" data-modal-close aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <h2 id="MODAL_ID-title">Title</h2>
    <p>Content…</p>
  </div>
</div>
```
- JS also exposes `window.AlMaun.openModal(id)` / `.closeModal(id)`. Focus-trap, scroll-lock, Esc, backdrop close, focus-restore are automatic.
- LIGHTBOX: `<a data-lightbox href="images/x.jpg" data-gallery="NAME" data-caption="…"><img src="images/x.jpg" alt="…"></a>`. Arrow keys + chevrons page a gallery. `window.AlMaun.openLightbox(el)` exposed.

## VERIFIED FACTS (use these; do not invent)
- Org: **Al-Maun Neighborly Needs** — grassroots humanitarian arm of **Masjid As-Sabur**, the oldest mosque in Las Vegas, Historic Westside. Founded **2003** by **Imam Fateen** and **Sister Nisaa Seifullah**. Serves everyone, Muslim & non-Muslim. Name from **Surah Al-Ma'un (Qur'an 107)** — faith measured by small kindnesses to neighbors. Nationally recognized for **Hurricane Katrina** relief; the masjid has welcomed figures like **Muhammad Ali**.
- Address: **711 Morgan Ave, Las Vegas, NV 89106** (use 89106). Phone **(702) 647-2500**. Email **almaun@gmail.com**. IG **@almaunlv_official** (https://instagram.com/almaunlv_official). FB **https://www.facebook.com/almaun.org/**. Jumu'ah **Fridays 1:00 PM**. **501(c)(3), EIN 32-0087926**.
- Stats: **20+ years** · **500+** neighbors served in ONE day · **$20,000+** in aid that day · **6** core programs · a **free health clinic** (built with UNLV). Flagship event: **Humanitarian Day 2025 — March 22, 2025**.
- 6 PROGRAMS:
  1. **Food & Nutrition** (#food) — food pantry, hot meals, grocery delivery, community garden, farmers market, NutriPass (the Nutrition Passport program). img: images/prog-food.jpg
  2. **Free Health Clinic** (#health) — with UNLV: check-ups, wound care, eye exams, prescription help. img: images/prog-health.jpg
  3. **Education & Workshops** (#education) — trauma support, legal-rights workshops, grief support, Nisaa's Academy. img: images/prog-education.jpg
  4. **Stabilization & Reentry** (#reentry) — reentry (CHANCES), recovery (Millati Islami), rent & utility assistance. img: images/prog-reentry.jpg
  5. **Youth Development** (#youth) — mentorship, chess club, youth talks, sponsorship. img: images/prog-youth.jpg
  6. **Community & Culture** (#community) — arts & culture, interfaith, neighborhood cleanups. img: images/g-volunteers.jpg
- Humanitarian Day 2025 distributions (photo captions / tags): Hot meals · Medical services · Hygiene kits · Mobile showers · Shoes · Cooling fans · Baby formula · Diapers · Water · Haircuts · Jackets · Backpacks.
- Partners: ILM Foundation · Las Vegas Raiders · Albertsons · Raising Cane's · UnitedHealthcare · Spin City · UNLV · Vituity Cares.
- Donation impact tiers (illustrative — mark preview): $25 hot meals for a family this week · $50 summer cooling & hygiene kit · $100 a free clinic visit · $250 a week of groceries delivered · $500 keep a family in their home (rent/utility). One-time + Monthly. Zakat-eligible, tax-deductible.
- Prayer times (ILLUSTRATIVE placeholders — label "confirm with the masjid"; Jumu'ah 1:00 PM is real): Fajr 5:15 AM · Dhuhr 1:00 PM · Asr 4:45 PM · Maghrib sunset · Isha 8:45 PM.
- IMAGES available in images/: hero-neighbors.jpg, story-banner.jpg, feature-hug.jpg, g-haircut.jpg, g-feeding.jpg, g-volunteers.jpg, g-serve.jpg, g-126.jpg, g-348.jpg, prog-food.jpg, prog-health.jpg, prog-education.jpg, prog-reentry.jpg, prog-youth.jpg, donate.jpg, logo-green.png, logo-white.png, logo-dark.png. (prog-*.jpg are ~378px — use small.)
- NUTRITION PASSPORT (a real, flagship program): a FREE, hands-on program to help prevent & manage **Type 2 diabetes** in the Historic Westside — serving ZIP **89106 & 89101**. Structured as three levels + a bonus:
  - **Level 1 — Learn:** free nutrition workshops (a **hot meal is provided**) — reading labels, portions, sugar, simple cooking.
  - **Level 2 — Do:** put it into practice — track habits, try recipes, complete simple health activities/challenges.
  - **Level 3 — Share:** pass it on — share what you learned with family & neighbors, or bring a friend to a workshop.
  - **Bonus:** join the **"Get Healthy Clark County" Nutrition Challenge** (an external partner; the live site links out / shows a QR) for extra rewards.
  Free workshops + meals · progress tracking · an email sign-up for the next workshop. NOTE: registration/"cart" is a design preview here — in production it wires to Al-Maun's system. Images to use: prog-food.jpg, prog-health.jpg, g-feeding.jpg, g-serve.jpg.

## SEO <head> — put a proper head on every page (customize per page)
```html
<title>PAGE TITLE — Al-Maun Neighborly Needs</title>
<meta name="description" content="One-sentence, specific description of THIS page (150-160 chars).">
<link rel="canonical" href="https://www.almaunlv.org/PAGE.html">
<meta property="og:site_name" content="Al-Maun Neighborly Needs">
<meta property="og:title" content="PAGE TITLE — Al-Maun Neighborly Needs">
<meta property="og:description" content="Same as meta description.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.almaunlv.org/PAGE.html">
<meta property="og:image" content="https://www.almaunlv.org/images/hero-neighbors.jpg">
<meta name="twitter:card" content="summary_large_image">
```
(The favicon links, bp.css, and viewport from the top of this kit still apply.)
