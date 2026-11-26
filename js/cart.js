(() => {
  const CART_KEY = "jibCartItems";
  const defaultItem = {
    id: "61688",
    title: "KEYBOARD (คีย์บอร์ด) RAZER BLACKWIDOW V4 X (BLACK) (RAZER GREEN SWITCH - EN/TH)",
    image: "https://www.jib.co.th/img_master/product/medium/2023082916464961688_1.jpg?v=616881759206642",
    url: "product.html?id=61688",
    price: 3790,
    quantity: 1
  };

  const money = (value) => new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2
  }).format(value);

  const readCart = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY));
      if (Array.isArray(saved)) return saved;
    } catch (error) {
      console.warn("Unable to read cart", error);
    }
    const initial = [defaultItem];
    localStorage.setItem(CART_KEY, JSON.stringify(initial));
    return initial;
  };

  let items = readCart();

  const cartMarkup = `
    <div id="site-cart-backdrop" class="site-cart-backdrop" hidden></div>
    <aside id="site-cart-drawer" class="site-cart-drawer" aria-labelledby="site-cart-title" aria-hidden="true">
      <header class="site-cart-head">
        <img src="assets/images/icons/bag.svg" alt="">
        <strong id="site-cart-title"><span id="site-cart-count">0</span> ชิ้น</strong>
        <button class="site-cart-close" type="button" aria-label="ปิดตะกร้าสินค้า">×</button>
      </header>
      <div id="site-cart-items" class="site-cart-items"></div>
      <div class="site-cart-footer">
        <button id="site-cart-checkout" class="site-cart-checkout" type="button">สั่งซื้อ (<span id="site-cart-total">฿0.00</span>)</button>
        <a class="site-cart-view" href="cart.html">ดูสินค้าในตะกร้า</a>
      </div>
    </aside>`;

  document.body.insertAdjacentHTML("beforeend", cartMarkup);

  const drawer = document.getElementById("site-cart-drawer");
  const backdrop = document.getElementById("site-cart-backdrop");
  const itemsRoot = document.getElementById("site-cart-items");
  const countRoot = document.getElementById("site-cart-count");
  const totalRoot = document.getElementById("site-cart-total");
  const cartTriggers = [...document.querySelectorAll('[aria-label="Open shopping cart"], [aria-label="ตะกร้าสินค้า"]')];

  const totalQuantity = () => items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = () => items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const localProductUrl = (item) => {
    const route = window.JIBProductRoute?.toLocalProductUrl?.(item);
    if (route && route !== "product.html") return route;
    return `product.html?id=${encodeURIComponent(item.id)}`;
  };

  const saveCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent("jibcartchange", { detail: { items: [...items] } }));
  };

  const updateTriggerBadges = () => {
    const count = totalQuantity();
    cartTriggers.forEach((trigger) => {
      trigger.classList.add("site-cart-trigger");
      let badge = trigger.querySelector(".site-cart-trigger-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "site-cart-trigger-badge";
        trigger.appendChild(badge);
      }
      badge.textContent = String(count);
      badge.hidden = count === 0;
    });
  };

  const itemTemplate = (item) => `
    <article class="site-cart-item" data-cart-id="${item.id}">
      <div class="site-cart-quantity" aria-label="จำนวนสินค้า">
        <button type="button" data-cart-action="increase" aria-label="เพิ่มจำนวน">+</button>
        <strong>${item.quantity}</strong>
        <button type="button" data-cart-action="decrease" aria-label="ลดจำนวน" ${item.quantity <= 1 ? "disabled" : ""}>−</button>
      </div>
      <a class="site-cart-image" href="${localProductUrl(item)}">
        <img src="${item.image}" alt="${item.title}">
      </a>
      <div class="site-cart-item-info">
        <a href="${localProductUrl(item)}">${item.title}</a>
        <small>${money(item.price)} x ${item.quantity}</small>
        <strong>${money(item.price * item.quantity)}</strong>
      </div>
      <button class="site-cart-remove" type="button" data-cart-action="remove" aria-label="ลบสินค้า">×</button>
    </article>`;

  const emptyTemplate = () => `
    <div class="site-cart-empty">
      <img src="assets/images/icons/bag.svg" alt="">
      <strong>ยังไม่มีสินค้าในตะกร้า</strong>
      <span>เลือกสินค้าที่ต้องการแล้วเพิ่มลงในตะกร้า</span>
    </div>`;

  const renderPageCart = () => {
    const pageItems = document.getElementById("cart-page-items");
    const pageCount = document.getElementById("cart-page-count");
    const pageSubtotal = document.getElementById("cart-page-subtotal");
    const pageTotal = document.getElementById("cart-page-total");
    if (!pageItems) return;
    pageItems.innerHTML = items.length ? items.map(itemTemplate).join("") : emptyTemplate();
    pageCount.textContent = `${totalQuantity()} ชิ้น`;
    pageSubtotal.textContent = money(totalPrice());
    pageTotal.textContent = money(totalPrice());
  };

  const render = () => {
    const count = totalQuantity();
    itemsRoot.innerHTML = items.length ? items.map(itemTemplate).join("") : emptyTemplate();
    countRoot.textContent = String(count);
    totalRoot.textContent = money(totalPrice());
    updateTriggerBadges();
    renderPageCart();
  };

  const openCart = () => {
    backdrop.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("site-cart-open");
    requestAnimationFrame(() => drawer.classList.add("is-open"));
  };

  const closeCart = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("site-cart-open");
    window.setTimeout(() => { backdrop.hidden = true; }, 220);
  };

  const changeItem = (id, action) => {
    const item = items.find((entry) => String(entry.id) === String(id));
    if (!item) return;
    if (action === "increase") item.quantity += 1;
    if (action === "decrease" && item.quantity > 1) item.quantity -= 1;
    if (action === "remove") items = items.filter((entry) => String(entry.id) !== String(id));
    saveCart();
    render();
  };

  const handleCartAction = (event) => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const item = button.closest("[data-cart-id]");
    if (item) changeItem(item.dataset.cartId, button.dataset.cartAction);
  };

  itemsRoot.addEventListener("click", handleCartAction);
  document.getElementById("cart-page-items")?.addEventListener("click", handleCartAction);
  cartTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCart();
    });
  });
  backdrop.addEventListener("click", closeCart);
  document.querySelector(".site-cart-close").addEventListener("click", closeCart);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) closeCart();
  });
  document.getElementById("site-cart-checkout").addEventListener("click", () => {
    if (!items.length) return;
    window.location.href = "checkout.html";
  });
  document.getElementById("cart-page-checkout")?.addEventListener("click", () => {
    if (!items.length) return;
    window.location.href = "checkout.html";
  });

  window.JIBCart = {
    open: openCart,
    close: closeCart,
    getItems: () => [...items],
    addItem: (product) => {
      const existing = items.find((item) => String(item.id) === String(product.id));
      if (existing) existing.quantity += Number(product.quantity || 1);
      else items.push({ ...product, url: localProductUrl(product), quantity: Number(product.quantity || 1) });
      saveCart();
      render();
      openCart();
    }
  };

  render();
})();
