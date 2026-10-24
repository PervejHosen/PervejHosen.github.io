/* =====================================================================
   main.js — builds the page from CONFIG (js/config.js).
   You shouldn't need to edit this file to change content.
   ===================================================================== */

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const initials = s => s.split(/\s+/).filter(w => /[A-Za-z]/.test(w[0])).slice(0, 2).map(w => w[0]).join("").toUpperCase();
const PALETTE = [["#f97316", "#ec4899"], ["#38bdf8", "#6366f1"], ["#22c55e", "#14b8a6"], ["#f59e0b", "#ef4444"], ["#a855f7", "#ec4899"], ["#06b6d4", "#3b82f6"]];

const ICONS = {
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/></svg>',
  kaggle: '<svg viewBox="0 0 24 24"><path d="M18.83 23.85c-.02.1-.12.15-.29.15h-3.08a.6.6 0 0 1-.52-.29l-5.08-6.46-1.42 1.35v5.03c0 .25-.12.37-.37.37H5.68c-.25 0-.37-.12-.37-.37V.37c0-.25.12-.37.37-.37h2.39c.25 0 .37.12.37.37V14.6l6.1-6.17a.6.6 0 0 1 .45-.21h3.18c.14 0 .23.06.27.17.05.13.04.22-.03.3l-6.45 6.24 6.74 8.53c.1.12.12.25.13.39z"/></svg>',
  email: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5-8-5V6l8 5 8-5v2.2z"/></svg>'
};
const L = CONFIG.links;
// Email opens a Gmail "new message" tab (every link opens in a new tab) and also copies the address
const gmailUrl = (subject = "") => "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(L.email) + (subject ? "&su=" + encodeURIComponent(subject) : "");
const linkHref = k => k === "email" ? gmailUrl("Hello from your portfolio") : L[k];
const linkAttrs = k => 'target="_blank" rel="noopener"' + (k === "email" ? " data-email" : "");

function toast(msg) {
  let t = $("#toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2600);
}
// any email link: copy the address too, for people who don't use Gmail
document.addEventListener("click", e => {
  if (!e.target.closest("[data-email]")) return;
  navigator.clipboard?.writeText(L.email).then(() => toast("Email copied: " + L.email)).catch(() => {});
});

/* ---------- hero ---------- */
$("#logo").textContent = CONFIG.logo;
$("#heroName").textContent = CONFIG.name;
$("#objective").textContent = CONFIG.objective;
$("#resumeBtn").href = CONFIG.resume;
// hide the résumé button until the PDF actually exists on the site
if (!CONFIG.resume) $("#resumeBtn").remove();
else fetch(CONFIG.resume, { method: "HEAD" }).then(r => { if (!r.ok) $("#resumeBtn")?.remove(); }).catch(() => {});
// until the Contact section exists, "Hire me" and "Let's talk" open an email (in a new tab) instead
if (!$("#contact")) ["#hireBtn", "#navCta"].forEach(s => {
  const a = $(s); if (!a) return;
  a.href = gmailUrl("Hiring enquiry"); a.target = "_blank"; a.rel = "noopener"; a.setAttribute("data-email", "");
});
if (CONFIG.location && $("#locLine")) $("#locLine").textContent = CONFIG.location;
$("#heroSocials").innerHTML = Object.keys(L).filter(k => L[k]).map(k =>
  `<a href="${esc(linkHref(k))}" ${linkAttrs(k)} aria-label="${k}">${ICONS[k] || ""}</a>`).join("");

(function photo() {
  const el = $("#photo");
  const fallback = () => el.innerHTML = `<span class="initials grad-text">${initials(CONFIG.name)}</span>`;
  if (!CONFIG.photo) return fallback();
  const img = new Image();
  img.alt = CONFIG.name;
  img.onerror = fallback;
  img.src = CONFIG.photo;
  el.appendChild(img);
})();

(function typing() {
  const el = $("#typed"), words = CONFIG.roles;
  // start with the first title fully shown (no half-typed word on arrival), then cycle
  let w = 0, i = words[0].length, deleting = true;   // next step: delete it, then type the next title
  el.textContent = words[0];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setTimeout(function tick() {
    const word = words[w];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let delay = deleting ? 45 : 95;
    if (!deleting && i === word.length) { deleting = true; delay = 1700; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
    setTimeout(tick, delay);
  }, 2600);
})();

/* ---------- about ---------- */
// years since your career start, e.g. "2022-08" → 4 in late 2026
const careerYears = (() => {
  const [y, mo] = (CONFIG.careerStart || "").split("-").map(Number);
  if (!y) return "";
  const now = new Date();
  return Math.floor(((now.getFullYear() - y) * 12 + (now.getMonth() + 1 - (mo || 1))) / 12);
})();
$("#aboutText").innerHTML = CONFIG.about.map(p => `<p>${p.replace(/\{years\}/g, careerYears)}</p>`).join("");
$("#ccRows").innerHTML = (CONFIG.careerChart || []).map((r, i) => `
  <li class="cc-row" style="transition-delay:${i * 80}ms">
    <div class="cc-who"><b>${esc(r.role)}${r.current ? ' <em class="cc-now">Current</em>' : ""}</b><span>${esc(r.where)}</span></div>
    <span class="cc-pill">${esc(r.industry)}</span>
  </li>`).join("");
$("#facts").innerHTML = CONFIG.facts.map(f =>
  `<div class="card fact"><b class="grad-text">${esc(f.n)}</b><span>${esc(f.l)}</span></div>`).join("");

/* ---------- skills ---------- */
$("#skillsIntro").textContent = CONFIG.skillsIntro;
$("#skillGroups").innerHTML = CONFIG.skillGroups.map(g => `
  <div class="skill-group">
    <h4>${esc(g.title)}</h4>
    <div class="chips">${g.items.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>
  </div>`).join("");
$("#tiles").innerHTML = CONFIG.tiles.map((t, i) => `
  <div class="tile" style="transition-delay:${(i % 3) * 60 + Math.floor(i / 3) * 40}ms">
    <img src="${(typeof ICON_DATA !== "undefined" && ICON_DATA[t.icon]) || "assets/icons/" + esc(t.icon)}" alt="" width="40" height="40">
    <span>${esc(t.name)}</span>
  </div>`).join("");

/* ---------- contact ---------- */
const LINK_LABELS = { email: "Email", linkedin: "LinkedIn", github: "GitHub", kaggle: "Kaggle" };
$("#contactList").innerHTML = Object.keys(L).filter(k => L[k]).map(k => {
  const value = k === "email" ? L.email : L[k].replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return `<a class="contact-card" href="${esc(linkHref(k))}" ${linkAttrs(k)}>
    <span class="cc-icon">${ICONS[k] || ""}</span>
    <span class="cc-text"><small>${LINK_LABELS[k] || k}</small><b>${esc(value)}</b></span>
    <svg class="cc-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>`;
}).join("");

$("#contactForm").addEventListener("submit", async ev => {
  ev.preventDefault();
  const f = ev.target, status = $("#formStatus");
  const data = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };

  if (!CONFIG.formspree) {   // no form service yet → open the visitor's email app
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.open(gmailUrl("Portfolio enquiry from " + data.name) + "&body=" + encodeURIComponent(body), "_blank", "noopener");
    status.textContent = "Opening a new email in a new tab…";
    return;
  }
  status.textContent = "Sending…";
  try {
    const r = await fetch(CONFIG.formspree, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error(r.status);
    f.reset();
    status.textContent = "Thanks! Your message has been sent.";
  } catch {
    status.textContent = "Couldn't send right now — please email " + L.email;
  }
});

/* ---------- footer ---------- */
$("#footer").innerHTML = `© ${new Date().getFullYear()} ${esc(CONFIG.name)} · Built with care in Dhaka`;

/* ---------- navigation ---------- */
const header = $("header"), menu = $("#menu");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });
$("#burger").addEventListener("click", () => menu.classList.toggle("open"));
menu.addEventListener("click", e => { if (e.target.tagName === "A") menu.classList.remove("open"); });

// highlight the menu link for the section on screen
const navLinks = [...menu.querySelectorAll("a")];
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => spy.observe(s));

/* ---------- fade-in on scroll ---------- */
const rv = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => rv.observe(el));
