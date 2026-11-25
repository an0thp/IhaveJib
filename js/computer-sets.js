const setsMoney = value => {
  const match = String(value || '').match(/[\d,]+(?:\.\d+)?/);
  return match ? Number(match[0].replaceAll(',', '')) : null;
};
const setsEscape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);
const setsBaht = value => value == null ? 'ตรวจสอบราคา' : '฿' + value.toLocaleString('th-TH', {minimumFractionDigits: 2});
const setsProducts = (window.JIB_SNAPSHOT?.products || [])
  .filter(product => /^COMPUTER SET\b/i.test(product.title))
  .map(product => ({
    ...product,
    price: setsMoney(product.priceFields.find(field => field.class.split(' ').includes('price_total'))?.text),
    original: setsMoney(product.priceFields.find(field => field.class === 'price')?.text),
    cpu: product.title.match(/\b(?:RYZEN\s+[3579]\s+\d{4}[A-Z0-9]*|(?:CORE\s+)?I[3579]\s*-\s*\d{4,5}[A-Z]*|(?:CORE\s+)?ULTRA\s+[3579]\s+\d{3}[A-Z]*)\b/i)?.[0] || 'ตรวจสอบสเปก',
    gpu: product.title.split(/\s*\/\s*/).find(part => /^(?:ON\s*BOARD|(?:GEFORCE\s+)?RTX|GTX|RX|ARC)/i.test(part)) || 'ตรวจสอบสเปก'
  }));
const setsControls = Object.fromEntries(['query', 'sort'].map(name => [name, document.getElementById('sets-' + name)]));
let setsActiveSeries = '';

function setupSetsShowcase() {
  const banner = (window.JIB_SNAPSHOT?.banners || []).find(item => /COMSET|COMPUTER\s*SET/i.test(item.title));
  const heroImage = document.getElementById('sets-hero-image');
  const heroLink = document.getElementById('sets-hero-link');
  if (banner && heroImage && heroLink) {
    heroImage.src = banner.image;
    heroImage.alt = banner.title;
    heroLink.href = banner.url;
    heroLink.target = '_blank';
    heroLink.rel = 'noopener';
  }

  const groups = [
    { value: '', kicker: 'JIB COMPUTER SET', title: 'คอมเซตพร้อมใช้', products: setsProducts },
    { value: 'MARU', kicker: 'VALUE SERIES', title: 'JIB MARU', products: setsProducts.filter(product => /\bMARU\b/i.test(product.title)) },
    { value: 'ZARUKON', kicker: 'GAMING SERIES', title: 'JIB ZARUKON', products: setsProducts.filter(product => /\bZARUKON\b/i.test(product.title)) }
  ];
  const container = document.getElementById('sets-featured-categories');
  if (!container) return;
  container.innerHTML = groups.map(group => {
    const images = group.products.filter(product => product.image).slice(0, 2);
    return `<button type="button" class="sets-feature-card" data-series="${setsEscape(group.value)}" aria-label="ดูสินค้า ${setsEscape(group.title)}">
      <span class="sets-feature-copy">
        <span class="sets-feature-kicker">${setsEscape(group.kicker)}</span>
        <span class="sets-feature-title">${setsEscape(group.title)}</span>
        <span class="sets-feature-count">${group.products.length} รุ่น จากข้อมูล JIB</span>
        <span class="sets-feature-arrow" aria-hidden="true">→</span>
      </span>
      <span class="sets-feature-images" aria-hidden="true">${images.map(product => `<img loading="lazy" src="${setsEscape(product.image)}" alt="">`).join('')}</span>
    </button>`;
  }).join('');
  container.querySelectorAll('.sets-feature-card').forEach(card => {
    card.addEventListener('click', () => {
      setsActiveSeries = card.dataset.series;
      setsControls.query.value = '';
      renderSets();
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupSidePromotions() {
  const sorted = [...setsProducts].filter(product => product.image && product.price != null).sort((a, b) => a.price - b.price);
  const picks = [
    sorted[0],
    sorted.find(product => /\bZARUKON\b/i.test(product.title)),
    sorted.at(-1)
  ].filter((product, index, list) => product && list.findIndex(item => item.id === product.id) === index);
  const container = document.getElementById('sets-side-promotions');
  if (!container) return;
  container.innerHTML = picks.map((product, index) => `<a class="sets-side-promo" href="${setsEscape(product.url)}" target="_blank" rel="noopener">
    <span class="sets-side-promo-badge">${index === 0 ? 'สินค้าแนะนำ' : index === 1 ? 'เกมมิ่งเซต' : 'สเปกระดับสูง'}</span>
    <span class="sets-side-promo-image"><img loading="lazy" src="${setsEscape(product.image)}" alt="${setsEscape(product.title)}"></span>
    <span class="sets-side-promo-copy">
      <strong>${setsEscape(product.title)}</strong>
      <span>${setsBaht(product.price)}</span>
      <span class="sets-side-promo-button">ดูเพิ่มเติม</span>
    </span>
  </a>`).join('');
}

function renderSets() {
  const query = setsControls.query.value.trim().toUpperCase();
  const list = setsProducts.filter(product =>
    product.title.toUpperCase().includes(query) &&
    product.title.toUpperCase().includes(setsActiveSeries));
  list.sort((a, b) => setsControls.sort.value === 'name' ? a.title.localeCompare(b.title, 'th')
    : setsControls.sort.value === 'price-desc' ? (b.price ?? -Infinity) - (a.price ?? -Infinity)
    : (a.price ?? Infinity) - (b.price ?? Infinity));
  document.getElementById('sets-count').textContent = list.length + ' รายการ';
  document.getElementById('sets-empty').hidden = list.length > 0;
  document.getElementById('sets-grid').innerHTML = list.map(product => {
    const discount = product.price > 0 && product.original > product.price
      ? Math.round((1 - product.price / product.original) * 100) : 0;
    return `<article class="sets-card">
      ${discount ? `<span class="sets-discount">-${discount}%</span>` : ''}
      <a href="${setsEscape(product.url)}">
        <div class="sets-card-top"><div class="sets-card-image"><img loading="lazy" src="${setsEscape(product.image)}" alt="${setsEscape(product.title)}"></div>
        <div><h2 title="${setsEscape(product.title)}">${setsEscape(product.title)}</h2><span class="sets-price">${setsBaht(product.price)}</span>${discount ? `<del>${setsBaht(product.original)}</del>` : ''}</div></div>
        <div class="sets-specs"><div>CPU · ${setsEscape(product.cpu)}</div><div>การ์ดจอ · ${setsEscape(product.gpu)}</div></div>
      </a></article>`;
  }).join('');
}
Object.values(setsControls).forEach(control => control.addEventListener('input', renderSets));
document.getElementById('sets-search').addEventListener('submit', event => { event.preventDefault(); renderSets(); });
const setsCategoryToggle = document.getElementById('sets-category-toggle');
const setsCategoryMenu = document.getElementById('sets-category-menu');
setsCategoryToggle?.addEventListener('click', event => {
  event.stopPropagation();
  const willOpen = setsCategoryMenu.hidden;
  setsCategoryMenu.hidden = !willOpen;
  setsCategoryToggle.setAttribute('aria-expanded', String(willOpen));
});
document.addEventListener('click', event => {
  if (!setsCategoryMenu || setsCategoryMenu.hidden || event.target.closest('.sets-category-holder')) return;
  setsCategoryMenu.hidden = true;
  setsCategoryToggle.setAttribute('aria-expanded', 'false');
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !setsCategoryMenu || setsCategoryMenu.hidden) return;
  setsCategoryMenu.hidden = true;
  setsCategoryToggle.setAttribute('aria-expanded', 'false');
  setsCategoryToggle.focus();
});
setupSetsShowcase();
setupSidePromotions();
renderSets();
