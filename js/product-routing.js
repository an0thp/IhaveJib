(function () {
  const PRODUCT_PATH = /(?:www\.)?jib\.co\.th\/web\/product\/readProduct\/(\d+)/i;

  const getProductId = (value = "") => {
    const match = String(value).match(PRODUCT_PATH);
    return match ? match[1] : "";
  };
  const toLocalProductUrl = (productOrUrl) => {
    const id = typeof productOrUrl === "object"
      ? String((productOrUrl && productOrUrl.id) || getProductId(productOrUrl && productOrUrl.url))
      : getProductId(productOrUrl);
    return id ? `product.html?id=${encodeURIComponent(id)}` : "product.html";
  };

  const toInternalDestination = (href = "") => {
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return "";
    const productId = getProductId(href);
    if (productId) return `product.html?id=${encodeURIComponent(productId)}`;
    if (/^(?:tel|mailto):/i.test(href)) return "contact.html";
    let url;
    try { url = new URL(href, window.location.href); } catch { return ""; }
    if (url.origin === window.location.origin) return "";
    const path = `${url.hostname}${url.pathname}`.toLowerCase();
    if (path.includes("pcsetspec")) return "diy.html";
    if (path.includes("member/login")) return "index.html#account";
    if (path.includes("branch") || path.includes("contact") || path.includes("claim") || path.includes("warranty") || path.includes("line.me")) return "contact.html";
    if (path.includes("news") || path.includes("promotion") || path.includes("youtube")) return "blog.html";
    return "index.html";
  };

  const rewriteProductLinks = (root = document) => {
    let links = [];
    if (root && typeof root.matches === "function" && root.matches("a[href]")) {
      links = [root];
    } else if (root && typeof root.querySelectorAll === "function") {
      links = Array.from(root.querySelectorAll("a[href]"));
    }
    links.forEach((link) => {
      const id = getProductId(link.href);
      const destination = id ? `product.html?id=${encodeURIComponent(id)}` : toInternalDestination(link.getAttribute("href") || "");
      if (!destination) return;
      link.href = destination;
      link.removeAttribute("target");
      link.removeAttribute("rel");
    });
  };

  window.JIBProductRoute = { getProductId, toLocalProductUrl, toInternalDestination, rewriteProductLinks };

  document.addEventListener("click", (event) => {
    const target = event.target && event.target.nodeType === Node.ELEMENT_NODE
      ? event.target
      : event.target && event.target.parentElement;
    const link = target && target.closest("a[href]");
    if (!link) return;
    const rawHref = link.getAttribute("href") || "";
    if (/^(?:\.\/)?product\.html\?id=\d+/i.test(rawHref)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.href = rawHref;
      return;
    }
    const id = getProductId(link.href);
    const destination = id ? `product.html?id=${encodeURIComponent(id)}` : toInternalDestination(rawHref);
    if (!destination) return;
    event.preventDefault();
    window.location.href = destination;
  }, true);

  const start = () => {
    rewriteProductLinks();
    new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) rewriteProductLinks(node);
      }));
    }).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
