(() => {
  const KEYS = {
    name: "jibAccountName",
    phone: "jibAccountPhone",
    email: "jibAccountEmail",
    passwordHash: "jibAccountPasswordHash",
    loggedIn: "jibAccountLoggedIn"
  };

  const accountMarkup = `
    <dialog id="site-account-dialog" class="site-dialog" aria-labelledby="account-dialog-title">
      <div class="site-dialog-shell">
        <button type="button" class="site-dialog-close" data-dialog-close aria-label="ปิด">×</button>
        <img class="site-dialog-brand" src="assets/images/logo_c.png" alt="JIB">

        <section class="account-view" data-account-view="login">
          <h2 id="account-dialog-title">เข้าสู่ระบบ</h2>
          <p class="site-dialog-lead">เข้าสู่ระบบด้วยบัญชีที่สมัครไว้ในเบราว์เซอร์นี้</p>
          <form id="site-login-form" class="account-form">
            <label class="account-field"><span>อีเมล</span><input id="site-login-email" type="email" autocomplete="email" required></label>
            <label class="account-field"><span>รหัสผ่าน</span><input id="site-login-password" type="password" autocomplete="current-password" required></label>
            <label class="account-remember"><input id="site-login-remember" type="checkbox" checked> จดจำการเข้าสู่ระบบ</label>
            <button class="account-primary" type="submit">เข้าสู่ระบบ</button>
          </form>
          <p class="account-switch">ยังไม่มีบัญชี? <button type="button" data-account-switch="signup">สมัครสมาชิก</button></p>
          <p id="site-login-message" class="account-message" role="status"></p>
        </section>

        <section class="account-view" data-account-view="signup" hidden>
          <h2>สมัครสมาชิก</h2>
          <p class="site-dialog-lead">สร้างบัญชีตัวอย่างสำหรับใช้งานบนอุปกรณ์นี้</p>
          <form id="site-signup-form" class="account-form">
            <div class="account-form-row">
              <label class="account-field"><span>ชื่อที่แสดง</span><input id="site-signup-name" type="text" autocomplete="name" minlength="2" required></label>
              <label class="account-field"><span>เบอร์โทรศัพท์</span><input id="site-signup-phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
            </div>
            <label class="account-field"><span>อีเมล</span><input id="site-signup-email" type="email" autocomplete="email" required></label>
            <div class="account-form-row">
              <label class="account-field"><span>รหัสผ่าน</span><input id="site-signup-password" type="password" autocomplete="new-password" minlength="6" required></label>
              <label class="account-field"><span>ยืนยันรหัสผ่าน</span><input id="site-signup-confirm" type="password" autocomplete="new-password" minlength="6" required></label>
            </div>
            <button class="account-primary" type="submit">สมัครสมาชิก</button>
          </form>
          <p class="account-switch">เป็นสมาชิกแล้ว? <button type="button" data-account-switch="login">เข้าสู่ระบบ</button></p>
          <p id="site-signup-message" class="account-message" role="status"></p>
          <p class="account-demo-note">บัญชีนี้เป็นระบบสาธิตและเก็บข้อมูลเฉพาะในเบราว์เซอร์ของคุณ ไม่ได้ส่งข้อมูลไปยังระบบสมาชิก JIB Online</p>
        </section>

        <section class="account-view" data-account-view="account" hidden>
          <h2>บัญชีของฉัน</h2>
          <p class="site-dialog-lead">ข้อมูลบัญชีที่บันทึกไว้ในเบราว์เซอร์นี้</p>
          <div class="account-profile">
            <div class="account-profile-row"><span>ชื่อ</span><strong id="site-account-name">-</strong></div>
            <div class="account-profile-row"><span>อีเมล</span><strong id="site-account-email">-</strong></div>
            <div class="account-profile-row"><span>โทรศัพท์</span><strong id="site-account-phone">-</strong></div>
          </div>
          <button id="site-logout-button" class="account-secondary" type="button">ออกจากระบบ</button>
          <p id="site-account-message" class="account-message" role="status"></p>
        </section>
      </div>
    </dialog>

    <dialog id="site-tracking-dialog" class="site-dialog tracking-dialog" aria-labelledby="tracking-dialog-title">
      <div class="site-dialog-shell">
        <button type="button" class="site-dialog-close" data-dialog-close aria-label="ปิด">×</button>
        <img class="site-dialog-brand" src="assets/images/logo_c.png" alt="JIB">
        <h2 id="tracking-dialog-title">เช็กสถานะการจัดส่ง</h2>
        <p class="site-dialog-lead">กรอกหมายเลขพัสดุหรือหมายเลขคำสั่งซื้อ เพื่อตรวจสอบสถานะตัวอย่าง</p>
        <form id="site-tracking-form" class="tracking-form">
          <input id="site-tracking-input" type="text" placeholder="เช่น JIB111, JIB222, JIB333 หรือ JIB444" autocomplete="off" required>
          <button class="tracking-search-button" type="submit">ค้นหา</button>
        </form>
        <p id="site-tracking-message" class="account-message" role="status"></p>
        <section id="site-tracking-result" class="tracking-result" hidden>
          <div class="tracking-result-head">
            <div><span>หมายเลขพัสดุ</span><strong id="site-tracking-number">-</strong></div>
            <div id="site-tracking-status" class="tracking-status-badge">เตรียมสินค้า</div>
          </div>
          <div class="tracking-steps" aria-label="ลำดับสถานะการจัดส่ง">
            <div class="tracking-step"><span class="tracking-step-circle">1</span><span>เตรียมสินค้า</span></div>
            <div class="tracking-step"><span class="tracking-step-circle">2</span><span>ส่งออกจากคลัง</span></div>
            <div class="tracking-step"><span class="tracking-step-circle">3</span><span>อยู่ระหว่างขนส่ง</span></div>
            <div class="tracking-step"><span class="tracking-step-circle">4</span><span>จัดส่งสำเร็จ</span></div>
          </div>
        </section>
        <p class="account-demo-note">สถานะนี้เป็นข้อมูลตัวอย่าง สำหรับคำสั่งซื้อจริงกรุณาตรวจสอบผ่าน JIB Online หรือโทร 02-017-4444</p>
      </div>
    </dialog>`;

  document.body.insertAdjacentHTML("beforeend", accountMarkup);

  const accountDialog = document.getElementById("site-account-dialog");
  const trackingDialog = document.getElementById("site-tracking-dialog");
  const accountViews = [...accountDialog.querySelectorAll("[data-account-view]")];
  const loginMessage = document.getElementById("site-login-message");
  const signupMessage = document.getElementById("site-signup-message");
  const accountMessage = document.getElementById("site-account-message");

  const setMessage = (element, text = "", type = "") => {
    element.textContent = text;
    element.className = `account-message${type ? ` is-${type}` : ""}`;
  };

  const isLoggedIn = () => localStorage.getItem(KEYS.loggedIn) === "true"
    || sessionStorage.getItem(KEYS.loggedIn) === "true";

  const openDialog = (dialog) => {
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  };

  const closeDialog = (dialog) => {
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
  };

  const showAccountView = (name) => {
    accountViews.forEach((view) => { view.hidden = view.dataset.accountView !== name; });
    setMessage(loginMessage);
    setMessage(signupMessage);
    setMessage(accountMessage);
    if (name === "account") {
      document.getElementById("site-account-name").textContent = localStorage.getItem(KEYS.name) || "-";
      document.getElementById("site-account-email").textContent = localStorage.getItem(KEYS.email) || "-";
      document.getElementById("site-account-phone").textContent = localStorage.getItem(KEYS.phone) || "-";
    }
  };

  const accountTriggers = [...document.querySelectorAll('[aria-label="Toggle User Dialog"], [aria-label="เข้าสู่ระบบ"]')];
  const trackingTriggers = [...document.querySelectorAll('#checkTrackingNumber, [aria-label="บริการจัดส่ง"]')];

  const initialsFor = (name) => Array.from(name.trim()).filter((char) => char !== " ").slice(0, 2).join("").toUpperCase();

  const updateAccountTriggers = () => {
    const loggedIn = isLoggedIn();
    const initials = initialsFor(localStorage.getItem(KEYS.name) || "JIB");
    accountTriggers.forEach((trigger) => {
      trigger.classList.toggle("account-logged-in", loggedIn);
      trigger.setAttribute("aria-label", loggedIn ? "บัญชีของฉัน" : "เข้าสู่ระบบ");
      let badge = trigger.querySelector(".account-trigger-initials");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "account-trigger-initials";
        trigger.appendChild(badge);
      }
      badge.textContent = initials;
    });
  };

  accountTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showAccountView(isLoggedIn() ? "account" : "login");
      const savedEmail = localStorage.getItem(KEYS.email);
      if (savedEmail) document.getElementById("site-login-email").value = savedEmail;
      openDialog(accountDialog);
    });
  });

  trackingTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMessage(document.getElementById("site-tracking-message"));
      document.getElementById("site-tracking-result").hidden = true;
      openDialog(trackingDialog);
    });
  });

  document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.closest("dialog")));
  });

  [accountDialog, trackingDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });

  accountDialog.querySelectorAll("[data-account-switch]").forEach((button) => {
    button.addEventListener("click", () => showAccountView(button.dataset.accountSwitch));
  });

  const hashPassword = async (password) => {
    const bytes = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  document.getElementById("site-signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("site-signup-name").value.trim();
    const phone = document.getElementById("site-signup-phone").value.trim();
    const email = document.getElementById("site-signup-email").value.trim().toLowerCase();
    const password = document.getElementById("site-signup-password").value;
    const confirmPassword = document.getElementById("site-signup-confirm").value;

    if (password !== confirmPassword) {
      setMessage(signupMessage, "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน", "error");
      return;
    }

    try {
      localStorage.setItem(KEYS.name, name);
      localStorage.setItem(KEYS.phone, phone);
      localStorage.setItem(KEYS.email, email);
      localStorage.setItem(KEYS.passwordHash, await hashPassword(password));
      document.getElementById("site-login-email").value = email;
      document.getElementById("site-login-password").value = "";
      showAccountView("login");
      setMessage(loginMessage, "สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ", "success");
    } catch (error) {
      console.error("Account signup failed", error);
      setMessage(signupMessage, "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่", "error");
    }
  });

  document.getElementById("site-login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("site-login-email").value.trim().toLowerCase();
    const password = document.getElementById("site-login-password").value;
    const remember = document.getElementById("site-login-remember").checked;
    try {
      const correctEmail = localStorage.getItem(KEYS.email);
      const correctHash = localStorage.getItem(KEYS.passwordHash);
      const enteredHash = await hashPassword(password);
      if (!correctHash || email !== correctEmail || enteredHash !== correctHash) {
        setMessage(loginMessage, "อีเมลหรือรหัสผ่านไม่ถูกต้อง", "error");
        return;
      }
      localStorage.removeItem(KEYS.loggedIn);
      sessionStorage.removeItem(KEYS.loggedIn);
      (remember ? localStorage : sessionStorage).setItem(KEYS.loggedIn, "true");
      updateAccountTriggers();
      showAccountView("account");
      setMessage(accountMessage, "เข้าสู่ระบบสำเร็จ", "success");
    } catch (error) {
      console.error("Account login failed", error);
      setMessage(loginMessage, "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่", "error");
    }
  });

  document.getElementById("site-logout-button").addEventListener("click", () => {
    localStorage.removeItem(KEYS.loggedIn);
    sessionStorage.removeItem(KEYS.loggedIn);
    updateAccountTriggers();
    showAccountView("login");
    setMessage(loginMessage, "ออกจากระบบเรียบร้อยแล้ว", "success");
  });

  document.getElementById("site-tracking-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("site-tracking-input");
    const trackingNumber = input.value.trim().toUpperCase();
    const message = document.getElementById("site-tracking-message");
    if (!trackingNumber) {
      setMessage(message, "กรุณากรอกหมายเลขพัสดุ", "error");
      return;
    }

    const demoStatus = { JIB111: 1, JIB222: 2, JIB333: 3, JIB444: 4 };
    const statusNames = ["เตรียมสินค้า", "ส่งออกจากคลัง", "อยู่ระหว่างขนส่ง", "จัดส่งสำเร็จ"];
    const currentStep = demoStatus[trackingNumber] || 1;
    document.getElementById("site-tracking-number").textContent = trackingNumber;
    document.getElementById("site-tracking-status").textContent = `${statusNames[currentStep - 1]} (ข้อมูลตัวอย่าง)`;
    document.querySelectorAll(".tracking-step").forEach((step, index) => {
      step.classList.toggle("is-active", index < currentStep);
    });
    document.getElementById("site-tracking-result").hidden = false;
    setMessage(message, `พบข้อมูลตัวอย่างสำหรับ ${trackingNumber}`, "success");
  });

  updateAccountTriggers();
})();
