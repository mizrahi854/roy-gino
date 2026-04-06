/**
 * home.js - GINO VINO Main Site Logic
 * Requires products.js loaded first (global: getProducts, addToCart, getCart, updateCartCountUI)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // SCROLL HEADER EFFECT
  // ============================================================
  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ============================================================
  // HAMBURGER MENU
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('active'));
    document.querySelectorAll('#mobileNav a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('active'));
    });
  }

  // ============================================================
  // AGE GATE
  // ============================================================
  const ageGate = document.getElementById('ageGate');
  const ageYes  = document.getElementById('ageYes');
  const ageNo   = document.getElementById('ageNo');
  if (ageGate) {
    if (!localStorage.getItem('ageVerified')) {
      ageGate.style.display = 'flex';
    }
    if (ageYes) ageYes.addEventListener('click', () => {
      localStorage.setItem('ageVerified', 'true');
      ageGate.style.display = 'none';
    });
    if (ageNo) ageNo.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }

  // ============================================================
  // CART COUNT FROM localStorage
  // ============================================================
  if (typeof updateCartCountUI === 'function') updateCartCountUI();

  // ============================================================
  // CART POPUP
  // ============================================================
  const popup       = document.getElementById('cart-popup');
  const continueBtn = document.querySelector('.continue-shopping');
  if (continueBtn && popup) {
    continueBtn.addEventListener('click', () => popup.style.display = 'none');
  }

  // ============================================================
  // SCROLL REVEAL – IntersectionObserver
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ============================================================
  // COUNT-UP ANIMATION for stat numbers
  // ============================================================
  function animateCount(el, target, duration = 2000, suffix = '') {
    const start = performance.now();
    const startVal = 0;
    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(startVal + eased * (target - startVal)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target || el.textContent, 10);
        const suffix = el.dataset.suffix || '';
        animateCount(el, target, 1800, suffix);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => {
    el.dataset.target = el.textContent.replace(/\D/g, '');
    el.dataset.suffix = el.textContent.replace(/[0-9]/g, '');
    statObserver.observe(el);
  });

  // ============================================================
  // FAQ ACCORDION
  // ============================================================
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ============================================================
  // CATEGORY "SEE MORE" TOGGLE
  // ============================================================
  const seeMoreCard = document.getElementById('seeMoreCard');
  const catGrid     = document.getElementById('categoriesGrid');
  if (seeMoreCard && catGrid) {
    // Hide extra category cards initially (beyond 6)
    const allCards = catGrid.querySelectorAll('.category-card:not(#seeMoreCard)');
    const INITIAL_SHOW = 6;
    allCards.forEach((card, i) => {
      if (i >= INITIAL_SHOW) { card.style.display = 'none'; card.dataset.hidden = '1'; }
    });
    let expanded = false;
    seeMoreCard.addEventListener('click', () => {
      expanded = !expanded;
      allCards.forEach((card, i) => {
        if (i >= INITIAL_SHOW) card.style.display = expanded ? '' : 'none';
      });
      seeMoreCard.textContent = expanded ? 'הצג פחות' : 'ראה את כל הקטגוריות';
    });
  }

  // ============================================================
  // RENDER PRODUCTS (catalog section on home page)
  // ============================================================
  // Called by body onload or directly
  window.renderCatalog = function(categoryFilter) {
    const container = document.getElementById('products');
    if (!container) return;

    const products = (typeof getProducts === 'function') ? getProducts() : [];
    let filtered = categoryFilter
      ? products.filter(p => p.category === categoryFilter)
      : products;

    // Show first 20 on home page
    if (!categoryFilter) filtered = filtered.slice(0, 20);

    container.innerHTML = '';
    filtered.forEach(p => {
      const effectivePrice = (p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price) ? p.discountPrice : p.price;
      const hasDiscount    = p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price;

      const card = document.createElement('div');
      card.className = 'product-card reveal';

      card.innerHTML = `
        ${hasDiscount ? `<div class="discount-badge">מבצע</div>` : ''}
        ${!p.isActive ? `<div class="out-of-stock"><span class="out-of-stock-badge">אזל מהמלאי</span></div>` : ''}
        <div class="product-icon"><i class="fas fa-wine-bottle"></i></div>
        <h3>${p.name}</h3>
        <div class="category-tag">${p.category}</div>
        ${p.alcoholPercent > 0 ? `<div class="alcohol-tag">${p.alcoholPercent}% אלכוהול</div>` : ''}
        <div class="product-price-wrap">
          <span class="product-price">${effectivePrice} ₪</span>
          ${hasDiscount ? `<span class="product-price-original">${p.price} ₪</span>` : ''}
        </div>
        <button ${!p.isActive ? 'disabled' : ''} data-name="${p.name}">
          ${p.isActive ? 'הוסף לסל' : 'אזל מהמלאי'}
        </button>
      `;

      container.appendChild(card);
    });

    // Re-observe new cards
    if (typeof IntersectionObserver !== 'undefined') {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      container.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }

    // Add-to-cart click handler
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-name]');
      if (!btn || btn.disabled) return;
      const name    = btn.dataset.name;
      const product = products.find(p => p.name === name);
      if (product && typeof addToCart === 'function') {
        addToCart(product, 1);
        showCartPopup();
      }
    });
  };

  // ============================================================
  // RENDER PRODUCTS FOR CATEGORY PAGES
  // ============================================================
  window.renderProducts = function(categoryName) {
    const container = document.getElementById('products');
    if (!container) return;

    const products = (typeof getProducts === 'function') ? getProducts() : [];
    const filtered = products.filter(p => p.category === categoryName);

    container.innerHTML = '';

    if (!filtered.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:40px">אין מוצרים בקטגוריה זו כרגע.</p>';
      return;
    }

    filtered.forEach(p => {
      const effectivePrice = (p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price) ? p.discountPrice : p.price;
      const hasDiscount    = p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price;

      const card = document.createElement('div');
      card.className = 'product-card reveal';

      card.innerHTML = `
        ${hasDiscount ? `<div class="discount-badge">מבצע</div>` : ''}
        ${!p.isActive ? `<div class="out-of-stock"><span class="out-of-stock-badge">אזל מהמלאי</span></div>` : ''}
        <div class="product-icon"><i class="fas fa-wine-bottle"></i></div>
        <h3>${p.name}</h3>
        <div class="category-tag">${p.category}</div>
        ${p.alcoholPercent > 0 ? `<div class="alcohol-tag">${p.alcoholPercent}% אלכוהול</div>` : ''}
        <div class="product-price-wrap">
          <span class="product-price">${effectivePrice} ₪</span>
          ${hasDiscount ? `<span class="product-price-original">${p.price} ₪</span>` : ''}
        </div>
        <button ${!p.isActive ? 'disabled' : ''} data-name="${p.name}">
          ${p.isActive ? 'הוסף לסל' : 'אזל מהמלאי'}
        </button>
      `;
      container.appendChild(card);
    });

    // Observe cards
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    container.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // Add-to-cart
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-name]');
      if (!btn || btn.disabled) return;
      const name    = btn.dataset.name;
      const product = products.find(p => p.name === name);
      if (product && typeof addToCart === 'function') {
        addToCart(product, 1);
        showCartPopup();
      }
    });
  };

  // ============================================================
  // SHOW CART POPUP
  // ============================================================
  function showCartPopup() {
    const popup = document.getElementById('cart-popup');
    if (popup) {
      popup.style.display = 'block';
      clearTimeout(popup._hideTimeout);
      popup._hideTimeout = setTimeout(() => popup.style.display = 'none', 3000);
    }
  }

  // ============================================================
  // CATEGORY FILTER BUTTONS (if present on page)
  // ============================================================
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      if (typeof renderProducts === 'function') renderProducts(cat || null);
    });
  });

});

// ============================================================
// LIGHTBOX / GALLERY
// ============================================================
const GALLERY_IMAGES = [
  {src: 'תמונת.jpg/1.jpg',     caption: 'תמונה 1'},
  {src: 'תמונת.jpg/2.jpg',     caption: 'לוגו'},
  {src: 'תמונת.jpg/3.jpg',     caption: 'תמונה 1'},
  {src: 'תמונת.jpg/4.jpg',     caption: 'תמונה 2'},
  {src: 'תמונת.jpg/5.jpg',     caption: 'לוגו'},
  {src: 'תמונת.jpg/6.jpg',     caption: 'תמונה 1'},
  {src: 'תמונת.jpg/7.jpg',     caption: 'תמונה 2'},
  {src: 'תמונת.jpg/8.jpg',     caption: 'לוגו'},
  {src: 'תמונת.jpg/9.jpg',     caption: 'תמונה 1'},
  {src: 'תמונת.jpg/10.jpg',    caption: 'תמונה 2'},
  {src: 'תמונת.jpg/12.jpg',    caption: 'לוגו'},
  {src: 'תמונת.jpg/13.jpg',    caption: 'תמונה 1'},
  {src: 'תמונת.jpg/14.jpg',    caption: 'תמונה 2'},
  {src: 'תמונת.jpg/15.jpg',    caption: 'לוגו'},
  {src: 'תמונת.jpg/17.jpg',    caption: 'לוגו'},
  {src: 'תמונת.jpg/18.jpg',    caption: 'תמונה 1'},
  {src: 'תמונת.jpg/19.jpg',    caption: 'תמונה 2'},
  {src: 'תמונת.jpg/21.jpg',    caption: 'לוגו'},
  {src: 'תמונת.jpg/22.jpg',    caption: 'תמונה 1'},
  {src: 'תמונת.jpg/23.jpg',    caption: 'תמונה 2'},
  {src: 'תמונת.jpg/24.jpg',    caption: 'לוגו'},
  {src: 'תמונת.jpg/25.jpg',    caption: 'תמונה 1'},
  {src: 'תמונת.jpg/27.jpg',    caption: 'תמונה 2'},
  {src: 'תמונת.jpg/תמונה.jpeg', caption: 'לוגו'},
  {src: 'תמונת.jpg/תמונה2.jpeg',caption: 'תמונה 1'},
  {src: 'תמונת.jpg/WhatsApp Video 2025-07-31 at 21.30.25.mp4', caption: 'וידאו', type: 'video'},
  {src: 'תמונת.jpg/לוגווו.mp4', caption: 'וידאו', type: 'video'},
  {src: 'תמונת.jpg/וידיוא.mp4', caption: 'וידאו', type: 'video'}
];

let currentLightboxIndex = 0;
const lightbox          = document.getElementById('lightbox');
const lightboxContent   = document.querySelector('.lightbox-content');
const lightboxClose     = document.querySelector('.lightbox .close');
const lightboxNext      = document.querySelector('.lightbox .next');
const lightboxPrev      = document.querySelector('.lightbox .prev');

function showLightboxItem(index) {
  if (!lightbox || !lightboxContent) return;
  const media = GALLERY_IMAGES[index];
  if (!media) return;
  if (media.type === 'video' || media.src.endsWith('.mp4')) {
    lightboxContent.innerHTML = `
      <video controls autoplay style="max-width:90vw;max-height:80vh;border-radius:10px;">
        <source src="${media.src}" type="video/mp4">
      </video>`;
  } else {
    lightboxContent.innerHTML = `
      <img src="${media.src}" alt="${media.caption}" style="max-width:90vw;max-height:80vh;border-radius:10px;">`;
  }
  lightbox.style.display = 'flex';
}

document.querySelectorAll('.preview-item').forEach(item => {
  item.addEventListener('click', () => {
    currentLightboxIndex = parseInt(item.dataset.index || 0, 10);
    showLightboxItem(currentLightboxIndex);
  });
});

const seeMoreBtn = document.querySelector('.see-more-btn');
if (seeMoreBtn) seeMoreBtn.addEventListener('click', () => {
  currentLightboxIndex = 0;
  showLightboxItem(0);
});

if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
if (lightboxNext)  lightboxNext.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_IMAGES.length;
  showLightboxItem(currentLightboxIndex);
});
if (lightboxPrev)  lightboxPrev.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  showLightboxItem(currentLightboxIndex);
});
if (lightbox) lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});
window.addEventListener('scroll', () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
});
