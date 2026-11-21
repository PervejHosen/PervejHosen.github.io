/* =====================================================================
   Orbit: a 3D ring of cards (CSS 3D, no library), used by Projects and
   Photography. main.js builds each one from CONFIG and calls set(list)
   whenever a filter changes. Drag, swipe, arrows or keys to turn it.
   Cards sit a fixed angle apart, so a long list still reads cleanly:
   the ones far from the front simply fade out.
   ===================================================================== */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // opt: {cls, label, hint, width, widthPhone, step (degrees between cards), speed, card(item, i, ext) -> html, open(item, i, event)}
  function create(opt) {
    let root, stage, ring, dotsEl, list = [], pos = 0, target = 0, drag = null, idleFrom = 0, raf = 0, running = false, R = 0, W = 0;
    const n = () => list.length;
    const wrap = d => { const m = n(); return ((d % m) + m * 1.5) % m - m / 2; };     // shortest way round the ring
    const front = () => n() ? ((Math.round(target) % n()) + n()) % n() : 0;

    function mount(el) {
      root = el;
      root.classList.add("orbit", opt.cls || "orbit-x");
      root.innerHTML = `<div class="orb-stage" tabindex="0" aria-roledescription="carousel" aria-label="${esc(opt.label)}"><div class="orb-ring"></div></div>
        <div class="orb-ctl"><button type="button" class="orb-arrow" data-d="-1" aria-label="Previous">←</button><div class="orb-dots"></div><button type="button" class="orb-arrow" data-d="1" aria-label="Next">→</button></div>
        <p class="orb-hint">${esc(opt.hint || "Drag, swipe or use the arrows · click the front card to open it")}</p>`;
      stage = root.querySelector(".orb-stage"); ring = root.querySelector(".orb-ring"); dotsEl = root.querySelector(".orb-dots");
      root.querySelectorAll(".orb-arrow").forEach(b => b.onclick = () => goTo(Math.round(target) + +b.dataset.d));
      stage.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") goTo(Math.round(target) - 1);
        if (e.key === "ArrowRight") goTo(Math.round(target) + 1);
        if (e.key === "Enter") { const i = front(); if (list[i]) opt.open(list[i], i, e); }
      });
      stage.addEventListener("pointerdown", e => { drag = { x: e.clientX, t: target, moved: 0 }; stage.classList.add("drag"); idleFrom = Date.now(); });
      addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - drag.x; drag.moved = Math.max(drag.moved, Math.abs(dx)); target = drag.t - dx / (W * 0.55); idleFrom = Date.now(); });
      addEventListener("pointerup", () => {
        if (!drag) return;
        stage.classList.remove("drag"); const moved = drag.moved; drag = null; target = Math.round(target);
        if (moved > 6) { const blk = e => { e.stopPropagation(); e.preventDefault(); }; addEventListener("click", blk, { capture: true, once: true }); setTimeout(() => removeEventListener("click", blk, { capture: true }), 60); }
      });
      stage.addEventListener("wheel", e => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault(); target += e.deltaX / (W * 0.8); idleFrom = Date.now();
        clearTimeout(stage._w); stage._w = setTimeout(() => target = Math.round(target), 160);
      }, { passive: false });
      stage.addEventListener("mouseenter", () => idleFrom = Infinity);
      stage.addEventListener("mouseleave", () => idleFrom = Date.now());
      addEventListener("resize", () => { if (running) build(); });
    }
    function set(items) { list = items; if (running) build(); }
    function start() { running = true; build(); if (!raf) raf = requestAnimationFrame(frame); }
    function stop() { running = false; cancelAnimationFrame(raf); raf = 0; }
    function goTo(i) { idleFrom = Date.now(); target = Math.round(target) + wrap(i - Math.round(target)); }

    function build() {
      ring.innerHTML = ""; dotsEl.innerHTML = "";
      if (!n()) return;
      W = innerWidth < 640 ? (opt.widthPhone || 290) : (opt.width || 440);
      R = Math.min(innerWidth * 0.42, W * 1.15);
      list.forEach((item, i) => {
        const c = document.createElement("article");
        c.className = "orb-card";
        c.innerHTML = opt.card(item, i, ext);
        c.addEventListener("click", e => {
          if (!c.classList.contains("front")) { e.preventDefault(); goTo(i); return; }   // side card: bring it forward
          opt.open(item, i, e);                                                           // front card: open it
        });
        ring.appendChild(c);
        if (n() <= 16) { const d = document.createElement("button"); d.type = "button"; d.setAttribute("aria-label", item.title || "Item " + (i + 1)); d.onclick = () => goTo(i); dotsEl.appendChild(d); }
      });
      if (n() > 16) dotsEl.innerHTML = '<span class="orb-count"></span>';
      pos = target = 0; place();
    }
    function place() {
      const f = front(), step = Math.min(opt.step || 45, 360 / n()) * Math.PI / 180;
      [...ring.children].forEach((c, i) => {
        const d = wrap(i - pos), a = d * step, z = Math.cos(a), sx = Math.sin(a);
        const hidden = Math.abs(a) > Math.PI * 0.72;
        // floating screens: cards face you, turn a little toward the centre, rise and recede toward the back
        // each card carries its own perspective and the ring stays flat, so cards stack by z-index:
        // the front card is always fully on top (no neighbour cutting through it) and fully clickable
        const x = sx * R * 1.3, depth = (z - 1) * R * 1.1, y = (1 - z) * -45 + Math.sin(i * 1.7) * 12 * (1 - z);
        c.style.transform = `perspective(${opt.persp || 1700}px) translate3d(${x}px, ${y}px, ${depth}px) rotateY(${-sx * 30}deg) rotateZ(${-sx * 2}deg)`;
        c.style.opacity = hidden ? 0 : Math.max(0, Math.min(1, (z + 0.75) / 0.9)).toFixed(3);
        c.style.visibility = hidden ? "hidden" : "";
        c.style.pointerEvents = z < -0.4 ? "none" : "";
        c.style.filter = z > 0.97 ? "none" : `saturate(${0.5 + 0.25 * (z + 1)}) blur(${((1 - z) * 0.7).toFixed(2)}px)`;
        c.style.zIndex = Math.round((z + 1) * 50);
        c.classList.toggle("front", i === f && Math.abs(pos - target) < 0.5);
      });
      const cnt = dotsEl.querySelector(".orb-count");
      if (cnt) cnt.textContent = `${f + 1} / ${n()}`;
      else [...dotsEl.children].forEach((d, i) => d.classList.toggle("on", i === f));
    }
    function frame() {
      if (!running) return;
      if (!drag && !reduce && !document.hidden && Date.now() - idleFrom > 4000) target += 0.0012 * (opt.speed || 1);   // slow turn when idle
      pos += (target - pos) * (reduce ? 1 : 0.12);
      place(); raf = requestAnimationFrame(frame);
    }
    return { mount, set, start, stop };
  }

  window.Orbit = { create };   // used by main.js for Services

  // ---------- projects ----------
  window.ProjOrbit = create({
    cls: "orb-proj", label: "Projects", width: 360, widthPhone: 270, step: 30, speed: 1.2,
    card: (p, i, ext) => {
      const badge = p.badge || "Live" + (p.pages ? " · " + p.pages + " pages" : "");
      return `<img src="${esc((p.images || [])[0] || "")}" alt="${esc(p.title)}" loading="lazy" draggable="false">
        <div class="orb-body"><span class="proj-badge orb-badge"><i></i>${esc(badge)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
        <div class="orb-acts"><a class="btn btn-primary orb-btn" href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.cta || "Open live report")} ${ext}</a>
        ${p.extra ? `<a class="btn btn-outline orb-btn" href="${esc(p.extra.link)}" target="_blank" rel="noopener">${esc(p.extra.label)} ${ext}</a>` : ""}</div></div>`;
    },
    // anywhere on the front card opens the project, like the grid; its buttons keep their own links
    open: (p, i, e) => { if (!e.target.closest("a") && p.link) window.open(p.link, "_blank", "noopener"); }
  });

  // ---------- photography ----------
  // main.js sets PhotoOrbit.onOpen to the lightbox; clicking the front photo opens it
  const photo = create({
    cls: "orb-photo", label: "Photographs", hint: "Drag, swipe or use the arrows · click the front photo to view it full size",
    width: 320, widthPhone: 240, step: 34, speed: 1.4,
    card: p => `<img src="${esc(p.src)}" alt="${esc(p.title || "Photograph")}${p.place ? ", " + esc(p.place) : ""}" loading="lazy" draggable="false">
      <div class="orb-body"><h3>${esc(p.title)}</h3><span>${esc([p.place, p.category].filter(Boolean).join(" · "))}</span></div>`,
    open: (p, i, e) => window.PhotoOrbit.onOpen && window.PhotoOrbit.onOpen(p, i, e)
  });
  window.PhotoOrbit = Object.assign(photo, { onOpen: null });
})();
