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

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(lang);

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

    // Reveal on scroll
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("visible"); });
    }

    // Contact form (mailto fallback — no backend)
    var form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = document.getElementById("cf_name").value.trim();
        var email = document.getElementById("cf_email").value.trim();
        var msg = document.getElementById("cf_msg").value.trim();
        var subject = encodeURIComponent("[Inquiry] " + (document.getElementById("cf_product").value || "Fire Equipment"));
        var body = encodeURIComponent(
          "Name: " + name + "\n" +
          "Company: " + document.getElementById("cf_company").value + "\n" +
          "Email: " + email + "\n" +
          "Phone/WhatsApp: " + document.getElementById("cf_phone").value + "\n" +
          "Country: " + document.getElementById("cf_country").value + "\n" +
          "Product: " + document.getElementById("cf_product").value + "\n\n" +
          msg
        );
        var sent = document.getElementById("formSent");
        if (sent) sent.style.display = "block";
        window.location.href = "mailto:lianfafire@163.com?subject=" + subject + "&body=" + body;
        form.reset();
      });
    }
  });
})();
