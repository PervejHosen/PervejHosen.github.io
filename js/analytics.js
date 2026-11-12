/* =========================================================
   Visitor analytics: Google Analytics 4 + Microsoft Clarity.
   Loads on every page visit (no cookie notice). Paste your two IDs below.
   Leave both empty to switch analytics off.
   ========================================================= */
(() => {
  const GA4_ID = "G-2X9JPMPRP8";     // Google Analytics 4 measurement ID, e.g. "G-AB12CD34EF"
  const CLARITY_ID = "";   // Microsoft Clarity project ID, e.g. "k3x9abcd12"

  window.track = () => {};                 // safe to call even when analytics is off
  if (!GA4_ID && !CLARITY_ID) return;

  let loaded = false;
  function load() {
    if (loaded) return; loaded = true;
    if (GA4_ID) {
      const s = document.createElement("script");
      s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", GA4_ID);
    }
    if (CLARITY_ID) {
      window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
      const s = document.createElement("script");
      s.async = true; s.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
      document.head.appendChild(s);
    }
    window.track = (name, params) => { if (window.gtag) window.gtag("event", name, params || {}); };
  }

  // ---------- the clicks worth counting (page views, scrolls and outbound links come free with GA4) ----------
  const text = el => (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  document.addEventListener("click", e => {
    const el = e.target.closest("a, button");
    if (!el) return;
    if (el.id === "resumeBtn") return window.track("resume_open");
    if (el.id === "hireBtn") return window.track("hire_me_click");
    if (el.classList.contains("copy-email")) return window.track("email_copy");
    const card = el.closest(".proj");
    if (card) return window.track("project_open", { project: text(card.querySelector("h3")), link: el.getAttribute("href") || "" });
    if (el.closest(".cert, .cert-featured")) return window.track("certificate_open", { certificate: text(el.querySelector("b") || el) });
    if (el.closest(".top-bar, footer") && el.classList.contains("gh")) return window.track("github_code_open", { page: location.pathname });
  });
  document.addEventListener("submit", e => { if (e.target.id === "contactForm") window.track("contact_form_submit"); });

  load();
})();
