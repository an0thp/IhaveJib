(() => {
  const products = window.JIB_SNAPSHOT?.products || [];
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");
  const product = products.find((item) => String(item.id) === String(requestedId)) || products[0];
  let quantity = 1;

  const moneyValue = (value) => {
    const match = String(value || "").match(/[\d,]+(?:\.\d+)?/);
    return match ? Number(match[0].replaceAll(",", "")) : 0;
  };
  const money = (value) => new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2
  }).format(Number(value || 0));
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
  const priceFor = (item) => moneyValue(item.priceFields?.find((field) => field.class.split(" ").includes("price_total"))?.text)
    || moneyValue(item.priceFields?.find((field) => field.class === "price")?.text);
  const originalPriceFor = (item) => moneyValue(item.priceFields?.find((field) => field.class === "price")?.text);
  const categoryFor = (title = "") => title.match(/^([^()]+)\s*\(/)?.[1]?.trim()
    || (/^COMPUTER SET/i.test(title) ? "คอมพิวเตอร์เซต" : title.split(/\s+/).slice(0, 2).join(" "));
  const brandFor = (title = "") => {
    const cleaned = title.replace(/^.*?\([^)]*\)\s*/i, "").replace(/^COMPUTER SET\s+/i, "");
    return cleaned.match(/^[A-Z0-9][A-Z0-9.+-]*/i)?.[0] || "JIB";
  };
  const localUrl = (item) => `product.html?id=${encodeURIComponent(item.id)}`;
  const currentPrice = product ? priceFor(product) : 0;
  const currentOriginal = product ? originalPriceFor(product) : 0;
  const currentCategory = product ? categoryFor(product.title) : "สินค้า";

  const toast = (message) => {
    const root = document.getElementById("product-toast");
    root.textContent = message;
    root.classList.add("is-visible");
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => root.classList.remove("is-visible"), 2200);
  };

  const specificationRows = (item) => {
    const rows = [
      ["รหัสสินค้า", `JIB-${item.id}`],
      ["แบรนด์", brandFor(item.title)],
      ["หมวดหมู่", categoryFor(item.title)]
    ];
    const cpu = window.JIB_CPU_SPECS?.[item.id];
    if (cpu?.length) {
      rows.push(["Cores / Threads", cpu[0] || "ไม่ระบุ"]);
      rows.push(["Base Frequency", cpu[1] || "ไม่ระบุ"]);
    }
    const notebook = window.JIB_NOTEBOOK_SPECS?.[item.id];
    if (notebook) {
      String(notebook).split(/\s*·\s*/).forEach((part) => {
        const [label, ...value] = part.split(":");
        if (value.length) rows.push([label.trim(), value.join(":").trim()]);
      });
    }
    const warranty = item.title.match(/\((\d+)Y\)\s*$/i)?.[1];
    if (warranty) rows.push(["การรับประกัน", `${warranty} ปี`]);
    rows.push(["สถานะสินค้า", "มีสินค้า"]);
    return rows;
  };

  const productPayload = (item = product, selectedQuantity = quantity) => ({
    id: String(item.id),
    title: item.title,
    image: item.image,
    url: localUrl(item),
    price: priceFor(item),
    quantity: Number(selectedQuantity || 1)
  });

  const updateQuantity = () => {
    document.getElementById("product-quantity").textContent = String(quantity).padStart(2, "0");
    document.getElementById("product-decrease").disabled = quantity <= 1;
  };

  const renderProduct = () => {
    if (!product) {
      document.getElementById("product-title").textContent = "ไม่พบข้อมูลสินค้า";
      document.getElementById("product-stock").textContent = "ไม่มีสินค้า";
      return;
    }
    document.title = `${product.title} | JIB`;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-brand").textContent = brandFor(product.title);
    document.getElementById("product-sku").textContent = `JIB-${product.id}`;
    document.getElementById("product-price").textContent = currentPrice ? money(currentPrice) : "สอบถามราคา";
    document.getElementById("product-original-price").textContent = currentOriginal > currentPrice ? money(currentOriginal) : "";
    document.getElementById("product-discount").textContent = currentOriginal > currentPrice && currentPrice
      ? `-${Math.round((1 - currentPrice / currentOriginal) * 100)}%` : "";
    document.getElementById("product-breadcrumb-category").textContent = currentCategory;
    document.getElementById("product-breadcrumb-name").textContent = product.title;
    document.getElementById("product-main-image").src = product.image;
    document.getElementById("product-main-image").alt = product.title;
    document.getElementById("product-detail-image").src = product.image;
    document.getElementById("product-detail-image").alt = product.title;
    document.getElementById("product-detail-title").textContent = product.title;
    document.getElementById("product-detail-copy").textContent = `สินค้าจากข้อมูล JIB หมวด ${currentCategory} ตรวจสอบชื่อรุ่น ราคา และรายละเอียดก่อนเพิ่มลงตะกร้าได้จากหน้านี้`;

    document.getElementById("product-thumbnails").innerHTML = `<button class="product-thumbnail is-active" type="button" data-image="${escapeHtml(product.image)}" aria-label="รูปสินค้า 1"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}"></button>`;
    const tags = [currentCategory, brandFor(product.title), `JIB-${product.id}`];
    document.getElementById("product-tags").innerHTML = tags.map((tag) => `<span>#${escapeHtml(tag.toUpperCase())}</span>`).join("");
    document.getElementById("product-specs").innerHTML = specificationRows(product).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
    updateQuantity();
  };

  const renderRelated = () => {
    if (!product) return;
    const category = categoryFor(product.title);
    let related = products.filter((item) => item.id !== product.id && categoryFor(item.title) === category && priceFor(item) > 0).slice(0, 4);
    if (related.length < 4) related = [...related, ...products.filter((item) => item.id !== product.id && priceFor(item) > 0 && !related.includes(item)).slice(0, 4 - related.length)];
    document.getElementById("product-related-grid").innerHTML = related.map((item) => `<article class="product-related-card">
      <a href="${localUrl(item)}"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}"><h3>${escapeHtml(item.title)}</h3></a>
      <div class="product-related-bottom"><strong>${money(priceFor(item))}</strong><button type="button" data-related-add="${escapeHtml(item.id)}" aria-label="เพิ่ม ${escapeHtml(item.title)} ลงตะกร้า">+</button></div>
    </article>`).join("");
  };

  const addCurrentProduct = (goToCart = false) => {
    if (!product || !currentPrice) {
      toast("สินค้านี้ยังไม่มีราคาสำหรับเพิ่มลงตะกร้า");
      return;
    }
    if (!window.JIBCart) {
      toast("ระบบตะกร้ายังไม่พร้อม กรุณาลองอีกครั้ง");
      return;
    }
    window.JIBCart.addItem(productPayload());
    if (goToCart) window.setTimeout(() => { window.location.href = "cart.html"; }, 120);
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderProduct();
    renderRelated();

    document.getElementById("product-increase").addEventListener("click", () => { quantity = Math.min(99, quantity + 1); updateQuantity(); });
    document.getElementById("product-decrease").addEventListener("click", () => { quantity = Math.max(1, quantity - 1); updateQuantity(); });
    document.getElementById("product-add-cart").addEventListener("click", () => addCurrentProduct(false));
    document.getElementById("product-buy-now").addEventListener("click", () => addCurrentProduct(true));

    document.getElementById("product-thumbnails").addEventListener("click", (event) => {
      const button = event.target.closest("[data-image]");
      if (!button) return;
      document.querySelectorAll(".product-thumbnail").forEach((thumb) => thumb.classList.toggle("is-active", thumb === button));
      document.getElementById("product-main-image").src = button.dataset.image;
    });

    document.querySelector(".product-tabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-product-tab]");
      if (!button) return;
      const selected = button.dataset.productTab;
      document.querySelectorAll("[data-product-tab]").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll("[data-product-panel]").forEach((panel) => { panel.hidden = selected !== "all" && panel.dataset.productPanel !== selected; });
    });

    document.getElementById("product-wishlist").addEventListener("click", (event) => {
      const key = "jibWishlist";
      const saved = new Set(JSON.parse(localStorage.getItem(key) || "[]"));
      if (saved.has(product.id)) saved.delete(product.id); else saved.add(product.id);
      localStorage.setItem(key, JSON.stringify([...saved]));
      event.currentTarget.classList.toggle("is-active", saved.has(product.id));
      event.currentTarget.textContent = saved.has(product.id) ? "♥" : "♡";
      toast(saved.has(product.id) ? "เพิ่มในรายการโปรดแล้ว" : "นำออกจากรายการโปรดแล้ว");
    });

    document.getElementById("product-share").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast("คัดลอกลิงก์สินค้าแล้ว");
      } catch {
        toast("ลิงก์สินค้า: " + window.location.href);
      }
    });

    document.getElementById("product-related-grid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-related-add]");
      if (!button) return;
      const item = products.find((entry) => String(entry.id) === String(button.dataset.relatedAdd));
      if (item && window.JIBCart) window.JIBCart.addItem(productPayload(item, 1));
    });

    document.getElementById("product-search").addEventListener("submit", (event) => {
      event.preventDefault();
      const query = document.getElementById("product-search-input").value.trim().toLocaleLowerCase("th");
      const result = products.find((item) => item.title.toLocaleLowerCase("th").includes(query));
      if (result) window.location.href = localUrl(result);
      else toast("ไม่พบสินค้าที่ค้นหา");
    });

    const categoryButton = document.getElementById("product-category-toggle");
    const categoryMenu = document.getElementById("product-category-menu");
    categoryButton.addEventListener("click", (event) => {
      event.stopPropagation();
      categoryMenu.hidden = !categoryMenu.hidden;
      categoryButton.setAttribute("aria-expanded", String(!categoryMenu.hidden));
    });
    document.addEventListener("click", () => { categoryMenu.hidden = true; categoryButton.setAttribute("aria-expanded", "false"); });
  });
})();
