/* Adapt verified JIB records to the existing page's cards and interactions. */
function getPcSetSpecs(title) {
  if (!/^COMPUTER SET\b/i.test(title)) return null;
  const parts = title.split(/\s*\/\s*/);
  const cpu = parts.map(part => part.match(/\b(?:RYZEN\s+[3579]\s+\d{4}[A-Z0-9]*|(?:CORE\s+)?I[3579]\s*-\s*\d{4,5}[A-Z]*|(?:CORE\s+)?ULTRA\s+[3579]\s+\d{3}[A-Z]*)\b/i)?.[0]).find(Boolean);
  const gpu = parts.find(part => /^(?:ON\s*BOARD\b|(?:GEFORCE\s+)?(?:RTX|GTX)\s*\d|(?:RADEON\s+)?RX\s*\d|(?:INTEL\s+)?ARC\s+[AB]\d)/i.test(part));
  return { cpu: cpu || 'ไม่ระบุ', gpu: gpu || 'ไม่ระบุ' };
}

function renderPcSetSpecs(specs) {
  const escape = value => value.replace(/[&<>]/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;'})[char]);
  return `<div class="pc-set-specs"><div><strong>CPU:</strong> ${escape(specs.cpu)}</div><div><strong>การ์ดจอ:</strong> ${escape(specs.gpu)}</div></div>`;
}

function getCpuCardSpecs(product) {
  if (!/^CPU\s*\(/i.test(product.title)) return null;
  const [counts = '', clock = ''] = window.JIB_CPU_SPECS?.[product.id] || [];
  const pair = counts.match(/(\d+)(?:\s*\([^)]*\))?\s*Cores?\s*\/\s*(\d+)\s*Threads?/i)
    || counts.match(/Cores\s*:\s*(\d+).*Threads\s*:\s*(\d+)/i)
    || product.title.match(/\b(\d+)\s*C\s*\/?\s*(\d+)\s*T\b/i);
  const frequency = clock.match(/([\d.]+)\s*GHz/i)?.[1];
  return [pair ? `${pair[1]} Cores / ${pair[2]} Threads` : 'ไม่ระบุ',
    frequency ? `${frequency} GHz` : 'ไม่ระบุ'];
}

function renderCpuCardSpecs([counts, frequency]) {
  return `<div class="gTDBwi cpu-card-specs"><div class="fZHvio"><span class="label">Cores/Threads</span><span class="value">${counts}</span></div><div class="fZHvio"><span class="label">Base Frequency</span><span class="value">${frequency}</span></div></div>`;
}

function applyJibContent() {
  const data = window.JIB_SNAPSHOT;
  if (!data?.products?.length) return;
  const money = (value) => {
    const match = String(value || '').match(/[\d,]+(?:\.\d+)?/);
    return match ? Number(match[0].replaceAll(',', '')) : null;
  };
  const products = data.products.map(p => ({
    id: p.id, name_th: p.title, image: p.image, url: p.url,
    price_sale: money(p.priceFields.find(f => f.class.split(' ').includes('price_total'))?.text),
    price_before: money(p.priceFields.find(f => f.class === 'price')?.text),
    size_guide_th: '', property: [], discount: '', pcSpecs: getPcSetSpecs(p.title),
    notebookSpecs: window.JIB_NOTEBOOK_SPECS?.[p.id] || '',
    cpuSpecs: getCpuCardSpecs(p)
  }));
  // Keep each category in a predictable order: available prices first, then price.
  products.sort((a,b)=>(a.price_sale == null)-(b.price_sale == null)
    || (a.price_sale ?? Infinity)-(b.price_sale ?? Infinity)
    || a.name_th.localeCompare(b.name_th,'th'));
  products.forEach(p=>{
    if(p.price_before>p.price_sale && p.price_sale>0)
      p.discount='-'+Math.round((1-p.price_sale/p.price_before)*100)+'%';
  });
  const counters = new Map();
  function pick(title = '') {
    const key = /^(?:OCT\d|COMPUTER SET)/i.test(title) ? 'COMPUTER SET' : title.match(/^[A-Za-z]+(?: [A-Za-z]+)?(?=\s*\()/)?.[0]?.trim().toUpperCase() || '';
    const aliases={PSU:'POWER SUPPLY',RAM:'RAM',FAN:'FAN', 'AIR COOLER':'AIR COOLER', 'LIQUID COOLER':'LIQUID COOLER'};
    const pool = products.filter(p => key && (aliases[key] ? p.name_th.toUpperCase().includes(aliases[key]) : p.name_th.toUpperCase().startsWith(key)));
    const list = key === 'CPU' ? pool.filter(p => p.cpuSpecs && p.price_sale > 0)
      : pool.length ? pool : products;
    const i = counters.get(key) || 0; counters.set(key, i + 1);
    return list[i % list.length];
  }
  function replaceBundle(value) {
    if (!value || typeof value !== 'object') return value;
    if (value.name_th && value.image && 'price_sale' in value) return {...pick(value.name_th)};
    if (Array.isArray(value)) return value.map(replaceBundle);
    return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,replaceBundle(v)]));
  }
  window.IHAVECPU_BUNDLE = replaceBundle(window.IHAVECPU_BUNDLE || {});
  const bundle=window.IHAVECPU_BUNDLE;
  bundle.notebooksDefault=products.filter(p=>/^NOTEBOOK/i.test(p.name_th)).slice(0,9);
  (bundle.categorySetBrandNotebook || []).forEach(b=>{
    const brand=b.brand_name_th.toUpperCase();
    bundle.notebooksByBrandId[b.brandID]=products.filter(p=>/^NOTEBOOK/i.test(p.name_th)&&p.name_th.toUpperCase().includes(brand)).slice(0,9);
  });
  const notebookBrands = new Set(bundle.categorySetBrandNotebook.map(brand => brand.imgUrl));
  (bundle.categorySetComputer || []).forEach(g=>g.itemsData.forEach((c,i)=>{
    const series=i%2?'ZARUKON':'MARU';c.title_th='JIB '+series;
    const list=products.filter(p=>p.name_th.includes('COMPUTER SET JIB '+series)).slice(0,9);
    c.icon=list[0]?.image || 'assets/images/logo.png';
    bundle.pcSetsByCategoryId[c.categoryID]=list;
  }));
  document.querySelectorAll('.product-category-title').forEach(el=>{
    if(!/PROMOTION DDR|READY TO PLAY/.test(el.textContent))return;
    const group=bundle.categorySetComputer?.find(g=>g.campaign_type==='M');
    const siblings=[...el.parentElement.parentElement.querySelectorAll('.product-category-title')];
    const item=group?.itemsData[siblings.indexOf(el)];
    if(item){
      el.textContent=item.title_th;
      const img=el.parentElement.querySelector('img:not([aria-hidden="true"])');
      if(img){img.src=item.icon;img.alt=item.title_th;img.removeAttribute('srcset');}
    }
  });
  window.IHAVECPU_BUNDLE.listStore = data.branches.map(b => ({stockists_name_th:b.title, stockists_desc_th:''}));
  counters.clear();
  document.querySelectorAll('.sc-9450aca3-0').forEach(card => {
    if (card.closest('.by-order-carousel')) return;
    const isNewArrivals = card.closest('#new-arrivals-carousel') || card.closest('.wAZkf');
    if (isNewArrivals) return;
    const heading=card.querySelector('h3'); if (!heading) return;
    const p=pick(heading.textContent); heading.textContent=p.name_th;
    const img=card.querySelector('img'); if(img){img.src=p.image;img.alt=p.name_th;img.removeAttribute('srcset');}
    card.querySelectorAll('a').forEach(a => {a.href=p.url;});
    const price=card.querySelector('.dXeyHt span');
    heading.title=p.name_th;

    const isSpecialDeals = card.closest('#special-deals-carousel') || card.closest('.bDTyuX');
    if (isSpecialDeals) {
      // สุ่มส่วนลด 20% - 40% ตามที่ผู้ใช้สั่ง (ซ้ำกันได้)
      const discountPct = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
      const saleVal = p.price_sale && p.price_sale > 0 ? p.price_sale : 1850;
      const origVal = Math.round((saleVal / (1 - discountPct / 100)) / 10) * 10;
      
      if (price) price.textContent = formatBaht(saleVal);
      
      const discount = card.querySelector('.sc-950339a4-0, .dxjDKr');
      if (discount) discount.textContent = '-' + discountPct + '%';
      
      const original = card.querySelector('del');
      if (original) original.textContent = formatBaht(origVal);
      
      const flashSale = card.querySelector('.flash-sale-container');
      if (flashSale) {
        flashSale.innerHTML = '<span class="toJUj">เหลือเวลาอีก</span> <span class="flash-sale-right">9D 16:09:31</span>';
      }
      
      card.querySelectorAll('.hTkHfd, .fZHvio').forEach(n => { n.textContent = ''; });
    } else {
      if(price) price.textContent=p.price_sale == null ? 'ตรวจสอบราคาที่ JIB' : formatBaht(p.price_sale);
      card.querySelectorAll('del,.sc-950339a4-0,.flash-sale-container,.hTkHfd,.fZHvio').forEach(n=>{n.textContent='';});
    const details = card.querySelector(':scope > a + a');
    if (details && p.pcSpecs) details.innerHTML = renderPcSetSpecs(p.pcSpecs);
    if (details && p.cpuSpecs) details.innerHTML = renderCpuCardSpecs(p.cpuSpecs);
      const discount=card.querySelector('.sc-950339a4-0');
      if(discount)discount.textContent=p.discount;
      const original=card.querySelector('del');
      if(original && p.discount)original.textContent=formatBaht(p.price_before);
    }
  });
  const seenBanners=new Set();
  const banners=data.banners.filter(b=>{
    const key=b.image.split('?')[0];
    if(!b.image.includes('/banner/') || seenBanners.has(key))return false;
    seenBanners.add(key);return true;
  });
  document.querySelectorAll('img[alt^="banner_"]').forEach((img,i)=>{
    const b=banners[i % banners.length]; if(!b)return;
    img.src=b.image;img.alt=b.title;img.removeAttribute('srcset');
    if(img.closest('a'))img.closest('a').href=b.url;
  });
  const branchCards=[...document.querySelectorAll('div[style*="height:80px"],div[style*="height: 80px"]')].filter(c=>c.querySelector('h3'));
  branchCards.forEach((card,i)=>{
    const b=data.branches[i];if(!b)return;
    card.querySelector('h3').textContent=b.title;
    const phone=card.querySelector('span');if(phone)phone.textContent='โทร. '+b.phone;
    card.querySelectorAll('a').forEach(a=>{a.href=b.url;});
    card.title=b.detail;
  });
  const seo=document.querySelector('.styles_container__tomjW');
  if(seo){
    const h=seo.querySelector('h1');if(h)h.textContent='JIB คอมพิวเตอร์ โน้ตบุ๊ก และอุปกรณ์ไอที';
    const p=seo.querySelector('p');if(p)p.textContent='เลือกซื้อคอมพิวเตอร์เซ็ต JIB Maru และ JIB Zarukon โน้ตบุ๊ก อุปกรณ์ประกอบคอม จอภาพ เกมมิ่งเกียร์ สมาร์ทโฟน และแท็บเล็ต พร้อมดูโปรโมชั่นและค้นหาสาขาได้ที่ JIB Online';
    const b=seo.querySelector('button');if(b){b.textContent='ติดต่อ JIB';b.onclick=()=>window.location.assign('https://page.line.me/jibonline');}
  }
  document.querySelectorAll('h2').forEach(h=>{
    if(h.textContent.includes('สาขา iHAVECPU'))h.textContent='สาขา JIB';
    if(h.textContent.includes('สินค้า DIY ของ iHAVECPU'))h.textContent='สินค้า DIY ของ JIB';
  });
  const loc=document.querySelector('.ModalStoreLocator_name__VeUPS');
  if(loc){loc.textContent=data.branches[0].title;}
  const tel=document.querySelector('.ModalStoreLocator_tel__Zn4IT');if(tel)tel.textContent=data.branches[0].phone;
  const detail=document.querySelector('.ModalStoreLocator_storeDetail__4LHoI p');if(detail)detail.textContent=data.branches[0].detail;
  const locTitle=document.querySelector('.ModalStoreLocator_titlestore__SZG_W');if(locTitle)locTitle.textContent='สาขา JIB';
  document.querySelectorAll('.fxiIXh').forEach((h,i)=>{
    const b=banners[i];if(!b)return;h.textContent=b.title;
    const card=h.closest('.sc-a8a7b0bb-0');if(!card)return;
    const img=card.querySelector('img');if(img){img.src=b.image;img.alt=b.title;}
    const desc=card.querySelector('.iFqTkC');if(desc)desc.textContent='ดูรายละเอียดสินค้าและเงื่อนไขโปรโมชั่นที่ JIB Online';
    const date=card.querySelector('.eaFmUZ');if(date)date.textContent='JIB Online';
    card.querySelectorAll('a').forEach(a=>a.href=b.url);
  });
  document.querySelectorAll('p').forEach(p=>{
    if(p.textContent.includes('iHAVECPU'))p.textContent='เลือกอุปกรณ์ประกอบคอมพิวเตอร์และตรวจสอบรายละเอียดสินค้าได้ที่ JIB Online';
  });
  document.querySelectorAll('img').forEach((img,i)=>{
    if (img.closest('.diy-banner-row')) return;
    // Product-set category icons are deliberately rendered as 30px thumbnails.
    // Keep them out of the broad legacy iHAVECPU image replacement below.
    if (img.closest('.bQkqWd')) return;
    if (img.closest('.by-order-carousel')) return;
    if(img.closest('.brand-showcase-container') || img.classList.contains('brand-logo-img') || img.closest('#new-arrivals-carousel') || img.closest('.wAZkf'))return;
    if(!/ihcupload|ihavecpu/i.test(img.src))return;
    const b=banners[i%banners.length];
    const isBanner=/banner|slide|article|popup/i.test(img.src);
    img.src=isBanner?b.image:'assets/images/logo.png';img.alt=isBanner?b.title:'JIB';img.removeAttribute('srcset');
    if(img.closest('a'))img.closest('a').href=isBanner?b.url:data.source;
  });
  document.querySelectorAll('a').forEach(a=>{
    if(a.closest('#new-arrivals-carousel') || a.closest('.wAZkf')) return;
    const title=a.textContent.trim();
    const category=data.categories.find(c=>c.title===title);
    if(category)a.href=category.url;
    else if(/ihavecpu|javascript:void|^#$/.test(a.getAttribute('href')||''))a.href=data.source;
  });
  document.querySelector('meta[property="og:image"]')?.setAttribute('content','assets/images/logo.png');
}
