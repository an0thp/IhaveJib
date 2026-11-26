(() => {
  const CART_KEY = "jibCartItems";
  const money = (value) => new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", minimumFractionDigits: 2 }).format(Number(value || 0));
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
  const items = (() => { try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; } })();
  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("checkout-items");
    list.innerHTML = items.length ? items.map((item) => `<article class="checkout-item"><img src="${escapeHtml(item.image)}" alt=""><div><h3>${escapeHtml(item.title)}</h3><span>${money(item.price)} × ${item.quantity}</span></div><strong>${money(item.price * item.quantity)}</strong></article>`).join("") : "<p>ไม่มีสินค้าในตะกร้า</p>";
    document.getElementById("checkout-subtotal").textContent = money(total);
    document.getElementById("checkout-total").textContent = money(total);
    document.getElementById("checkout-submit").disabled = !items.length;

    document.getElementById("checkout-form").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!items.length) return;
      const form = new FormData(event.currentTarget);
      const orderNumber = `JIB${new Date().toISOString().slice(2, 10).replaceAll("-", "")}${String(Date.now()).slice(-4)}`;
      const order = { orderNumber, createdAt: new Date().toISOString(), customer: Object.fromEntries(form), items, total };
      const orders = JSON.parse(localStorage.getItem("jibOrders") || "[]");
      orders.unshift(order);
      localStorage.setItem("jibOrders", JSON.stringify(orders));
      localStorage.setItem(CART_KEY, "[]");
      document.getElementById("checkout-content").hidden = true;
      document.getElementById("checkout-success").hidden = false;
      document.getElementById("checkout-order-number").textContent = orderNumber;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
