/**
 * סליקה.js – GINO VINO Cart & Payment Logic
 */

let currentDelivery = 'pickup'; 
let orderData       = null;
let currentDiscount = 0; // אחוז הנחה מקופון

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* Hamburger */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('active'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('active')));
  }

  /* Render cart & update count */
  renderCartItems();

  /* Delivery radio listeners */
  document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', onDeliveryChange);
    radio.closest('.delivery-option')?.addEventListener('click', () => {
      document.querySelectorAll('.delivery-option').forEach(o => o.classList.remove('selected'));
      radio.closest('.delivery-option')?.classList.add('selected');
    });
  });

  /* Checkout form submit */
  const form = document.getElementById('checkoutForm');
  if (form) form.addEventListener('submit', onFormSubmit);

  /* Set min pickup date to today */
  const pickupDate = document.getElementById('pickupDate');
  if (pickupDate) {
    const today = new Date();
    pickupDate.min = today.toISOString().split('T')[0];
  }
});

/* ============================================================
   RENDER CART ITEMS
   ============================================================ */
function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem('ginoCart')) || [];

  if (!cart.length) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
        <p style="font-size: 1.1rem;">העגלה שלך ריקה</p>
        <a href="index.html" class="submit-btn" style="display: inline-block; margin-top: 15px; width: auto; padding: 10px 25px; text-decoration: none;">חזרה לקטלוג</a>
      </div>`;
    hideCheckoutUI();
    updateTotals();
    if (typeof updateCartCountUI === 'function') updateCartCountUI();
    return;
  }

  container.innerHTML = '';
  cart.forEach((item, index) => {
    // משיכת הנתונים האמיתיים מתוך הזיכרון
    const name = item.name || "מוצר כלשהו";
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.qty) || 1;
    const lineTotal = (price * qty).toFixed(2);

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid var(--border);";
    
    row.innerHTML = `
      <div class="cart-item-info" style="flex: 2;">
        <h4 style="color: var(--gold); font-weight: 700; margin: 0; font-size: 1.1rem;">${name}</h4>
        <div style="font-size: 0.9rem; color: var(--text-muted);">${price.toFixed(2)} ₪ ליחידה</div>
      </div>
      
      <div class="qty-controls" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 12px;">
        <button onclick="changeQtyInCheckout(${index}, -1)" style="width: 28px; height: 28px; border-radius: 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-primary); cursor: pointer;">−</button>
        <span style="font-weight: bold; min-width: 20px; text-align: center;">${qty}</span>
        <button onclick="changeQtyInCheckout(${index}, 1)" style="width: 28px; height: 28px; border-radius: 6px; background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-primary); cursor: pointer;">+</button>
      </div>
      
      <div style="flex: 1; text-align: left; display: flex; align-items: center; justify-content: flex-end; gap: 15px;">
        <span style="font-weight: 800; color: var(--text-primary); font-size: 1.05rem;">${lineTotal} ₪</span>
        <button onclick="deleteFromCheckout(${index})" style="background: none; border: none; color: var(--red); cursor: pointer; font-size: 1.2rem; transition: transform 0.2s;">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
    container.appendChild(row);
  });

  showCheckoutUI();
  updateTotals();
  if (typeof updateCartCountUI === 'function') updateCartCountUI();
}

/* ============================================================
   עדכון כמות ומחיקה מהסל
   ============================================================ */
window.changeQtyInCheckout = function(index, delta) {
  let cart = JSON.parse(localStorage.getItem('ginoCart')) || [];
  if (!cart[index]) return;

  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('ginoCart', JSON.stringify(cart));
  renderCartItems();
};

window.deleteFromCheckout = function(index) {
  let cart = JSON.parse(localStorage.getItem('ginoCart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('ginoCart', JSON.stringify(cart));
  renderCartItems();
};

/* ============================================================
   TOTALS & COUPONS
   ============================================================ */
function getSubtotal() {
  const cart = JSON.parse(localStorage.getItem('ginoCart')) || [];
  return cart.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * parseInt(item.qty || 1)), 0);
}

function updateTotals() {
  const subtotal = getSubtotal();
  const deliveryCost = currentDelivery === 'delivery' ? DELIVERY_PRICE : 0;
  
  // חישוב הנחת קופון
  const discountAmount = subtotal * (currentDiscount / 100);
  const total = (subtotal - discountAmount) + deliveryCost;

  const el = (id) => document.getElementById(id);
  if (el('subtotal')) {
    if (currentDiscount > 0) {
      el('subtotal').innerHTML = `<span style="text-decoration: line-through; margin-left: 8px; font-size: 0.9em;">${subtotal.toFixed(2)} ₪</span> ${(subtotal - discountAmount).toFixed(2)} ₪`;
    } else {
      el('subtotal').textContent = subtotal.toFixed(2) + ' ₪';
    }
  }
  if (el('deliveryCost')) el('deliveryCost').textContent = deliveryCost > 0 ? deliveryCost + ' ₪' : 'חינם';
  if (el('totalPrice'))   el('totalPrice').textContent   = total.toFixed(2) + ' ₪';
}

// הפעלת קופון מה-HTML
window.applyCoupon = function() {
    const code = document.getElementById('couponInput').value;
    const msgEl = document.getElementById('couponMessage');
    
    if (typeof validateCoupon === 'function') {
        const discount = validateCoupon(code);
        if (discount > 0) {
            currentDiscount = discount;
            msgEl.style.color = 'var(--green)';
            msgEl.textContent = `קופון הופעל בהצלחה! ${discount}% הנחה.`;
        } else {
            currentDiscount = 0;
            msgEl.style.color = 'var(--red)';
            msgEl.textContent = 'קופון לא חוקי או שפג תוקפו.';
        }
        updateTotals();
    } else {
        msgEl.style.color = 'var(--red)';
        msgEl.textContent = 'מערכת הקופונים אינה זמינה כרגע.';
    }
};

/* ============================================================
   DELIVERY TOGGLE
   ============================================================ */
function onDeliveryChange(e) {
  currentDelivery = e.target.value;
  const addrFields  = document.getElementById('addressFields');
  const pickupBox   = document.getElementById('pickupDateBox');
  const pickupInput = document.getElementById('pickupDate');
  const cityInput = document.getElementById('city');
  const addrInput = document.getElementById('address');

  if (currentDelivery === 'delivery') {
    addrFields?.classList.add('show');
    if (pickupBox) pickupBox.style.display = 'none';
    if(pickupInput) pickupInput.removeAttribute('required');
    if(cityInput) cityInput.setAttribute('required', 'true');
    if(addrInput) addrInput.setAttribute('required', 'true');
  } else {
    addrFields?.classList.remove('show');
    if (pickupBox) pickupBox.style.display = 'block';
    if(pickupInput) pickupInput.setAttribute('required', 'true');
    if(cityInput) cityInput.removeAttribute('required');
    if(addrInput) addrInput.removeAttribute('required');
  }
  updateTotals();
}

/* ============================================================
   SHOW / HIDE CHECKOUT UI
   ============================================================ */
function showCheckoutUI() {
  const section = document.getElementById('checkoutFormSection');
  const proceedBtn = document.getElementById('proceedToCheckoutBtn');
  if (proceedBtn) proceedBtn.style.display = 'block';
}

function hideCheckoutUI() {
  const section = document.getElementById('checkoutFormSection');
  const proceedBtn = document.getElementById('proceedToCheckoutBtn');
  if (section)    section.style.display = 'none';
  if (proceedBtn) proceedBtn.style.display = 'none';
}

window.showCheckoutForm = function() {
  const cart = JSON.parse(localStorage.getItem('ginoCart')) || [];
  if (!cart.length) { alert('העגלה ריקה'); return; }
  const section = document.getElementById('checkoutFormSection');
  if (section) {
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/* ============================================================
   FORM VALIDATION & SUBMIT
   ============================================================ */
function onFormSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;
  buildOrderData();
  showGammaPayment();
}

function validateForm() {
  let valid = true;

  function setErr(groupId, condition, msg) {
    const grp = document.getElementById(groupId);
    if (!grp) return;
    if (condition) {
      grp.classList.add('has-error');
      const errEl = grp.querySelector('.error-msg');
      if (errEl && msg) errEl.textContent = msg;
      valid = false;
    } else {
      grp.classList.remove('has-error');
    }
  }

  const fullname  = document.getElementById('fullname')?.value.trim();
  const phone     = document.getElementById('phone')?.value.trim();
  const email     = document.getElementById('email')?.value.trim();
  const idNumber  = document.getElementById('idNumber')?.value.trim();
  const birthDate = document.getElementById('birthDate')?.value;
  const ageCheck  = document.getElementById('ageCheck')?.checked;
  const termsCheck= document.getElementById('termsCheck')?.checked;

  setErr('grp-fullname', !fullname, 'שדה חובה');
  setErr('grp-phone', !phone || !/^0\d{8,9}$/.test(phone.replace(/-/g,'')), 'מספר טלפון לא תקין');
  setErr('grp-email', !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'כתובת אימייל לא תקינה');
  setErr('grp-idNumber', !idNumber || !/^\d{9}$/.test(idNumber), 'יש להזין 9 ספרות');

  if (birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    setErr('grp-birthDate', age < 18, 'יש להיות מעל גיל 18');
  } else {
    setErr('grp-birthDate', true, 'יש להזין תאריך לידה');
  }

  if (!ageCheck || !termsCheck) {
    alert('יש לאשר את אמצעי הגיל ואת תקנון האתר');
    valid = false;
  }

  // Delivery validations
  if (currentDelivery === 'delivery') {
      const city = document.getElementById('city')?.value.trim();
      const addr = document.getElementById('address')?.value.trim();
      if (!city || !addr) {
          alert('יש למלא עיר וכתובת מלאה עבור המשלוח');
          valid = false;
      }
  } else {
      const pDate = document.getElementById('pickupDate')?.value;
      if (!pDate) {
          alert('יש לבחור תאריך לאיסוף העצמי');
          valid = false;
      }
  }

  return valid;
}

function buildOrderData() {
  const cart = JSON.parse(localStorage.getItem('ginoCart')) || [];
  
  const subtotal = getSubtotal();
  const deliveryCost = currentDelivery === 'delivery' ? DELIVERY_PRICE : 0;
  const discountAmount = subtotal * (currentDiscount / 100);
  const total = (subtotal - discountAmount) + deliveryCost;

  const orderId = '#' + Math.floor(Math.random() * 900000 + 100000).toString();

  orderData = {
    orderId,
    fullname:   document.getElementById('fullname')?.value.trim(),
    phone:      document.getElementById('phone')?.value.trim(),
    email:      document.getElementById('email')?.value.trim(),
    idNumber:   document.getElementById('idNumber')?.value.trim(),
    birthDate:  document.getElementById('birthDate')?.value,
    delivery:   currentDelivery,
    city:       document.getElementById('city')?.value.trim() || '',
    address:    document.getElementById('address')?.value.trim() || '',
    pickupDate: document.getElementById('pickupDate')?.value || '',
    items: cart,
    subtotal,
    discountAmount,
    deliveryCost,
    total,
    date: new Date().toISOString()
  };

  if (typeof saveOrder === 'function') saveOrder(orderData);
}

/* ============================================================
   GAMMA PAYMENT
   ============================================================ */
window.processGammaPayment = function() {
  if (!orderData) return;

  if (typeof GAMMA_TERMINAL === 'undefined' || GAMMA_TERMINAL === 'YOUR_GAMMA_TERMINAL_ID') {
    alert('מצב הדגמה: מסוף גמא טרם הוגדר בראש דף ה-HTML.\nההזמנה תעבור בהצלחה לצורך ההדגמה.');
    handlePaymentSuccess();
    return;
  }

  const orderDesc = `הזמנה ${orderData.orderId} - GINO VINO`;
  const total     = orderData.total.toFixed(2);

  const gammaUrl = `https://gateway.gamma.co.il/pay?terminal=${encodeURIComponent(GAMMA_TERMINAL)}&amount=${encodeURIComponent(total)}&description=${encodeURIComponent(orderDesc)}&order=${encodeURIComponent(orderData.orderId)}&return_url=${encodeURIComponent(GAMMA_RETURN_URL)}&cancel_url=${encodeURIComponent(GAMMA_CANCEL_URL)}`;

  const iframe = document.getElementById('gammaIframe');
  if (iframe) {
    iframe.src = gammaUrl;
    iframe.style.display = 'block';
    document.getElementById('gammaRedirect').style.display = 'none';
  } else {
    window.location.href = gammaUrl;
  }
};

function showGammaPayment() {
  const paySection = document.getElementById('gammaPayment');
  if (paySection) {
    paySection.style.display = 'block';
    paySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ============================================================
   PAYMENT SUCCESS
   ============================================================ */
function handlePaymentSuccess() {
  if (!orderData) {
    const orders = (typeof getOrders === 'function') ? getOrders() : [];
    if (orders.length) orderData = orders[0];
  }

  // Clear cart
  localStorage.setItem('ginoCart', JSON.stringify([]));

  const paySection = document.getElementById('gammaPayment');
  if (paySection) paySection.style.display = 'none';

  const successEl = document.getElementById('orderSuccess');
  if (successEl) {
    successEl.style.display = 'block';
    successEl.scrollIntoView({ behavior: 'smooth' });
  }

  if (orderData) {
    const numEl = document.getElementById('orderNumDisplay');
    if (numEl) numEl.textContent = `מספר הזמנה: ${orderData.orderId}`;

    const delivNote = document.getElementById('deliveryNote');
    if (delivNote) {
      delivNote.textContent = orderData.delivery === 'delivery'
        ? `המשלוח יגיע לכתובת: ${orderData.address}, ${orderData.city}`
        : `ניתן לאסוף מדרך הרמתיים 35, הוד השרון החל מ- ${orderData.pickupDate}`;
    }

    const waBtn = document.getElementById('waShareBtn');
    if (waBtn) {
      const msg = buildWhatsAppMessage(orderData);
      waBtn.onclick = () => window.open(`https://wa.me/${typeof STORE_WHATSAPP !== 'undefined' ? STORE_WHATSAPP : '9720536210899'}?text=${encodeURIComponent(msg)}`, '_blank');
    }

    buildInvoice(orderData);
  }

  document.getElementById('checkoutFormSection')?.style.setProperty('display','none');
  document.querySelector('.cart-products')?.style.setProperty('display','none');
  document.getElementById('proceedToCheckoutBtn')?.style.setProperty('display','none');
}

/* ============================================================
   WHATSAPP ORDER MESSAGE
   ============================================================ */
function buildWhatsAppMessage(order) {
  let lines = [];
  lines.push(`*הזמנה חדשה מ-GINO VINO 🍷*`);
  lines.push(`מספר הזמנה: ${order.orderId}`);
  lines.push(`שם: ${order.fullname}`);
  lines.push(`טלפון: ${order.phone}`);
  lines.push(``);
  lines.push(`*מוצרים:*`);
  (order.items || []).forEach(item => {
    lines.push(`- ${item.name} x${item.qty} = ₪${(parseFloat(item.price) * parseInt(item.qty)).toFixed(2)}`);
  });
  lines.push(``);
  if(order.discountAmount > 0) {
      lines.push(`הנחת קופון: ₪${order.discountAmount.toFixed(2)}-`);
  }
  lines.push(`משלוח: ${order.delivery === 'delivery' ? '₪30' : 'איסוף עצמי חינם'}`);
  lines.push(`*סה"כ לתשלום: ₪${order.total.toFixed(2)}*`);
  if (order.delivery === 'delivery') {
    lines.push(`כתובת למשלוח: ${order.address}, ${order.city}`);
  } else {
    lines.push(`איסוף בתאריך: ${order.pickupDate}`);
  }
  return lines.join('\n');
}

/* ============================================================
   INVOICE / RECEIPT
   ============================================================ */
function buildInvoice(order) {
  const section = document.getElementById('invoiceSection');
  if (!section) return;

  const rows = (order.items || []).map(item => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.qty) || 1;
    return `<tr>
      <td style="padding:10px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="text-align:center; padding:10px; border-bottom: 1px solid #ddd;">${qty}</td>
      <td style="text-align:left; padding:10px; border-bottom: 1px solid #ddd;">₪${price.toFixed(2)}</td>
      <td style="text-align:left; padding:10px; border-bottom: 1px solid #ddd;">₪${(price * qty).toFixed(2)}</td>
    </tr>`;
  }).join('');

  section.innerHTML = `
    <div id="invoiceContent" style="padding:20px;font-family:Assistant,sans-serif;color:#333; background: #fff; border-radius: 10px; margin-top: 20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:2px solid var(--gold);padding-bottom:16px">
        <div>
          <h2 style="color:var(--gold);font-size:1.8rem; margin:0;">GINO VINO</h2>
          <p style="margin:0; font-size: 0.9rem;">דרך הרמתיים 35, הוד השרון</p>
          <p style="margin:0; font-size: 0.9rem;">053-6210899</p>
        </div>
        <div style="text-align:left">
          <h3 style="margin:0; font-size: 1.4rem;">חשבונית עסקה</h3>
          <p style="margin:0;">מס' הזמנה: ${order.orderId}</p>
          <p style="margin:0;">תאריך: ${new Date(order.date).toLocaleDateString('he-IL')}</p>
        </div>
      </div>
      <div style="margin-bottom:20px">
        <h4 style="margin-bottom:8px">פרטי לקוח:</h4>
        <p style="margin:0;">${order.fullname} | ${order.phone}</p>
        <p style="margin:0;">${order.delivery === 'delivery' ? `משלוח לכתובת: ${order.address}, ${order.city}` : `איסוף עצמי בתאריך: ${order.pickupDate}`}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <thead>
          <tr style="background:#f9f9f9;">
            <th style="padding:10px;text-align:right">מוצר</th>
            <th style="padding:10px;text-align:center">כמות</th>
            <th style="padding:10px;text-align:left">מחיר יח'</th>
            <th style="padding:10px;text-align:left">סה"כ</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="text-align:left; padding-top:16px">
        <p style="margin:4px 0;">סכום ביניים: ₪${order.subtotal.toFixed(2)}</p>
        ${order.discountAmount > 0 ? `<p style="margin:4px 0; color: green;">הנחת קופון: ₪${order.discountAmount.toFixed(2)}-</p>` : ''}
        <p style="margin:4px 0;">משלוח: ${order.deliveryCost > 0 ? '₪' + order.deliveryCost : 'חינם'}</p>
        <p style="font-size:1.4rem;font-weight:800;margin-top:8px">סה"כ שולם: ₪${order.total.toFixed(2)}</p>
      </div>
    </div>`;
}

window.printInvoice = function() {
  const content = document.getElementById('invoiceContent').innerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html dir="rtl"><head><title>הדפסת חשבונית</title>');
  printWindow.document.write('<style>body{font-family: Assistant, sans-serif; padding: 20px;} table{width: 100%; border-collapse: collapse;} th, td{border: 1px solid #ddd; padding: 8px;} th{background: #f4f4f4;} @media print { @page { margin: 0; } body { -webkit-print-color-adjust: exact; } }</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(content);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
      printWindow.print();
      printWindow.close();
  }, 250);
};1234

function clearCart() {
    localStorage.removeItem('ginoCart');
    location.reload();
}


function applyCoupon() {
  const code = document.getElementById('couponInput').value.trim();
  const coupons = JSON.parse(localStorage.getItem('ginoCoupons') || '[]');

  const coupon = coupons.find(c => c.code === code);

  if (!coupon) {
    document.getElementById('couponMessage').textContent = 'קופון לא תקין';
    return;
  }

  let total = getTotalPrice(); // שלך

  // הנחה
  if (coupon.discount > 0) {
    total -= total * (coupon.discount / 100);
  }

  // משלוח חינם
  if (coupon.freeShipping) {
    setDeliveryCost(0);
  }

  updateTotal(total);

  document.getElementById('couponMessage').textContent = 'קופון הופעל!';
}


// Replace getOrders, saveOrder
async function getOrders() {
  const querySnapshot = await getDocs(collection(window.db, 'orders'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function saveOrder(order) {
  await addDoc(collection(window.db, 'orders'), order);
}
