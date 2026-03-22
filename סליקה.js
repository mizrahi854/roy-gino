document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // total price from session
  // =========================
  const totalPrice = Number(sessionStorage.getItem("totalPrice")) || 0;

  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });

  const subtotalEl = document.getElementById("subtotal");
  const deliveryPriceEl = document.getElementById("deliveryPrice");
  const totalPriceEl = document.getElementById("totalPrice");

  // מציג את המחיר הכולל
  if (subtotalEl) subtotalEl.textContent = totalPrice;

  function updateTotal(delivery) {
    if (deliveryPriceEl) deliveryPriceEl.textContent = delivery;
    if (totalPriceEl) totalPriceEl.textContent = totalPrice + delivery;
  }

  const deliveryRadios = document.querySelectorAll("input[name='delivery']");
  const addressFields = document.getElementById("addressFields");
  const pickupDateBox = document.getElementById("pickupDateBox");

  function updateDelivery() {
    const selected = document.querySelector("input[name='delivery']:checked").value;

    if (selected === "delivery") {
      addressFields.style.display = "block";
      pickupDateBox.style.display = "none";
      updateTotal(30);
    } else {
      addressFields.style.display = "none";
      pickupDateBox.style.display = "block";
      updateTotal(0);
    }
  }

  deliveryRadios.forEach(r => r.addEventListener("change", updateDelivery));
  updateDelivery();

  const form = document.querySelector(".checkout-form");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const id = document.getElementById("idNumber").value;
    const birth = new Date(document.getElementById("birthDate").value);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (!/^\d{9}$/.test(id) || age < 18) {
      alert("לא ניתן לבצע הזמנה. מכירת אלכוהול מגיל 18 בלבד.");
      return;
    }

    alert("ההזמנה נשלחה בהצלחה 🍷");
  });

  // =========================
  // age gate
  // =========================
  const ageGate = document.getElementById('ageGate');
  const ageYes = document.getElementById('ageYes');
  const ageNo = document.getElementById('ageNo');

  if (ageGate && ageYes && ageNo) {
    if (!localStorage.getItem('ageVerified')) {
      ageGate.style.display = 'flex';
    }

    ageYes.addEventListener('click', () => {
      localStorage.setItem('ageVerified', 'true');
      ageGate.style.display = 'none';
    });

    ageNo.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  // סוגר את המובייל בר כשנטען דף חדש
  if (mobileNav) mobileNav.classList.remove("active");
});
