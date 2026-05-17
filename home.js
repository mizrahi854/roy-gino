/* ── AGE GATE ── */
if (localStorage.getItem('ageVerified')) {
  const ageGate = document.getElementById('ageGate');
  if (ageGate) ageGate.classList.add('hidden');
}

const ageYes = document.getElementById('ageYes');
if (ageYes) {
  ageYes.onclick = () => {
    localStorage.setItem('ageVerified', 'true');
    document.getElementById('ageGate').classList.add('hidden');
  };
}

const ageNo = document.getElementById('ageNo');
if (ageNo) {
  ageNo.onclick = () => { window.location.href = 'https://www.google.com'; };
}

/* ── HEADER SCROLL ── */
window.addEventListener('scroll', () => {
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    mainHeader.classList.toggle('solid', window.scrollY > 60);
  }
});



function closeMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav) mobileNav.classList.remove('open');
}

/* ── BRANCHES ── */
function switchBranch(id) {
  document.querySelectorAll('.branch-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.branch-tab').forEach(t => t.classList.remove('active'));
  
  const targetPanel = document.getElementById('panel-' + id);
  if (targetPanel) targetPanel.classList.add('active');
  if (event && event.currentTarget) event.currentTarget.classList.add('active');
}

/* ── MODAL ── */
const MODAL_TYPES = {
  reserve: {
    title: 'הזמנת מקום בסניף',
    fields: `
      <div class="form-row">
        <div class="form-group"><label>שם מלא</label><input type="text" placeholder="ישראל ישראלי"></div>
        <div class="form-group"><label>טלפון</label><input type="tel" placeholder="05X-XXXXXXX"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>תאריך</label><input type="date"></div>
        <div class="form-group"><label>שעה</label><input type="time"></div>
      </div>
      <div class="form-group"><label>מספר סועדים</label>
        <select><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7+</option></select>
      </div>
      <div class="form-group"><label>הערות מיוחדות</label><textarea rows="2" placeholder="אלרגיות, אירוע מיוחד..."></textarea></div>`
  },
  event: {
    title: 'הרשמה לאירוע',
    fields: `
      <div class="form-row">
        <div class="form-group"><label>שם מלא</label><input type="text" placeholder="ישראל ישראלי"></div>
        <div class="form-group"><label>טלפון</label><input type="tel" placeholder="05X-XXXXXXX"></div>
      </div>
      <div class="form-group"><label>אימייל</label><input type="email" placeholder="email@example.com"></div>
      <div class="form-group"><label>סוג האירוע</label>
        <select><option>ערב טעימות</option><option>מאסטרקלאס</option><option>ערב בר</option><option>אירוע פרטי</option><option>הפתעת יום הולדת</option></select>
      </div>
      <div class="form-group"><label>מספר משתתפים</label><input type="number" placeholder="4" min="1"></div>
      <div class="form-group"><label>תאריך מבוקש</label><input type="date"></div>`
  }
};

function openModal(type, branch) {
  const cfg = MODAL_TYPES[type];
  if(!cfg) return;
  document.getElementById('modalTitle').textContent = cfg.title + ' — ' + branch;
  document.getElementById('modalSub').textContent = 'סניף ' + branch + ' · נאשר בהקדם';
  document.getElementById('modalContent').innerHTML = cfg.fields;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function submitModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  showToast('הבקשה נשלחה! נחזור אליכם תוך 24 שעות 🍷');
}

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3800);
}

/* ── REVEAL ANIMATIONS ── */
document.addEventListener("DOMContentLoaded", function() {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObs.observe(el);
  });
});

/* ── CART COUNT ── */
try {
  if (typeof updateCartCountUI === 'function') updateCartCountUI();
  else {
    const cart = JSON.parse(localStorage.getItem('ginoCart') || '[]');
    const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
    const badge = document.getElementById('cartCount');
    if (badge) badge.textContent = total;
  }
} catch (e) {}

/* ── PARALLAX (Desktop Only) ── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && scrolled < window.innerHeight && window.matchMedia('(pointer: fine)').matches) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

/* ── PREMIUM CURSOR (Desktop Only) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'premium-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .branch-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.style.cursor = 'none';
  });
}

/* ── PRELOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 2200);
});

/* ── ULTRA PREMIUM LOGIC (MAGNETIC & SPOTLIGHT) ── */
document.addEventListener('DOMContentLoaded', () => {
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-outline, .branch-btn, .submit-btn, .event-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px) scale(1)`;
    });
  });

  const spotlightCards = document.querySelectorAll('.branch-card, .event-card, .cta-wrap');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
});

/* ── TASTE PROFILER DATA ── */
const profilerData = {
  "relaxed-solo-high": { name: "מקאלן 12", desc: "ויסקי יוקרתי ועמוק המיושן בחביות שרי.", img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80" },
  "relaxed-dinner-mid": { name: "ארטיזנל - דיזייר", desc: "בלנד יוקרתי ומרשים לאירועים מיוחדים.", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80" },
  "energetic-party-high": { name: "דון חוליו 1942", desc: "טקילה שנועדה להרים את האנרגיה.", img: "https://images.unsplash.com/photo-1615887087218-26b3ebf25c12?w=400&q=80" },
  "romantic-solo-mid": { name: "אפרול", desc: "קליל, הדרי ומעט מריר.", img: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&q=80" },
  "default": { name: "ג׳וני ווקר - גולד לייבל", desc: "ויסקי עשיר, מתקתק ומורכב.", img: "https://images.unsplash.com/photo-1506377585622-bedcbb5a8c4c?w=400&q=80" }
};

function revealTaste() {
  const mood = document.getElementById('prof-mood').value;
  const occasion = document.getElementById('prof-occasion').value;
  const strength = document.getElementById('prof-strength').value;
  
  const key = `${mood}-${occasion}-${strength}`;
  let result = profilerData[key];
  if (!result) {
    if (strength === 'high') result = profilerData["relaxed-solo-high"];
    else if (mood === 'energetic') result = profilerData["energetic-party-high"];
    else if (mood === 'romantic') result = profilerData["romantic-solo-mid"];
    else result = profilerData["relaxed-dinner-mid"];
  }

  const resultBox = document.getElementById('prof-result');
  if(!resultBox) return;
  resultBox.classList.remove('active');
  
  setTimeout(() => {
    document.getElementById('res-name').innerText = result.name;
    document.getElementById('res-desc').innerText = result.desc;
    document.getElementById('res-img').src = result.img;
    resultBox.classList.add('active');
  }, 400);
}

/* ── TRUE AI RECOMMENDATION ENGINE (הגרסה המתקדמת והיחידה) ── */
function generateExpertRecommendation() {
  if (typeof EMBEDDED_PRODUCTS === 'undefined') {
      console.error("products.js לא נטען!");
      return;
  }

  const prefType = document.getElementById('prof-type').value;     
  const prefFlavor = document.getElementById('prof-flavor').value; 
  const prefBudget = document.getElementById('prof-budget').value; 
  const prefStrength = document.getElementById('prof-strength').value; 

  const allProducts = EMBEDDED_PRODUCTS.filter(p => p.isActive); 
  let bestMatch = null;
  let highestScore = -1;

  allProducts.forEach(product => {
    let score = 0;
    let price = (product.discountPrice > 0 && product.discountPrice < product.price) ? product.discountPrice : product.price;
    let alc = product.alcoholPercent || 0;
    let textToAnalyze = (product.name + " " + product.category).toLowerCase();

    if (prefType === 'יין' && product.category.includes('יין')) score += 50;
    else if (prefType === 'וויסקי' && (product.category === 'וויסקי' || product.category === 'קוניאק')) score += 50;
    else if (prefType === 'טקילה' && product.category === 'טקילה') score += 50;
    else if (prefType === 'וודקה' && (product.category === 'וודקה' || product.category.includes('ג׳ין'))) score += 50;
    else if (prefType === 'אניס' && product.category === 'אניס') score += 50;

    if (prefBudget === 'value' && price <= 150) score += 30;
    else if (prefBudget === 'premium' && price > 150 && price <= 400) score += 30;
    else if (prefBudget === 'luxury' && price > 400) score += 30;

    if (prefStrength === 'low' && alc <= 20) score += 20;
    else if (prefStrength === 'high' && alc > 20) score += 20;

    if (prefFlavor === 'sweet' && textToAnalyze.match(/ליקר|מתוק|דבש|שרי|קרם|אמרטו/)) score += 15;
    if (prefFlavor === 'smoky' && textToAnalyze.match(/עשן|מעושן|לגבולין|לפרויג|טליסקר|פיט/)) score += 15;
    if (prefFlavor === 'fruity' && textToAnalyze.match(/פירות|תפוח|דובדבן|מלון|אננס|אבטיח/)) score += 15;
    if (prefFlavor === 'sour' && textToAnalyze.match(/לימון|לימונצלו|הדרים|אפרול/)) score += 15;
    if (prefFlavor === 'dry' && textToAnalyze.match(/יבש|דריי|בלאנקו|ג'ין/)) score += 15;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = product;
    }
  });

  if (!bestMatch || highestScore === 0) {
      bestMatch = allProducts.find(p => p.name.includes("ג׳וני ווקר")) || allProducts[0];
  }

  const resultBox = document.getElementById('prof-result');
  if(!resultBox) return;
  resultBox.classList.remove('active');

  setTimeout(() => {
    document.getElementById('res-name').innerText = bestMatch.name;
    let displayPrice = (bestMatch.discountPrice > 0) ? bestMatch.discountPrice : bestMatch.price;
    const resPrice = document.getElementById('res-price');
    if(resPrice) resPrice.innerText = `${displayPrice} ₪`;
    
    let desc = `בחירה מעולה מקטגוריית ה${bestMatch.category}. משקה פרימיום בעל ${bestMatch.alcoholPercent}% אלכוהול, מותאם בדיוק לפרופיל הטעם שבחרת.`;
    document.getElementById('res-desc').innerText = desc;
    
    const resImg = document.getElementById('res-img');
    if(resImg) {
      if(typeof getCatImage === 'function') {
          resImg.src = getCatImage(bestMatch.category, bestMatch.name);
      } else {
          resImg.src = bestMatch.image || 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=400&q=80';
      }
    }
    
    const resLink = document.getElementById('res-link');
    if(resLink) resLink.href = `shop.html?search=${encodeURIComponent(bestMatch.name)}`;
    
    resultBox.classList.add('active');
    if(window.innerWidth < 768) {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 500);
}

/* ── LIGHTBOX & GALLERY LOGIC ── */
let currentImageIndex = 0;
let galleryImages = [];

function renderHomeGallery() {
  let storedImages = [];
  try { storedImages = JSON.parse(localStorage.getItem('ginoImageCatalog') || '[]'); } catch(e){}
  
  const grid = document.getElementById('mainGalleryGrid');
  if(!grid) return;

  const imagesToShow = storedImages.length > 0 ? storedImages.slice(0, 10) : [
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
    "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800&q=80",
    "https://images.unsplash.com/photo-1615887087218-26b3ebf25c12?w=800&q=80",
    "https://images.unsplash.com/photo-1574313007-4b98b519f403?w=800&q=80"
  ];

  grid.innerHTML = imagesToShow.map(imgUrl => `
    <div class="gallery-item">
      <img src="${imgUrl}" alt="GINO VINO Gallery" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&q=80'">
    </div>
  `).join('');

  galleryImages = imagesToShow;

  const items = grid.querySelectorAll('.gallery-item');
  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });
}

window.addEventListener('load', () => {
  setTimeout(renderHomeGallery, 600);
});

function openLightbox(index) {
  if(galleryImages.length === 0) return;
  currentImageIndex = index;
  const lb = document.getElementById('galleryLightbox');
  const lbImg = document.getElementById('lightboxImage');
  if(!lb || !lbImg) return;
  
  lbImg.style.opacity = 0;
  setTimeout(() => {
    lbImg.src = galleryImages[currentImageIndex];
    lbImg.style.opacity = 1;
  }, 100);
  
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('galleryLightbox');
  if(lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightboxImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
  if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
  
  const lbImg = document.getElementById('lightboxImage');
  if(!lbImg) return;
  lbImg.style.opacity = 0.5;
  setTimeout(() => {
    lbImg.src = galleryImages[currentImageIndex];
    lbImg.style.opacity = 1;
  }, 150);
}
