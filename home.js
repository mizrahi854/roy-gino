document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // HAMBURGER MENU MOBILE
  // ==============================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) { //*
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });

    document.querySelectorAll('#mobileNav a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
  }

  // ==============================
  // FAQ
  // ==============================
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      answer.style.display =
        answer.style.display === 'block' ? 'none' : 'block';
    });
  });

  // ==============================
  // CART + POPUP (דינמי)
  // ==============================
  let cartCount = 0;
  let totalPrice =0 ;
  const cartCountEl = document.getElementById('cart-count');
  const popup = document.getElementById('cart-popup');
  const continueBtn = document.querySelector('.continue-shopping');
  const productsContainer = document.getElementById('products'); //*

  if (productsContainer) { //*
    productsContainer.addEventListener('click', (e) => { //*
      if (e.target.tagName === 'BUTTON') { //*
        cartCount++;
        console.log(e);
        totalPrice += e.price;
   
        sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        if (cartCountEl) cartCountEl.textContent = cartCount;

        if (popup) {
          popup.style.display = 'block';
          setTimeout(() => popup.style.display = 'none', 3000);
        }
      }
    });
  }

  if (continueBtn && popup) { //*
    continueBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

  // ==============================
  // AGE GATE
  // ==============================
  const ageGate = document.getElementById('ageGate');
  const ageYes = document.getElementById('ageYes');
  const ageNo = document.getElementById('ageNo');

  if (ageGate && ageYes && ageNo) { //*
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

});


// ==============================
// LIGHTBOX / GALLERY
// ==============================
const images = [
  {src: 'תמונת.jpg/1.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/2.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/3.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/4.jpg', caption: 'תמונה 2'},
  {src: 'תמונת.jpg/5.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/6.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/7.jpg', caption: 'תמונה 2'},
  {src: 'תמונת.jpg/8.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/9.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/10.jpg', caption: 'תמונה 2'},
  {src: 'תמונת.jpg/12.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/13.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/14.jpg', caption: 'תמונה 2'},
  {src: 'תמונת.jpg/15.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/17.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/18.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/19.jpg', caption: 'תמונה 2'},
  {src: 'תמונת.jpg/21.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/22.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/23.jpg', caption: 'תמונה 2'},
  {src: 'תמונת.jpg/24.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/25.jpg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/27.jpg', caption: 'תמונה 2'},
  {src: 'תמונת.jpg/תמונה.jpeg', caption: 'לוגו'},
  {src: 'תמונת.jpg/תמונה2.jpeg', caption: 'תמונה 1'},
  {src: 'תמונת.jpg/1.jpg', caption: 'לוגו'},
  {src: 'תמונת.jpg/WhatsApp Video 2025-07-31 at 21.30.25.mp4', caption: 'וידאו'},
  {src: 'תמונת.jpg/לוגווו.mp4', caption: 'וידאו'},
  {src: 'תמונת.jpg/וידיוא.mp4', caption: 'וידאו'}
];

const previewItems = document.querySelectorAll('.preview-item');
const lightbox = document.getElementById('lightbox');
const lightboxImgContainer = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.lightbox .close');
const nextBtn = document.querySelector('.lightbox .next');
const prevBtn = document.querySelector('.lightbox .prev');
const seeMoreBtn = document.querySelector('.see-more-btn');

let currentIndex = 0;

previewItems.forEach(item => {
  item.addEventListener('click', () => {
    currentIndex = parseInt(item.dataset.index);
    showLightbox();
  });
});

if (seeMoreBtn) { //*
  seeMoreBtn.addEventListener('click', () => {
    currentIndex = 0;
    showLightbox();
  });
}

function showLightbox() {
  const media = images[currentIndex];

  if (media.src.endsWith('.mp4')) {
    lightboxImgContainer.innerHTML = `
      <video controls autoplay style="max-width:90%; max-height:80%; border-radius:10px;">
        <source src="${media.src}" type="video/mp4">
      </video>
    `;
  } else {
    lightboxImgContainer.innerHTML = `
      <img src="${media.src}" alt="${media.caption}" style="max-width:90%; max-height:80%; border-radius:10px;">
    `;
  }

  lightbox.style.display = 'flex';
}

if (closeBtn) closeBtn.addEventListener('click', () => lightbox.style.display = 'none'); //*
if (nextBtn) nextBtn.addEventListener('click', () => { //*
  currentIndex = (currentIndex + 1) % images.length;
  showLightbox();
});
if (prevBtn) prevBtn.addEventListener('click', () => { //*
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showLightbox();
});

if (lightbox) { //*
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
}


// ==============================
// RENDER PRODUCTS
// ==============================
function renderProducts(categoryName) {
  const products = loaddata();
  const container = document.getElementById('products');
  container.innerHTML = '';

  products
    .filter(p => p.category === categoryName)
    .forEach(p => {
      container.innerHTML += `
        <div class="product-card">
          <h3>${p.name}</h3>
          <p>${p.price} ₪</p>
          <button>הוסף לסל</button>
        </div>
      `;
    });
}

function loaddata()
{
   let products =
    [
    
{"alcoholPercent":27,"price":95.00,"discountPrice":0,"cost":74.60,"isActive":false,"name":"אוזו קרדסי","category":"אניס"},
{"alcoholPercent":27,"price":95.00,"discountPrice":75,"cost":75.00,"isActive":true,"name":"אוזו מטקסה","category":"אניס"},
{"alcoholPercent":22,"price":45.00,"discountPrice":37,"cost":37.00,"isActive":true,"name":"ערק לימונים 700","category":"אניס"},
{"alcoholPercent":20,"price":60.00,"discountPrice":350,"cost":50.00,"isActive":false,"name":"ערק לימונים ליטר","category":"אניס"},
{"alcoholPercent":20,"price":55.00,"discountPrice":0,"cost":45.70,"isActive":false,"name":"ארק כרמל","category":"אניס"},
{"alcoholPercent":17,"price":95.00,"discountPrice":0,"cost":81.50,"isActive":false,"name":"ערק נח","category":"אניס"},
{"alcoholPercent":8,"price":65.00,"discountPrice":1980,"cost":60.00,"isActive":false,"name":"ערק עלית","category":"אניס"},
{"alcoholPercent":15,"price":65.00,"discountPrice":736,"cost":56.60,"isActive":false,"name":"ערק עמיאל 700","category":"אניס"},
{"alcoholPercent":40,"price":13.02,"discountPrice":93,"cost":9.30,"isActive":false,"name":"אלכסנדר אמברה","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":307,"cost":9.30,"isActive":false,"name":"אלכסנדר בוק","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":28,"cost":9.30,"isActive":false,"name":"אלכסנדר בלונד","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":102,"cost":9.30,"isActive":false,"name":"אלכסנדר בלייזר","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":242,"cost":9.30,"isActive":false,"name":"אלכסנדר גרין","category":"בירות"},
{"alcoholPercent":40,"price":14.00,"discountPrice":100,"cost":10.00,"isActive":false,"name":"אלכסנדר טרופיקל ipa","category":"בירות"},
{"alcoholPercent":38,"price":9.00,"discountPrice":33,"cost":6.50,"isActive":false,"name":"בלאנק","category":"בירות"},
{"alcoholPercent":30,"price":6.00,"discountPrice":129,"cost":4.60,"isActive":false,"name":"בקס","category":"בירות"},
{"alcoholPercent":25,"price":15.00,"discountPrice":108,"cost":12.00,"isActive":false,"name":"ברודוג - פאנק ללא גלוטן","category":"בירות"},
{"alcoholPercent":25,"price":15.00,"discountPrice":204,"cost":12.00,"isActive":false,"name":"ברודוג - אלוויס גו׳ס","category":"בירות"},
{"alcoholPercent":43,"price":15.00,"discountPrice":210,"cost":10.50,"isActive":false,"name":"ברודוג - בייבי הייזי","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":377,"cost":11.10,"isActive":false,"name":"ברודוג - ג׳וס שייק","category":"בירות"},
{"alcoholPercent":25,"price":20.00,"discountPrice":192,"cost":16.00,"isActive":false,"name":"ברודוג - דאבל הייזי גיין","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":133,"cost":11.10,"isActive":false,"name":"ברודוג - ווינגמן סשן איי פי איי","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":183,"cost":18.30,"isActive":false,"name":"ברודוג - קולד ביר","category":"בירות"},
{"alcoholPercent":0,"price":0.00,"discountPrice":0,"cost":0,"isActive":false,"name":"ברודוג mmxxx","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":155,"cost":11.10,"isActive":false,"name":"ברודוג אורנג׳ קראש","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":92,"cost":18.30,"isActive":false,"name":"ברודוג בלאק הארט","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":167,"cost":11.10,"isActive":false,"name":"ברודוג גויאבה","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":67,"cost":11.10,"isActive":false,"name":"ברודוג הייזי ג׳יין","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":37,"cost":18.30,"isActive":false,"name":"ברודוג ווינגמן טרופיקל סטורם","category":"בירות"},
{"alcoholPercent":63,"price":15.00,"discountPrice":9,"cost":9.20,"isActive":true,"name":"ברודוג טאצ׳דאון לאגר","category":"בירות"},
{"alcoholPercent":25,"price":15.00,"discountPrice":228,"cost":12.00,"isActive":false,"name":"ברודוג פאנק IPA","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":56,"cost":11.10,"isActive":false,"name":"ברודוג פרוט ברסט","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":92,"cost":18.30,"isActive":false,"name":"ברודוג קאונטר סטרייק","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":92,"cost":18.30,"isActive":false,"name":"ברודוג קולד ללא גלוטן","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":211,"cost":11.10,"isActive":false,"name":"ברודוג קלוקוורק טנג׳רין","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":186,"cost":9.30,"isActive":false,"name":"ג׳יימס ipa","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":372,"cost":9.30,"isActive":false,"name":"ג׳יימס ווט","category":"בירות"},
{"alcoholPercent":40,"price":7.00,"discountPrice":395,"cost":5.00,"isActive":false,"name":"גולדסטאר","category":"בירות"},
{"alcoholPercent":20,"price":24.00,"discountPrice":280,"cost":20.00,"isActive":false,"name":"גינס","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":42,"cost":10.50,"isActive":false,"name":"דובל","category":"בירות"},
{"alcoholPercent":24,"price":14.00,"discountPrice":384,"cost":11.30,"isActive":false,"name":"דובל 666","category":"בירות"},
{"alcoholPercent":30,"price":9.00,"discountPrice":200,"cost":6.90,"isActive":false,"name":"הוגרדן","category":"בירות"},
{"alcoholPercent":27,"price":7.00,"discountPrice":242,"cost":5.50,"isActive":false,"name":"הייניקן","category":"בירות"},
{"alcoholPercent":40,"price":6.00,"discountPrice":116,"cost":4.30,"isActive":false,"name":"הייניקן 0 אחוז","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":213,"cost":11.20,"isActive":false,"name":"הרצל - 6 אחוז כפרה","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":101,"cost":11.20,"isActive":false,"name":"הרצל - IPA וזה","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":45,"cost":11.20,"isActive":false,"name":"הרצל הייזי שמייזי","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":67,"cost":11.20,"isActive":false,"name":"הרצל מקסיקו 70","category":"בירות"},
{"alcoholPercent":36,"price":16.00,"discountPrice":142,"cost":11.80,"isActive":false,"name":"וויט ראביט ירוק","category":"בירות"},
{"alcoholPercent":36,"price":16.00,"discountPrice":118,"cost":11.80,"isActive":false,"name":"וויט ראביט כחול","category":"בירות"},
{"alcoholPercent":36,"price":16.00,"discountPrice":153,"cost":11.80,"isActive":false,"name":"וויט ראביט שחור","category":"בירות"},
{"alcoholPercent":24,"price":11.00,"discountPrice":312,"cost":8.90,"isActive":false,"name":"ווינשטפן","category":"בירות"},
{"alcoholPercent":28,"price":11.00,"discountPrice":198,"cost":8.60,"isActive":false,"name":"ווינשטפן ויטוס","category":"בירות"},
{"alcoholPercent":26,"price":12.00,"discountPrice":580,"cost":9.50,"isActive":false,"name":"ליפמנס","category":"בירות"},
{"alcoholPercent":32,"price":9.00,"discountPrice":136,"cost":6.80,"isActive":false,"name":"לף בלונד","category":"בירות"},
{"alcoholPercent":32,"price":9.00,"discountPrice":510,"cost":6.80,"isActive":false,"name":"לף בראון","category":"בירות"},
{"alcoholPercent":30,"price":15.00,"discountPrice":104,"cost":11.50,"isActive":false,"name":"מיקלר בורסט","category":"בירות"},
{"alcoholPercent":30,"price":15.00,"discountPrice":242,"cost":11.50,"isActive":false,"name":"מיקלר הופ שופ הייזי IPA","category":"בירות"},
{"alcoholPercent":30,"price":15.00,"discountPrice":92,"cost":11.50,"isActive":false,"name":"מיקלר פשן פול","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":21,"cost":10.70,"isActive":false,"name":"מלכה ipa שיבולת שועל","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":257,"cost":10.70,"isActive":false,"name":"מלכה אדמונית","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":86,"cost":10.70,"isActive":false,"name":"מלכה בהירה","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":246,"cost":10.70,"isActive":false,"name":"מלכה הינדי","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":268,"cost":10.70,"isActive":false,"name":"מלכה חיטה","category":"בירות"},
{"alcoholPercent":27,"price":14.00,"discountPrice":275,"cost":11.00,"isActive":false,"name":"מרדסוס","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":86,"cost":10.70,"isActive":false,"name":"נגב אואזיס","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":96,"cost":10.70,"isActive":false,"name":"נגב אמבר אייל","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":54,"cost":10.70,"isActive":false,"name":"נגב פאטה מורגנה","category":"בירות"},
{"alcoholPercent":25,"price":25.00,"discountPrice":60,"cost":20.00,"isActive":false,"name":"סאמיקלאוס חום","category":"בירות"},
{"alcoholPercent":27,"price":28.00,"discountPrice":44,"cost":22.00,"isActive":false,"name":"סאמיקלאוס צהוב","category":"בירות"},
{"alcoholPercent":23,"price":25.00,"discountPrice":101,"cost":20.25,"isActive":false,"name":"סאמיקלאוס שחור","category":"בירות"},
{"alcoholPercent":21,"price":8.00,"discountPrice":172,"cost":6.60,"isActive":false,"name":"סאמרסבי תפוח","category":"בירות"},
{"alcoholPercent":21,"price":8.00,"discountPrice":185,"cost":6.60,"isActive":false,"name":"סאמרסבי אוכמניות","category":"בירות"},
{"alcoholPercent":21,"price":8.00,"discountPrice":119,"cost":6.60,"isActive":false,"name":"סאמרסבי מנגו ליים","category":"בירות"},
{"alcoholPercent":40,"price":7.00,"discountPrice":0,"cost":5.00,"isActive":false,"name":"סטלה","category":"בירות"},
{"alcoholPercent":28,"price":10.00,"discountPrice":125,"cost":7.80,"isActive":false,"name":"פאולנר","category":"בירות"},
{"alcoholPercent":20,"price":6.00,"discountPrice":300,"cost":5.00,"isActive":false,"name":"פחית באדוויזר","category":"בירות"},
{"alcoholPercent":30,"price":7.00,"discountPrice":130,"cost":5.40,"isActive":false,"name":"קורונה","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":32,"cost":10.50,"isActive":false,"name":"שוף - לה","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":231,"cost":10.50,"isActive":false,"name":"שוף - מק","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":95,"cost":10.50,"isActive":false,"name":"שוף - צ׳רי","category":"בירות"},
{"alcoholPercent":36,"price":15.00,"discountPrice":132,"cost":11.00,"isActive":false,"name":"שפירא ipa","category":"בירות"},
{"alcoholPercent":40,"price":14.00,"discountPrice":230,"cost":10.00,"isActive":false,"name":"שפירא ניו לאגר","category":"בירות"},
{"alcoholPercent":40,"price":14.00,"discountPrice":430,"cost":10.00,"isActive":false,"name":"שפירא פייל אייל","category":"בירות"},
{"alcoholPercent":27,"price":175.00,"discountPrice":138,"cost":138.30,"isActive":true,"name":"7 קראפט","category":"ג׳ין"},
{"alcoholPercent":24,"price":149.00,"discountPrice":360,"cost":120.00,"isActive":false,"name":"ארטה","category":"ג׳ין"},
{"alcoholPercent":20,"price":108.00,"discountPrice":270,"cost":90.00,"isActive":false,"name":"בולדוג","category":"ג׳ין"},
{"alcoholPercent":20,"price":139.00,"discountPrice":580,"cost":116.00,"isActive":false,"name":"בומביי ליטר","category":"ג׳ין"},
{"alcoholPercent":20,"price":135.00,"discountPrice":787,"cost":112.40,"isActive":false,"name":"ביפיטר ליטר","category":"ג׳ין"},
{"alcoholPercent":23,"price":115.00,"discountPrice":468,"cost":93.50,"isActive":false,"name":"ביפיטר פינק","category":"ג׳ין"},
{"alcoholPercent":20,"price":85.00,"discountPrice":2698,"cost":71.00,"isActive":false,"name":"גורדון 700","category":"ג׳ין"},
{"alcoholPercent":19,"price":165.00,"discountPrice":830,"cost":138.40,"isActive":false,"name":"הנדריקס","category":"ג׳ין"},
{"alcoholPercent":21,"price":169.00,"discountPrice":278,"cost":139.10,"isActive":false,"name":"טינקרס גין גרין","category":"ג׳ין"},
{"alcoholPercent":20,"price":179.00,"discountPrice":299,"cost":149.50,"isActive":false,"name":"טינקרס גין פינק","category":"ג׳ין"},
{"alcoholPercent":19,"price":189.00,"discountPrice":477,"cost":159.00,"isActive":false,"name":"טינקרס גין פרפל","category":"ג׳ין"},
{"alcoholPercent":17,"price":189.00,"discountPrice":323,"cost":161.25,"isActive":false,"name":"מארה","category":"ג׳ין"},
{"alcoholPercent":18,"price":149.00,"discountPrice":378,"cost":126.00,"isActive":false,"name":"רוקו גין","category":"ג׳ין"},
{"alcoholPercent":13,"price":160.00,"discountPrice":2980,"cost":141.90,"isActive":false,"name":"בלוגה","category":"וודקה"},
{"alcoholPercent":15,"price":150.00,"discountPrice":260,"cost":130.00,"isActive":false,"name":"בלוודר","category":"וודקה"},
{"alcoholPercent":15,"price":155.00,"discountPrice":0,"cost":135.00,"isActive":false,"name":"גרייגוס ליטר","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":1478,"cost":134.40,"isActive":false,"name":"וואן גוך אננס","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":269,"cost":134.40,"isActive":false,"name":"וואן גוך אבטיח","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":941,"cost":134.40,"isActive":false,"name":"וואן גוך אסאי","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":941,"cost":134.40,"isActive":false,"name":"וואן גוך מלון","category":"וודקה"},
{"alcoholPercent":-100,"price":0,"discountPrice":200,"cost":200.00,"isActive":true,"name":"לגנד קרמלין","category":"וודקה"},
{"alcoholPercent":17,"price":76.00,"discountPrice":650,"cost":65.00,"isActive":false,"name":"סטולי 700","category":"וודקה"},
{"alcoholPercent":19,"price":119.00,"discountPrice":400,"cost":100.00,"isActive":false,"name":"סטולי גולד","category":"וודקה"},
{"alcoholPercent":17,"price":89.00,"discountPrice":684,"cost":76.00,"isActive":false,"name":"סטולי ליטר","category":"וודקה"},
{"alcoholPercent":20,"price":90.00,"discountPrice":150,"cost":75.00,"isActive":false,"name":"סטולי ללא גלוטן","category":"וודקה"},
{"alcoholPercent":21,"price":155.00,"discountPrice":1408,"cost":128.00,"isActive":false,"name":"סטולי עלית","category":"וודקה"},
{"alcoholPercent":21,"price":75.00,"discountPrice":62,"cost":61.80,"isActive":true,"name":"סמירנוף 700","category":"וודקה"},
{"alcoholPercent":20,"price":89.00,"discountPrice":148,"cost":74.00,"isActive":false,"name":"סמירנוף ליטר","category":"וודקה"},
{"alcoholPercent":22,"price":29.00,"discountPrice":119,"cost":23.70,"isActive":false,"name":"פילנדיה 200 מל","category":"וודקה"},
{"alcoholPercent":21,"price":75.00,"discountPrice":0,"cost":62.00,"isActive":false,"name":"פינלנדיה 700 מ׳׳ל","category":"וודקה"},
{"alcoholPercent":13,"price":89.00,"discountPrice":316,"cost":79.00,"isActive":false,"name":"פינלנדיה ליטר","category":"וודקה"},
{"alcoholPercent":35,"price":135.00,"discountPrice":100,"cost":100.00,"isActive":true,"name":"רוברטו קוואלי","category":"וודקה"},
{"alcoholPercent":38,"price":145.00,"discountPrice":210,"cost":105.00,"isActive":false,"name":"רוברטו קוואלי אבטיח","category":"וודקה"},
{"alcoholPercent":38,"price":145.00,"discountPrice":315,"cost":105.00,"isActive":false,"name":"רוברטו קוואלי אננס","category":"וודקה"},
{"alcoholPercent":38,"price":145.00,"discountPrice":105,"cost":105.00,"isActive":true,"name":"רוברטו קוואלי מלון","category":"וודקה"},
{"alcoholPercent":22,"price":105.00,"discountPrice":86,"cost":86.25,"isActive":true,"name":"JB","category":"וויסקי"},
{"alcoholPercent":19,"price":429.00,"discountPrice":720,"cost":360.00,"isActive":false,"name":"בושמילס 16","category":"וויסקי"},
{"alcoholPercent":20,"price":129.00,"discountPrice":538,"cost":107.50,"isActive":false,"name":"בושמילס אורינגל","category":"וויסקי"},
{"alcoholPercent":22,"price":129.00,"discountPrice":530,"cost":106.00,"isActive":false,"name":"בושמילס בלאק בוש","category":"וויסקי"},
{"alcoholPercent":21,"price":285.00,"discountPrice":1416,"cost":236.00,"isActive":false,"name":"בלביני 12","category":"וויסקי"},
{"alcoholPercent":20,"price":385.00,"discountPrice":963,"cost":321.00,"isActive":false,"name":"בלביני 14","category":"וויסקי"},
{"alcoholPercent":23,"price":49.00,"discountPrice":680,"cost":40.00,"isActive":false,"name":"ג׳וני ווקר - בלאק לייבל 200 מל","category":"וויסקי"},
{"alcoholPercent":10,"price":129.00,"discountPrice":351,"cost":117.00,"isActive":false,"name":"ג׳וני ווקר - בלאק לייבל 700","category":"וויסקי"},
{"alcoholPercent":7,"price":159.00,"discountPrice":1187,"cost":148.40,"isActive":false,"name":"ג׳וני ווקר - בלאק לייבל ליטר","category":"וויסקי"},
{"alcoholPercent":9,"price":155.00,"discountPrice":855,"cost":142.50,"isActive":false,"name":"ג׳וני ווקר - גולד לייבל","category":"וויסקי"},
{"alcoholPercent":13,"price":229.00,"discountPrice":608,"cost":202.50,"isActive":false,"name":"ג׳וני ווקר - גרין לייבל","category":"וויסקי"},
{"alcoholPercent":16,"price":165.00,"discountPrice":284,"cost":141.75,"isActive":false,"name":"ג׳וני ווקר - דאבל בלאק","category":"וויסקי"},
{"alcoholPercent":10,"price":85.00,"discountPrice":155,"cost":77.25,"isActive":false,"name":"ג׳וני ווקר - רד לייבל 700","category":"וויסקי"},
{"alcoholPercent":11,"price":115.00,"discountPrice":1242,"cost":103.50,"isActive":false,"name":"ג׳וני ווקר - רד לייבל ליטר","category":"וויסקי"},
{"alcoholPercent":22,"price":95.00,"discountPrice":310,"cost":77.60,"isActive":false,"name":"ג׳ים בים ברבן","category":"וויסקי"},
{"alcoholPercent":22,"price":95.00,"discountPrice":388,"cost":77.60,"isActive":false,"name":"ג׳ים בים דבש","category":"וויסקי"},
{"alcoholPercent":24,"price":99.00,"discountPrice":320,"cost":80.00,"isActive":false,"name":"ג׳ים בים צ׳רי","category":"וויסקי"},
{"alcoholPercent":24,"price":125.00,"discountPrice":606,"cost":101.00,"isActive":false,"name":"ג׳ים בים שחור","category":"וויסקי"},
{"alcoholPercent":24,"price":99.00,"discountPrice":400,"cost":80.00,"isActive":false,"name":"ג׳ים בים תפוח","category":"וויסקי"},
{"alcoholPercent":28,"price":49.00,"discountPrice":306,"cost":38.20,"isActive":false,"name":"ג׳ק דניאלס 200 מיל","category":"וויסקי"},
{"alcoholPercent":19,"price":119.00,"discountPrice":100,"cost":100.00,"isActive":true,"name":"ג׳ק דניאלס תפוח","category":"וויסקי"},
{"alcoholPercent":19,"price":139.00,"discountPrice":1522,"cost":117.10,"isActive":false,"name":"גלן גראנט 10","category":"וויסקי"},
{"alcoholPercent":19,"price":159.00,"discountPrice":1603,"cost":133.60,"isActive":false,"name":"גלן גראנט 12","category":"וויסקי"},
{"alcoholPercent":17,"price":119.00,"discountPrice":408,"cost":102.00,"isActive":false,"name":"גלן גראנט קלאסי","category":"וויסקי"},
{"alcoholPercent":18,"price":379.00,"discountPrice":321,"cost":320.90,"isActive":true,"name":"גלן גרנט 18","category":"וויסקי"},
{"alcoholPercent":17,"price":179.00,"discountPrice":306,"cost":153.00,"isActive":false,"name":"גלנדפידיך 12","category":"וויסקי"},
{"alcoholPercent":20,"price":229.00,"discountPrice":1340,"cost":191.40,"isActive":false,"name":"גלנדפידיך 14","category":"וויסקי"},
{"alcoholPercent":19,"price":249.00,"discountPrice":208,"cost":208.40,"isActive":true,"name":"גלנדפידיך 15","category":"וויסקי"},
{"alcoholPercent":20,"price":359.00,"discountPrice":300,"cost":300.00,"isActive":true,"name":"גלנדפידיך 18","category":"וויסקי"},
{"alcoholPercent":12,"price":899.00,"discountPrice":800,"cost":800.00,"isActive":true,"name":"גלנדפידיך 21","category":"וויסקי"},
{"alcoholPercent":67,"price":2000.00,"discountPrice":1200,"cost":1200,"isActive":true,"name":"גלנדפידיך 21 וינטר סטורם","category":"וויסקי"},
{"alcoholPercent":19,"price":219.00,"discountPrice":736,"cost":184.00,"isActive":false,"name":"גלנליבט 12","category":"וויסקי"},
{"alcoholPercent":16,"price":299.00,"discountPrice":1287,"cost":257.30,"isActive":false,"name":"גלנליבט 15","category":"וויסקי"},
{"alcoholPercent":15,"price":149.00,"discountPrice":779,"cost":129.90,"isActive":false,"name":"גלנליבט פאונדרס","category":"וויסקי"},
{"alcoholPercent":17,"price":590.00,"discountPrice":506,"cost":506.00,"isActive":true,"name":"היביקי","category":"וויסקי"},
{"alcoholPercent":22,"price":329.00,"discountPrice":1350,"cost":270.00,"isActive":false,"name":"טינקרס ברבן","category":"וויסקי"},
{"alcoholPercent":20,"price":245.00,"discountPrice":818,"cost":204.50,"isActive":false,"name":"טליסקר סטורם","category":"וויסקי"},
{"alcoholPercent":20,"price":269.00,"discountPrice":1786,"cost":223.30,"isActive":false,"name":"טליסקר סקאי","category":"וויסקי"},
{"alcoholPercent":18,"price":499.00,"discountPrice":1691,"cost":422.70,"isActive":false,"name":"לגבולין 16","category":"וויסקי"},
{"alcoholPercent":22,"price":245.00,"discountPrice":804,"cost":201.00,"isActive":false,"name":"לפרויג 10","category":"וויסקי"},
{"alcoholPercent":22,"price":225.00,"discountPrice":553,"cost":184.30,"isActive":false,"name":"לפרויג סלקט","category":"וויסקי"},
{"alcoholPercent":21,"price":315.00,"discountPrice":780,"cost":260.00,"isActive":false,"name":"לפרויג קווארטר קאסק","category":"וויסקי"},
{"alcoholPercent":18,"price":145.00,"discountPrice":245,"cost":122.40,"isActive":false,"name":"מאנקי שולדר","category":"וויסקי"},
{"alcoholPercent":22,"price":279.00,"discountPrice":1143,"cost":228.50,"isActive":false,"name":"מילק & האני חביות יין","category":"וויסקי"},
{"alcoholPercent":22,"price":279.00,"discountPrice":1371,"cost":228.50,"isActive":false,"name":"מילק & האני לייטלי פיטד","category":"וויסקי"},
{"alcoholPercent":23,"price":285.00,"discountPrice":1160,"cost":232.00,"isActive":false,"name":"מילק & האני צרי קסק","category":"וויסקי"},
{"alcoholPercent":22,"price":209.00,"discountPrice":515,"cost":171.70,"isActive":false,"name":"מילק & האני קלאסיק","category":"וויסקי"},
{"alcoholPercent":19,"price":355.00,"discountPrice":1192,"cost":298.00,"isActive":false,"name":"מקאלן 12","category":"וויסקי"},
{"alcoholPercent":17,"price":699.00,"discountPrice":3570,"cost":595.00,"isActive":false,"name":"מקלאן 15","category":"וויסקי"},
{"alcoholPercent":16,"price":1390.00,"discountPrice":2400,"cost":1200.00,"isActive":false,"name":"מקלן 18","category":"וויסקי"},
{"alcoholPercent":16,"price":209.00,"discountPrice":180,"cost":180.00,"isActive":true,"name":"נוב קריק","category":"וויסקי"},
{"alcoholPercent":20,"price":145.00,"discountPrice":241,"cost":120.60,"isActive":false,"name":"סינגלטון 12 שנים","category":"וויסקי"},
{"alcoholPercent":20,"price":145.00,"discountPrice":724,"cost":120.60,"isActive":false,"name":"סינגלטון","category":"וויסקי"},
{"alcoholPercent":30,"price":260.00,"discountPrice":800,"cost":200.00,"isActive":false,"name":"קאבאלאן","category":"וויסקי"},
{"alcoholPercent":29,"price":599.00,"discountPrice":2796,"cost":466.00,"isActive":false,"name":"קוג׳ירה 10","category":"וויסקי"},
{"alcoholPercent":29,"price":949.00,"discountPrice":1471,"cost":735.44,"isActive":false,"name":"קוג׳ירה 15","category":"וויסקי"},
{"alcoholPercent":29,"price":425.00,"discountPrice":1650,"cost":330.00,"isActive":false,"name":"קוג׳ירה 5","category":"וויסקי"},
{"alcoholPercent":29,"price":309.00,"discountPrice":720,"cost":240.00,"isActive":false,"name":"קוג׳ירה אינרי","category":"וויסקי"},
{"alcoholPercent":17,"price":175.00,"discountPrice":598,"cost":149.60,"isActive":false,"name":"שיבאס","category":"וויסקי"},
{"alcoholPercent":45,"price":45.00,"discountPrice":62,"cost":31.00,"isActive":false,"name":"דולין לבן יבש","category":"וורמוט"},
{"alcoholPercent":45,"price":45.00,"discountPrice":62,"cost":31.00,"isActive":false,"name":"דולין לבן מתוק","category":"וורמוט"},
{"alcoholPercent":45,"price":45.00,"discountPrice":93,"cost":31.00,"isActive":false,"name":"דולין שמברי","category":"וורמוט"},
{"alcoholPercent":31,"price":55.00,"discountPrice":126,"cost":42.00,"isActive":false,"name":"מרטיני אקסטרה דריי","category":"וורמוט"},
{"alcoholPercent":30,"price":65.00,"discountPrice":150,"cost":50.00,"isActive":false,"name":"מרטיני ביונקו","category":"וורמוט"},
{"alcoholPercent":30,"price":65.00,"discountPrice":100,"cost":50.00,"isActive":false,"name":"מרטיני רוסו","category":"וורמוט"},
{"alcoholPercent":20,"price":210.00,"discountPrice":524,"cost":174.50,"isActive":false,"name":"1800 אנייחו","category":"טקילה"},
{"alcoholPercent":22,"price":185.00,"discountPrice":607,"cost":151.70,"isActive":false,"name":"1800 בלאנקו","category":"טקילה"},
{"alcoholPercent":20,"price":799.00,"discountPrice":2005,"cost":668.30,"isActive":false,"name":"1800 מילניו","category":"טקילה"},
{"alcoholPercent":20,"price":215.00,"discountPrice":896,"cost":179.10,"isActive":false,"name":"1800 קריסטילינו","category":"טקילה"},
{"alcoholPercent":21,"price":205.00,"discountPrice":676,"cost":169.00,"isActive":false,"name":"1800 ריפוסדו","category":"טקילה"},
{"alcoholPercent":30,"price":259.00,"discountPrice":200,"cost":200.00,"isActive":true,"name":"גרן אורנדיאן אניחו","category":"טקילה"},
{"alcoholPercent":37,"price":1999.00,"discountPrice":1456,"cost":1455.50,"isActive":true,"name":"גרנד מאיין אקסטה אניחו כחול","category":"טקילה"},
{"alcoholPercent":39,"price":1999.00,"discountPrice":1440,"cost":1440.00,"isActive":true,"name":"גרנד מאיין אקסטרה אניחו 1750 מל","category":"טקילה"},
{"alcoholPercent":21,"price":729.00,"discountPrice":1803,"cost":600.93,"isActive":false,"name":"גרנד מאיין ריפוסדו","category":"טקילה"},
{"alcoholPercent":13,"price":790.00,"discountPrice":700,"cost":700.00,"isActive":true,"name":"דון חוליו 1942","category":"טקילה"},
{"alcoholPercent":18,"price":329.00,"discountPrice":837,"cost":279.00,"isActive":false,"name":"דון חוליו אניחו","category":"טקילה"},
{"alcoholPercent":19,"price":215.00,"discountPrice":723,"cost":180.80,"isActive":false,"name":"דון חוליו בלאנקו","category":"טקילה"},
{"alcoholPercent":19,"price":279.00,"discountPrice":704,"cost":234.50,"isActive":false,"name":"דון חוליו ריפוסדו","category":"טקילה"},
{"alcoholPercent":16,"price":229.00,"discountPrice":1379,"cost":197.00,"isActive":false,"name":"פטרון אניחו","category":"טקילה"},
{"alcoholPercent":16,"price":189.00,"discountPrice":489,"cost":163.10,"isActive":false,"name":"פטרון סילבר","category":"טקילה"},
{"alcoholPercent":17,"price":135.00,"discountPrice":1150,"cost":115.00,"isActive":false,"name":"קווארבו גולד","category":"טקילה"},
{"alcoholPercent":17,"price":135.00,"discountPrice":230,"cost":115.00,"isActive":false,"name":"קווארבו סילבר","category":"טקילה"},
{"alcoholPercent":26,"price":135.00,"discountPrice":1071,"cost":107.10,"isActive":false,"name":"רוסטו רוחו בלאנקו","category":"טקילה"},
{"alcoholPercent":24,"price":155.00,"discountPrice":1125,"cost":125.00,"isActive":false,"name":"רוסטו רוחו רפסדו","category":"טקילה"},
{"alcoholPercent":31,"price":99.00,"discountPrice":75,"cost":75.30,"isActive":true,"name":"ארטיזנל - בלנד אדום","category":"יין"},
{"alcoholPercent":30,"price":208.00,"discountPrice":640,"cost":160.00,"isActive":false,"name":"ארטיזנל - דיזייר","category":"יין"},
{"alcoholPercent":24,"price":75.00,"discountPrice":242,"cost":60.40,"isActive":false,"name":"ארטיזנל - ויונייה","category":"יין"},
{"alcoholPercent":26,"price":95.00,"discountPrice":151,"cost":75.30,"isActive":false,"name":"ארטיזנל - מלבק","category":"יין"},
{"alcoholPercent":30,"price":59.02,"discountPrice":136,"cost":45.40,"isActive":false,"name":"ארטיזנל - שיראז","category":"יין"},
{"alcoholPercent":24,"price":75.00,"discountPrice":362,"cost":60.40,"isActive":false,"name":"ארטיזנל - שרדונה","category":"יין"},
{"alcoholPercent":23,"price":49.00,"discountPrice":80,"cost":40.00,"isActive":false,"name":"בלונאן - כשר","category":"יין"},
{"alcoholPercent":21,"price":55.00,"discountPrice":182,"cost":45.40,"isActive":false,"name":"בלונאן - לבן מבעבע","category":"יין"},
{"alcoholPercent":21,"price":55.00,"discountPrice":136,"cost":45.40,"isActive":false,"name":"בלונאן - ריזלינג","category":"יין"},
{"alcoholPercent":21,"price":55.00,"discountPrice":272,"cost":45.40,"isActive":false,"name":"בלונאן - ורוד מבעבע","category":"יין"},
{"alcoholPercent":23,"price":49.00,"discountPrice":160,"cost":40.00,"isActive":false,"name":"בלונאן גוורץ","category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":432,"cost":48.00,"isActive":false,"name":"בן דוד - אדר","category":"יין"},
{"alcoholPercent":31,"price":50.00,"discountPrice":230,"cost":38.30,"isActive":false,"name":"בן דוד - דולמן אדום","category":"יין"},
{"alcoholPercent":31,"price":50.00,"discountPrice":38,"cost":38.30,"isActive":true,"name":"בן דוד - דולמן לבן","category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":627,"cost":48.20,"isActive":false,"name":"בן דוד - דליה","category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":145,"cost":48.20,"isActive":false,"name":"בן דוד - חנה","category":"יין"},
{"alcoholPercent":31,"price":119.00,"discountPrice":455,"cost":91.00,"isActive":false,"name":"בן דוד - כרם אליה","category":"יין"},
{"alcoholPercent":48,"price":45.00,"discountPrice":92,"cost":30.50,"isActive":false,"name":"בן דוד - צעיר לבן","category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":528,"cost":48.00,"isActive":false,"name":"בן דוד - רחל","category":"יין"},
{"alcoholPercent":48,"price":45.00,"discountPrice":275,"cost":30.50,"isActive":false,"name":"בן דוד - אדום צעיר","category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":506,"cost":84.40,"isActive":false,"name":"ברבדו - מרלו","category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":169,"cost":84.40,"isActive":false,"name":"ברבדו - מרסלן","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":128,"cost":63.80,"isActive":false,"name":"ברבדו - סוביניון בלאן","category":"יין"},
{"alcoholPercent":42,"price":110.00,"discountPrice":465,"cost":77.50,"isActive":false,"name":"ברבדו - קופז","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":255,"cost":63.80,"isActive":false,"name":"ברבדו - רוזה","category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":0,"cost":84.40,"isActive":false,"name":"ברבדו - קברנה סוביניון","category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":84,"cost":84.40,"isActive":true,"name":"ברבדו - שירז","category":"יין"},
{"alcoholPercent":36,"price":179.00,"discountPrice":660,"cost":132.00,"isActive":false,"name":"ברבדו - לנדמארק","category":"יין"},
{"alcoholPercent":40,"price":75.00,"discountPrice":749,"cost":53.50,"isActive":false,"name":"ברבדו - נטע אדום","category":"יין"},
{"alcoholPercent":40,"price":75.00,"discountPrice":535,"cost":53.50,"isActive":false,"name":"ברבדו - נטע לבן","category":"יין"},
{"alcoholPercent":40,"price":75.00,"discountPrice":321,"cost":53.50,"isActive":false,"name":"ברבדו - נטע רוזה","category":"יין"},
{"alcoholPercent":33,"price":99.00,"discountPrice":0,"cost":74.60,"isActive":false,"name":"בת שלמה - ס בלאן","category":"יין"},
{"alcoholPercent":33,"price":99.00,"discountPrice":0,"cost":74.60,"isActive":false,"name":"בת שלמה - רוזה","category":"יין"},
{"alcoholPercent":29,"price":179.00,"discountPrice":830,"cost":138.30,"isActive":false,"name":"בת שלמה - בטי קווי","category":"יין"},
{"alcoholPercent":37,"price":110.00,"discountPrice":322,"cost":80.50,"isActive":false,"name":"בת שלמה - מגנטה","category":"יין"},
{"alcoholPercent":31,"price":155.00,"discountPrice":590,"cost":118.00,"isActive":false,"name":"בת שלמה - קולאז׳","category":"יין"},
{"alcoholPercent":32,"price":135.00,"discountPrice":510,"cost":102.00,"isActive":false,"name":"בת שלמה - רגבים","category":"יין"},
{"alcoholPercent":33,"price":135.00,"discountPrice":509,"cost":101.70,"isActive":false,"name":"בת שלמה - שרדונה","category":"יין"},
{"alcoholPercent":37,"price":29.00,"discountPrice":21,"cost":21.20,"isActive":true,"name":"ג׳קובזי - אדום","category":"יין"},
{"alcoholPercent":29,"price":229.00,"discountPrice":710,"cost":177.40,"isActive":false,"name":"גבעות - מצדה","category":"יין"},
{"alcoholPercent":35,"price":95.00,"discountPrice":777,"cost":70.60,"isActive":false,"name":"גבעות - נווה","category":"יין"},
{"alcoholPercent":32,"price":159.00,"discountPrice":483,"cost":120.70,"isActive":false,"name":"גבעות - סירה","category":"יין"},
{"alcoholPercent":33,"price":159.00,"discountPrice":478,"cost":119.40,"isActive":false,"name":"גבעות - קברנה סביניון","category":"יין"},
{"alcoholPercent":32,"price":159.00,"discountPrice":483,"cost":120.70,"isActive":false,"name":"גבעות - קברנה פרנק","category":"יין"},
{"alcoholPercent":35,"price":95.00,"discountPrice":847,"cost":70.60,"isActive":false,"name":"גבעות - מחולות בלבן","category":"יין"},
{"alcoholPercent":37,"price":29.00,"discountPrice":254,"cost":21.20,"isActive":false,"name":"ג׳קובזי - לבן","category":"יין"},
{"alcoholPercent":27,"price":45.00,"discountPrice":247,"cost":35.30,"isActive":false,"name":"דלתון - כנען אדום","category":"יין"},
{"alcoholPercent":27,"price":45.00,"discountPrice":106,"cost":35.30,"isActive":false,"name":"דלתון - כנען לבן","category":"יין"},
{"alcoholPercent":27,"price":45.00,"discountPrice":282,"cost":35.30,"isActive":false,"name":"דלתון - כנען שחור","category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":681,"cost":61.90,"isActive":false,"name":"דלתון - עלמה אדום","category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":929,"cost":61.90,"isActive":false,"name":"דלתון - עלמה אדום כהה","category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":310,"cost":61.90,"isActive":false,"name":"דלתון - עלמה לבן","category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":62,"cost":61.90,"isActive":true,"name":"דלתון - עלמה רוזה","category":"יין"},
{"alcoholPercent":36,"price":95.00,"discountPrice":0,"cost":70.00,"isActive":false,"name":"דלתון - פאט נאט","category":"יין"},
{"alcoholPercent":30,"price":65.00,"discountPrice":300,"cost":50.00,"isActive":false,"name":"דלתון - פטיט סירה","category":"יין"},
{"alcoholPercent":32,"price":75.00,"discountPrice":228,"cost":57.00,"isActive":false,"name":"דלתון - פינו גריס","category":"יין"},
{"alcoholPercent":30,"price":65.00,"discountPrice":50,"cost":50.00,"isActive":true,"name":"דלתון - קברנה סוביניון","category":"יין"},
{"alcoholPercent":34,"price":89.00,"discountPrice":332,"cost":66.30,"isActive":false,"name":"דרימיה - סהר","category":"יין"},
{"alcoholPercent":34,"price":89.00,"discountPrice":332,"cost":66.30,"isActive":false,"name":"דרימיה - סוביניון בלאן","category":"יין"},
{"alcoholPercent":31,"price":115.00,"discountPrice":613,"cost":87.60,"isActive":false,"name":"דרימיה - קברנה סוביניון","category":"יין"},
{"alcoholPercent":34,"price":89.00,"discountPrice":332,"cost":66.30,"isActive":false,"name":"דרימיה - רוזה","category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":28,"cost":27.60,"isActive":true,"name":"דרך ארץ - סוביניון בלאן","category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":221,"cost":27.60,"isActive":false,"name":"דרך ארץ - קברנה סוביניון","category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":248,"cost":27.60,"isActive":false,"name":"דרך ארץ - שיראז","category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":83,"cost":27.60,"isActive":false,"name":"דרך ארץ - שרדונה","category":"יין"},
{"alcoholPercent":30,"price":299.00,"discountPrice":230,"cost":230.40,"isActive":true,"name":"הר אודם - 1060","category":"יין"},
{"alcoholPercent":31,"price":255.00,"discountPrice":390,"cost":195.00,"isActive":false,"name":"הר אודם - אלפסי אדום","category":"יין"},
{"alcoholPercent":30,"price":169.00,"discountPrice":130,"cost":130.10,"isActive":true,"name":"הר אודם - אלפסי לבן","category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":937,"cost":117.10,"isActive":false,"name":"הר אודם - גמי נואר","category":"יין"},
{"alcoholPercent":32,"price":120.00,"discountPrice":911,"cost":91.10,"isActive":false,"name":"הר אודם - מרלו","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":192,"cost":64.00,"isActive":false,"name":"הר אודם - מרלו ולקני","category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":1405,"cost":117.10,"isActive":false,"name":"הר אודם - נביולו","category":"יין"},
{"alcoholPercent":32,"price":130.00,"discountPrice":2259,"cost":98.20,"isActive":false,"name":"הר אודם - סירה","category":"יין"},
{"alcoholPercent":29,"price":449.00,"discountPrice":348,"cost":348.40,"isActive":true,"name":"הר אודם - ספיישל אדישן","category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":820,"cost":117.10,"isActive":false,"name":"הר אודם - ענבר","category":"יין"},
{"alcoholPercent":32,"price":120.00,"discountPrice":1093,"cost":91.10,"isActive":false,"name":"הר אודם - קברנה סוביניון","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - שרדונה וולקני","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - ויונייה ווקלני","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - גמיי נואר וולקני","category":"יין"},
{"alcoholPercent":31,"price":70.00,"discountPrice":0,"cost":53.40,"isActive":false,"name":"הר אודם - יער אודם","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":640,"cost":64.00,"isActive":false,"name":"הר אודם - קברנה סוביניון ולקני","category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":1054,"cost":117.10,"isActive":false,"name":"הר אודם - קברנה פראנק","category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":256,"cost":64.00,"isActive":false,"name":"הר אודם - ריזלינג ולקני","category":"יין"},
{"alcoholPercent":52,"price":55.00,"discountPrice":108,"cost":36.10,"isActive":false,"name":"הרי הגליל - אביב אדום","category":"יין"},
{"alcoholPercent":52,"price":55.00,"discountPrice":72,"cost":36.10,"isActive":false,"name":"הרי הגליל - אביב רוזה","category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":182,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל אלה","category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":319,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל אלון","category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":91,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל אלון לבן","category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":365,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל סירה","category":"יין"},
{"alcoholPercent":39,"price":145.00,"discountPrice":522,"cost":104.30,"isActive":false,"name":"הרי הגליל - יראון אדום","category":"יין"},
{"alcoholPercent":37,"price":95.00,"discountPrice":554,"cost":69.30,"isActive":false,"name":"הרי הגליל - יראון סביניון בלאן","category":"יין"},
{"alcoholPercent":29,"price":135.00,"discountPrice":417,"cost":104.30,"isActive":false,"name":"הרי הגליל - יראון סירה","category":"יין"},
{"alcoholPercent":30,"price":85.00,"discountPrice":197,"cost":65.50,"isActive":false,"name":"הרי הגליל - יראון רוזה","category":"יין"},
{"alcoholPercent":30,"price":85.00,"discountPrice":197,"cost":65.50,"isActive":false,"name":"הרי הגליל - יראון שרדונה","category":"יין"},
{"alcoholPercent":36,"price":49.00,"discountPrice":361,"cost":36.10,"isActive":false,"name":"הרי הגליל - סתיו לבן","category":"יין"},
{"alcoholPercent":31,"price":75.00,"discountPrice":172,"cost":57.40,"isActive":false,"name":"וילה אנטינורי - טוסקנה","category":"יין"},
{"alcoholPercent":32,"price":85.00,"discountPrice":322,"cost":64.40,"isActive":false,"name":"וילה אנטינורי - סאן דיווני","category":"יין"},
{"alcoholPercent":0,"price":0.00,"discountPrice":0,"cost":0,"isActive":false,"name":"וילה אנטינורי - לבן","category":"יין"},
{"alcoholPercent":32,"price":105.00,"discountPrice":399,"cost":79.80,"isActive":false,"name":"וילה אנטינורי - קלאסיקו","category":"יין"},
{"alcoholPercent":0,"price":0.00,"discountPrice":0,"cost":0,"isActive":true,"name":"וילה אנטינורי","category":"יין"},
{"alcoholPercent":36,"price":59.00,"discountPrice":217,"cost":43.40,"isActive":false,"name":"וילה וולף","category":"יין"},
{"alcoholPercent":31,"price":85.00,"discountPrice":130,"cost":65.00,"isActive":false,"name":"ויתקין - מסע ישראלי לבן","category":"יין"},
{"alcoholPercent":31,"price":85.00,"discountPrice":325,"cost":65.00,"isActive":false,"name":"ויתקין - מסע ישראלי רוזה","category":"יין"},
{"alcoholPercent":31,"price":99.00,"discountPrice":455,"cost":75.80,"isActive":false,"name":"ויתקין - גוורץ","category":"יין"},
{"alcoholPercent":31,"price":149.00,"discountPrice":681,"cost":113.58,"isActive":false,"name":"ויתקין - גרנאש בלאן","category":"יין"},
{"alcoholPercent":31,"price":149.00,"discountPrice":568,"cost":113.60,"isActive":false,"name":"ויתקין - גרנאש נואר","category":"יין"},
{"alcoholPercent":32,"price":135.00,"discountPrice":409,"cost":102.20,"isActive":false,"name":"ויתקין - פטיט סירה","category":"יין"},
{"alcoholPercent":32,"price":125.00,"discountPrice":284,"cost":94.70,"isActive":false,"name":"ויתקין - קברנה פרנק","category":"יין"},
{"alcoholPercent":31,"price":109.00,"discountPrice":583,"cost":83.30,"isActive":false,"name":"ויתקין - קריניאן","category":"יין"},
{"alcoholPercent":31,"price":115.00,"discountPrice":440,"cost":88.00,"isActive":false,"name":"ויתקין - ריזלינג","category":"יין"},
{"alcoholPercent":29,"price":439.00,"discountPrice":340,"cost":340.00,"isActive":true,"name":"ויתקין - שורשים אדום","category":"יין"},
{"alcoholPercent":26,"price":259.00,"discountPrice":205,"cost":205.00,"isActive":true,"name":"ויתקין - שורשים לבן","category":"יין"},
{"alcoholPercent":40,"price":119.00,"discountPrice":512,"cost":85.26,"isActive":false,"name":"יתיר - חלוץ שנין רוסאן","category":"יין"},
{"alcoholPercent":30,"price":79.00,"discountPrice":122,"cost":60.90,"isActive":false,"name":"טוליפ - אספרו אדום","category":"יין"},
{"alcoholPercent":30,"price":79.00,"discountPrice":426,"cost":60.90,"isActive":false,"name":"טוליפ - אספרו לבן","category":"יין"},
{"alcoholPercent":34,"price":69.00,"discountPrice":52,"cost":51.50,"isActive":true,"name":"טוליפ - לבן","category":"יין"},
{"alcoholPercent":32,"price":119.00,"discountPrice":90,"cost":90.00,"isActive":true,"name":"טוליפ - סירה","category":"יין"},
{"alcoholPercent":34,"price":69.00,"discountPrice":0,"cost":51.50,"isActive":false,"name":"טוליפ - ק סוביניון","category":"יין"},
{"alcoholPercent":34,"price":69.00,"discountPrice":361,"cost":51.50,"isActive":false,"name":"טוליפ - רוזה","category":"יין"},
{"alcoholPercent":29,"price":69.00,"discountPrice":535,"cost":53.50,"isActive":false,"name":"טוליפ - מאיה אדום","category":"יין"},
{"alcoholPercent":29,"price":69.00,"discountPrice":589,"cost":53.50,"isActive":false,"name":"טוליפ - מאיה לבן","category":"יין"},
{"alcoholPercent":29,"price":69.00,"discountPrice":910,"cost":53.50,"isActive":false,"name":"טוליפ - מאיה רוזה","category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":436,"cost":36.30,"isActive":false,"name":"טיאמו - פינו גריזו","category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":363,"cost":36.30,"isActive":false,"name":"טיאמו - פרימיטיבו","category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":182,"cost":36.30,"isActive":false,"name":"טיאמו - רוזה","category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":218,"cost":36.30,"isActive":false,"name":"טיאמו - שרדונה","category":"יין"},
{"alcoholPercent":32,"price":79.00,"discountPrice":240,"cost":60.00,"isActive":false,"name":"יין - שפו מלון","category":"יין"},
{"alcoholPercent":30,"price":199.00,"discountPrice":611,"cost":152.70,"isActive":false,"name":"יתיר - בצל העלוה","category":"יין"},
{"alcoholPercent":34,"price":79.00,"discountPrice":647,"cost":58.80,"isActive":false,"name":"יתיר - דרום לבן","category":"יין"},
{"alcoholPercent":34,"price":79.00,"discountPrice":0,"cost":58.80,"isActive":false,"name":"יתיר - דרום אדום","category":"יין"},
{"alcoholPercent":34,"price":79.00,"discountPrice":588,"cost":58.80,"isActive":false,"name":"יתיר - דרום רוזה","category":"יין"},
{"alcoholPercent":37,"price":105.00,"discountPrice":537,"cost":76.70,"isActive":false,"name":"יתיר - הר עמשא אדום","category":"יין"},
{"alcoholPercent":37,"price":105.00,"discountPrice":1534,"cost":76.70,"isActive":false,"name":"יתיר - הר עמשא לבן","category":"יין"},
{"alcoholPercent":37,"price":105.00,"discountPrice":1227,"cost":76.70,"isActive":false,"name":"יתיר - הר עמשא רוזה","category":"יין"},
{"alcoholPercent":40,"price":119.00,"discountPrice":426,"cost":85.26,"isActive":false,"name":"יתיר - חלוץ טמפריניו","category":"יין"},
{"alcoholPercent":40,"price":119.00,"discountPrice":426,"cost":85.20,"isActive":false,"name":"יתיר - חלוץ שנין רוסן","category":"יין"},
{"alcoholPercent":30,"price":175.00,"discountPrice":674,"cost":134.80,"isActive":false,"name":"יתיר - נחל יתיר לבן","category":"יין"},
{"alcoholPercent":30,"price":165.00,"discountPrice":380,"cost":126.70,"isActive":false,"name":"יתיר - פטי ורדו","category":"יין"},
{"alcoholPercent":28,"price":85.00,"discountPrice":66,"cost":66.30,"isActive":true,"name":"כישור - ויונייה","category":"יין"},
{"alcoholPercent":38,"price":75.00,"discountPrice":543,"cost":54.30,"isActive":false,"name":"כישור - לבן","category":"יין"},
{"alcoholPercent":29,"price":125.00,"discountPrice":292,"cost":97.20,"isActive":false,"name":"כישור - מצודת תפן","category":"יין"},
{"alcoholPercent":28,"price":229.00,"discountPrice":359,"cost":179.50,"isActive":false,"name":"כישור - עין יפעם","category":"יין"},
{"alcoholPercent":32,"price":89.00,"discountPrice":605,"cost":67.20,"isActive":false,"name":"כישור - קברנה פראנק","category":"יין"},
{"alcoholPercent":35,"price":75.00,"discountPrice":446,"cost":55.70,"isActive":false,"name":"כישור - רוזה","category":"יין"},
{"alcoholPercent":31,"price":89.00,"discountPrice":68,"cost":68.00,"isActive":true,"name":"כישור - ריזלינג","category":"יין"},
{"alcoholPercent":35,"price":75.00,"discountPrice":501,"cost":55.70,"isActive":false,"name":"כישור - אדום","category":"יין"},
{"alcoholPercent":29,"price":109.00,"discountPrice":84,"cost":84.40,"isActive":true,"name":"כישור - תפן לבן","category":"יין"},
{"alcoholPercent":30,"price":109.98,"discountPrice":931,"cost":84.60,"isActive":false,"name":"כרמל סיגנטשר - xperiment","category":"יין"},
{"alcoholPercent":27,"price":79.00,"discountPrice":250,"cost":62.40,"isActive":false,"name":"כרמל סיגנטשר - ויניארדס קברנה סוביניון","category":"יין"},
{"alcoholPercent":36,"price":75.00,"discountPrice":275,"cost":55.00,"isActive":false,"name":"כרמל סיגנטשר - ויניארדס רוזה","category":"יין"},
{"alcoholPercent":31,"price":159.00,"discountPrice":486,"cost":121.60,"isActive":false,"name":"כרמל סיגנטשר - מדטריניאן אדום","category":"יין"},
{"alcoholPercent":36,"price":60.00,"discountPrice":573,"cost":44.10,"isActive":false,"name":"כרמל סיגנטשר - מדיטריניאן 2 וואטס חצי יבש","category":"יין"},
{"alcoholPercent":36,"price":60.00,"discountPrice":221,"cost":44.10,"isActive":false,"name":"כרמל סיגנטשר - מדיטריניאן 2 וואטס יבש","category":"יין"},
{"alcoholPercent":36,"price":60.00,"discountPrice":132,"cost":44.10,"isActive":false,"name":"כרמל סיגנטשר - מדיטרניאן 2 וואטס רוזה","category":"יין"},
{"alcoholPercent":36,"price":60.00,"discountPrice":44,"cost":44.10,"isActive":true,"name":"כרמל סיגנטשר - מדיטרניאן 4 וואטס אדום","category":"יין"},
{"alcoholPercent":31,"price":115.00,"discountPrice":352,"cost":88.00,"isActive":false,"name":"כרמל סיגנטשר - סינגל מרלו","category":"יין"},
{"alcoholPercent":31,"price":115.00,"discountPrice":264,"cost":88.00,"isActive":false,"name":"כרמל סיגנטשר - סינגל סירה","category":"יין"},
{"alcoholPercent":32,"price":99.00,"discountPrice":150,"cost":75.00,"isActive":false,"name":"כרמל סיגנטשר - סינגל שרדונה","category":"יין"},
{"alcoholPercent":65,"price":115.00,"discountPrice":278,"cost":69.50,"isActive":false,"name":"כרמל סיגנטשר - סינגל ריזלינג","category":"יין"},
{"alcoholPercent":36,"price":105.00,"discountPrice":308,"cost":77.00,"isActive":false,"name":"לוריא - פינו גריזו","category":"יין"},
{"alcoholPercent":36,"price":105.00,"discountPrice":462,"cost":77.00,"isActive":false,"name":"לוריא - רוזה","category":"יין"},
{"alcoholPercent":31,"price":119.00,"discountPrice":1001,"cost":91.00,"isActive":false,"name":"לוריא - רוסו","category":"יין"},
{"alcoholPercent":31,"price":119.00,"discountPrice":273,"cost":91.00,"isActive":false,"name":"לוריא - שרדונה","category":"יין"},
{"alcoholPercent":40,"price":99.00,"discountPrice":850,"cost":70.80,"isActive":false,"name":"לוריא - טראס","category":"יין"},
{"alcoholPercent":35,"price":85.00,"discountPrice":378,"cost":63.00,"isActive":false,"name":"מדמוזל","category":"יין"},
{"alcoholPercent":19,"price":139.00,"discountPrice":703,"cost":117.12,"isActive":false,"name":"מיראבל","category":"יין"},
{"alcoholPercent":26,"price":45.00,"discountPrice":179,"cost":35.80,"isActive":false,"name":"עברי - קברנה סוביניון","category":"יין"},
{"alcoholPercent":26,"price":45.00,"discountPrice":107,"cost":35.80,"isActive":false,"name":"עברי - רוזה","category":"יין"},
{"alcoholPercent":26,"price":45.00,"discountPrice":251,"cost":35.80,"isActive":false,"name":"עברי - שרדונה","category":"יין"},
{"alcoholPercent":24,"price":49.00,"discountPrice":119,"cost":39.60,"isActive":false,"name":"פורטה 6 - אדום","category":"יין"},
{"alcoholPercent":24,"price":49.00,"discountPrice":515,"cost":39.60,"isActive":false,"name":"פורטה 6 - לבן","category":"יין"},
{"alcoholPercent":24,"price":49.00,"discountPrice":436,"cost":39.60,"isActive":false,"name":"פורטה 6 - רוזה","category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":234,"cost":117.12,"isActive":false,"name":"צרעה - שורש","category":"יין"},
{"alcoholPercent":45,"price":29.00,"discountPrice":100,"cost":20.00,"isActive":false,"name":"קאווה די מרמו","category":"יין"},
{"alcoholPercent":38,"price":95.00,"discountPrice":138,"cost":69.00,"isActive":false,"name":"קנטיר - g","category":"יין"},
{"alcoholPercent":40,"price":95.00,"discountPrice":136,"cost":68.00,"isActive":false,"name":"קנטיר - רוזה","category":"יין"},
{"alcoholPercent":41,"price":89.00,"discountPrice":441,"cost":63.00,"isActive":false,"name":"רמת הגולן - גמלא בלנד אדום","category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":362,"cost":45.30,"isActive":false,"name":"רמת הגולן - גמלא סוביניון בלאן","category":"יין"},
{"alcoholPercent":38,"price":85.00,"discountPrice":309,"cost":61.80,"isActive":false,"name":"רמת הגולן - גמלא קברנה סוביניון","category":"יין"},
{"alcoholPercent":35,"price":69.00,"discountPrice":410,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן גוורץ","category":"יין"},
{"alcoholPercent":46,"price":259.00,"discountPrice":709,"cost":177.30,"isActive":false,"name":"רמת הגולן - ירדן מרלו סינגל","category":"יין"},
{"alcoholPercent":35,"price":69.00,"discountPrice":205,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן סוביניון בלאן","category":"יין"},
{"alcoholPercent":38,"price":125.00,"discountPrice":272,"cost":90.60,"isActive":false,"name":"רמת הגולן - ירדן סירה","category":"יין"},
{"alcoholPercent":33,"price":125.00,"discountPrice":469,"cost":93.80,"isActive":false,"name":"רמת הגולן - ירדן פטי ורדו","category":"יין"},
{"alcoholPercent":35,"price":69.00,"discountPrice":461,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן פינו גרי","category":"יין"},
{"alcoholPercent":38,"price":125.00,"discountPrice":453,"cost":90.50,"isActive":false,"name":"רמת הגולן - ירדן פינו נואר","category":"יין"},
{"alcoholPercent":29,"price":135.00,"discountPrice":417,"cost":104.30,"isActive":false,"name":"רמת הגולן - ירדן ק סוביניון","category":"יין"},
{"alcoholPercent":34,"price":699.00,"discountPrice":3120,"cost":520.00,"isActive":false,"name":"רמת הגולן - ירדן קצרין","category":"יין"},
{"alcoholPercent":30,"price":85.02,"discountPrice":327,"cost":65.40,"isActive":false,"name":"רמת הגולן - ירדן רוזה","category":"יין"},
{"alcoholPercent":35,"price":699.00,"discountPrice":2078,"cost":519.50,"isActive":false,"name":"רמת הגולן - ירדן רום","category":"יין"},
{"alcoholPercent":35,"price":69.00,"discountPrice":256,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן שרדונה","category":"יין"},
{"alcoholPercent":31,"price":65.00,"discountPrice":149,"cost":49.50,"isActive":false,"name":"רקנאטי - כרמי הגליל מרלו","category":"יין"},
{"alcoholPercent":28,"price":115.00,"discountPrice":720,"cost":90.00,"isActive":false,"name":"שבלי","category":"יין"},
{"alcoholPercent":33,"price":95.00,"discountPrice":143,"cost":71.50,"isActive":false,"name":"תל שיפון - אדום","category":"יין"},
{"alcoholPercent":33,"price":95.00,"discountPrice":215,"cost":71.50,"isActive":false,"name":"תל שיפון - לבן","category":"יין"},
{"alcoholPercent":30,"price":115.00,"discountPrice":266,"cost":88.60,"isActive":false,"name":"תל שיפון - ס בלאן","category":"יין"},
{"alcoholPercent":30,"price":115.00,"discountPrice":266,"cost":88.60,"isActive":false,"name":"תל שיפון - סירה","category":"יין"},
{"alcoholPercent":30,"price":115.00,"discountPrice":354,"cost":88.60,"isActive":false,"name":"תל שיפון - ק סוביניון","category":"יין"},
{"alcoholPercent":30,"price":115.00,"discountPrice":354,"cost":88.60,"isActive":false,"name":"תל שיפון - קברנה פראנק","category":"יין"},
{"alcoholPercent":33,"price":95.00,"discountPrice":572,"cost":71.50,"isActive":false,"name":"תל שיפון - רוזה","category":"יין"},
{"alcoholPercent":30,"price":115.00,"discountPrice":89,"cost":88.60,"isActive":true,"name":"תל שיפון - ריזלינג","category":"יין"},
{"alcoholPercent":30,"price":115.00,"discountPrice":89,"cost":88.60,"isActive":true,"name":"תל שיפון - שרדונה","category":"יין"},
{"alcoholPercent":32,"price":65.00,"discountPrice":148,"cost":49.20,"isActive":false,"name":"1883 אבטיח","category":"ליקרים"},
{"alcoholPercent":41,"price":65.00,"discountPrice":138,"cost":46.10,"isActive":false,"name":"1883 אננס","category":"ליקרים"},
{"alcoholPercent":69,"price":65.00,"discountPrice":116,"cost":38.50,"isActive":false,"name":"1883 קוקוס","category":"ליקרים"},
{"alcoholPercent":12,"price":80.00,"discountPrice":1071,"cost":71.40,"isActive":false,"name":"אפרול","category":"ליקרים"},
{"alcoholPercent":0,"price":0,"discountPrice":0,"cost":0,"isActive":false,"name":"באד אפל","category":"ליקרים"},
{"alcoholPercent":24,"price":75.00,"discountPrice":182,"cost":60.50,"isActive":false,"name":"בולס","category":"ליקרים"},
{"alcoholPercent":20,"price":90.00,"discountPrice":150,"cost":75.10,"isActive":false,"name":"בייליס 700 מל","category":"ליקרים"},
{"alcoholPercent":15,"price":75.00,"discountPrice":66,"cost":65.50,"isActive":true,"name":"דיזרונו אמרטו","category":"ליקרים"},
{"alcoholPercent":17,"price":105.00,"discountPrice":716,"cost":89.50,"isActive":false,"name":"וילה מאסה","category":"ליקרים"},
{"alcoholPercent":20,"price":115.00,"discountPrice":382,"cost":95.50,"isActive":false,"name":"וילה מאסה מארז","category":"ליקרים"},
{"alcoholPercent":16,"price":99.00,"discountPrice":1281,"cost":85.40,"isActive":false,"name":"טובי 60","category":"ליקרים"},
{"alcoholPercent":23,"price":85.00,"discountPrice":623,"cost":69.20,"isActive":false,"name":"טובי נובה","category":"ליקרים"},
{"alcoholPercent":20,"price":115.00,"discountPrice":1055,"cost":95.90,"isActive":false,"name":"טובי נייט","category":"ליקרים"},
{"alcoholPercent":16,"price":115.00,"discountPrice":1782,"cost":99.00,"isActive":false,"name":"ייגר","category":"ליקרים"},
{"alcoholPercent":25,"price":79.00,"discountPrice":380,"cost":63.30,"isActive":false,"name":"לימונצלו איזואבלה","category":"ליקרים"},
{"alcoholPercent":32,"price":99.00,"discountPrice":375,"cost":75.00,"isActive":false,"name":"מוליס ליטר","category":"ליקרים"},
{"alcoholPercent":18,"price":189.00,"discountPrice":640,"cost":160.00,"isActive":false,"name":"סט ג׳רמן","category":"ליקרים"},
{"alcoholPercent":18,"price":69.00,"discountPrice":234,"cost":58.50,"isActive":false,"name":"פידג׳ ליטר","category":"ליקרים"},
{"alcoholPercent":17,"price":95.00,"discountPrice":243,"cost":81.00,"isActive":false,"name":"פייר בול","category":"ליקרים"},
{"alcoholPercent":21,"price":89.00,"discountPrice":0,"cost":73.50,"isActive":false,"name":"פסאווה פסיפלורה","category":"ליקרים"},
{"alcoholPercent":18,"price":119.00,"discountPrice":404,"cost":101.00,"isActive":false,"name":"קוואנטרו","category":"ליקרים"},
{"alcoholPercent":17,"price":49.00,"discountPrice":504,"cost":42.00,"isActive":false,"name":"קמפרי סודה","category":"ליקרים"},
{"alcoholPercent":15,"price":95.00,"discountPrice":6419,"cost":82.30,"isActive":false,"name":"קמפרי","category":"ליקרים"},
{"alcoholPercent":22,"price":299.00,"discountPrice":491,"cost":245.50,"isActive":false,"name":"שרטרז ירוק","category":"ליקרים"},
{"alcoholPercent":22,"price":269.00,"discountPrice":1540,"cost":220.00,"isActive":false,"name":"שרטרז צהוב","category":"ליקרים"},
{"alcoholPercent":18,"price":105.00,"discountPrice":444,"cost":88.70,"isActive":false,"name":"שרידנס","category":"ליקרים"},
{"alcoholPercent":20,"price":155.00,"discountPrice":902,"cost":128.80,"isActive":false,"name":"הנסי vs","category":"קוניאק"},
{"alcoholPercent":21,"price":175.00,"discountPrice":145,"cost":145.00,"isActive":true,"name":"הנסי vsop","category":"קוניאק"},
{"alcoholPercent":26,"price":95.00,"discountPrice":75,"cost":75.20,"isActive":true,"name":"סט רמי vsop","category":"קוניאק"},
{"alcoholPercent":17,"price":109.00,"discountPrice":186,"cost":93.20,"isActive":false,"name":"סט רמי xo","category":"קוניאק"},
{"alcoholPercent":21,"price":159.00,"discountPrice":262,"cost":131.20,"isActive":false,"name":"רביזייר vs","category":"קוניאק"},
{"alcoholPercent":19,"price":215.00,"discountPrice":543,"cost":180.90,"isActive":false,"name":"רביזייר vsop","category":"קוניאק"},
{"alcoholPercent":17,"price":649.00,"discountPrice":1107,"cost":553.70,"isActive":false,"name":"רביזייר xo","category":"קוניאק"},
{"alcoholPercent":19,"price":299.00,"discountPrice":502,"cost":251.00,"isActive":false,"name":"רמי מרטין 1738","category":"קוניאק"},
{"alcoholPercent":20,"price":249.00,"discountPrice":414,"cost":207.20,"isActive":false,"name":"רמי מרטין vsop","category":"קוניאק"},
{"alcoholPercent":18,"price":799.00,"discountPrice":2034,"cost":678.00,"isActive":false,"name":"רמי מרטין xo","category":"קוניאק"},
{"alcoholPercent":23,"price":119.00,"discountPrice":97,"cost":97.00,"isActive":true,"name":"בקרדי לבן ליטר","category":"רום"},
{"alcoholPercent":23,"price":119.00,"discountPrice":582,"cost":97.00,"isActive":false,"name":"בקרדי ספייס 750","category":"רום"},
{"alcoholPercent":27,"price":79.00,"discountPrice":312,"cost":62.40,"isActive":false,"name":"נגריטה לבן","category":"רום"},
{"alcoholPercent":24,"price":129.00,"discountPrice":416,"cost":104.00,"isActive":false,"name":"נגריטה שחור ליטר","category":"רום"},
{"alcoholPercent":18,"price":89.00,"discountPrice":983,"cost":75.60,"isActive":false,"name":"קפטן מורגן בלאנקו 700 מל","category":"רום"},
{"alcoholPercent":18,"price":89.00,"discountPrice":151,"cost":75.60,"isActive":false,"name":"קפטן מורגן בלאק","category":"רום"},
{"alcoholPercent":20,"price":99.00,"discountPrice":992,"cost":82.70,"isActive":false,"name":"קפטן מורגן ספייס 750 מל","category":"רום"},
{"alcoholPercent":20,"price":129.00,"discountPrice":323,"cost":107.50,"isActive":false,"name":"קרקאן","category":"רום"},
{"alcoholPercent":19,"price":99.00,"discountPrice":498,"cost":83.00,"isActive":false,"name":"קשאסה","category":"רום"}

];
return products
} 

    const seeMoreCard = document.getElementById("seeMoreCard");
    const grid = document.getElementById("categoriesGrid");

    seeMoreCard.addEventListener("click", () => {
      grid.classList.toggle("show-all");

      if (grid.classList.contains("show-all")) {
        seeMoreCard.innerText = "סגור";
      } else {
        seeMoreCard.innerText = "ראה את כל הקטגוריות";
      }
    });





    






document.addEventListener('DOMContentLoaded', () => {

  const ageGate = document.getElementById('ageGate');
  const ageYes = document.getElementById('ageYes');
  const ageNo = document.getElementById('ageNo');

  // אם אחד מהם לא קיים – לא מריצים כלום
  if (!ageGate || !ageYes || !ageNo) {
    console.warn('Age gate elements not found');
    return;
  }

  // אם עוד לא אישר גיל
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

});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  // פתיחה/סגירה של ההמבורגר
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // סוגר את התפריט כשמקליקים על כל קישור בתפריט
  document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });

  // …שאר הקוד שלך כאן (משלוחים, חישוב מחירים, טופס וכו')
});

document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.getElementById("mobileNav");

  // סוגר את המובייל נב בר כשנטען דף חדש
  mobileNav.classList.remove("active");
});

document.querySelectorAll('#mobileNav a').forEach(link => {
  link.addEventListener('click', (e) => {
    const mobileNav = document.getElementById('mobileNav');

    // סוגר את התפריט
    mobileNav.classList.remove('active');

    // אם זה קישור פנימי (#id) – גולל אליו
    const href = link.getAttribute('href');
    if (href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault(); // מונע את התנהגות ברירת המחדל
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});







if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });

  document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });
}




document.addEventListener("DOMContentLoaded", function() {
  const overlay = document.getElementById("ageOverlay");

  // אם אין overlay בדף הזה, אל תעשה כלום
  if (!overlay) return;

  const confirmBtn = document.getElementById("confirmAge");
  const denyBtn = document.getElementById("denyAge");

  // אם כבר אישר
  if (localStorage.getItem("ageVerified") === "true") {
    overlay.style.display = "none";
    return;
  }

  confirmBtn.addEventListener("click", function() {
    localStorage.setItem("ageVerified", "true");
    overlay.style.display = "none";
  });

  denyBtn.addEventListener("click", function() {
    window.location.href = "https://www.google.com";
  });
});
