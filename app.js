(() => {
  "use strict";
  const CFG = window.LUNARIA_CONFIG || {};
  const CATS = window.CATEGORIES || [];
  const PRODUCTS = window.PRODUCTS || [];
  const IMG = "assets/img/";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const PRICE_PLACEHOLDER = "Επικοινωνήστε μαζί μας";
  const priceHtml = (p) => (typeof p.price === "number" ? `<span class="price">από ${p.price.toLocaleString("el-GR")} €</span>` : `<a class="price price-ask" href="#order">${PRICE_PLACEHOLDER}</a>`);

  /* ---------- storage (best-effort) ---------- */
  const store = {
    get() { try { return JSON.parse(localStorage.getItem("lunaria-cart") || "[]"); } catch { return []; } },
    set(v) { try { localStorage.setItem("lunaria-cart", JSON.stringify(v)); } catch { /* ignore */ } }
  };
  let cart = store.get().filter((i) => byId[i.id]);

  /* ---------- toast ---------- */
  const toastEl = $("[data-toast]");
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("show"), 2400);
  }

  /* ---------- links / contact ---------- */
  $$("[data-ig-link]").forEach((a) => (a.href = CFG.instagram));
  $$("[data-tt-link]").forEach((a) => (a.href = CFG.tiktok));
  $("[data-year]").textContent = new Date().getFullYear();
  const contact = $("[data-contact]");
  const contactItems = [];
  if (CFG.email) contactItems.push(`<li><a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a></li>`);
  if (CFG.phone) contactItems.push(`<li><a href="tel:${esc(CFG.phone.replace(/\s/g, ""))}">${esc(CFG.phone)}</a></li>`);
  contactItems.push(`<li><a href="https://ig.me/m/${esc(igHandle())}" target="_blank" rel="noopener">Μήνυμα στο Instagram</a></li>`);
  if (CFG.location) contactItems.push(`<li class="muted">${esc(CFG.location)}</li>`);
  contactItems.push(`<li><a href="#order">Φόρμα παραγγελίας</a></li>`);
  contact.innerHTML = contactItems.join("");

  function igHandle() {
    const m = (CFG.instagram || "").match(/instagram\.com\/([^/?#]+)/);
    return m ? m[1] : "lunariacandles_gr";
  }

  /* ---------- filters + grid ---------- */
  const filtersEl = $("[data-filters]");
  const gridEl = $("[data-grid]");
  const blurbEl = document.createElement("p");
  blurbEl.className = "cat-blurb";
  filtersEl.after(blurbEl);

  const allCats = [{ id: "all", name: "Όλα", blurb: "Όλα τα κεριά μας, χειροποίητα από 100% κερί σόγιας." }, ...CATS.filter((c) => PRODUCTS.some((p) => p.category === c.id))];
  filtersEl.innerHTML = allCats
    .map((c, i) => `<button class="chip" role="tab" aria-selected="${i === 0}" data-cat="${esc(c.id)}">${esc(c.name)}</button>`)
    .join("");

  function renderGrid(cat) {
    const list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    blurbEl.textContent = (allCats.find((c) => c.id === cat) || {}).blurb || "";
    gridEl.innerHTML = list
      .map(
        (p) => `
      <article class="card reveal" data-id="${esc(p.id)}">
        <div class="card-media">
          <img src="${IMG + esc(p.image)}" alt="${esc(p.name)}, Lunaria Candles" loading="lazy" width="720" height="900">
          ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
        </div>
        <div class="card-body">
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.description)}</p>
          ${priceHtml(p)}
          ${
            p.options && p.options.length
              ? `<select aria-label="Επιλογή για ${esc(p.name)}" data-option>${p.options.map((o) => `<option>${esc(o)}</option>`).join("")}</select>`
              : ""
          }
          <button class="btn btn-gold" type="button" data-add>Πρόσθεσε στην παραγγελία</button>
        </div>
      </article>`
      )
      .join("");
    observeReveal();
  }

  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    $$(".chip", filtersEl).forEach((c) => c.setAttribute("aria-selected", c === b));
    renderGrid(b.dataset.cat);
  });

  gridEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const card = btn.closest(".card");
    const id = card.dataset.id;
    const sel = $("[data-option]", card);
    addToCart(id, sel ? sel.value : "");
    btn.classList.add("added");
    btn.textContent = "✓ Προστέθηκε";
    setTimeout(() => { btn.classList.remove("added"); btn.textContent = "Πρόσθεσε στην παραγγελία"; }, 1600);
  });

  /* ---------- cart ---------- */
  const listEl = $("[data-cart-list]");
  const emptyEl = $("[data-cart-empty]");
  const pill = $(".order-pill");

  function addToCart(id, option) {
    const found = cart.find((i) => i.id === id && i.option === option);
    if (found) found.qty += 1;
    else cart.push({ id, option, qty: 1 });
    saveCart();
    pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump");
    toast(`${byId[id].name}${option ? " · " + option : ""} προστέθηκε`);
  }
  function saveCart() { store.set(cart); renderCart(); }
  function renderCart() {
    const total = cart.reduce((n, i) => n + i.qty, 0);
    $$("[data-cart-count]").forEach((el) => (el.textContent = total));
    emptyEl.hidden = cart.length > 0;
    listEl.innerHTML = cart
      .map((i, idx) => {
        const p = byId[i.id];
        return `<li class="cart-item">
          <img src="${IMG + esc(p.image)}" alt="">
          <div><strong>${esc(p.name)}</strong>${i.option ? `<small>${esc(i.option)}</small>` : ""}</div>
          <div class="qty" data-idx="${idx}">
            <button type="button" data-dec aria-label="Λιγότερα">−</button>
            <span>${i.qty}</span>
            <button type="button" data-inc aria-label="Περισσότερα">+</button>
          </div>
        </li>`;
      })
      .join("");
  }
  listEl.addEventListener("click", (e) => {
    const q = e.target.closest(".qty");
    if (!q) return;
    const i = cart[+q.dataset.idx];
    if (e.target.closest("[data-inc]")) i.qty += 1;
    else if (e.target.closest("[data-dec]")) i.qty -= 1;
    cart = cart.filter((x) => x.qty > 0);
    saveCart();
  });

  /* ---------- gallery ---------- */
  $("[data-gallery]").innerHTML = (window.GALLERY || [])
    .map((f) => `<a class="reveal" href="${esc(CFG.instagram)}" target="_blank" rel="noopener"><img src="${IMG + esc(f)}" alt="Κερί Lunaria Candles" loading="lazy"></a>`)
    .join("");

  /* ---------- form ---------- */
  const form = $("[data-form]");
  const status = $("[data-status]");
  const submitBtn = $("[data-submit]");
  const addrRow = $("[data-address]");
  const F = (n) => form.elements.namedItem(n);

  form.addEventListener("change", (e) => {
    if (e.target.name === "delivery") addrRow.hidden = e.target.value === "Παραλαβή";
  });

  function orderText(d) {
    const lines = cart.map((i) => `• ${byId[i.id].name}${i.option ? " (" + i.option + ")" : ""} × ${i.qty}`);
    return [
      "Νέο αίτημα από το site Lunaria Candles",
      "",
      "Προϊόντα:",
      lines.length ? lines.join("\n") : "(κανένα, γενικό αίτημα)",
      "",
      `Όνομα: ${d.name}`,
      `Τηλέφωνο: ${d.phone}`,
      d.email ? `Email: ${d.email}` : null,
      `Παράδοση: ${d.delivery}`,
      d.address && d.delivery !== "Παραλαβή" ? `Διεύθυνση: ${d.address}` : null,
      d.date ? `Ημερομηνία: ${d.date}` : null,
      d.message ? `\nΣημειώσεις:\n${d.message}` : null
    ].filter((l) => l !== null).join("\n");
  }

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = "form-status " + (kind || "");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    if (d.botcheck) return; // spam
    $$(".invalid", form).forEach((el) => el.classList.remove("invalid"));
    const bad = [];
    if (!d.name || !d.name.trim()) bad.push(F("name"));
    if (!d.phone || d.phone.replace(/\D/g, "").length < 10) bad.push(F("phone"));
    if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) bad.push(F("email"));
    if (!F("consent").checked) bad.push(F("consent"));
    if (bad.length) {
      bad.forEach((el) => el.classList.add("invalid"));
      bad[0].focus();
      setStatus("Συμπλήρωσε σωστά τα πεδία με * και αποδέξου την επικοινωνία.", "err");
      return;
    }
    if (!cart.length && !(d.message || "").trim()) {
      F("message").classList.add("invalid");
      F("message").focus();
      setStatus("Πρόσθεσε κάποιο προϊόν ή γράψε μας τι θα ήθελες.", "err");
      return;
    }

    const text = orderText(d);
    const subject = `Αίτημα παραγγελίας: ${d.name}`;

    // 1) Web3Forms (αν έχει οριστεί κλειδί)
    if (CFG.web3formsKey) {
      submitBtn.disabled = true;
      setStatus("Αποστολή…");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: CFG.web3formsKey,
            subject,
            from_name: "Lunaria Candles · Website",
            name: d.name,
            phone: d.phone,
            email: d.email || undefined,
            replyto: d.email || undefined,
            message: text
          })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === false) throw new Error(json.message || res.status);
        setStatus("Ευχαριστούμε! Λάβαμε το αίτημά σου και θα επικοινωνήσουμε σύντομα μαζί σου. 🕯️", "ok");
        form.reset(); addrRow.hidden = false;
        cart = []; saveCart();
      } catch (err) {
        setStatus("Κάτι πήγε στραβά με την αποστολή. Δοκίμασε ξανά ή στείλε μας μήνυμα στο Instagram.", "err");
      } finally {
        submitBtn.disabled = false;
      }
      return;
    }

    // 2) mailto (αν υπάρχει email)
    if (CFG.email) {
      location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      setStatus("Άνοιξε το πρόγραμμα email σου με έτοιμο το μήνυμα. Πάτα «Αποστολή» για να ολοκληρωθεί.", "ok");
      return;
    }

    // 3) Instagram DM: αντιγραφή κειμένου + άνοιγμα συνομιλίας
    let copied = false;
    try { await navigator.clipboard.writeText(text); copied = true; } catch { /* ignore */ }
    window.open(`https://ig.me/m/${igHandle()}`, "_blank", "noopener");
    setStatus(
      copied
        ? "Το μήνυμα αντιγράφηκε! Κάνε επικόλληση στη συνομιλία Instagram που άνοιξε και στείλ' το."
        : "Άνοιξε η συνομιλία στο Instagram. Γράψε μας εκεί τι θα ήθελες.",
      "ok"
    );
  });

  /* ---------- reveal on scroll ---------- */
  let io;
  function observeReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    io = io || new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -40px 0px" });
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }

  renderGrid("all");
  renderCart();
  observeReveal();
})();
