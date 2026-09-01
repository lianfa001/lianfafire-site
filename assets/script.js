/* LIANFA FIRE — interactions: nav, i18n switch, form, FAQ, reveal */
(function () {
  "use strict";

  var SUPPORTED = ["en", "ru", "pt", "hi", "zh"];
  var lang = localStorage.getItem("lianfa_lang") || "en";
  if (SUPPORTED.indexOf(lang) === -1) lang = "en";

  function t(key) {
    var dict = window.I18N && window.I18N[lang];
    return (dict && dict[key]) || (window.I18N && window.I18N.en[key]) || key;
  }

  function applyLang(next) {
    lang = SUPPORTED.indexOf(next) !== -1 ? next : "en";
    localStorage.setItem("lianfa_lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      nodes[i].textContent = t(key);
    }
    var phs = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < phs.length; j++) {
      phs[j].setAttribute("placeholder", t(phs[j].getAttribute("data-i18n-ph")));
    }
    var titles = document.querySelectorAll("[data-i18n-title]");
    for (var k = 0; k < titles.length; k++) {
      titles[k].setAttribute("title", t(titles[k].getAttribute("data-i18n-title")));
    }
    var pageTitle = document.querySelector("[data-i18n-pagetitle]");
    if (pageTitle) document.title = t(pageTitle.getAttribute("data-i18n-pagetitle")) + " | DONGSHENG® Fire Equipment";
    var btn = document.querySelector(".lang-btn .lang-cur");
    if (btn) btn.textContent = lang.toUpperCase();
    closeMenu();
  }

  function closeMenu() {
    var menu = document.querySelector(".lang-menu");
    if (menu) menu.classList.remove("open");
    var nav = document.querySelector(".nav");
    if (nav) nav.classList.remove("open");
    var togg = document.querySelector(".nav-toggle");
    if (togg) togg.setAttribute("aria-expanded", "false");
  }

  // Lenis smooth scroll (damped inertia) — progressive enhancement, fails silent
  function initLenis() {
    if (!window.Lenis) return;
    var lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var ai = 0; ai < anchors.length; ai++) {
      (function (a) {
        a.addEventListener("click", function (e) {
          var id = a.getAttribute("href");
          if (id && id.length > 1) {
            var target = document.querySelector(id);
            if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -80 }); }
          }
        });
      })(anchors[ai]);
    }
  }
  function loadLenis() {
    if (window.Lenis) { initLenis(); return; }
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js";
    s.onload = initLenis;
    s.onerror = function () { /* smooth scroll unavailable */ };
    document.head.appendChild(s);
  }

  // Floating WhatsApp button (injected on every page)
  function injectWhatsApp() {
    if (document.querySelector(".wa-float")) return;
    var a = document.createElement("a");
    a.className = "wa-float";
    a.href = "https://wa.me/8618606051302";
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "WhatsApp");
    a.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(a);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(lang);
    loadLenis();
    injectWhatsApp();

    // Language switcher
    var langBtn = document.querySelector(".lang-btn");
    var langMenu = document.querySelector(".lang-menu");
    if (langBtn && langMenu) {
      langBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        langMenu.classList.toggle("open");
      });
      var opts = langMenu.querySelectorAll("button[data-lang]");
      for (var i = 0; i < opts.length; i++) {
        opts[i].addEventListener("click", function () { applyLang(this.getAttribute("data-lang")); });
      }
      document.addEventListener("click", function (e) {
        if (!langMenu.contains(e.target)) langMenu.classList.remove("open");
      });
    }

    // Mobile nav toggle
    var navToggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (navToggle && nav) {
      navToggle.addEventListener("click", function () {
        nav.classList.toggle("open");
        var open = nav.classList.contains("open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      var links = nav.querySelectorAll("a");
      for (var l = 0; l < links.length; l++) {
        links[l].addEventListener("click", closeMenu);
      }
    }

    // Click-to-play video (cover + play button, load mp4 on demand)
    var videoWraps = document.querySelectorAll(".video-wrap");
    for (var vw = 0; vw < videoWraps.length; vw++) {
      (function (wrap) {
        var trigger = wrap.querySelector(".v-play, .v-poster");
        var video = wrap.querySelector("video");
        if (!trigger || !video) return;
        function start() {
          wrap.classList.add("playing");
          video.load();
          var p = video.play();
          if (p && p.catch) p.catch(function () { /* autoplay fallback */ });
        }
        trigger.addEventListener("click", start);
        trigger.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); start(); }
        });
        video.addEventListener("pause", function () {
          if (video.ended) { wrap.classList.remove("playing"); }
        });
      })(videoWraps[vw]);
    }

    // Product filter tabs (homepage)
    var filterTabs = document.querySelectorAll(".filter-tab");
    var productCards = document.querySelectorAll(".product-card[data-cat]");
    if (filterTabs.length && productCards.length) {
      for (var ft = 0; ft < filterTabs.length; ft++) {
        filterTabs[ft].addEventListener("click", function () {
          var f = this.getAttribute("data-filter");
          for (var t = 0; t < filterTabs.length; t++) {
            filterTabs[t].classList.toggle("active", filterTabs[t] === this);
          }
          for (var pc = 0; pc < productCards.length; pc++) {
            var show = f === "all" || productCards[pc].getAttribute("data-cat") === f;
            productCards[pc].style.display = show ? "" : "none";
          }
        });
      }
    }

    // FAQ accordion
    var faqItems = document.querySelectorAll(".faq-item");
    for (var f = 0; f < faqItems.length; f++) {
      (function (item) {
        var q = item.querySelector(".faq-q");
        var a = item.querySelector(".faq-a");
        if (!q || !a) return;
        q.addEventListener("click", function () {
          var isOpen = item.classList.contains("open");
          for (var x = 0; x < faqItems.length; x++) {
            faqItems[x].classList.remove("open");
            faqItems[x].querySelector(".faq-a").style.maxHeight = "0";
          }
          if (!isOpen) {
            item.classList.add("open");
            a.style.maxHeight = a.scrollHeight + "px";
          }
        });
      })(faqItems[f]);
    }

    // Reveal on scroll — damped fade-up, progressive enhancement.
    // Elements are visible by default; we only add the hidden state when IO
    // is available, so a JS/IO failure can never produce blank content.
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      for (var r = 0; r < reveals.length; r++) reveals[r].classList.add("reveal-pre");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }

    // Contact form — submits to lianfafire@163.com via FormSubmit (no backend)
    var form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var sent = document.getElementById("formSent");
        var data = new FormData(form);
        var name = document.getElementById("cf_name").value.trim() || "website visitor";
        var email = document.getElementById("cf_email").value.trim();
        data.append("_subject", "New inquiry from " + name + " — DONGSHENG website");
        data.append("_captcha", "false");
        data.append("_template", "table");
        if (email) data.append("_replyto", email);
        if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
        fetch("https://formsubmit.co/ajax/lianfafire@163.com", {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        })
        .then(function (r) {
          if (!r.ok) throw new Error("submit failed");
          return r.json();
        })
        .then(function () {
          if (sent) sent.style.display = "block";
          form.reset();
        })
        .catch(function () {
          if (sent) {
            sent.textContent = "Sending failed. Please email us directly: lianfafire@163.com";
            sent.style.display = "block";
          }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = "Send Inquiry"; }
        });
      });
    }
  });
})();
