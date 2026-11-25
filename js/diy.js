const diyCategories = window.JIB_DIY_CATEGORIES || [];
const diyProducts = window.JIB_DIY_PRODUCTS || {};
const diySelected = {};
let diyActiveCategory = diyCategories[0]?.id || "cpu";

const diyElements = {
  categoryList: document.getElementById("diy-category-list"),
  productGrid: document.getElementById("diy-product-grid"),
  currentIcon: document.getElementById("diy-current-icon"),
  title: document.getElementById("builder-title"),
  count: document.getElementById("diy-product-count"),
  selectedCount: document.getElementById("diy-selected-count"),
  modeCount: document.getElementById("diy-mode-count"),
  total: document.getElementById("diy-total"),
  search: document.getElementById("diy-search"),
  sort: document.getElementById("diy-sort"),
  filterBrand: document.getElementById("diy-filter-brand"),
  filterSeries: document.getElementById("diy-filter-series"),
  filterModel: document.getElementById("diy-filter-model"),
  filterSocket: document.getElementById("diy-filter-socket"),
  empty: document.getElementById("diy-empty"),
  build: document.getElementById("diy-build-button"),
  reset: document.getElementById("diy-reset-button"),
  dialog: document.getElementById("diy-summary-dialog"),
  dialogList: document.getElementById("diy-dialog-list"),
  dialogTotal: document.getElementById("diy-dialog-total")
};

const diyEscape = value => String(value ?? "").replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
})[character]);
const diyMoney = value => "฿" + Number(value || 0).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const diyCategory = id => diyCategories.find(category => category.id === id);
const diyFindProduct = (categoryId, productId) => (diyProducts[categoryId] || []).find(product => product.id === String(productId));
const diyKnownBrands = ["SILVERSTONE", "THERMALTAKE", "KINGSTON", "CORSAIR", "LOGITECH", "DEEPCOOL", "SEAGATE", "GIGABYTE", "SAMSUNG", "HIKSEMI", "MONTECH", "AEROCOOL", "SEGOTEP", "APACER", "NOCTUA", "NUBWO", "ASUS", "INTEL", "AMD", "G.SKILL", "WD", "ANTEC"];

function diyFacets(product) {
  const name = product.name.toUpperCase();
  const brand = diyKnownBrands.find(value => name.includes(value)) || name.split(/\s+/)[0];
  const series = name.match(/\b(RYZEN\s+[3579]|CORE\s+I[3579]|ROG\s+(?:STRIX|SWIFT|ASTRAL)?|TUF\s+GAMING|PRIME|PROART|TRIDENT\s+Z|FURY\s+BEAST|BARRACUDA|WD\s+(?:BLACK|BLUE))\b/)?.[1] || "";
  const model = name.match(/\b(?:I[3579]-\d{4,5}[A-Z]*|\d{4,5}X3D|\d{4,5}[GKF]?|RTX\s+\d{4}(?:\s+TI)?|RX\s+\d{4}\s*XT?)\b/)?.[0] || "";
  const socket = name.match(/\b(?:AM4|AM5|LGA\s*1700|LGA\s*1851|SOCKET\s*1700|SOCKET\s*1851)\b/)?.[0]?.replace("SOCKET ", "LGA ") || "";
  return { brand, series, model, socket };
}

function fillDiyFilter(select, label, values) {
  const previous = select.value;
  const unique = [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "en"));
  select.innerHTML = `<option value="">${label}</option>${unique.map(value => `<option value="${diyEscape(value)}">${diyEscape(value)}</option>`).join("")}`;
  select.value = unique.includes(previous) ? previous : "";
  select.classList.toggle("has-value", Boolean(select.value));
}

function renderDiyFilters() {
  const facets = (diyProducts[diyActiveCategory] || []).map(diyFacets);
  fillDiyFilter(diyElements.filterBrand, "Brand", facets.map(item => item.brand));
  fillDiyFilter(diyElements.filterSeries, "Series", facets.map(item => item.series));
  fillDiyFilter(diyElements.filterModel, "Processor Number", facets.map(item => item.model));
  fillDiyFilter(diyElements.filterSocket, "Socket Type", facets.map(item => item.socket));
}

function loadDiySelection() {
  try {
    const stored = JSON.parse(localStorage.getItem("ihavejib-diy-selection") || "{}");
    Object.entries(stored).forEach(([categoryId, productId]) => {
      const product = diyFindProduct(categoryId, productId);
      if (product) diySelected[categoryId] = product;
    });
  } catch (_error) {
    localStorage.removeItem("ihavejib-diy-selection");
  }
}

function saveDiySelection() {
  const compact = Object.fromEntries(Object.entries(diySelected).map(([categoryId, product]) => [categoryId, product.id]));
  localStorage.setItem("ihavejib-diy-selection", JSON.stringify(compact));
}

function getDiySelection() {
  return diyCategories.map(category => ({ category, product: diySelected[category.id] })).filter(item => item.product);
}

function renderDiyCategories() {
  diyElements.categoryList.innerHTML = diyCategories.map(category => {
    const picked = diySelected[category.id];
    return `<button type="button" class="diy-category-row${category.id === diyActiveCategory ? " is-active" : ""}" data-category="${diyEscape(category.id)}" aria-pressed="${category.id === diyActiveCategory}">
      <img loading="lazy" src="${diyEscape(category.uiIcon || category.icon)}" alt="">
      <span class="diy-category-copy"><strong>${diyEscape(category.name)}</strong><small class="${picked ? "is-picked" : ""}" title="${picked ? diyEscape(picked.name) : ""}">${picked ? diyEscape(picked.name) : "ยังไม่ได้เลือก"}</small></span>
      <span class="diy-category-arrow" aria-hidden="true">›</span>
    </button>`;
  }).join("");
}

function diyProductSpecs(product) {
  const name = product.name.toUpperCase();
  const first = (pattern, fallback = "-") => name.match(pattern)?.[1] || fallback;
  const capacity = first(/\b(\d+(?:\.\d+)?\s*(?:TB|GB))\b/);
  const frequency = first(/\b(\d+(?:\.\d+)?\s*GHZ)\b/);
  const model = first(/\b((?:RYZEN\s+[3579]\s+|CORE\s+I[3579]-?)?\d{4,5}[A-Z0-9]*|I[3579]-\d{4,5}[A-Z]*)\b/);
  const socket = first(/\b((?:SOCKET\s+)?(?:AM4|AM5|LGA\s*1700|LGA\s*1851))\b/);
  const interfaceName = first(/\b(PCIE\s*\d(?:X\d)?|NVME|SATA3|USB|WIRELESS)\b/);
  const color = first(/\b(BLACK|WHITE|BEIGE|RED)\b/);
  const formFactor = first(/\b(E-ATX|MICRO-ATX|MINI-ITX|ATX)\b/);
  const wattage = first(/\b(\d{3,4}W)\b/);
  const refreshRate = first(/\b(\d{2,3}HZ)\b/);

  if (diyActiveCategory === "cpu") return [["Processor", model], ["Base Frequency", frequency]];
  if (diyActiveCategory === "mainboard") return [["Socket", socket], ["Form Factor", formFactor]];
  if (diyActiveCategory === "vga") return [["Graphics", first(/\b((?:RTX|RX)\s+\d{4}(?:\s+TI|\s+XT)?)\b/)], ["Memory", first(/\b(\d+GB\s+GDDR\d)\b/)]];
  if (diyActiveCategory === "ram") return [["Capacity", capacity], ["Memory Speed", first(/\b(\d{4,5}MHZ)\b/)]];
  if (["harddisk", "ssd", "m2"].includes(diyActiveCategory)) return [["Capacity", capacity], ["Interface", interfaceName]];
  if (diyActiveCategory === "pccase") return [["Form Factor", formFactor], ["Color", color]];
  if (diyActiveCategory === "powersupply") return [["Power", wattage], ["Certification", first(/\b(80\s+PLUS(?:\s+GOLD)?)\b/)]];
  if (["cpucooler", "cpuliquid"].includes(diyActiveCategory)) return [["Cooling Type", diyActiveCategory === "cpuliquid" ? "Liquid Cooler" : "Air Cooler"], ["Radiator", first(/\b(\d{3}MM)\b/)]];
  if (diyActiveCategory === "monitor") return [["Screen Size", first(/\b(\d{2}(?:\.\d)?\s*(?:INCH|\"))\b/)], ["Refresh Rate", refreshRate]];
  if (diyActiveCategory === "keyboard") return [["Connection", interfaceName], ["Layout", first(/\b(EN\/TH|EN)\b/)]];
  if (diyActiveCategory === "mouse") return [["Connection", interfaceName], ["Color", color]];
  return [["Model", model], ["Details", capacity]];
}

function filteredDiyProducts() {
  const query = diyElements.search.value.trim().toLocaleUpperCase("th-TH");
  const selectedFilters = {
    brand: diyElements.filterBrand.value,
    series: diyElements.filterSeries.value,
    model: diyElements.filterModel.value,
    socket: diyElements.filterSocket.value
  };
  const products = [...(diyProducts[diyActiveCategory] || [])].filter(product => {
    const facets = diyFacets(product);
    return product.name.toLocaleUpperCase("th-TH").includes(query)
      && Object.entries(selectedFilters).every(([key, value]) => !value || facets[key] === value);
  });
  if (diyElements.sort.value === "price-asc") products.sort((a, b) => a.price - b.price);
  if (diyElements.sort.value === "price-desc") products.sort((a, b) => b.price - a.price);
  if (diyElements.sort.value === "name") products.sort((a, b) => a.name.localeCompare(b.name, "th"));
  return products;
}

function renderDiyProducts() {
  const category = diyCategory(diyActiveCategory);
  const products = filteredDiyProducts();
  const selectedId = diySelected[diyActiveCategory]?.id;
  diyElements.currentIcon.src = category?.uiIcon || category?.icon || "";
  diyElements.currentIcon.alt = category?.name || "";
  diyElements.title.textContent = category?.name || "";
  diyElements.count.textContent = `${products.length} รายการ`;
  diyElements.empty.hidden = products.length > 0;
  diyElements.productGrid.innerHTML = products.map(product => {
    const selected = product.id === selectedId;
    const specs = diyProductSpecs(product);
    return `<article class="diy-product-card${selected ? " is-selected" : ""}">
      <a class="diy-product-image" href="${diyEscape(product.url)}" target="_blank" rel="noopener"><img loading="lazy" src="${diyEscape(product.image)}" alt="${diyEscape(product.name)}"></a>
      <a class="diy-product-name" href="${diyEscape(product.url)}" target="_blank" rel="noopener"><h3 title="${diyEscape(product.name)}">${diyEscape(product.name)}</h3></a>
      <div class="diy-product-specs">${specs.map(([label, value]) => `<div><span>${diyEscape(label)}</span><strong>${diyEscape(value)}</strong></div>`).join("")}</div>
      <div class="diy-product-bottom"><strong class="diy-product-price">${diyMoney(product.price)}</strong><button type="button" data-select-product="${diyEscape(product.id)}" aria-label="${selected ? "นำสินค้าออกจากชุด" : "เพิ่มสินค้าเข้าชุด"}">${selected ? "✓" : "+"}</button></div>
    </article>`;
  }).join("");
}

function renderDiySummary() {
  const selection = getDiySelection();
  const total = selection.reduce((sum, item) => sum + item.product.price, 0);
  diyElements.selectedCount.textContent = selection.length;
  diyElements.modeCount.textContent = selection.length;
  diyElements.total.textContent = diyMoney(total);
  diyElements.build.disabled = selection.length === 0;
  diyElements.reset.disabled = selection.length === 0;
  renderDiyCategories();
}

function selectDiyCategory(categoryId) {
  if (!diyCategory(categoryId)) return;
  diyActiveCategory = categoryId;
  diyElements.search.value = "";
  diyElements.sort.value = "price-asc";
  renderDiyFilters();
  renderDiyCategories();
  renderDiyProducts();
  if (window.matchMedia("(max-width: 900px)").matches) {
    document.querySelector(".diy-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function selectDiyProduct(productId) {
  const product = diyFindProduct(diyActiveCategory, productId);
  if (!product) return;
  if (diySelected[diyActiveCategory]?.id === product.id) delete diySelected[diyActiveCategory];
  else diySelected[diyActiveCategory] = product;
  saveDiySelection();
  renderDiySummary();
  renderDiyProducts();
}

function openDiySummary() {
  const selection = getDiySelection();
  const total = selection.reduce((sum, item) => sum + item.product.price, 0);
  diyElements.dialogList.innerHTML = selection.length ? selection.map(({ category, product }) => `<div class="diy-dialog-row">
    <img src="${diyEscape(product.image)}" alt="">
    <div><span>${diyEscape(category.name)}</span><strong>${diyEscape(product.name)}</strong></div>
    <b>${diyMoney(product.price)}</b>
  </div>`).join("") : "<p class=\"diy-empty\">ยังไม่มีรายการที่เลือก</p>";
  diyElements.dialogTotal.textContent = diyMoney(total);
  if (typeof diyElements.dialog.showModal === "function") diyElements.dialog.showModal();
  else diyElements.dialog.setAttribute("open", "");
}

function closeDiySummary() {
  if (typeof diyElements.dialog.close === "function") diyElements.dialog.close();
  else diyElements.dialog.removeAttribute("open");
}

diyElements.categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) selectDiyCategory(button.dataset.category);
});
diyElements.productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-select-product]");
  if (button) selectDiyProduct(button.dataset.selectProduct);
});
diyElements.search.addEventListener("input", renderDiyProducts);
diyElements.sort.addEventListener("change", renderDiyProducts);
[diyElements.filterBrand, diyElements.filterSeries, diyElements.filterModel, diyElements.filterSocket].forEach(select => {
  select.addEventListener("change", () => {
    select.classList.toggle("has-value", Boolean(select.value));
    renderDiyProducts();
  });
});
diyElements.build.addEventListener("click", openDiySummary);
document.getElementById("diy-show-selected").addEventListener("click", openDiySummary);
document.getElementById("diy-dialog-close").addEventListener("click", closeDiySummary);
document.getElementById("diy-dialog-edit").addEventListener("click", closeDiySummary);
diyElements.dialog.addEventListener("click", event => { if (event.target === diyElements.dialog) closeDiySummary(); });
diyElements.reset.addEventListener("click", () => {
  Object.keys(diySelected).forEach(categoryId => delete diySelected[categoryId]);
  saveDiySelection();
  renderDiySummary();
  renderDiyProducts();
});

const headerSearch = document.getElementById("sets-search");
const headerQuery = document.getElementById("sets-query");
headerSearch.addEventListener("submit", event => {
  event.preventDefault();
  const query = headerQuery.value.trim();
  const matchedCategory = diyCategories.find(category => (diyProducts[category.id] || []).some(product => product.name.toLocaleUpperCase("th-TH").includes(query.toLocaleUpperCase("th-TH"))));
  if (matchedCategory) diyActiveCategory = matchedCategory.id;
  diyElements.search.value = query;
  renderDiyCategories();
  renderDiyProducts();
  document.getElementById("builder").scrollIntoView({ behavior: "smooth", block: "start" });
});

const categoryToggle = document.getElementById("sets-category-toggle");
const categoryMenu = document.getElementById("sets-category-menu");
categoryToggle.addEventListener("click", event => {
  event.stopPropagation();
  const willOpen = categoryMenu.hidden;
  categoryMenu.hidden = !willOpen;
  categoryToggle.setAttribute("aria-expanded", String(willOpen));
});
document.addEventListener("click", event => {
  if (categoryMenu.hidden || event.target.closest(".sets-category-holder")) return;
  categoryMenu.hidden = true;
  categoryToggle.setAttribute("aria-expanded", "false");
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (diyElements.dialog.open) closeDiySummary();
  if (!categoryMenu.hidden) {
    categoryMenu.hidden = true;
    categoryToggle.setAttribute("aria-expanded", "false");
    categoryToggle.focus();
  }
});

loadDiySelection();
renderDiyFilters();
renderDiySummary();
renderDiyProducts();
