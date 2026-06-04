/* =====================================================================
   SOLUTION TEAM — site scripts
   1) Mobile nav toggle
   2) Scroll-reveal animations
   3) Contact form validation (the only dynamic feature)
   ===================================================================== */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Mobile navigation ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close the menu when a link is tapped
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  /* ---------- 2. Scroll-reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // small stagger for groups
          const delay = entry.target.dataset.delay || 0;
          setTimeout(function () { entry.target.classList.add("in"); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 3. Contact form validation ---------- */
  // Works on the homepage "Get in touch" form AND the Contact page form.
  document.querySelectorAll("form[data-contact]").forEach(initContactForm);

  function initContactForm(form) {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("[data-validate]").forEach(function (input) {
        const field = input.closest(".field");
        const rule = input.dataset.validate;
        const val = input.value.trim();
        let ok = true;

        if (rule === "required") ok = val.length > 0;
        if (rule === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (rule === "phone") ok = val === "" || /^[0-9+()\-\s]{7,}$/.test(val); // optional

        field.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });

      if (status) { status.textContent = ""; status.classList.remove("ok"); }

      if (valid) {
        // ---- Static site: no server. Show a success message. ----
        // To actually receive messages, point the form at a service like
        // Formspree: set the <form action="https://formspree.io/f/XXXX" method="POST">
        // and remove the e.preventDefault() above (or submit via fetch).
        if (status) {
          status.textContent = "Thanks! Your message has been received. We'll be in touch shortly.";
          status.classList.add("ok");
        }
        form.reset();
      }
    });

    // clear the error state as the user fixes a field
    form.querySelectorAll("[data-validate]").forEach(function (input) {
      input.addEventListener("input", function () {
        input.closest(".field").classList.remove("invalid");
      });
    });
  }

  /* ---------- footer year ---------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
