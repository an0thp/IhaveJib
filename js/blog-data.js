const makeJibArticle = (id, type, title, image, date, category) => ({
  id: String(id),
  title,
  image,
  date,
  category,
  url: `https://www.jib.co.th/web/article_news/detail/${id}/${type ? `${type}/` : ""}${encodeURIComponent(title)}`
});

window.JIB_BLOG_SOURCE = "https://www.jib.co.th/web/";
window.JIB_BLOG_ARTICLES = [
  makeJibArticle(8249, "", "7 แอป ตรวจสอบสภาพอากาศใกล้ตัว", "https://www.jib.co.th/img_master/contents/original/20260525152026_1.jpg", "2026-05-25", "ไลฟ์สไตล์"),
  makeJibArticle(8234, "", "เกมเด็ดจาก PC สู่มือถือที่คนนิยมเล่นในตอนนี้", "https://www.jib.co.th/img_master/contents/original/20260516135608_1.jpg", "2026-05-16", "เกมและไลฟ์สไตล์"),
  makeJibArticle(8229, "17", "ช่องฟรีทีวียอดฮิตในประเทศไทย ดูฟรี ไม่ต้องสมัคร รวมรายการดังของแต่ละช่อง ดูสดตลอด 24 ชั่วโมง", "https://www.jib.co.th/img_master/contents/original/20260513161613_1.jpg", "2026-05-13", "ไลฟ์สไตล์"),
  makeJibArticle(8228, "", "เช็กลิสต์ความปัง หนังฟอร์มยักษ์แห่งปี 2026", "https://www.jib.co.th/img_master/contents/original/20260513153603_1.jpg", "2026-05-13", "เกมและไลฟ์สไตล์"),
  makeJibArticle(8217, "", "จาก 802.11b สู่ Wi-Fi 7 วิวัฒนาการที่แรงขึ้นเกือบ 4,000 เท่า", "https://www.jib.co.th/img_master/contents/original/20260506115828_1.jpg", "2026-05-06", "เทคโนโลยี"),
  makeJibArticle(8198, "17", "PASSKEY คืออะไร มาตรฐานใหม่ในการเข้าสู่ระบบที่สะดวกและปลอดภัย", "https://www.jib.co.th/img_master/contents/original/20260422171123_1.jpg", "2026-04-22", "เทคโนโลยี"),
  makeJibArticle(8194, "", "เคล็ดลับ วิธีดูแลมือถือในหน้าร้อน", "https://www.jib.co.th/img_master/contents/original/20260421115436_1.jpg", "2026-04-21", "How-to"),
  makeJibArticle(8163, "", "คอมช้า เครื่องค้างบ่อย? เช็กว่า RAM เต็มหรือไม่ พร้อมวิธีเพิ่มประสิทธิภาพ", "https://www.jib.co.th/img_master/contents/original/20260325133707_1.jpg", "2026-03-25", "How-to"),
  makeJibArticle(8158, "17", "เช็ค RAM ในคอมพิวเตอร์แบบง่ายๆ ทั้ง Windows และ Mac ดูความจุ ความเร็ว และรุ่นที่ใช้", "https://www.jib.co.th/img_master/contents/original/20260324130758_1.jpg", "2026-03-24", "How-to"),
  makeJibArticle(8156, "", "DDR4 vs DDR5 ต่างกันแค่ไหน? คุ้มไหมที่จะอัปเกรดในปี 2026?", "https://www.jib.co.th/img_master/contents/original/20260324092450_1.jpg", "2026-03-24", "ฮาร์ดแวร์"),
  makeJibArticle(8155, "", "10 อันดับ RAM ยอดนิยมปี 2026 รวมรุ่นแรง คุ้มค่า และเสถียร", "https://www.jib.co.th/img_master/contents/original/20260323145657_1.jpg", "2026-03-23", "ฮาร์ดแวร์"),
  makeJibArticle(8154, "17", "ปี 2026 ใช้ RAM เท่าไหร่ดีสำหรับเล่นเกมและทำงาน? เปรียบเทียบ 8GB, 16GB และ 32GB", "https://www.jib.co.th/img_master/contents/original/20260323135329_1.jpg", "2026-03-23", "ฮาร์ดแวร์"),
  makeJibArticle(8151, "", "วิธีเช็คความเร็ว CPU และตรวจสอบสุขภาพคอมพ์ด้วยตัวเอง", "https://www.jib.co.th/img_master/contents/original/20260320171001_1.jpg", "2026-03-20", "How-to"),
  makeJibArticle(8150, "", "Cores vs Threads ต่างกันอย่างไร? ทำไมจำนวนคอร์จึงสำคัญ", "https://www.jib.co.th/img_master/contents/original/20260320164102_1.jpg", "2026-03-20", "ฮาร์ดแวร์"),
  makeJibArticle(8149, "17", "10 อันดับ CPU ที่แรงที่สุด วิเคราะห์สเปกและผลทดสอบล่าสุด", "https://www.jib.co.th/img_master/contents/original/20260320154430_1.jpg", "2026-03-20", "ฮาร์ดแวร์"),
  makeJibArticle(8148, "", "Intel vs AMD ในปี 2026 ใครคือตัวจริงสำหรับเล่นเกมและการทำงาน?", "https://www.jib.co.th/img_master/contents/original/20260320141925_1.jpg", "2026-03-20", "ฮาร์ดแวร์"),
  makeJibArticle(8147, "", "อัปเดต 2026 เลือกซื้อ CPU รุ่นไหนดี? เทียบ Intel vs AMD ตามงบและการใช้งาน", "https://www.jib.co.th/img_master/contents/original/20260320105836_1.jpg", "2026-03-20", "ฮาร์ดแวร์"),
  makeJibArticle(8143, "17", "เลือกซื้อ SSD ความจุเท่าไหร่ดีระหว่าง 256GB, 512GB หรือ 1TB?", "https://www.jib.co.th/img_master/contents/original/20260316140101_1.jpg", "2026-03-16", "ฮาร์ดแวร์")
];
