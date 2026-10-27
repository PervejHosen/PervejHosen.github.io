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

function toast(msg) {
  let t = $("#toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2600);
}

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
  a.href = "#"; a.classList.add("copy-email"); a.addEventListener("click", e => e.preventDefault());
});
if (CONFIG.location && $("#locLine")) $("#locLine").textContent = CONFIG.location;
$("#heroSocials").innerHTML = Object.keys(L).filter(k => L[k]).map(k => k === "email"
  // the email icon here only copies the address (no new tab, no mail app)
  ? `<button type="button" class="copy-email" aria-label="Copy email address" title="Copy ${esc(L.email)}">${ICONS.email}</button>`
  : `<a href="${esc(L[k])}" target="_blank" rel="noopener" aria-label="${k}">${ICONS[k] || ""}</a>`).join("");
function copyEmail() {
  const done = () => toast("Email copied: " + L.email);
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(L.email).then(done).catch(() => toast(L.email));
  else {   // older browsers
    const t = document.createElement("textarea"); t.value = L.email; t.style.position = "fixed"; t.style.opacity = "0";
    document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); done(); } catch { toast(L.email); }
    t.remove();
  }
}
// every email button on the page only copies the address (no new tab, no mail app, no login)
document.addEventListener("click", e => { if (e.target.closest(".copy-email")) copyEmail(); });

(function photos() {
  const el = $("#photo"), dots = $("#photoDots");
  const list = CONFIG.photos || (CONFIG.photo ? [CONFIG.photo] : []);
  const fallback = () => { el.innerHTML = `<span class="initials grad-text">${initials(CONFIG.name)}</span>`; };
  if (!list.length) return fallback();

  // load every listed photo; keep the ones that exist, in the listed order
  Promise.all(list.map(src => new Promise(res => {
    const img = new Image();
    img.onload = () => res(img); img.onerror = () => res(null);
    img.src = src; img.alt = CONFIG.name;
  }))).then(imgs => {
    const ok = imgs.filter(Boolean);
    if (!ok.length) return fallback();
    ok.forEach((img, i) => { img.className = i ? "" : "on"; el.appendChild(img); });
    if (ok.length < 2) return;                       // one photo: nothing to cycle

    let cur = 0;
    dots.innerHTML = ok.map((_, i) => `<span class="${i ? "" : "on"}"></span>`).join("");
    const ring = el.closest(".photo-ring");
    ring.classList.add("can-cycle");
    ring.setAttribute("role", "button");
    ring.setAttribute("tabindex", "0");
    ring.setAttribute("aria-label", "Show another photo");
    const next = () => {
      ok[cur].classList.remove("on"); dots.children[cur].classList.remove("on");
      cur = (cur + 1) % ok.length;
      ok[cur].classList.add("on"); dots.children[cur].classList.add("on");
      
    };
    // change by itself every few seconds; a click jumps ahead and restarts the timer
    const EVERY = 1000;   // milliseconds between photos
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = null, hovering = false;
    const start = () => { if (!still && !hovering && !document.hidden) { clearInterval(timer); timer = setInterval(next, EVERY); } };
    const stop = () => { clearInterval(timer); timer = null; };
    ring.addEventListener("click", () => { next(); start(); });
    ring.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); start(); } });
    ring.addEventListener("mouseenter", () => { hovering = true; stop(); });     // hold still while someone looks
    ring.addEventListener("mouseleave", () => { hovering = false; start(); });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    start();
  });
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
const chev = '<svg class="cc-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
$("#ccRows").innerHTML = (CONFIG.careerChart || []).map((r, i) => {
  const hl = (r.highlights || []).filter(Boolean), open = hl.length > 0;
  return `
  <li class="cc-row${open ? " has-more" : ""}" style="transition-delay:${i * 80}ms"${open ? ` tabindex="0" role="button" aria-expanded="false" aria-controls="cc-more-${i}"` : ""}>
    <div class="cc-who"><b>${esc(r.role)}${open ? chev : ""}</b><span>${esc(r.where)}</span></div>
    <span class="cc-pill">${esc(r.industry)}</span>
    ${open ? `<div class="cc-more" id="cc-more-${i}"><ul>${hl.map(h => `<li>${esc(h)}</li>`).join("")}</ul></div>` : ""}
  </li>`;
}).join("");
if ($("#ccRows .has-more")) $("#careerChart .cc-title").insertAdjacentHTML("afterend", '<p class="cc-hint">Tap a role to see highlights</p>');
$("#ccRows").addEventListener("transitionend", e => { if (e.target.classList.contains("cc-row")) e.target.style.transitionDelay = "0s"; });
$("#ccRows").addEventListener("click", e => {
  const row = e.target.closest(".has-more"); if (!row) return;
  const on = row.classList.toggle("open"); row.setAttribute("aria-expanded", on);
});
$("#ccRows").addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("has-more")) { e.preventDefault(); e.target.click(); }
});
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
    <img src="${(typeof ICON_DATA !== "undefined" && ICON_DATA[t.icon]) || "assets/img/icons/" + esc(t.icon)}" alt="" width="40" height="40">
    <span>${esc(t.name)}</span>
  </div>`).join("");

/* ---------- education ---------- */
(function education() {
  const cap = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 9v6"/></svg>';
  const folder = $("#certFolder");
  if (CONFIG.certificatesFolder) folder.href = CONFIG.certificatesFolder; else folder.remove();
  $("#eduGrid").innerHTML = (CONFIG.education || []).map((e, i) => `
    <article class="edu reveal" style="transition-delay:${i * 90}ms">
      <span class="edu-icon">${cap}</span>
      <div class="edu-main">
        <h4>${esc(e.degree)}</h4>
        <p>${esc(e.school)}</p>
        ${e.meta ? `<div class="edu-meta"><span>${esc(e.meta)}</span></div>` : ""}
        ${e.link ? `<a class="edu-link" href="${esc(e.link)}" target="_blank" rel="noopener">View certificate <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>` : ""}
      </div>
    </article>`).join("");
})();

/* ---------- training ---------- */
(function training() {
  const box = $("#trainGrid"), list = CONFIG.training || [];
  if (!box) return;
  if (!list.length) { box.remove(); $("#trainTitle")?.remove(); return; }
  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v11H3zM8 20h8M12 16v4M7 12l3-3 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  box.innerHTML = list.map(t => `
    <article class="train reveal">
      <span class="train-icon">${icon}</span>
      <div class="train-main">
        <h4>${esc(t.title)}</h4>
        <p class="cert-meta">${[t.by, t.year].filter(Boolean).map(esc).join(" · ")}</p>
        ${t.summary ? `<p class="train-sum">${esc(t.summary)}</p>` : ""}
        ${t.topics ? `<div class="train-tags">${t.topics.map(x => `<span>${esc(x)}</span>`).join("")}</div>` : ""}
      </div>
    </article>`).join("");
})();

/* ---------- certifications ---------- */
(function certs() {
  const logo = c => c.logo && typeof ICON_DATA !== "undefined" && ICON_DATA[c.logo]
    ? `<img src="${ICON_DATA[c.logo]}" alt="" width="28" height="28" data-logo="${esc(c.logo.replace(/\..*$/, ""))}">`
    : `<span class="cert-mono" style="background:${c.monoColor || "#0f172a"}">${esc(c.mono || c.issuer.slice(0, 2))}</span>`;
  const arrow = '<svg class="cert-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const f = CONFIG.featuredCert, fe = $("#certFeatured");
  if (f && fe) {
    const active = !f.expires || new Date() <= new Date(f.expires + "T23:59:59");
    fe.href = f.link;
    fe.innerHTML = `
      <span class="cert-logo big">${logo(f)}</span>
      <span class="cert-main">
        <small>${esc(f.code || f.issuer)}</small>
        <b>${esc(f.title)}</b>
        <span class="cert-meta">${[f.earned && "Earned " + f.earned, f.renewed && "Renewed " + f.renewed].filter(Boolean).map(esc).join(" · ")}</span>
      </span>
      <span class="cert-side">
        ${active && f.expires ? `<span class="cert-active">Active${f.expiresLabel ? " · until " + esc(f.expiresLabel) : ""}</span>` : ""}
        <span class="cert-verify">Verify ${arrow}</span>
      </span>`;
  } else if (fe) fe.remove();
  $("#certGrid").innerHTML = (CONFIG.certifications || []).map((c, i) => `
    <a class="cert reveal" href="${esc(c.link)}" target="_blank" rel="noopener" style="transition-delay:${(i % 3) * 70}ms">
      <span class="cert-logo">${logo(c)}</span>
      <span class="cert-main"><b>${esc(c.title)}</b><span class="cert-meta">${esc(c.issuer)}${c.date ? " · " + esc(c.date) : ""}</span></span>
      ${arrow}
    </a>`).join("");
})();

/* ---------- photography ---------- */
(function photography() {
  const photos = CONFIG.gallery || [];
  if (!photos.length) {
    $("#photography").remove();
    document.querySelector('a[href="#photography"]')?.parentElement.remove();
    return;
  }
  $("#phSub").textContent = CONFIG.photographySubtitle;
  if (CONFIG.photographyMore) $("#phMore").href = CONFIG.photographyMore;
  else $("#phMoreWrap").remove();

  // filter buttons from the categories you used
  const cats = ["All", ...new Set(photos.map(p => p.category).filter(Boolean))];
  $("#phFilters").innerHTML = cats.length > 2
    ? cats.map((c, i) => `<button class="ph-filter${i ? "" : " on"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")
    : "";

  const RATIOS = ["4/5", "3/2", "1/1", "2/3", "4/3", "3/4"];
  const camIcon = '<svg viewBox="0 0 24 24"><path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3H9zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>';
  const placeholder = (p, i) => {
    const [a, b] = PALETTE[i % PALETTE.length];
    return `<div class="ph-ph" style="aspect-ratio:${RATIOS[i % RATIOS.length]};background:linear-gradient(150deg,${a}55,${b}33 55%,#121a33)"><div>${camIcon}${esc(p.title || "Photo")}</div></div>`;
  };
  const caption = p => esc([p.place, p.category].filter(Boolean).join(" · "));

  const g = $("#gallery");
  g.innerHTML = photos.map((p, i) => `
    <figure class="ph reveal" tabindex="0" data-i="${i}" data-cat="${esc(p.category)}">
      <img src="${esc(p.src)}" alt="${esc(p.title || "Photograph")}${p.place ? " — " + esc(p.place) : ""}" loading="lazy">
      <figcaption><b>${esc(p.title)}</b><span>${caption(p)}</span></figcaption>
    </figure>`).join("");

  // show a placeholder for any photo file that isn't uploaded yet
  g.querySelectorAll(".ph img").forEach(img => img.addEventListener("error", () => {
    const fig = img.closest(".ph");
    fig.dataset.missing = "1";
    img.outerHTML = placeholder(photos[+fig.dataset.i], +fig.dataset.i);
  }));

  // show the first few; the rest appear with "Show all" (or when a filter is picked)
  // phones and tablets show the first few; wide screens show everything
  const LIMIT = matchMedia("(max-width: 900px)").matches ? (CONFIG.galleryShow || photos.length) : photos.length;
  let expanded = photos.length <= LIMIT, cat = "All";
  const allBtn = document.createElement("div");
  allBtn.className = "more-wrap";
  allBtn.innerHTML = `<button class="btn btn-outline" type="button">Show all ${photos.length} photos</button>`;
  g.after(allBtn);
  const apply = () => {
    g.querySelectorAll(".ph").forEach(f => {
      const out = cat !== "All" ? f.dataset.cat !== cat : (!expanded && +f.dataset.i >= LIMIT);
      f.classList.toggle("hide", out);
      if (!out) f.classList.add("in");
    });
    allBtn.hidden = expanded || cat !== "All";
  };
  allBtn.querySelector("button").addEventListener("click", () => { expanded = true; apply(); });
  apply();

  $("#phFilters").addEventListener("click", e => {
    const btn = e.target.closest(".ph-filter");
    if (!btn) return;
    document.querySelectorAll(".ph-filter").forEach(x => x.classList.toggle("on", x === btn));
    cat = btn.dataset.cat; apply();
  });

  // full-screen viewer
  const lb = $("#lightbox");
  let cur = 0, list = [];
  const show = () => {
    const p = photos[list[cur]];
    $("#lbImg").src = p.src;
    $("#lbImg").alt = p.title || "Photograph";
    $("#lbCap").innerHTML = `<b>${esc(p.title)}</b><span>${caption(p)}</span>`;
    $("#lbCount").textContent = `${cur + 1} / ${list.length}`;
  };
  const open = i => {
    list = [...g.querySelectorAll(".ph:not(.hide):not([data-missing])")].map(f => +f.dataset.i);
    cur = list.indexOf(i);
    if (cur < 0) return;
    show();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  const step = d => { cur = (cur + d + list.length) % list.length; show(); };

  g.addEventListener("click", e => { const f = e.target.closest(".ph"); if (f) open(+f.dataset.i); });
  g.addEventListener("keydown", e => {
    const f = e.target.closest(".ph");
    if (f && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(+f.dataset.i); }
  });
  $("#lbClose").onclick = close;
  $("#lbPrev").onclick = () => step(-1);
  $("#lbNext").onclick = () => step(1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
  let x0 = null;   // swipe on phones
  lb.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  lb.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
})();

/* ---------- contact ---------- */
const LINK_LABELS = { email: "Email", linkedin: "LinkedIn", github: "GitHub", kaggle: "Kaggle" };
$("#contactList").innerHTML = Object.keys(L).filter(k => L[k]).map(k => {
  const value = k === "email" ? L.email : L[k].replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const inner = `<span class="cc-icon">${ICONS[k] || ""}</span>
    <span class="cc-text"><small>${LINK_LABELS[k] || k}</small><b>${esc(value)}</b></span>`;
  if (k === "email") return `<button type="button" class="contact-card copy-email" title="Copy email address">${inner}
    <svg class="cc-arrow cc-copy" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  </button>`;
  return `<a class="contact-card" href="${esc(L[k])}" target="_blank" rel="noopener">${inner}
    <svg class="cc-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>`;
}).join("");

$("#contactForm").addEventListener("submit", async ev => {
  ev.preventDefault();
  const f = ev.target, status = $("#formStatus"), btn = f.querySelector("button[type=submit]");
  if (f._gotcha && f._gotcha.value) return;   // spam bot filled the hidden field
  const data = {
    name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim(),
    _subject: "Portfolio message from " + f.name.value.trim(), _replyto: f.email.value.trim(), _template: "table", _captcha: "false"
  };
  status.className = "form-status"; status.textContent = "Sending…"; btn.disabled = true;
  try {
    const useKey = !!CONFIG.formKey;
    if (!useKey && !CONFIG.formEndpoint) throw new Error("no endpoint");
    const payload = useKey
      ? { access_key: CONFIG.formKey, subject: data._subject, from_name: data.name, name: data.name, email: data.email, message: data.message }
      : data;
    const r = await fetch(useKey ? "https://api.web3forms.com/submit" : CONFIG.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.success === false || j.success === "false") throw new Error(j.message || r.status);
    f.reset();
    status.className = "form-status ok";
    status.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
  } catch {
    status.className = "form-status err";
    status.innerHTML = `Couldn't send right now. Please email me at <a href="mailto:${esc(L.email)}">${esc(L.email)}</a>.`;
  } finally { btn.disabled = false; }
});

/* ---------- footer ---------- */
$("#footer").innerHTML = `© ${new Date().getFullYear()} ${esc(CONFIG.name)}. All rights reserved.`;

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
