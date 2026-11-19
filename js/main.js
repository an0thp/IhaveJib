/**
 * ==============================================================================
 * โครงงาน: IhaveJib (Frontend Web Development)
 * ไฟล์ควบคุมการทำงานหลัก (Interactive Controller): js/main.js
 *
 * สรุปหน้าที่และฟังก์ชันการทำงานหลัก (Function Overview):
 * ------------------------------------------------------------------------------
 * 1.  initPromotionPopup()         - ควบคุม Modal Popup โปรโมชั่นพิเศษต้อนรับลูกค้า
 * 2.  initStickyHeaderAndDropdowns()- จัดการ Sticky Navigation เมื่อ Scroll และเมนู Dropdown
 * 3.  initAllCarousels()            - ระบบแบนเนอร์ภาพสไลด์อัตโนมัติ (Banner Carousel / Slider)
 * 4.  initFlashSaleCountdown()      - ระบบนับถอยหลังโปรโมชั่น Flash Sale แบบ Real-time
 * 5.  initStoreSectionPaging()      - ระบบสลับหน้ารายการสาขาทั่วประเทศ
 * 6.  initSeoToggle()               - ฟังก์ชันปุ่ม ยุบ/ขยาย เนื้อหา SEO ด้านล่าง
 * 7.  initPcSetSectionTabs()        - แท็บสลับหมวดหมู่สินค้าคอมพิวเตอร์เซ็ต
 * 8.  initNotebookSectionTabs()     - แท็บสลับหมวดหมู่สินค้าโน้ตบุ๊ก
 * 9.  initDiySectionTabs()          - แท็บสลับหมวดหมู่อุปกรณ์ประกอบคอม DIY
 * 10. initAccessoriesSectionTabs() - แท็บสลับหมวดหมู่อุปกรณ์เสริม & เกมมิ่งเกียร์
 * 11. initWishlistAndSearch()      - ระบบบันทึก Wishlist (หัวใจ) และการพิมพ์ค้นหาสินค้า
 * ==============================================================================
 */

const HEART_SVG = `<div variant="medium" defaultcolor="currentColor" class="sc-b8cf93f4-0 bQDTJZ"><div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="injected-svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.4502 3.98319L11.436 5.02972C11.0592 5.41843 10.5411 5.63785 9.99974 5.63785C9.45844 5.63785 8.94024 5.41843 8.56353 5.02972L7.54932 3.98319C6.9321 3.3463 6.10857 3.00053 5.26361 3.00053C4.41865 3.00053 3.59512 3.3463 2.97789 3.98319C2.3586 4.62222 2 5.50193 2 6.43187C2 7.36181 2.3586 8.24151 2.97789 8.88054L9.99974 16.1262L17.0216 8.88054C17.3278 8.56472 17.5742 8.18603 17.7432 7.76518C17.9123 7.34425 18 6.891 18 6.43187C18 5.97273 17.9123 5.51949 17.7432 5.09855C17.5742 4.67771 17.3281 4.29935 17.0219 3.98353C16.716 3.66769 16.3555 3.41993 15.964 3.25255C15.5727 3.08524 15.1556 3 14.7359 3C14.3162 3 13.8991 3.08524 13.5077 3.25255C13.1163 3.41992 12.7561 3.66735 12.4502 3.98319ZM9.99974 19L1.54168 10.2724C0.554557 9.25383 0 7.87235 0 6.43187C0 4.99139 0.554557 3.6099 1.54168 2.59133C2.52879 1.57276 3.86761 1.00053 5.26361 1.00053C6.4801 1.00053 7.65317 1.43506 8.58793 2.22081C8.72586 2.33676 8.85861 2.46035 8.98554 2.59133L9.99974 3.63785L11.0139 2.59133C11.1405 2.46067 11.2732 2.33701 11.4115 2.22074C11.8071 1.88806 12.2483 1.61591 12.7215 1.41358C13.3601 1.14054 14.0446 1 14.7359 1C15.4272 1 16.1117 1.14054 16.7503 1.41358C17.3889 1.68663 17.969 2.08693 18.4577 2.59143C18.9466 3.09569 19.3346 3.69431 19.5992 4.35328C19.8638 5.01225 20 5.71857 20 6.43187C20 7.14517 19.8638 7.85148 19.5992 8.51045C19.3346 9.16942 18.9467 9.76814 18.4578 10.2724L9.99974 19Z" fill="#A3B3DB"></path></svg></div></div>`;

document.addEventListener("DOMContentLoaded", () => {
  const promotion = document.getElementById("jib-promotion");
  if (typeof promotion?.showModal === "function" && !promotion.open) {
    promotion.showModal();
  }
  applyJibContent();
  initStickyHeaderAndDropdowns();
  initAllCarousels();
  initSpecialDealsCarousel();
  initFlashSaleCountdown();
  // JIB snapshot has prices but no verified countdown deadline.
  initStoreSectionPaging();
  initSeoToggle();
  initPcSetSectionTabs();
  initNotebookSectionTabs();
  initDiySectionTabs();
  initAccessoriesSectionTabs();
  initWishlistAndSearch();
});

/** Apply JIB source data without changing the existing DOM layout. */
function initJibDataLayer() {
  const data = window.JIB_DATA;
  if (!data) return;

  document.querySelectorAll('a[href="https://www.jib.co.th/"]').forEach((link) => {
    link.href = data.links.shop;
  });

  document.querySelectorAll('a[href*="/web/branch"]').forEach((link) => {
    link.href = data.links.branches;
  });

  const promoLink = document.querySelector('a[href*="newsandpromotion"]');
  if (promoLink) promoLink.href = data.links.promotions;

  // Replace legacy brand labels only in visible text; images, classes and layout stay unchanged.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    node.nodeValue = node.nodeValue
      .replace(/iHAVECPU/g, "JIB")
      .replace(/ไอ แฮฟ ซีพียู/g, "JIB");
  });
}

/**
 * 2. Sticky Header, Topbar Store Locator & Category Dropdowns
 */
function initStickyHeaderAndDropdowns() {
  const stickyWrapper = document.querySelector(".sc-2365422b-0");
  if (stickyWrapper) {
    window.addEventListener(
      "scroll",
      () => {
        stickyWrapper.classList.toggle("is-sticky", window.scrollY > 45);
      },
      { passive: true },
    );
  }

  // Topbar Store Locator Dropdown
  const storeBtn = document.querySelector(".storecore");
  const storeDropdown = document.querySelector(".sc-22649791-1");
  if (storeBtn && storeDropdown) {
    storeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      storeDropdown.classList.toggle("is-open");
    });
    storeDropdown.addEventListener("click", (e) => e.stopPropagation());
  }

  // Category Dropdowns (Header + Navbar)
  document.querySelectorAll(".sc-7e5bac2e-0").forEach((holder) => {
    const trigger = holder.querySelector("button, .cursor-pointer");
    const panel = holder.querySelector(".sc-7e5bac2e-1");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.classList.toggle("is-open");
    });
    panel.addEventListener("click", (e) => e.stopPropagation());
  });

  document.addEventListener("click", () => {
    if (storeDropdown) storeDropdown.classList.remove("is-open");
    document
      .querySelectorAll(".sc-7e5bac2e-1.is-open")
      .forEach((p) => p.classList.remove("is-open"));
  });
}

/**
 * 3. Universal Controller for All 12 pure-react-carousel Sliders
 */
function initAllCarousels() {
  document.querySelectorAll(".carousel").forEach((carouselEl, cIdx) => {
    if (carouselEl.id === "special-deals-carousel") return;
    const tray = carouselEl.querySelector(".sliderTray___-vHFQ");
    if (!tray) return;

    const slides = Array.from(tray.querySelectorAll(":scope > .slide___3-Nqo"));
    if (slides.length <= 1) return;

    const backBtn = carouselEl.querySelector(".carousel__back-button");
    const nextBtn = carouselEl.querySelector(".carousel__next-button");
    const dots = Array.from(
      carouselEl.querySelectorAll(".carousel__dot-group .dot"),
    );

    const totalSlides = slides.length;
    const trayWidthPct = parseFloat(tray.style.width) || 100;
    const visibleSlides = (totalSlides * 100) / trayWidthPct;
    const maxIndex = Math.max(0, Math.ceil(totalSlides - visibleSlides));
    const stepPct = 100 / totalSlides;

    let currentIndex = 0;

    function goTo(index) {
      if (index > maxIndex) currentIndex = 0;
      else if (index < 0) currentIndex = maxIndex;
      else currentIndex = index;

      const offsetPct = -(currentIndex * stepPct);
      tray.style.transform = `translateX(${offsetPct}%) translateX(0px)`;

      if (dots.length) {
        dots.forEach((d, i) =>
          d.classList.toggle("dot-active", i === currentIndex),
        );
      }
    }

    // Reset to slide 0 on load so no banner starts mid-transition
    goTo(0);

    if (backBtn) {
      backBtn.removeAttribute("disabled");
      backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        goTo(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.removeAttribute("disabled");
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        goTo(currentIndex + 1);
      });
    }

    dots.forEach((dot, dIdx) => {
      dot.style.cursor = "pointer";
      dot.addEventListener("click", () => goTo(dIdx));
    });

    // Auto-play banner carousels with dots
    if (dots.length > 1 && cIdx > 0) {
      setInterval(
        () => {
          goTo(currentIndex + 1);
        },
        5000 + cIdx * 400,
      );
    }
  });
}

/**
 * 3.1 Special Deals Auto Slider (เลื่อนเองทุก 2 วินาที ทีละ 1 ช่อง พร้อม Transition นุ่มนวล ไม่หายไปเฉยๆ)
 */
function initSpecialDealsCarousel() {
  const carousel = document.getElementById("special-deals-carousel") || document.querySelector(".carousel.bDTyuX");
  if (!carousel) return;

  const tray = carousel.querySelector(".sliderTray___-vHFQ");
  if (!tray) return;

  const originalSlides = Array.from(tray.querySelectorAll(":scope > .slide___3-Nqo"));
  const originalCount = originalSlides.length;
  if (originalCount <= 1) return;

  const backBtn = carousel.querySelector(".carousel__back-button");
  const nextBtn = carousel.querySelector(".carousel__next-button");

  // Clone first 5 slides for a 100% seamless, continuous infinite loop (ทำให้เลื่อนวนได้ต่อเนื่อง ไม่หายไปเฉยๆ)
  const cloneCount = Math.min(5, originalCount);
  for (let i = 0; i < cloneCount; i++) {
    const clone = originalSlides[i].cloneNode(true);
    clone.setAttribute("data-clone", "true");
    tray.appendChild(clone);
  }

  const totalSlides = originalCount + cloneCount;
  // 1 slide = 22.2222% of container width (original 10 slides = 222.222%)
  const singleSlidePctOfContainer = 22.2222;
  const newTrayWidthPct = singleSlidePctOfContainer * totalSlides;
  const slideWidthInTray = (100 / totalSlides) + "%";

  tray.style.width = newTrayWidthPct + "%";
  tray.querySelectorAll(":scope > .slide___3-Nqo").forEach((s) => {
    s.style.width = slideWidthInTray;
  });

  const stepPct = 100 / totalSlides;
  let currentIndex = 0;
  let isTransitioning = false;
  let autoPlayTimer = null;

  const TRANSITION_DURATION = 650; // ms: เลื่อนอย่างนุ่มนวล เห็นแอนิเมชันชัดเจน
  const INTERVAL_MS = 2000;         // 2000 ms = เลื่อนทุกๆ 2 วินาที

  tray.style.transition = `transform ${TRANSITION_DURATION / 1000}s cubic-bezier(0.25, 1, 0.5, 1)`;
  tray.style.willChange = "transform";

  function updateTransform() {
    tray.style.transform = `translateX(${-currentIndex * stepPct}%) translateX(0px)`;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    tray.style.transition = `transform ${TRANSITION_DURATION / 1000}s cubic-bezier(0.25, 1, 0.5, 1)`;
    updateTransform();
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    if (currentIndex <= 0) {
      tray.style.transition = "none";
      currentIndex = originalCount;
      updateTransform();
      void tray.offsetHeight; // force reflow
    }
    requestAnimationFrame(() => {
      currentIndex--;
      tray.style.transition = `transform ${TRANSITION_DURATION / 1000}s cubic-bezier(0.25, 1, 0.5, 1)`;
      updateTransform();
    });
  }

  // เมื่อเลื่อนผ่านการ์ดตัวสุดท้ายไปยังตัว Clone ให้สลับกลับมาตัวแรกแบบไร้รอยต่อ (Seamless Infinite Loop)
  tray.addEventListener("transitionend", () => {
    if (currentIndex >= originalCount) {
      tray.style.transition = "none";
      currentIndex = 0;
      updateTransform();
      void tray.offsetHeight; // force reflow
      tray.style.transition = `transform ${TRANSITION_DURATION / 1000}s cubic-bezier(0.25, 1, 0.5, 1)`;
    }
    isTransitioning = false;
  });

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // หยุดเลื่อนอัตโนมัติเมื่อนำเมาส์ไปชี้ เพื่อให้ผู้ใช้ดูสินค้าหรือกดคลิกได้สะดวก
  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  if (nextBtn) {
    nextBtn.removeAttribute("disabled");
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      nextSlide();
      startAutoPlay();
    });
  }

  if (backBtn) {
    backBtn.removeAttribute("disabled");
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      prevSlide();
      startAutoPlay();
    });
  }

  // เริ่มต้นการเลื่อนอัตโนมัติ
  startAutoPlay();
}

/**
 * 4. Special Deals Live Countdown Timer
 */
function initFlashSaleCountdown() {
  const boxes = document.querySelectorAll(".countdown-timer .countdown-box");
  if (boxes.length < 4) return;

  const numEls = Array.from(boxes).map((b) =>
    b.querySelector("span:first-child"),
  );
  let totalSecs =
    (parseInt(numEls[0]?.textContent || "9", 10) || 9) * 86400 +
    (parseInt(numEls[1]?.textContent || "16", 10) || 16) * 3600 +
    (parseInt(numEls[2]?.textContent || "9", 10) || 9) * 60 +
    (parseInt(numEls[3]?.textContent || "31", 10) || 31);

  function updateCardsTime(d, h, m, s) {
    const timeStr = `${d}D ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    document.querySelectorAll(".flash-sale-right").forEach((el) => {
      el.textContent = timeStr;
    });
  }

  // อัปเดตเวลาครั้งแรกทันที
  const initD = Math.floor(totalSecs / 86400);
  const initH = Math.floor((totalSecs % 86400) / 3600);
  const initM = Math.floor((totalSecs % 3600) / 60);
  const initS = totalSecs % 60;
  updateCardsTime(initD, initH, initM, initS);

  setInterval(() => {
    if (totalSecs > 0) totalSecs--;
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    if (numEls[0]) numEls[0].textContent = String(d);
    if (numEls[1]) numEls[1].textContent = String(h);
    if (numEls[2]) numEls[2].textContent = String(m);
    if (numEls[3]) numEls[3].textContent = String(s);

    updateCardsTime(d, h, m, s);
  }, 1000);
}

/**
 * 5. สาขา iHAVECPU Pager & Expandable Branch Cards
 */
function initStoreSectionPaging() {
  const arrowRight = document.querySelector('button[name="arrowRight"]');
  if (!arrowRight) return;

  const wrapper = arrowRight.parentElement;
  const track = wrapper
    ? wrapper.querySelector('div[style*="translate3d"]')
    : null;
  if (!track) return;

  const pages = track.children.length || 6;
  let currentPage = 0;

  track.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";

  arrowRight.addEventListener("click", () => {
    currentPage = (currentPage + 1) % pages;
    track.style.transform = `translate3d(-${currentPage * 100}%, 0px, 0px)`;
  });

  // Allow clicking any store card to expand its address/Line/Map details
  const storesData = window.IHAVECPU_BUNDLE?.listStore || [];
  const cards = track.querySelectorAll(
    'div[style*="height:80px"], div[style*="height: 80px"]',
  );
  cards.forEach((card, idx) => {
    const storeInfo = storesData[idx];
    if (
      storeInfo &&
      storeInfo.stockists_desc_th &&
      !card.querySelector(".store-extra-desc")
    ) {
      const extra = document.createElement("div");
      extra.className = "store-extra-desc";
      extra.style.cssText =
        "margin-top:8px;font-size:12.5px;color:#555;border-top:1px solid #eee;padding-top:6px;";
      extra.innerHTML = storeInfo.stockists_desc_th;
      card.firstElementChild?.appendChild(extra);
    }

    card.addEventListener("click", () => {
      const isExpanded = card.style.height === "auto";
      cards.forEach((c) => {
        c.style.height = "80px";
      });
      if (!isExpanded) {
        card.style.height = "auto";
      }
    });
  });
}

/**
 * 6. SEO Intro Box Read More Toggle
 */
function initSeoToggle() {
  const container = document.querySelector(".styles_container__tomjW");
  if (!container) return;
  const btn = container.querySelector("button");
  const p = container.querySelector("p");
  if (!btn || !p) return;

  let expanded = false;
  btn.addEventListener("click", () => {
    expanded = !expanded;
    p.style.maxHeight = expanded ? "none" : "";
    p.style.webkitLineClamp = expanded ? "unset" : "";
    btn.textContent = expanded ? "ย่อข้อความ" : "อ่านเพิ่มเติม";
  });
}

/**
 * Format Price Helper
 */
function formatBaht(val) {
  const num = parseFloat(val) || 0;
  return (
    "฿" +
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Render standard 3x3 Product Card HTML (matches exact styled-components classes)
 */
function buildStandardCardHtml(item, showSpecsTable = false) {
  const priceSale = parseFloat(item.price_sale || 0);
  const priceBefore = parseFloat(item.price_before || 0);
  const hasDiscount = item.discount && priceBefore > priceSale;
  const cleanGuide = (item.size_guide_th || "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .trim();

  let bottomHtml = "";
  if (item.cpuSpecs) {
    bottomHtml = renderCpuCardSpecs(item.cpuSpecs);
  } else if (item.pcSpecs) {
    bottomHtml = renderPcSetSpecs(item.pcSpecs);
  } else if (item.notebookSpecs) {
    const specs = item.notebookSpecs.replace(/[&<>"]/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;",
    })[char]);
    bottomHtml = `<div class="notebook-card-specs" title="${specs}">${specs}</div>`;
  } else if (
    showSpecsTable &&
    Array.isArray(item.property) &&
    item.property.length > 0
  ) {
    const rows = item.property
      .slice(0, 2)
      .map((prop) => {
        const val =
          Array.isArray(prop.detail) && prop.detail[0]
            ? prop.detail[0].name_th
            : "-";
        return `<div cursor="unset" class="sc-671425b7-0 sc-63978ac8-0 sc-9450aca3-5 hGzReW iODaJx fZHvio"><span class="label">${prop.filter_text || prop.name_th}</span><span class="value">${val}</span></div>`;
      })
      .join("");
    bottomHtml = `<div cursor="unset" class="sc-671425b7-0 gTDBwi">${rows}</div>`;
  } else if (cleanGuide) {
    bottomHtml = `<div style="height: 3.5rem; margin-bottom: 0rem; overflow: hidden; cursor: pointer; width: 100%;"><span font-size="12px" font-weight="100" color="text.secondary" class="sc-96a18268-0 hTkHfd" style="text-align: left; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">${cleanGuide}</span></div>`;
  }

  return `
    <div spacing="6" class="sc-3f18f585-0 ewceoS" style="padding: 0.35rem;">
      <div cursor="unset" class="sc-671425b7-0 sc-a8a7b0bb-0 sc-9450aca3-0 dmoqKi dqptNV fFqkzh">
        <button class="sc-86b57026-0 sc-9450aca3-3 cFDNiF bAuRp wishlist-btn" aria-label="Toggle Wishlist">${HEART_SVG}</button>
        <a href="${item.url || 'https://www.jib.co.th/web/'}" style="text-decoration: none; color: inherit; display: block;">
          ${hasDiscount ? `<div font-size="12px" font-weight="600" color="ihavecpu.text" class="sc-950339a4-0 dxjDKr">${item.discount}</div>` : ""}
          <div cursor="unset" class="sc-671425b7-0 sc-9450aca3-1 hGzReW iykgWA">
            <div cursor="unset" class="sc-671425b7-0 sc-9450aca3-2 hGzReW bpSIhB">
              <img src="${item.image}" alt="${item.name_th || ""}" style="width: 100%; height: 100%; object-fit: contain;" />
            </div>
            <div display="flex" cursor="unset" class="sc-671425b7-0 kIGLwb">
              <h3 font-size="14px" font-weight="700" color="#1a202c" class="sc-96a18268-0 ErNXg" style="line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;">${item.name_th || ""}</h3>
              <div cursor="unset" class="sc-671425b7-0 sc-63978ac8-0 dXeyHt bXKJgC">
                <span font-size="18px" font-weight="800" color="#d62127" class="sc-96a18268-0 jdVZbW">${formatBaht(priceSale)}</span>
                ${hasDiscount ? `<span font-size="0.75rem" color="secondary.main" font-weight="100" class="sc-96a18268-0 iwLQlM"><del>${formatBaht(priceBefore)}</del></span>` : ""}
              </div>
            </div>
          </div>
        </a>
        <a href="javascript:void(0)" style="text-decoration: none; color: inherit; display: block;">
          ${bottomHtml}
        </a>
      </div>
    </div>
  `;
}

/**
 * 7. คอมพิวเตอร์เซตโปรโมชั่นประจำเดือน Interactive Tabs
 */
function initPcSetSectionTabs() {
  const heading = Array.from(document.querySelectorAll("h2")).find(
    (h) => h.textContent.trim() === "คอมพิวเตอร์เซตโปรโมชั่นประจำเดือน",
  );
  if (!heading) return;

  const sectionRow =
    heading.closest(".sc-bd0e7be3-0") ||
    heading.parentElement?.parentElement?.parentElement;
  if (!sectionRow) return;

  const sidebar = sectionRow.querySelector(".sc-25e0596f-0 .bQkqWd");
  const toggleBox = sectionRow.querySelector(".sc-f68a7e42-0");
  const grid = sectionRow.querySelector(".sc-3f18f585-0.BgiRi");
  const rightHeading = sectionRow.querySelector("h3.sc-96a18268-0");
  if (!sidebar || !toggleBox || !grid) return;

  const bundle = window.IHAVECPU_BUNDLE || {};
  const groups = bundle.categorySetComputer || [];
  let activeType = "M";

  function bindSidebarItems(itemsData) {
    const itemEls = Array.from(sidebar.querySelectorAll(".sc-1c2ff882-0"));
    itemEls.forEach((el, idx) => {
      el.style.cursor = "pointer";
      el.onclick = () => {
        const info = itemsData[idx];
        if (!info) return;

        itemEls.forEach((other, oIdx) => {
          const titleSpan = other.querySelector(".product-category-title");
          if (oIdx === idx) {
            other.classList.add("LRVmz");
            other.classList.remove("hRwSpY");
            if (titleSpan) titleSpan.style.color = "rgb(212, 0, 26)";
          } else {
            other.classList.remove("LRVmz");
            other.classList.add("hRwSpY");
            if (titleSpan) titleSpan.style.color = "#2B3445";
          }
        });

        const prefix = activeType === "M" ? "Set Monthly" : "Set Promotion";
        if (rightHeading)
          rightHeading.textContent = `${prefix} (${info.title_th})`;

        const products = bundle.pcSetsByCategoryId?.[info.categoryID] || [];
        if (products.length > 0) {
          grid.innerHTML = products
            .map((p) => buildStandardCardHtml(p, false))
            .join("");
        }
      };
    });
  }

  // Bind initial Campaign M items
  const groupM = groups.find((g) => g.campaign_type === "M");
  if (groupM) bindSidebarItems(groupM.itemsData || []);

  // Bind M / P Toggle labels
  const labels = Array.from(toggleBox.querySelectorAll("button.sc-f68a7e42-1"));
  const pill = toggleBox.querySelector(".sc-f68a7e42-2");
  labels.forEach((lbl, lIdx) => {
    lbl.style.cursor = "pointer";
    lbl.addEventListener("click", (e) => {
      e.preventDefault();
      activeType = lIdx === 0 ? "M" : "P";
      labels.forEach((button) => button.setAttribute("aria-pressed", String(button === lbl)));
      if (pill) {
        pill.style.transform =
          lIdx === 0 ? "translateX(0)" : "translateX(100%)";
      }

      const grp = groups.find((g) => g.campaign_type === activeType);
      const itemsData = grp?.itemsData || [];

      // Remove old items and render new sub-campaign items
      sidebar.querySelectorAll(".sc-1c2ff882-0").forEach((el) => el.remove());
      itemsData.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = `sc-671425b7-0 sc-1c2ff882-0 ${i === 0 ? "LRVmz" : "hRwSpY"} kTEBmA`;
        div.style.padding = "0.65rem 1rem";
        div.style.cursor = "pointer";
        div.innerHTML = `
          <span style="box-sizing:border-box;display:inline-block;overflow:hidden;width:30px;height:30px;position:relative;flex-shrink:0;">
            <img alt="${item.title_th}" src="${item.icon}" style="border-radius:8px;width:30px;height:30px;object-fit:cover;" />
          </span>
          <span class="product-category-title" style="font-size:14px;color:${i === 0 ? "rgb(212, 0, 26)" : "#2B3445"};margin-left:1rem;">${item.title_th}</span>
        `;
        sidebar.appendChild(div);
      });

      bindSidebarItems(itemsData);
      const firstEl = sidebar.querySelector(".sc-1c2ff882-0");
      if (firstEl) firstEl.click();
    });
  });
}

/**
 * 8. โน๊ตบุ๊ค Brand Filter Tabs
 */
function initNotebookSectionTabs() {
  const heading = Array.from(document.querySelectorAll("h2")).find(
    (h) => h.textContent.trim() === "โน๊ตบุ๊ค",
  );
  if (!heading) return;

  const sectionRow =
    heading.closest(".sc-bd0e7be3-0") ||
    heading.parentElement?.parentElement?.parentElement;
  if (!sectionRow) return;

  const sidebar = sectionRow.querySelector(".sc-25e0596f-0 .bQkqWd");
  const grid = sectionRow.querySelector(".sc-3f18f585-0.BgiRi");
  const rightHeading = sectionRow.querySelector("h3.sc-96a18268-0");
  if (!sidebar || !grid) return;

  const bundle = window.IHAVECPU_BUNDLE || {};
  const brands = bundle.categorySetBrandNotebook || [];
  const itemEls = Array.from(sidebar.querySelectorAll(".sc-1c2ff882-0"));

  itemEls.forEach((el, idx) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      itemEls.forEach((other, oIdx) => {
        const titleSpan = other.querySelector(".product-category-title");
        if (oIdx === idx) {
          other.classList.add("gsogrY");
          other.classList.remove("ipDusz");
          if (titleSpan) titleSpan.style.color = "rgb(212, 0, 26)";
        } else {
          other.classList.remove("gsogrY");
          other.classList.add("ipDusz");
          if (titleSpan) titleSpan.style.color = "#2B3445";
        }
      });

      if (idx === 0) {
        if (rightHeading) rightHeading.textContent = "Notebook";
        const list = bundle.notebooksDefault || [];
        if (list.length)
          grid.innerHTML = list
            .map((p) => buildStandardCardHtml(p, false))
            .join("");
      } else {
        const brandInfo = brands[idx - 1];
        if (!brandInfo) return;
        if (rightHeading) rightHeading.textContent = brandInfo.brand_name_th;
        const list = bundle.notebooksByBrandId?.[brandInfo.brandID] || [];
        if (list.length)
          grid.innerHTML = list
            .map((p) => buildStandardCardHtml(p, false))
            .join("");
      }
    });
  });
  if (bundle.notebooksDefault?.length) itemEls[0]?.click();
}

/**
 * 9. สินค้า DIY ของ iHAVECPU Category Tabs
 */
function initDiySectionTabs() {
  const heading = Array.from(document.querySelectorAll("h2")).find(
    (h) => h.textContent.trim() === "สินค้า DIY ของ JIB",
  );
  if (!heading) return;

  const sectionRow =
    heading.closest(".sc-bd0e7be3-0") ||
    heading.parentElement?.parentElement?.parentElement;
  if (!sectionRow) return;

  const sidebar = sectionRow.querySelector(".sc-25e0596f-0 .bQkqWd");
  const grid = sectionRow.querySelector(".sc-3f18f585-0.BgiRi");
  const rightHeading = sectionRow.querySelector("h3.sc-96a18268-0");
  if (!sidebar || !grid) return;

  const diyCategoryIds = [9, 28, 30, 29, 45, 48, 34, 49, 50, 47];
  const bundle = window.IHAVECPU_BUNDLE || {};
  const itemEls = Array.from(
    sidebar.querySelectorAll(":scope > .sc-1c2ff882-0"),
  );

  itemEls.forEach((el, idx) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      itemEls.forEach((other, oIdx) => {
        const titleSpan = other.querySelector(".product-category-title");
        if (oIdx === idx) {
          other.classList.add("gsogrY");
          other.classList.remove("ipDusz");
          if (titleSpan) titleSpan.style.color = "rgb(212, 0, 26)";
        } else {
          other.classList.remove("gsogrY");
          other.classList.add("ipDusz");
          if (titleSpan) titleSpan.style.color = "#2B3445";
        }
      });

      const catId = diyCategoryIds[idx] || 9;
      const titleText =
        el.querySelector(".product-category-title")?.textContent || "ซีพียู";
      if (rightHeading) rightHeading.textContent = titleText;

      const list = bundle.diyByCategoryId?.[catId] || [];
      if (list.length) {
        grid.innerHTML = list
          .map((p) => buildStandardCardHtml(p, true))
          .join("");
      }
    });
  });
}

/**
 * 10. อุปกรณ์เสริม Horizontal Tabs
 */
function initAccessoriesSectionTabs() {
  const labels = Array.from(document.querySelectorAll("label.sc-c74f6a1c-2"));
  const indicator = document.querySelector("span.sc-c74f6a1c-3");
  if (!labels.length) return;

  const accSection = labels[0].closest(".sc-bd0e7be3-0");
  const tray = accSection
    ? accSection.querySelector(".sliderTray___-vHFQ")
    : null;
  const bundle = window.IHAVECPU_BUNDLE || {};
  const additionKeys = ["all", "156", "254", "86", "77", "101"];

  labels.forEach((lbl, idx) => {
    lbl.style.cursor = "pointer";
    lbl.addEventListener("click", (e) => {
      e.preventDefault();
      if (indicator) {
        indicator.style.transform = `translateX(${idx * 100}%)`;
      }

      const key = additionKeys[idx] || "all";
      const items =
        bundle.accessoriesByAddition?.[key] ||
        bundle.accessoriesByAddition?.["all"] ||
        [];
      if (tray && items.length > 0) {
        const pct = (100 / items.length).toFixed(4);
        tray.style.width = `${(items.length / 4.5) * 100}%`;
        tray.style.transform = "translateX(0%) translateX(0px)";
        tray.innerHTML = items
          .map(
            (item) => `
          <div tabindex="0" aria-selected="true" aria-label="slide" role="option" class="slide___3-Nqo slideHorizontal___1NzNV carousel__slide carousel__slide--visible" style="width: ${pct}%; padding-bottom: unset; height: unset;">
            <div class="slideInner___2mfX9 carousel__inner-slide" style="position: unset;">
              <div height="100%" width="100%" display="flex" cursor="unset" class="sc-671425b7-0 hgussb">
                <div cursor="unset" class="sc-671425b7-0 sc-a8a7b0bb-0 sc-9450aca3-0 dmoqKi dqptNV fFqkzh">
                  <button class="sc-86b57026-0 sc-9450aca3-3 cFDNiF bAuRp wishlist-btn" aria-label="Toggle Wishlist">${HEART_SVG}</button>
                  <a href="${item.url || 'https://www.jib.co.th/web/'}" style="text-decoration: none; color: inherit; display: block;">
                    <div cursor="unset" class="sc-671425b7-0 sc-9450aca3-1 hGzReW iykgWA">
                      <div cursor="unset" class="sc-671425b7-0 sc-9450aca3-2 hGzReW esoikI">
                        <img src="${item.image}" alt="${item.name_th || ""}" style="width: 100%; height: 100%; object-fit: contain;" />
                      </div>
                      <div display="flex" cursor="unset" class="sc-671425b7-0 hNsEGU">
                        <h3 font-size="13px" font-weight="700" color="#1a202c" class="sc-96a18268-0 tluWT" style="line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">${item.name_th || ""}</h3>
                        <div cursor="unset" class="sc-671425b7-0 sc-63978ac8-0 dXeyHt bXKJgC">
                          <span font-size="16px" font-weight="800" color="#d62127" class="sc-96a18268-0 fKUeoc">${formatBaht(item.price_sale)}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `,
          )
          .join("");
      }
    });
  });
}

/**
 * 11. Wishlist Heart Toggle & Search Input
 */
function initWishlistAndSearch() {
  document.body.addEventListener("click", (e) => {
    const wishBtn = e.target.closest(".wishlist-btn");
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      const active = wishBtn.classList.toggle("is-active");
      showToast(
        active
          ? "เพิ่มสินค้าลงในรายการโปรดแล้ว"
          : "นำสินค้าออกจากรายการโปรดแล้ว",
      );
    }
  });

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (q) {
          showToast(`ผลการค้นหาสำหรับ: "${q}" (ระบบจำลอง Mockup)`);
        }
      }
    });
  }

  // Global Mockup Link Click Interceptor
  // ป้องกันการกดลิงก์แล้วนำทางออกไปยังเว็บไซต์ภายนอก (ihavecpu) ทำให้ทั้งเว็บทำงานเป็น Mockup 100%
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = (link.getAttribute("href") || "").trim();
    if (
      href === "javascript:void(0)" ||
      href === "#" ||
      href === "" ||
      href.toLowerCase().includes("ihavecpu.com")
    ) {
      e.preventDefault();
    }
  });
}

let toastTimeout = null;
function showToast(msg) {
  const el = document.getElementById("ihcToastMsg");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("is-visible");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    el.classList.remove("is-visible");
  }, 2400);
}
