# 🖥️ IhaveJib — เว็บไซต์ร้านจำหน่ายคอมพิวเตอร์และอุปกรณ์ไอที
> **โครงงานพัฒนาเว็บไซต์พาณิชย์อิเล็กทรอนิกส์ (Frontend Web Application)**  
> พัฒนาขึ้นโดยจำลองและปรับปรุงโครงสร้างจากเว็บไซต์จำหน่ายคอมพิวเตอร์ชั้นนำ (iHAVECPU / JIB) ครบวงจรทั้งความสวยงาม ฟังก์ชันการใช้งาน และการรองรับทุกขนาดหน้าจอ

---

## 📌 1. ภาพรวมโครงงาน (Project Overview)
โครงงานนี้เป็นการพัฒนาเว็บแอปพลิเคชันฝั่งผู้ใช้งาน (Frontend) สำหรับร้านค้าคอมพิวเตอร์และอุปกรณ์ไอที โดยใช้ HTML, CSS และ Pure Vanilla JavaScript ES6

### วัตถุประสงค์ (Objectives)
1. **ศึกษาและพัฒนาสถาปัตยกรรมหน้าเว็บพาณิชย์อิเล็กทรอนิกส์**: การจัดแบ่งหมวดหมู่สินค้า, แบนเนอร์โปรโมชั่น, ดีลพิเศษ Flash Sale, และระบบค้นหา
2. **การออกแบบที่รองรับทุกขนาดอุปกรณ์ (Responsive Web Design)**: แสดงผลอย่างสวยงามและเป็นระเบียบตั้งแต่หน้าจอมือถือ (Mobile 320px+), แท็บเล็ต (Tablet 768px+) ไปจนถึงหน้าจอคอมพิวเตอร์ขนาดใหญ่ (Desktop 1440px+)
3. **การทำงานแบบ Offline / Standalone**: มีชุด Assets รูปภาพและ SVG Icons ในเครื่องครบถ้วน สามารถเปิดใช้งานผ่าน Local Web Server หรือ XAMPP ได้ทันทีโดยไม่ต้องพึ่งพาบริการภายนอก

---

## 📁 2. โครงสร้างไฟล์ในโปรเจกต์ (Project Directory Structure)

```text
IhaveJib/
├── 📄 index.html              # ไฟล์หน้าเว็บหลัก (HTML5) จัดแบ่งเป็น 18 Section ชัดเจน
├── 📄 README.md               # เอกสารอธิบายโครงงานและวิธีเปิดใช้งาน
├── 📄 package.json            # ไฟล์ตั้งค่า Node.js dependencies และคำสั่งรันระบบ
├── 📄 server.js               # Node.js Express Web Server สำหรับจำลอง Server
├── 📄 run.bat                 # สคริปต์เปิดใช้งานโปรเจกต์แบบคลิกเดียวบน Windows
│
├── 📂 assets/                 # ไฟล์ทรัพยากรมีเดียทั้งหมด
│   └── 📂 images/             # ภาพสินค้า แบนเนอร์สไลด์ โลโก้แบรนด์
│       └── 📂 icons/          # ไอคอน SVG สำหรับปุ่มและเมนู (51 ไฟล์)
│
├── 📂 css/                    # ไฟล์สไตล์ชีท
│   └── 📄 style.css           # สไตล์ชีทหลักของเว็บไซต์ (CSS3 Master)
│
├── 📂 css/                    # ไฟล์ CSS ที่หน้าเว็บใช้งานโดยตรง
│   └── 📄 style.css           # สไตล์หลักของเว็บไซต์
│
└── 📂 js/                     # สคริปต์ควบคุมการทำงาน (JavaScript)
    ├── 📄 main.js             # ควบคุม Interactive UI ทั้งหมด (11 โมดูลการทำงาน)
    └── 📄 data.js             # ชุดข้อมูลจำลองสินค้าและหมวดหมู่ (Mock Data Store)
```

---

## 📑 3. โครงสร้างเนื้อหาในหน้าเว็บ (Index Sections Breakdown)
ภายในไฟล์ [`index.html`](index.html) มีการใส่ Comment ระบุจุดเริ่มต้นและหน้าที่ของแต่ละส่วน (Section) ไว้อย่างชัดเจน เพื่อให้อาจารย์และผู้ตรวจโค้ดตรวจสอบได้สะดวก:

| หมายเลข Section | ชื่อส่วนประกอบ | หน้าที่และความรับผิดชอบ |
| :---: | :--- | :--- |
| **Section 1** | `TOPBAR` | ข้อมูลติดต่อด่วน, เบอร์โทรศัพท์, อีเมล, ลิงก์สาขาใกล้เคียง |
| **Section 2** | `MAIN HEADER` | โลโก้แบรนด์, ช่องค้นหาสินค้า (Search Box), ตะกร้าสินค้า, เมนูผู้ใช้ |
| **Section 3** | `MAIN NAVIGATION BAR` | แถบเมนูนำทางหลัก และปุ่มเลือกดูหมวดหมู่สินค้า (Dropdown Mega Menu) |
| **Section 4** | `HERO BANNER CAROUSEL` | สไลด์แบนเนอร์ภาพโปรโมชั่นหลักหน้าแรกแบบเลื่อนอัตโนมัติ |
| **Section 5** | `BRAND PARTNERS` | โลโก้แบรนด์พาร์ทเนอร์ชั้นนำ (ASUS, Intel, MSI, Gigabyte, etc.) |
| **Section 6** | `SPECIAL DEALS / FLASH SALE` | สินค้าลดราคาพิเศษพร้อมนาฬิกานับเวลาถอยหลัง (Countdown Timer) |
| **Section 7** | `NEW ARRIVALS` | รายการสินค้าไอทีมาใหม่ล่าสุด |
| **Section 8** | `STORE LOCATIONS` | แผนกสาขา iHAVECPU ทั่วประเทศ พร้อมปุ่มแบ่งหน้าดูรายชื่อสาขา |
| **Section 9** | `POPULAR CATEGORIES` | ไอคอนหมวดหมู่สินค้ายอดนิยม (CPU, VGA, RAM, Monitor ฯลฯ) |
| **Section 10**| `BY-ORDER PRODUCTS` | สินค้าสั่งจองล่วงหน้า By Order |
| **Section 11**| `YOUTUBE MEDIA` | คลิปวิดีโอรีวิวและแกะกล่องสินค้าจากช่อง YouTube |
| **Section 12**| `PC SETS` | ชุดคอมพิวเตอร์ประกอบโปรโมชั่นประจำเดือน พร้อมแท็บสลับสเปก |
| **Section 13**| `NOTEBOOKS` | โน้ตบุ๊กทำงาน เกมมิ่งโน้ตบุ๊ก และอัลตร้าบุ๊ก |
| **Section 14**| `DIY PC BUILDER PROMOTION` | ส่วนแนะนำบริการจัดสเปกคอมพิวเตอร์ DIY ตามงบประมาณ |
| **Section 15**| `DIY PC COMPONENTS` | รายการชิ้นส่วนอุปกรณ์สำหรับประกอบคอมพิวเตอร์ |
| **Section 16**| `ACCESSORIES & GAMING GEAR` | อุปกรณ์ต่อพ่วง เกมมิ่งเกียร์ เก้าอี้เกมมิ่ง และโต๊ะคอม |
| **Section 17**| `ARTICLES & KNOWLEDGE` | บทความความรู้ด้านไอที เทคนิคการเลือกอุปกรณ์ และข่าวสาร |
| **Section 18**| `FOOTER` | ข้อมูลบริษัท, เลขทะเบียนพาณิชย์, ช่องทางติดต่อ, เงื่อนไข และลิขสิทธิ์ |

---

## ⚡ 4. ระบบการทำงานฝั่ง JavaScript (`js/main.js`)
ไฟล์สคริปต์หลักเขียนด้วยมาตรฐาน JavaScript ES6+ โดยแบ่งเป็น 11 ฟังก์ชันย่อยที่ทำงานแยกกันอย่างเป็นระบบ:

1. **`initPromotionPopup()`**: ควบคุมหน้าต่าง Popup โปรโมชั่นต้อนรับลูกค้า (เปิด/ปิดด้วยปุ่มกากบาท, คลิกพื้นหลัง หรือกดปุ่ม Escape)
2. **`initStickyHeaderAndDropdowns()`**: ตรวจจับการเลื่อน Scroll เพื่อให้ Header ติดด้านบนหน้าจอ (Sticky Navigation) และจัดการเปิด/ปิดเมนู Dropdown
3. **`initAllCarousels()`**: ควบคุมการเลื่อนสไลด์แบนเนอร์สินค้า ทั้งการกดปุ่มซ้าย-ขวา (Prev/Next) และการเลื่อนอัตโนมัติ
4. **`initFlashSaleCountdown()`**: คำนวณและนับเวลาถอยหลังแบบ Real-time แสดงผล ชั่วโมง : นาที : วินาที
5. **`initStoreSectionPaging()`**: ระบบแบ่งหน้า (Pagination) สำหรับเลือกดูรายชื่อสาขา
6. **`initSeoToggle()`**: ปุ่มสลับ ยุบ/ขยาย กล่องข้อความบทความ SEO บริเวณด้านล่าง
7. **`initPcSetSectionTabs()`**: ระบบสลับ Tab สินค้าหมวดคอมพิวเตอร์เซ็ต
8. **`initNotebookSectionTabs()`**: ระบบสลับ Tab สินค้าหมวดโน้ตบุ๊ก
9. **`initDiySectionTabs()`**: ระบบสลับ Tab สินค้าชิ้นส่วนอุปกรณ์ DIY
10. **`initAccessoriesSectionTabs()`**: ระบบสลับ Tab สินค้าอุปกรณ์เสริมและเกมมิ่งเกียร์
11. **`initWishlistAndSearch()`**: ฟังก์ชันกดปุ่มหัวใจ (Wishlist) และระบบกรองคำค้นหาใน Search Bar

---

## 🚀 5. วิธีการเปิดใช้งานโครงงาน (How to Run)

สามารถเปิดใช้งานได้ 2 รูปแบบตามความสะดวกของผู้ตรวจโครงงาน:

### รูปแบบที่ 1: รันผ่าน XAMPP (Apache Web Server) — *แนะนำสำหรับการส่งงานวิชา Web*
1. เปิดโปรแกรม **XAMPP Control Panel**
2. กดปุ่ม **Start** ที่โมดูล **Apache**
3. เปิดเว็บเบราว์เซอร์ (Chrome, Edge หรือ Firefox) แล้วเข้าไปที่:
   ```text
   http://localhost/IhaveJib/
   ```

### รูปแบบที่ 2: รันผ่าน Node.js Local Server
1. ดับเบิลคลิกที่ไฟล์ **`run.bat`** ในโฟลเดอร์โปรเจกต์ (ระบบจะเปิด Server อัตโนมัติ)
2. หรือเปิด Command Prompt / PowerShell ในโฟลเดอร์โปรเจกต์ แล้วพิมพ์:
   ```bash
   npm start
   ```
3. เปิดเว็บเบราว์เซอร์ไปที่:
   ```text
   http://localhost:3000/
   ```

---

## 🛠️ 6. เทคโนโลยีที่นำมาใช้ (Technologies Used)
- **HTML5**: โครงสร้างแบบ Semantic Elements ครบถ้วนตามมาตรฐาน W3C
- **CSS3**: จัดเลย์เอาต์ด้วย Flexbox, CSS Grid และมี Media Queries รองรับ Responsive Design
- **JavaScript (Vanilla ES6+)**: เขียนด้วย JavaScript บริสุทธิ์โดยไม่ต้องพึ่ง Library ขนาดใหญ่ เพื่อความเร็วและความเข้าใจแก่นแท้ของ DOM
- **Node.js & Express**: ใช้เป็น Local Development Server สำหรับจำลองสภาพแวดล้อม Production
- **Google Fonts**: ฟอนต์ภาษาไทย `Noto Sans Thai` และ `Noto Sans Thai Looped` ทำให้อ่านง่าย สบายตา สวยงามสไตล์โมเดิร์น

---

## 📞 7. ข้อมูลติดต่อ (Official Contact Information)
- **บริษัท เจ.ไอ.บี. คอมพิวเตอร์ กรุ๊ป จำกัด (สำนักงานใหญ่)**
  - **ที่อยู่**: เลขที่ 21 ถนนพหลโยธิน แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร 10210
  - **โทรศัพท์**: 02-017-4444 (ให้บริการทุกวัน ตลอด 24 ชั่วโมง)
  - **เว็บไซต์**: [www.jib.co.th](https://www.jib.co.th/)
  - **LINE ID**: [@jibonline](https://page.line.me/jibonline)
- **ช่องทางโซเชียล**:
  - **Facebook**: [JIB Computer Group](https://www.facebook.com/JIBCOMPUTERGROUP)
  - **Instagram**: [jib.online](https://www.instagram.com/jib.online)
  - **YouTube**: [JIB Channel](https://www.youtube.com/@JIBChannel)
  - **TikTok**: [@jibofficial](https://www.tiktok.com/@jibofficial)
- **ฝ่ายบริการลูกค้าและบริการหลังการขาย**:
  - **ตรวจสอบการรับประกัน**: [JIB Warranty Check](https://www.jib.co.th/web/checkserial/warranty)
  - **ตรวจสอบสถานะการเคลม**: [JIB Claim](https://www.jib.co.th/web/claim/claim_form)
  - **ร้องเรียนหรือแนะนำบริการ**: [JIB Contact](https://www.jib.co.th/web/contact/appeal/)
  - **ค้นหาสาขาใกล้บ้าน**: [JIB Branch Locator](https://www.jib.co.th/web/branch)

