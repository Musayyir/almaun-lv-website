/* ============================================================
   Al-Maun — shared site behaviour
   Dropdown / mobile nav · reusable modal system · image lightbox
   Dependency-free. Included on every page: <script src="assets/site.js" defer></script>
   Public API:  window.AlMaun.openModal(idOrEl) · closeModal(idOrEl) · openLightbox(triggerEl)
   ============================================================ */
(function () {
  "use strict";

  /* ── Web3Forms: paste your access key below to make every form deliver to your inbox.
        Get a free key at web3forms.com (enter almaun@gmail.com). Until then, NOTHING is sent
        from the site: each form says so and opens a pre-filled email in the visitor's own
        email app instead (see "FORM → SUCCESS MODAL" below). One key powers every form. ── */
  var WEB3FORMS_KEY = 'REPLACE_WITH_WEB3FORMS_KEY';

  /* ── Google Analytics 4: paste your Measurement ID (G-XXXXXXXXXX) to enable site-wide
        analytics. Stays completely inert until a real ID is set. ── */
  var GA4_ID = 'G-XXXXXXXXXX';

  /* ── Donations: where every "Donate" button sends people. Donations stay on Squarespace for now.
        BEFORE LAUNCH change this to an address that still reaches the Squarespace donate form once
        almaunlv.org points at the new site (e.g. a donate. subdomain or the *.squarespace.com address).
        Never leave it as www.almaunlv.org/donate-almaun after launch — that path redirects to give.html. ── */
  var DONATE_URL = 'https://donate.almaunlv.org/donate-almaun'; // Squarespace donation page on its own subdomain (primary domain of the Squarespace site since 16 Oct 2026); the old piccolo-tarpon address still serves the same form
  window.ALMAUN_DONATE_URL = DONATE_URL;
  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(document.querySelectorAll('a[data-donate-link]'), function (a) { a.href = DONATE_URL; });
  });

  var doc = document;

  /* Load GA4 once configured (single place, every page — no per-page snippet). */
  if (GA4_ID && GA4_ID.indexOf('G-XXX') !== 0) {
    var _ga = doc.createElement('script'); _ga.async = true;
    _ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    doc.head.appendChild(_ga);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }
  var mqReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  function reduced() { return !!(mqReduce && mqReduce.matches); }

  var FOCUSABLE = [
    'a[href]', 'area[href]', 'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', 'summary', 'iframe', 'audio[controls]',
    'video[controls]', '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function visibleFocusables(container) {
    if (!container) return [];
    return Array.prototype.slice.call(container.querySelectorAll(FOCUSABLE)).filter(function (el) {
      return el.offsetWidth || el.offsetHeight || el.getClientRects().length;
    });
  }
  function closestSafe(el, sel) { return el && el.closest ? el.closest(sel) : null; }

  /* ============================================================
     MODAL SYSTEM
     ============================================================ */
  var openStack = [];

  function lockScroll() { if (openStack.length === 1) doc.body.style.overflow = 'hidden'; }
  function unlockScroll() { if (openStack.length === 0) doc.body.style.overflow = ''; }

  function openModal(modal) {
    if (typeof modal === 'string') modal = doc.getElementById(modal);
    if (!modal || openStack.indexOf(modal) !== -1) return;
    modal._returnFocus = doc.activeElement;
    modal.hidden = false;
    void modal.offsetWidth;               /* reflow so the transition runs */
    modal.classList.add('is-open');
    openStack.push(modal);
    lockScroll();
    var panel = modal.querySelector('.modal__panel') || modal;
    var f = visibleFocusables(panel);
    var target = modal.querySelector('[autofocus]') || f[0] || panel;
    if (target && target.focus) { try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); } }
  }

  function closeModal(modal) {
    if (!modal) modal = openStack[openStack.length - 1];
    if (typeof modal === 'string') modal = doc.getElementById(modal);
    if (!modal) return;
    var idx = openStack.indexOf(modal);
    if (idx === -1) return;
    openStack.splice(idx, 1);
    modal.classList.remove('is-open');
    var ret = modal._returnFocus;
    var finish = function () { modal.hidden = true; };
    if (reduced()) {
      finish();
    } else {
      var done = false;
      var onEnd = function () { if (done) return; done = true; modal.removeEventListener('transitionend', onEnd); finish(); };
      modal.addEventListener('transitionend', onEnd);
      setTimeout(onEnd, 340);
    }
    unlockScroll();
    if (ret && ret.focus) { try { ret.focus({ preventScroll: true }); } catch (e) { ret.focus(); } }
  }

  /* delegated open / close triggers */
  doc.addEventListener('click', function (e) {
    var opener = closestSafe(e.target, '[data-modal-open]');
    if (opener) { e.preventDefault(); openModal(opener.getAttribute('data-modal-open')); return; }
    var closer = closestSafe(e.target, '[data-modal-close]');
    if (closer) { e.preventDefault(); closeModal(closestSafe(closer, '.modal')); }
  });

  /* keyboard: Escape closes · Tab is trapped · arrows drive the lightbox */
  doc.addEventListener('keydown', function (e) {
    if (!openStack.length) return;
    var modal = openStack[openStack.length - 1];

    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      if (!modal.hasAttribute('data-modal-persist')) closeModal(modal);
      return;
    }
    if (e.key === 'Tab') {
      var f = visibleFocusables(modal.querySelector('.modal__panel') || modal);
      if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1];
      if (!modal.contains(doc.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      return;
    }
    if (modal.classList.contains('lightbox')) {
      if (e.key === 'ArrowRight') { e.preventDefault(); lightboxStep(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); lightboxStep(-1); }
    }
  });

  /* ============================================================
     IMAGE LIGHTBOX  (built on the modal system)
     ============================================================ */
  var lb = null, lbImg, lbCap, lbCounter, lbGallery = [], lbIndex = 0;

  function buildLightbox() {
    if (lb) return lb;
    lb = doc.createElement('div');
    lb.className = 'modal lightbox';
    lb.id = '__almaun_lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.hidden = true;
    lb.innerHTML =
      '<div class="modal__backdrop" data-modal-close></div>' +
      '<div class="modal__panel lightbox__panel" role="document">' +
        '<button class="modal__x lightbox__x" type="button" data-modal-close aria-label="Close image viewer">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<button class="lightbox__nav lightbox__prev" type="button" aria-label="Previous image">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>' +
        '</button>' +
        '<button class="lightbox__nav lightbox__next" type="button" aria-label="Next image">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>' +
        '</button>' +
        '<figure class="lightbox__figure">' +
          '<img class="lightbox__img" alt="">' +
          '<figcaption class="lightbox__cap"></figcaption>' +
        '</figure>' +
        '<span class="lightbox__counter" aria-hidden="true"></span>' +
      '</div>';
    doc.body.appendChild(lb);
    lbImg = lb.querySelector('.lightbox__img');
    lbCap = lb.querySelector('.lightbox__cap');
    lbCounter = lb.querySelector('.lightbox__counter');
    lb.querySelector('.lightbox__prev').addEventListener('click', function (e) { e.preventDefault(); lightboxStep(-1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function (e) { e.preventDefault(); lightboxStep(1); });
    return lb;
  }

  function lbData(el) {
    var img = el.querySelector ? el.querySelector('img') : null;
    var val = el.getAttribute('data-lightbox');
    var src = (val && val.length) ? val : (el.getAttribute('href') || (img && img.getAttribute('src')) || '');
    var cap = el.getAttribute('data-caption') || (img && img.getAttribute('alt')) || '';
    return { src: src, cap: cap };
  }

  function renderLightbox() {
    var item = lbGallery[lbIndex];
    if (!item) return;
    lbImg.setAttribute('src', item.src);
    lbImg.setAttribute('alt', item.cap || 'Enlarged image');
    lbCap.textContent = item.cap || '';
    lbCap.style.display = item.cap ? '' : 'none';
    var multi = lbGallery.length > 1;
    lb.classList.toggle('lightbox--multi', multi);
    lbCounter.textContent = multi ? (lbIndex + 1) + ' / ' + lbGallery.length : '';
  }

  function lightboxStep(dir) {
    if (lbGallery.length < 2) return;
    lbIndex = (lbIndex + dir + lbGallery.length) % lbGallery.length;
    renderLightbox();
  }

  function openLightbox(trigger) {
    buildLightbox();
    var gname = trigger.getAttribute('data-gallery');
    var group = gname
      ? Array.prototype.slice.call(doc.querySelectorAll('[data-gallery="' + gname + '"]'))
      : [trigger];
    lbGallery = group.map(lbData);
    lbIndex = group.indexOf(trigger);
    if (lbIndex < 0) lbIndex = 0;
    renderLightbox();
    openModal(lb);
  }

  doc.addEventListener('click', function (e) {
    var t = closestSafe(e.target, '[data-lightbox]');
    if (t) { e.preventDefault(); openLightbox(t); }
  });

  /* ============================================================
     FORM  →  SUCCESS MODAL   (declarative: form[data-modal-success])

     With a Web3Forms key, forms post to Web3Forms and then open the success modal.
     WITHOUT a key (the current state), nothing is sent from the website. Instead the
     form is honest about it: a note under each form says sending opens the visitor's
     email app, and on submit we open a pre-filled email to MAIL_TO plus a modal that
     says so, with the message text to copy and the phone number if no email app opens.
     We never show the "thank you, we got it" modal when nothing was sent.
     ============================================================ */
  var MAIL_TO = 'almaun@gmail.com';
  var PHONE_TEL = '+17026472500', PHONE_TXT = '(702) 647-2500';
  var HAS_KEY = !!(WEB3FORMS_KEY && WEB3FORMS_KEY.indexOf('REPLACE_') !== 0 && window.fetch);

  /* Subject per form, keyed by its success-modal id. Falls back to the hidden "subject" input or the page title. */
  var MAIL_SUBJECTS = {
    'ct-sent': 'Message from the website',
    'rsvpd': 'RSVP',
    'volThanks': 'Volunteer sign-up',
    'subscribed': 'Please add me to your updates',
    'signup-ok': 'NutriPass sign-up',
    'reserved': 'Youth Conference reservation',
    'survey-thanks': 'Community survey response',
    'feedback-thanks': 'Private feedback'
  };

  function cleanText(t) { return String(t || '').replace(/\s+/g, ' ').replace(/\s*\*\s*$/, '').trim(); }

  function fieldLabel(form, el) {
    var lbl = el.id && form.querySelector('label[for="' + el.id + '"]');
    if (lbl) return cleanText(lbl.textContent);
    var fs = closestSafe(el, 'fieldset'), lg = fs && fs.querySelector('legend');
    if (lg) return cleanText(lg.textContent).replace(/^\d+\s+/, '');
    if (el.getAttribute('aria-label')) return cleanText(el.getAttribute('aria-label'));
    var wrap = closestSafe(el, 'label');
    if (wrap && el.type !== 'checkbox' && el.type !== 'radio') return cleanText(wrap.textContent);
    return el.name;
  }

  function fieldValue(el) {
    if (el.tagName === 'SELECT') {
      if (!el.value) return '';
      var o = el.options[el.selectedIndex];
      return o ? cleanText(o.textContent) : '';
    }
    return String(el.value || '').trim();
  }

  function mailParts(form) {
    var order = [], vals = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.disabled || el.type === 'submit' || el.type === 'button' || el.type === 'hidden') return;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
      var v = fieldValue(el);
      if (!v) return;
      var k = fieldLabel(form, el);
      if (!(k in vals)) { vals[k] = []; order.push(k); }
      vals[k].push(v);
    });
    var lines = order.map(function (k) {
      var v = vals[k].join(', ');
      return v.indexOf('\n') !== -1 ? k + ':\n' + v : k + ': ' + v;
    });

    var hidden = form.querySelector('input[type="hidden"][name="subject"]');
    var context = closestSafe(form, '.modal');
    var ctxTitle = context && context.querySelector('h2');
    var subj = MAIL_SUBJECTS[form.getAttribute('data-modal-success')] || (hidden && hidden.value) || doc.title || 'Message';
    if (ctxTitle) subj += ': ' + cleanText(ctxTitle.textContent);
    subj = 'Al-Maun website: ' + subj;

    var page = cleanText((doc.title || '').split(/[|\u2014\u2013-]/)[0]) || 'the website';
    var body = 'As-salamu alaykum, Al-Maun,\n\n' + lines.join('\n') +
      '\n\n(Sent by email from the "' + page + '" page on almaunlv.org)';
    return { subject: subj, body: body };
  }

  var mailModal, mailText, mailCopy, mailLink;
  function buildMailModal() {
    if (mailModal) return mailModal;
    mailModal = doc.createElement('div');
    mailModal.className = 'modal';
    mailModal.id = 'mail-handoff';
    mailModal.setAttribute('role', 'dialog');
    mailModal.setAttribute('aria-modal', 'true');
    mailModal.setAttribute('aria-labelledby', 'mail-handoff-title');
    mailModal.hidden = true;
    mailModal.innerHTML =
      '<div class="modal__backdrop" data-modal-close></div>' +
      '<div class="modal__panel" role="document">' +
        '<button class="modal__x" type="button" data-modal-close aria-label="Close">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<span class="modal__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></svg></span>' +
        '<h2 id="mail-handoff-title">One more step: <em>press Send.</em></h2>' +
        '<p>Your message has <b>not been sent yet</b>. We opened your email app with it filled in, addressed to ' +
          '<a href="mailto:' + MAIL_TO + '" style="color:var(--brand-strong);font-weight:700">' + MAIL_TO + '</a>. Press Send there and it reaches us.</p>' +
        '<p>No email app opened? Copy your message and email it to ' + MAIL_TO + ', or call ' +
          '<a href="tel:' + PHONE_TEL + '" style="color:var(--brand-strong);font-weight:700">' + PHONE_TXT + '</a>.</p>' +
        '<label for="mail-handoff-text" style="display:block;font-weight:700;margin-top:1rem;font-size:.9rem">Your message</label>' +
        '<textarea id="mail-handoff-text" readonly rows="6" style="width:100%;margin-top:.35rem;padding:.7rem .8rem;border:1px solid rgba(0,0,0,.18);border-radius:12px;font:inherit;font-size:.9rem;line-height:1.45;background:transparent;color:inherit;resize:vertical"></textarea>' +
        '<div style="display:flex;flex-wrap:wrap;gap:.6rem;align-items:center">' +
          '<a class="btn btn--cta" id="mail-handoff-open" href="#">Open email again</a>' +
          '<button class="btn btn--ghost" type="button" id="mail-handoff-copy">Copy message</button>' +
        '</div>' +
      '</div>';
    doc.body.appendChild(mailModal);
    mailText = mailModal.querySelector('#mail-handoff-text');
    mailCopy = mailModal.querySelector('#mail-handoff-copy');
    mailLink = mailModal.querySelector('#mail-handoff-open');
    mailCopy.addEventListener('click', function () {
      var done = function () { mailCopy.textContent = 'Copied'; setTimeout(function () { mailCopy.textContent = 'Copy message'; }, 2000); };
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(mailText.value).then(done, function () { mailText.select(); }); return; }
      } catch (err) {}
      mailText.focus(); mailText.select();
      try { if (doc.execCommand('copy')) done(); } catch (err) {}
    });
    return mailModal;
  }

  function sendByEmail(form) {
    var m = mailParts(form);
    var href = 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.body);
    buildMailModal();
    /* If the form lives in a modal (RSVP, volunteer...), close it so only the email hand-off shows. */
    var host = closestSafe(form, '.modal');
    if (host && host !== mailModal) closeModal(host);
    mailText.value = 'To: ' + MAIL_TO + '\nSubject: ' + m.subject + '\n\n' + m.body;
    mailLink.href = href;
    openModal(mailModal);
    /* Keep what they typed in the form (no reset): if no email app opens, nothing is lost. */
    window.location.href = href;
  }

  /* Without a key, say up front that sending opens the visitor's email app. */
  if (!HAS_KEY) {
    Array.prototype.slice.call(doc.querySelectorAll('form[data-modal-success]')).forEach(function (form) {
      var btn = form.querySelector('[type="submit"]');
      if (!btn || form.querySelector('.form-mailnote')) return;
      var note = doc.createElement('p');
      note.className = 'form-mailnote';
      note.style.cssText = 'flex-basis:100%;width:100%;margin:.55rem 0 0;font-size:.82rem;line-height:1.45;opacity:.85';
      note.textContent = 'Sending opens your email app with your message filled in, addressed to ' + MAIL_TO + '. Press Send there to reach us.';
      btn.parentNode.insertBefore(note, btn.nextSibling);
    });
  }

  Array.prototype.slice.call(doc.querySelectorAll('form[data-modal-success]')).forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.checkValidity && !form.checkValidity()) { if (form.reportValidity) form.reportValidity(); return; }
      var success = function () { openModal(form.getAttribute('data-modal-success')); try { form.reset(); } catch (err) {} };

      /* No real key configured (or no fetch) → nothing can be sent from the site. Hand off to email, honestly. */
      if (!HAS_KEY) { sendByEmail(form); return; }

      var data = new FormData(form);
      data.set('access_key', WEB3FORMS_KEY);
      if (!data.get('subject'))   data.set('subject', 'Al-Maun website: ' + (doc.title || 'form submission'));
      if (!data.get('from_name')) data.set('from_name', 'Al-Maun Website');

      var btn = form.querySelector('[type="submit"]'), label = btn && btn.textContent;
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      var fail = function () { alert('Sorry — something went wrong sending that. Please email ' + MAIL_TO + ' or call ' + PHONE_TXT + '.'); };
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Accept': 'application/json' }, body: data })
        .then(function (r) { return r.json(); })
        .then(function (res) { if (res && res.success) { success(); } else { fail(); } })
        .catch(fail)
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });
  });

  /* ============================================================
     PRIMARY NAV — dropdowns (hover + focus via CSS; click for touch) + mobile
     ============================================================ */
  (function () {
    var nav = doc.getElementById('nav');
    var burger = doc.getElementById('burger');
    var items = nav ? Array.prototype.slice.call(nav.querySelectorAll('.nav__item.has-dd')) : [];

    function closeDD(except) {
      items.forEach(function (it) {
        if (it === except) return;
        it.classList.remove('is-open');
        var t = it.querySelector('.nav__toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
    function closeMobile() {
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      }
    }

    items.forEach(function (it) {
      var toggle = it.querySelector('.nav__toggle');
      if (!toggle) return;
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var willOpen = !it.classList.contains('is-open');
        closeDD(it);
        it.classList.toggle('is-open', willOpen);
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    });

    if (nav && burger) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) closeDD();
      });
      /* following an actual link closes the mobile sheet + any open dropdown */
      nav.addEventListener('click', function (e) {
        if (closestSafe(e.target, 'a')) { closeMobile(); closeDD(); }
      });
    }

    /* click outside closes everything nav-related */
    doc.addEventListener('click', function (e) {
      if (!nav) return;
      if (nav.contains(e.target) || (burger && burger.contains(e.target))) return;
      closeDD();
      closeMobile();
    });

    /* Escape closes an open dropdown, else the mobile sheet — but defers to open modals */
    doc.addEventListener('keydown', function (e) {
      if (!(e.key === 'Escape' || e.key === 'Esc')) return;
      if (openStack.length) return;
      var openItem = items.filter(function (it) { return it.classList.contains('is-open'); })[0];
      if (openItem) {
        openItem.classList.remove('is-open');
        var t = openItem.querySelector('.nav__toggle');
        if (t) { t.setAttribute('aria-expanded', 'false'); t.focus(); }
      } else if (nav && nav.classList.contains('open')) {
        closeMobile();
        if (burger) burger.focus();
      }
    });
  })();

  /* ------------------------------------------------------------ */
  window.AlMaun = { openModal: openModal, closeModal: closeModal, openLightbox: openLightbox };
})();


/* ===== scroll progress bar (subtle, dynamic) ===== */
(function(){
  var bar=document.createElement('div'); bar.className='scroll-progress'; bar.setAttribute('aria-hidden','true');
  document.body.appendChild(bar);
  var raf=false;
  function upd(){ raf=false; var el=document.documentElement, max=el.scrollHeight-el.clientHeight;
    bar.style.transform='scaleX('+(max>0?(el.scrollTop/max):0)+')'; }
  addEventListener('scroll',function(){ if(!raf){ raf=true; requestAnimationFrame(upd); } },{passive:true});
  addEventListener('resize',upd); upd();
})();

/* ===== sticky Donate bar (appears on scroll, hides near footer) ===== */
(function(){
  if(/\/give(\.html)?\/?$/.test(location.pathname)) return;            // don't show on the Give page
  var bar=document.createElement('div'); bar.className='give-bar';
  bar.innerHTML='<span class="give-bar__msg">Every gift stays on the Westside.</span>'+
    '<a class="give-bar__cta btn btn--cta" href="give.html">Donate</a>'+
    '<button class="give-bar__x" type="button" aria-label="Dismiss donate bar">\u00d7</button>';
  document.body.appendChild(bar);
  var off=false;
  bar.querySelector('.give-bar__x').addEventListener('click',function(){ off=true; bar.classList.remove('is-on'); });
  var foot=document.querySelector('.footer, footer');
  function upd(){ if(off) return;
    var y=window.scrollY||document.documentElement.scrollTop, near=false;
    if(foot){ near=foot.getBoundingClientRect().top < window.innerHeight+30; }
    bar.classList.toggle('is-on', y>640 && !near);
  }
  addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); upd();
})();
