window.JIB_DIY_SOURCE = "https://www.jib.co.th/web/pcsetspec/main";

window.JIB_DIY_CATEGORIES = [
  { id: "cpu", name: "CPU", icon: "https://www.jib.co.th/img_master/category/original/20170728142617_icon_.png", uiIcon: "assets/images/icons/cpu.svg" },
  { id: "mainboard", name: "Mainboard", icon: "https://www.jib.co.th/img_master/category/original/20170720162221_icon_.png", uiIcon: "assets/images/icons/motherboard.svg" },
  { id: "vga", name: "VGA Card", icon: "https://www.jib.co.th/img_master/category/original/20170720161532_icon_.png", uiIcon: "assets/images/icons/gpu-card.svg" },
  { id: "ram", name: "Memory", icon: "https://www.jib.co.th/img_master/category/original/20170720162010_icon_.png", uiIcon: "assets/images/icons/memory.svg" },
  { id: "harddisk", name: "Harddisk", icon: "https://www.jib.co.th/web/images/spec/hdd.png", uiIcon: "assets/images/icons/plugin.svg" },
  { id: "ssd", name: "Solid State Drive", icon: "https://www.jib.co.th/img_master/category/original/20170720162057_icon_.png", uiIcon: "assets/images/icons/plugin.svg" },
  { id: "m2", name: "M.2", icon: "https://www.jib.co.th/img_master/category/original/20170728142617_icon_.png", uiIcon: "assets/images/icons/plugin.svg" },
  { id: "pccase", name: "Case", icon: "https://www.jib.co.th/web/images/spec/case.png", uiIcon: "assets/images/icons/case.svg" },
  { id: "powersupply", name: "Power Supply", icon: "https://www.jib.co.th/img_master/category/original/20170728141935_icon_.png", uiIcon: "assets/images/icons/plugin.svg" },
  { id: "cpucooler", name: "CPU Cooler", icon: "https://www.jib.co.th/img_master/category/original/20170728144417_icon_.png", uiIcon: "assets/images/icons/fan.svg" },
  { id: "cpuliquid", name: "CPU Liquid Cooler", icon: "https://www.jib.co.th/img_master/category/original/20170728144417_icon_.png", uiIcon: "assets/images/icons/fan.svg" },
  { id: "monitor", name: "Monitor", icon: "https://www.jib.co.th/img_master/category/original/20170728142421_icon_.png", uiIcon: "assets/images/icons/display.svg" },
  { id: "keyboard", name: "Keyboard", icon: "https://www.jib.co.th/web/images/spec/keyboard.png", uiIcon: "assets/images/icons/keyboard.svg" },
  { id: "mouse", name: "Mouse", icon: "https://www.jib.co.th/web/images/spec/mouse.png", uiIcon: "assets/images/icons/mouse2.svg" }
];

const jibProduct = (id, name, price, image) => ({
  id: String(id),
  name,
  price,
  image,
  url: `https://www.jib.co.th/web/product/readProduct/${id}`
});

window.JIB_DIY_PRODUCTS = {
  cpu: [
    jibProduct(71891, "AMD RYZEN 7 9800X3D - 8C 16T 4.7-5.2GHz (AMD SOCKET AM5) (ระบบระบายความร้อนไม่รวมอยู่ในสินค้า / CPU COOLER NOT INCLUDED)", 17990, "https://www.jib.co.th/img_master/product/medium/2024110616131371891_1.jpg"),
    jibProduct(50623, "INTEL CORE I5-12400F 2.5 GHz (SOCKET LGA 1700)", 4890, "https://www.jib.co.th/img_master/product/medium/2022010509243450623_1.jpg"),
    jibProduct(58961, "AMD RYZEN 7 7800X3D 4.2 GHz (SOCKET AM5) (ระบบระบายความร้อนไม่รวมอยู่ในสินค้า / CPU COOLER NOT INCLUDED)", 15490, "https://www.jib.co.th/img_master/product/medium/2023041914270158961_1.jpg"),
    jibProduct(52538, "AMD RYZEN 5 5600 3.5 GHz (SOCKET AM4)", 4890, "https://www.jib.co.th/img_master/product/medium/2022040514151552538_1.jpg")
  ],
  mainboard: [
    jibProduct(48142, "ASUS PRIME A520M-K - AMD SOCKET AM4 DDR4 MICRO-ATX", 1690, "https://www.jib.co.th/img_master/product/medium/2021082009315448142_1.jpg"),
    jibProduct(55782, "ASUS TUF GAMING B650M-PLUS WIFI - AMD SOCKET AM5 DDR5 MICRO-ATX", 5450, "https://www.jib.co.th/img_master/product/medium/2025052816365055782_1.jpg"),
    jibProduct(60364, "ASUS PRIME B650M-A II - AMD SOCKET AM5 DDR5 MICRO-ATX", 3190, "https://www.jib.co.th/img_master/product/medium/2023062116272760364_1.jpg"),
    jibProduct(81211, "ASUS B650M-AYW WIFI - AMD SOCKET AM5 DDR5 MICRO-ATX", 3490, "https://www.jib.co.th/img_master/product/medium/2025103011591581211_1.jpg")
  ],
  vga: [
    jibProduct(74538, "ASUS TUF GAMING GEFORCE RTX 5070 TI 16GB GDDR7 OC EDITION (TUF-RTX5070TI-O16G-GAMING)", 52900, "https://www.jib.co.th/img_master/product/medium/2025022010070674538_1.jpg"),
    jibProduct(74541, "ASUS PRIME GEFORCE RTX 5070 TI 16GB GDDR7 OC EDITION (PRIME-RTX5070TI-O16G)", 49900, "https://www.jib.co.th/img_master/product/medium/2025022010422674541_1.jpg"),
    jibProduct(84561, "ASUS PROART GEFORCE RTX 5080 16GB GDDR7 OC EDITION", 75900, "https://www.jib.co.th/img_master/product/medium/202604100933450000084561_1.jpg"),
    jibProduct(81783, "ASUS ROG ASTRAL GEFORCE RTX 5090 32GB GDDR7 WHITE OC EDITION", 299000, "https://www.jib.co.th/img_master/product/medium/2025112016202881783_1.jpg")
  ],
  ram: [
    jibProduct(25388, "16GB (8GBx2) DDR4 3200MHz RAM G.SKILL TRIDENT Z RGB (F4-3200C16D-16GTZR)", 4990, "https://www.jib.co.th/img_master/product/medium/20180718164547_25388_21_1.jpg"),
    jibProduct(50216, "32GB (16GBx2) DDR5 5200MHz RAM KINGSTON FURY BEAST DDR5 (BLACK) (KF552C40BBK2-32)", 17900, "https://www.jib.co.th/img_master/product/medium/2021120613293050216_1.jpg"),
    jibProduct(45039, "32GB (16GBx2) DDR4 3200MHz RAM CORSAIR VENGEANCE LPX (BLACK) (CMK32GX4M2E3200C16)", 9290, "https://www.jib.co.th/img_master/product/medium/2021012813381345039_1.jpg"),
    jibProduct(20010, "16GB (8GBx2) DDR4 3200MHz RAM G.SKILL RIPJAWS V (BLACK) (F4-3200C16D-16GVKB)", 4690, "https://www.jib.co.th/img_master/product/medium/20180725135553_20010_21_1.jpg")
  ],
  harddisk: [
    jibProduct(31940, "2 TB 3.5\" HDD SEAGATE BARRACUDA - 7200RPM SATA3 (ST2000DM008)", 4750, "https://www.jib.co.th/img_master/product/medium/2022122016554731940_1.jpg"),
    jibProduct(46825, "2 TB 3.5\" HDD WD BLUE - 7200RPM SATA3 (WD20EZBX)", 4990, "https://www.jib.co.th/img_master/product/medium/20221221095105_46825_352_1.jpg"),
    jibProduct(43646, "8 TB 3.5\" HDD SEAGATE BARRACUDA - 5400RPM SATA3 (ST8000DM004)", 12800, "https://www.jib.co.th/img_master/product/medium/2020111215540743646_1.jpg"),
    jibProduct(70309, "1 TB 3.5\" HDD WD BLUE - 5400RPM SATA3 (WD10EARZ)", 3650, "https://www.jib.co.th/img_master/product/medium/2024090216482870309_1.jpg")
  ],
  ssd: [
    jibProduct(45272, "500 GB SSD SAMSUNG 870 EVO SATA3 (MZ-77E500BW)", 6790, "https://www.jib.co.th/img_master/product/medium/2021021109044045272_1.jpg"),
    jibProduct(59117, "512 GB SSD HIKSEMI WAVE(S) - 2.5\" SATA3 (HS-SSD-WAVE(S)-512G)", 2690, "https://www.jib.co.th/img_master/product/medium/2023042616392059117_1.jpg"),
    jibProduct(63914, "512 GB SSD APACER AS350 PANTHER - 2.5\" SATA3 (AP512GAS350-1)", 2350, "https://www.jib.co.th/img_master/product/medium/2023120114423663914_1.jpg"),
    jibProduct(63913, "256 GB SSD APACER AS350 PANTHER - 2.5\" SATA3 (AP256GAS350-1)", 1650, "https://www.jib.co.th/img_master/product/medium/2023120114272463913_1.jpg")
  ],
  m2: [
    jibProduct(55937, "1 TB SSD WD BLACK SN850X WITHOUT HEATSINK - PCIe 4x4/NVMe M.2 2280 (WDS100T2X0E)", 6190, "https://www.jib.co.th/img_master/product/medium/2022102516290155937_1.jpg"),
    jibProduct(61609, "1 TB SSD SAMSUNG 990 PRO - PCIe 4x4/NVMe M.2 2280 (MZ-V9P1T0BW)", 8590, "https://www.jib.co.th/img_master/product/medium/2023082414395561609_1.jpg"),
    jibProduct(58596, "1 TB SSD HIKSEMI FUTURE - PCIe 4x4/NVMe M.2 2280 (HS-SSD-FUTURE 1024G)", 6490, "https://www.jib.co.th/img_master/product/medium/2023032414462958596_1.jpg"),
    jibProduct(74479, "1 TB SSD WD BLACK SN7100 - PCIe 4x4 NVMe M.2 2280 (WDS100T4X0E)", 6590, "https://www.jib.co.th/img_master/product/medium/2025021715414374479_1.jpg")
  ],
  pccase: [
    jibProduct(86317, "ASUS ROG CRONOX ARGB - E-ATX BLACK GR801", 19990, "https://www.jib.co.th/img_master/product/medium/202607091619300000086317_1.jpg"),
    jibProduct(85133, "ASUS PROART PA401 WOOD EDITION BEIGE TEMPERED GLASS PANEL - ATX BEIGE", 4290, "https://www.jib.co.th/img_master/product/medium/202605180919410000085133_1.jpg"),
    jibProduct(75861, "ASUS TUF GAMING GT502 HORIZON - WHITE (ATX)", 6490, "https://www.jib.co.th/img_master/product/medium/2025040714524075861_1.jpg"),
    jibProduct(44883, "MONTECH X2 MESH (BLACK) (ATX)", 1290, "https://www.jib.co.th/img_master/product/medium/2024052914470444883_1.jpg")
  ],
  powersupply: [
    jibProduct(34276, "ANTEC ATOM V550 - 550W BLACK ATX", 990, "https://www.jib.co.th/img_master/product/medium/20251111170954_34276_287_1.jpg"),
    jibProduct(27624, "AEROCOOL AE-650W - 650W 80 PLUS BLACK ATX", 1390, "https://www.jib.co.th/img_master/product/medium/20251113163051_27624_287_1.jpg"),
    jibProduct(22607, "SILVERSTONE STRIDER ESSENTIAL - 700W 80 PLUS (BLACK) (SST-ST70F-ES230)", 1695, "https://www.jib.co.th/img_master/product/medium/20251113163135_22607_287_1.jpg"),
    jibProduct(47447, "THERMALTAKE TOUGHPOWER GF 750W 80 PLUS GOLD BLACK ATX (PS-TPD-0750FNFAGE-2)", 3490, "https://www.jib.co.th/img_master/product/medium/2025110615582247447_1.jpg")
  ],
  cpucooler: [
    jibProduct(35913, "NOCTUA NH-D15 CHROMAX (BLACK)", 5250, "https://www.jib.co.th/img_master/product/medium/20200226120720_35913_287_2.jpg"),
    jibProduct(54887, "DEEPCOOL AG400 PLUS", 990, "https://www.jib.co.th/img_master/product/medium/20231125132840_54887_23_1.jpg"),
    jibProduct(53450, "DEEPCOOL AK400", 990, "https://www.jib.co.th/img_master/product/medium/20231125133409_53450_23_1.jpg"),
    jibProduct(63264, "DARK ROCK PRO 5", 3590, "https://www.jib.co.th/img_master/product/medium/2023102717115963264_1.png")
  ],
  cpuliquid: [
    jibProduct(61228, "DEEPCOOL LE520 ARGB", 2290, "https://www.jib.co.th/img_master/product/medium/2023080709034961228_1.jpg"),
    jibProduct(61229, "DEEPCOOL LE720 ARGB", 2990, "https://www.jib.co.th/img_master/product/medium/2023080709035561229_1.jpg"),
    jibProduct(60916, "SEGOTEP BEICED II 360 ARGB (BLACK)", 2590, "https://www.jib.co.th/img_master/product/medium/20230717160806_60916_426_1.png"),
    jibProduct(61293, "POSEIDON ELITE 240 ARGB BLACK", 2290, "https://www.jib.co.th/img_master/product/medium/2023081109344061293_1.jpg")
  ],
  monitor: [
    jibProduct(82092, "ASUS ROG SWIFT OLED PG27AQWP-W - 26.5 INCH OLED 2K 540Hz HD 720Hz DUAL MODE AMD FREESYNC PREMIUM PRO G-SYNC COMPATIBLE", 39500, "https://www.jib.co.th/img_master/product/medium/20251215151658_82092_287_1.jpg"),
    jibProduct(87610, "ASUS ROG STRIX OLED XG32UQDMS - 31.5 INCH OLED 4K 240Hz PRO G-SYNC COMPATIBLE", 37900, "https://www.jib.co.th/img_master/product/medium/202609081051170000087610_1.jpg"),
    jibProduct(63700, "ASUS PROART DISPLAY PA279CRV - 27\" IPS 4K 60Hz", 17500, "https://www.jib.co.th/img_master/product/medium/20231120170039_63700_287_1.jpg"),
    jibProduct(76622, "ASUS TUF GAMING VG259Q5A - 24.5 INCH IPS FHD 200Hz AMD FREESYNC PREMIUM", 3190, "https://www.jib.co.th/img_master/product/medium/20250513162708_76622_287_1.jpg")
  ],
  keyboard: [
    jibProduct(74717, "ASUS ROG FALCHION ACE HFX ASUS ROG HFX MAGNETIC SWITCH AURA SYNC RGB EN - BLACK (M605)", 4590, "https://www.jib.co.th/img_master/product/medium/2025022811513674717_1.jpg"),
    jibProduct(82736, "ASUS ROG AZOTH X - ROG NX STORM V2 SWITCH RGB EN WHITE", 10590, "https://www.jib.co.th/img_master/product/medium/2025123010153282736_1.jpg"),
    jibProduct(66224, "ASUS ROG STRIX SCOPE II 96 WIRELESS (BLACK) (ASUS ROG NX SNOW SWITCH - AURA SYNC RGB - EN/TH)", 4790, "https://www.jib.co.th/img_master/product/medium/2024032015481866224_1.jpg"),
    jibProduct(23793, "LOGITECH G213 PRODIGY (MEMBRANE) (RGB LED) (EN/TH) (WIRED/USB)", 1450, "https://www.jib.co.th/img_master/product/medium/20181225174841_23793_24_1.png")
  ],
  mouse: [
    jibProduct(10627, "LOGITECH M100R USB OPTICAL (BLACK)", 190, "https://www.jib.co.th/img_master/product/medium/20260609145356_0000010627_469_1.jpg"),
    jibProduct(26007, "LOGITECH USB B100 (BLACK)", 120, "https://www.jib.co.th/img_master/product/medium/20260518153352_0000026007_469_1.jpg"),
    jibProduct(14351, "NUBWO SILENT NM019 (BLACK)", 160, "https://www.jib.co.th/img_master/product/medium/202605181528250000014351_1.jpg"),
    jibProduct(14352, "NUBWO SILENT NM019 (RED)", 160, "https://www.jib.co.th/img_master/product/medium/20260518153001_0000014352_469_1.jpg")
  ]
};
