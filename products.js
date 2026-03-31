/**
 * products.js - GINO VINO Shared Product & Cart Module
 * Manages product data, cart state, and settings via localStorage.
 *
 * Keys used in localStorage:
 *   ginoProducts  - product array (admin can override embedded data)
 *   ginoCart      - cart array [{name, price, qty, discountPrice}]
 *   ginoSettings  - store settings object
 *   ginoOrders    - orders array
 */

// ============================================================
// EMBEDDED PRODUCT DATA (fallback when localStorage is empty)
// ============================================================
const EMBEDDED_PRODUCTS = [
{"alcoholPercent":27,"price":95.00,"discountPrice":0,"cost":74.60,"isActive":false,"name":"אוזו קרדסי","category":"אניס"},
{"alcoholPercent":27,"price":95.00,"discountPrice":75,"cost":75.00,"isActive":true,"name":"אוזו מטקסה","category":"אניס"},
{"alcoholPercent":22,"price":45.00,"discountPrice":37,"cost":37.00,"isActive":true,"name":"ערק לימונים 700","category":"אניס"},
{"alcoholPercent":20,"price":60.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"ערק לימונים ליטר","category":"אניס"},
{"alcoholPercent":20,"price":55.00,"discountPrice":0,"cost":45.70,"isActive":false,"name":"ארק כרמל","category":"אניס"},
{"alcoholPercent":17,"price":95.00,"discountPrice":0,"cost":81.50,"isActive":false,"name":"ערק נח","category":"אניס"},
{"alcoholPercent":8,"price":65.00,"discountPrice":0,"cost":60.00,"isActive":false,"name":"ערק עלית","category":"אניס"},
{"alcoholPercent":15,"price":65.00,"discountPrice":0,"cost":56.60,"isActive":false,"name":"ערק עמיאל 700","category":"אניס"},
{"alcoholPercent":40,"price":13.02,"discountPrice":0,"cost":9.30,"isActive":false,"name":"אלכסנדר אמברה","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":0,"cost":9.30,"isActive":false,"name":"אלכסנדר בוק","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":0,"cost":9.30,"isActive":false,"name":"אלכסנדר בלונד","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":0,"cost":9.30,"isActive":false,"name":"אלכסנדר בלייזר","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":0,"cost":9.30,"isActive":false,"name":"אלכסנדר גרין","category":"בירות"},
{"alcoholPercent":40,"price":14.00,"discountPrice":0,"cost":10.00,"isActive":false,"name":"אלכסנדר טרופיקל ipa","category":"בירות"},
{"alcoholPercent":38,"price":9.00,"discountPrice":0,"cost":6.50,"isActive":false,"name":"בלאנק","category":"בירות"},
{"alcoholPercent":30,"price":6.00,"discountPrice":0,"cost":4.60,"isActive":false,"name":"בקס","category":"בירות"},
{"alcoholPercent":25,"price":15.00,"discountPrice":0,"cost":12.00,"isActive":false,"name":"ברודוג - פאנק ללא גלוטן","category":"בירות"},
{"alcoholPercent":25,"price":15.00,"discountPrice":0,"cost":12.00,"isActive":false,"name":"ברודוג - אלוויס גו׳ס","category":"בירות"},
{"alcoholPercent":43,"price":15.00,"discountPrice":0,"cost":10.50,"isActive":false,"name":"ברודוג - בייבי הייזי","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":0,"cost":11.10,"isActive":false,"name":"ברודוג - ג׳וס שייק","category":"בירות"},
{"alcoholPercent":25,"price":20.00,"discountPrice":0,"cost":16.00,"isActive":false,"name":"ברודוג - דאבל הייזי גיין","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":0,"cost":11.10,"isActive":false,"name":"ברודוג - ווינגמן סשן איי פי איי","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":0,"cost":18.30,"isActive":false,"name":"ברודוג - קולד ביר","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":0,"cost":11.10,"isActive":false,"name":"ברודוג אורנג׳ קראש","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":0,"cost":18.30,"isActive":false,"name":"ברודוג בלאק הארט","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":0,"cost":11.10,"isActive":false,"name":"ברודוג גויאבה","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":0,"cost":11.10,"isActive":false,"name":"ברודוג הייזי ג׳יין","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":0,"cost":18.30,"isActive":false,"name":"ברודוג ווינגמן טרופיקל סטורם","category":"בירות"},
{"alcoholPercent":63,"price":15.00,"discountPrice":0,"cost":9.20,"isActive":true,"name":"ברודוג טאצ׳דאון לאגר","category":"בירות"},
{"alcoholPercent":25,"price":15.00,"discountPrice":0,"cost":12.00,"isActive":false,"name":"ברודוג פאנק IPA","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":0,"cost":11.10,"isActive":false,"name":"ברודוג פרוט ברסט","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":0,"cost":18.30,"isActive":false,"name":"ברודוג קאונטר סטרייק","category":"בירות"},
{"alcoholPercent":26,"price":23.00,"discountPrice":0,"cost":18.30,"isActive":false,"name":"ברודוג קולד ללא גלוטן","category":"בירות"},
{"alcoholPercent":35,"price":15.00,"discountPrice":0,"cost":11.10,"isActive":false,"name":"ברודוג קלוקוורק טנג׳רין","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":0,"cost":9.30,"isActive":false,"name":"ג׳יימס ipa","category":"בירות"},
{"alcoholPercent":40,"price":13.02,"discountPrice":0,"cost":9.30,"isActive":false,"name":"ג׳יימס ווט","category":"בירות"},
{"alcoholPercent":40,"price":7.00,"discountPrice":0,"cost":5.00,"isActive":false,"name":"גולדסטאר","category":"בירות"},
{"alcoholPercent":20,"price":24.00,"discountPrice":0,"cost":20.00,"isActive":false,"name":"גינס","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":0,"cost":10.50,"isActive":false,"name":"דובל","category":"בירות"},
{"alcoholPercent":24,"price":14.00,"discountPrice":0,"cost":11.30,"isActive":false,"name":"דובל 666","category":"בירות"},
{"alcoholPercent":30,"price":9.00,"discountPrice":0,"cost":6.90,"isActive":false,"name":"הוגרדן","category":"בירות"},
{"alcoholPercent":27,"price":7.00,"discountPrice":0,"cost":5.50,"isActive":false,"name":"הייניקן","category":"בירות"},
{"alcoholPercent":40,"price":6.00,"discountPrice":0,"cost":4.30,"isActive":false,"name":"הייניקן 0 אחוז","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":0,"cost":11.20,"isActive":false,"name":"הרצל - 6 אחוז כפרה","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":0,"cost":11.20,"isActive":false,"name":"הרצל - IPA וזה","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":0,"cost":11.20,"isActive":false,"name":"הרצל הייזי שמייזי","category":"בירות"},
{"alcoholPercent":34,"price":15.00,"discountPrice":0,"cost":11.20,"isActive":false,"name":"הרצל מקסיקו 70","category":"בירות"},
{"alcoholPercent":36,"price":16.00,"discountPrice":0,"cost":11.80,"isActive":false,"name":"וויט ראביט ירוק","category":"בירות"},
{"alcoholPercent":36,"price":16.00,"discountPrice":0,"cost":11.80,"isActive":false,"name":"וויט ראביט כחול","category":"בירות"},
{"alcoholPercent":36,"price":16.00,"discountPrice":0,"cost":11.80,"isActive":false,"name":"וויט ראביט שחור","category":"בירות"},
{"alcoholPercent":24,"price":11.00,"discountPrice":0,"cost":8.90,"isActive":false,"name":"ווינשטפן","category":"בירות"},
{"alcoholPercent":28,"price":11.00,"discountPrice":0,"cost":8.60,"isActive":false,"name":"ווינשטפן ויטוס","category":"בירות"},
{"alcoholPercent":26,"price":12.00,"discountPrice":0,"cost":9.50,"isActive":false,"name":"ליפמנס","category":"בירות"},
{"alcoholPercent":32,"price":9.00,"discountPrice":0,"cost":6.80,"isActive":false,"name":"לף בלונד","category":"בירות"},
{"alcoholPercent":32,"price":9.00,"discountPrice":0,"cost":6.80,"isActive":false,"name":"לף בראון","category":"בירות"},
{"alcoholPercent":30,"price":15.00,"discountPrice":0,"cost":11.50,"isActive":false,"name":"מיקלר בורסט","category":"בירות"},
{"alcoholPercent":30,"price":15.00,"discountPrice":0,"cost":11.50,"isActive":false,"name":"מיקלר הופ שופ הייזי IPA","category":"בירות"},
{"alcoholPercent":30,"price":15.00,"discountPrice":0,"cost":11.50,"isActive":false,"name":"מיקלר פשן פול","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"מלכה ipa שיבולת שועל","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"מלכה אדמונית","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"מלכה בהירה","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"מלכה הינדי","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"מלכה חיטה","category":"בירות"},
{"alcoholPercent":27,"price":14.00,"discountPrice":0,"cost":11.00,"isActive":false,"name":"מרדסוס","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"נגב אואזיס","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"נגב אמבר אייל","category":"בירות"},
{"alcoholPercent":40,"price":14.98,"discountPrice":0,"cost":10.70,"isActive":false,"name":"נגב פאטה מורגנה","category":"בירות"},
{"alcoholPercent":25,"price":25.00,"discountPrice":0,"cost":20.00,"isActive":false,"name":"סאמיקלאוס חום","category":"בירות"},
{"alcoholPercent":27,"price":28.00,"discountPrice":0,"cost":22.00,"isActive":false,"name":"סאמיקלאוס צהוב","category":"בירות"},
{"alcoholPercent":23,"price":25.00,"discountPrice":0,"cost":20.25,"isActive":false,"name":"סאמיקלאוס שחור","category":"בירות"},
{"alcoholPercent":21,"price":8.00,"discountPrice":0,"cost":6.60,"isActive":false,"name":"סאמרסבי תפוח","category":"בירות"},
{"alcoholPercent":21,"price":8.00,"discountPrice":0,"cost":6.60,"isActive":false,"name":"סאמרסבי אוכמניות","category":"בירות"},
{"alcoholPercent":21,"price":8.00,"discountPrice":0,"cost":6.60,"isActive":false,"name":"סאמרסבי מנגו ליים","category":"בירות"},
{"alcoholPercent":40,"price":7.00,"discountPrice":0,"cost":5.00,"isActive":false,"name":"סטלה","category":"בירות"},
{"alcoholPercent":28,"price":10.00,"discountPrice":0,"cost":7.80,"isActive":false,"name":"פאולנר","category":"בירות"},
{"alcoholPercent":20,"price":6.00,"discountPrice":0,"cost":5.00,"isActive":false,"name":"פחית באדוויזר","category":"בירות"},
{"alcoholPercent":30,"price":7.00,"discountPrice":0,"cost":5.40,"isActive":false,"name":"קורונה","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":0,"cost":10.50,"isActive":false,"name":"שוף - לה","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":0,"cost":10.50,"isActive":false,"name":"שוף - מק","category":"בירות"},
{"alcoholPercent":24,"price":13.00,"discountPrice":0,"cost":10.50,"isActive":false,"name":"שוף - צ׳רי","category":"בירות"},
{"alcoholPercent":36,"price":15.00,"discountPrice":0,"cost":11.00,"isActive":false,"name":"שפירא ipa","category":"בירות"},
{"alcoholPercent":40,"price":14.00,"discountPrice":0,"cost":10.00,"isActive":false,"name":"שפירא ניו לאגר","category":"בירות"},
{"alcoholPercent":40,"price":14.00,"discountPrice":0,"cost":10.00,"isActive":false,"name":"שפירא פייל אייל","category":"בירות"},
{"alcoholPercent":27,"price":175.00,"discountPrice":138,"cost":138.30,"isActive":true,"name":"7 קראפט","category":"ג׳ין"},
{"alcoholPercent":24,"price":149.00,"discountPrice":0,"cost":120.00,"isActive":false,"name":"ארטה","category":"ג׳ין"},
{"alcoholPercent":20,"price":108.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"בולדוג","category":"ג׳ין"},
{"alcoholPercent":20,"price":139.00,"discountPrice":0,"cost":116.00,"isActive":false,"name":"בומביי ליטר","category":"ג׳ין"},
{"alcoholPercent":20,"price":135.00,"discountPrice":0,"cost":112.40,"isActive":false,"name":"ביפיטר ליטר","category":"ג׳ין"},
{"alcoholPercent":23,"price":115.00,"discountPrice":0,"cost":93.50,"isActive":false,"name":"ביפיטר פינק","category":"ג׳ין"},
{"alcoholPercent":20,"price":85.00,"discountPrice":0,"cost":71.00,"isActive":false,"name":"גורדון 700","category":"ג׳ין"},
{"alcoholPercent":19,"price":165.00,"discountPrice":0,"cost":138.40,"isActive":false,"name":"הנדריקס","category":"ג׳ין"},
{"alcoholPercent":21,"price":169.00,"discountPrice":0,"cost":139.10,"isActive":false,"name":"טינקרס גין גרין","category":"ג׳ין"},
{"alcoholPercent":20,"price":179.00,"discountPrice":0,"cost":149.50,"isActive":false,"name":"טינקרס גין פינק","category":"ג׳ין"},
{"alcoholPercent":19,"price":189.00,"discountPrice":0,"cost":159.00,"isActive":false,"name":"טינקרס גין פרפל","category":"ג׳ין"},
{"alcoholPercent":17,"price":189.00,"discountPrice":0,"cost":161.25,"isActive":false,"name":"מארה","category":"ג׳ין"},
{"alcoholPercent":18,"price":149.00,"discountPrice":0,"cost":126.00,"isActive":false,"name":"רוקו גין","category":"ג׳ין"},
{"alcoholPercent":13,"price":160.00,"discountPrice":0,"cost":141.90,"isActive":false,"name":"בלוגה","category":"וודקה"},
{"alcoholPercent":15,"price":150.00,"discountPrice":0,"cost":130.00,"isActive":false,"name":"בלוודר","category":"וודקה"},
{"alcoholPercent":15,"price":155.00,"discountPrice":0,"cost":135.00,"isActive":false,"name":"גרייגוס ליטר","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":0,"cost":134.40,"isActive":false,"name":"וואן גוך אננס","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":0,"cost":134.40,"isActive":false,"name":"וואן גוך אבטיח","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":0,"cost":134.40,"isActive":false,"name":"וואן גוך אסאי","category":"וודקה"},
{"alcoholPercent":8,"price":145.00,"discountPrice":0,"cost":134.40,"isActive":false,"name":"וואן גוך מלון","category":"וודקה"},
{"alcoholPercent":-100,"price":200.00,"discountPrice":0,"cost":200.00,"isActive":true,"name":"לגנד קרמלין","category":"וודקה"},
{"alcoholPercent":17,"price":76.00,"discountPrice":0,"cost":65.00,"isActive":false,"name":"סטולי 700","category":"וודקה"},
{"alcoholPercent":19,"price":119.00,"discountPrice":0,"cost":100.00,"isActive":false,"name":"סטולי גולד","category":"וודקה"},
{"alcoholPercent":17,"price":89.00,"discountPrice":0,"cost":76.00,"isActive":false,"name":"סטולי ליטר","category":"וודקה"},
{"alcoholPercent":20,"price":90.00,"discountPrice":0,"cost":75.00,"isActive":false,"name":"סטולי ללא גלוטן","category":"וודקה"},
{"alcoholPercent":21,"price":155.00,"discountPrice":0,"cost":128.00,"isActive":false,"name":"סטולי עלית","category":"וודקה"},
{"alcoholPercent":21,"price":75.00,"discountPrice":62,"cost":61.80,"isActive":true,"name":"סמירנוף 700","category":"וודקה"},
{"alcoholPercent":20,"price":89.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"סמירנוף ליטר","category":"וודקה"},
{"alcoholPercent":22,"price":29.00,"discountPrice":0,"cost":23.70,"isActive":false,"name":"פילנדיה 200 מל","category":"וודקה"},
{"alcoholPercent":21,"price":75.00,"discountPrice":0,"cost":62.00,"isActive":false,"name":"פינלנדיה 700 מ׳׳ל","category":"וודקה"},
{"alcoholPercent":13,"price":89.00,"discountPrice":0,"cost":79.00,"isActive":false,"name":"פינלנדיה ליטר","category":"וודקה"},
{"alcoholPercent":35,"price":135.00,"discountPrice":100,"cost":100.00,"isActive":true,"name":"רוברטו קוואלי","category":"וודקה"},
{"alcoholPercent":38,"price":145.00,"discountPrice":0,"cost":120.00,"isActive":false,"name":"רוברטו קוואלי ליטר","category":"וודקה"},
{"alcoholPercent":35,"price":85.00,"discountPrice":0,"cost":72.00,"isActive":false,"name":"אבסולוט 700","category":"וודקה"},
{"alcoholPercent":38,"price":120.00,"discountPrice":0,"cost":100.00,"isActive":false,"name":"אבסולוט ליטר","category":"וודקה"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":75.00,"isActive":false,"name":"בלק מאמבה","category":"וודקה"},
{"alcoholPercent":40,"price":65.00,"discountPrice":0,"cost":55.00,"isActive":false,"name":"זירו","category":"וודקה"},
{"alcoholPercent":17,"price":69.00,"discountPrice":55,"cost":57.00,"isActive":true,"name":"אוסבורן","category":"וורמוט"},
{"alcoholPercent":18,"price":85.00,"discountPrice":0,"cost":70.00,"isActive":false,"name":"מרטיני בראנקה","category":"וורמוט"},
{"alcoholPercent":18,"price":79.00,"discountPrice":0,"cost":65.00,"isActive":false,"name":"מרטיני ביאנקו","category":"וורמוט"},
{"alcoholPercent":18,"price":79.00,"discountPrice":0,"cost":65.00,"isActive":false,"name":"מרטיני רוסו","category":"וורמוט"},
{"alcoholPercent":15,"price":89.00,"discountPrice":0,"cost":75.00,"isActive":false,"name":"נולי פראט","category":"וורמוט"},
{"alcoholPercent":15,"price":95.00,"discountPrice":0,"cost":80.00,"isActive":false,"name":"קינזאנו","category":"וורמוט"},
{"alcoholPercent":40,"price":159.00,"discountPrice":0,"cost":130.00,"isActive":false,"name":"באלנטיינס 12","category":"וויסקי"},
{"alcoholPercent":40,"price":99.00,"discountPrice":0,"cost":82.00,"isActive":false,"name":"באלנטיינס 700","category":"וויסקי"},
{"alcoholPercent":40,"price":109.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"בלאק בוש","category":"וויסקי"},
{"alcoholPercent":40,"price":155.00,"discountPrice":0,"cost":128.00,"isActive":false,"name":"בלאק ניקה","category":"וויסקי"},
{"alcoholPercent":40,"price":99.00,"discountPrice":0,"cost":82.00,"isActive":false,"name":"בלוודר ווד","category":"וויסקי"},
{"alcoholPercent":40,"price":229.00,"discountPrice":0,"cost":190.00,"isActive":false,"name":"גלנפידיך 12","category":"וויסקי"},
{"alcoholPercent":40,"price":115.00,"discountPrice":0,"cost":95.00,"isActive":false,"name":"ג׳יימסון 700","category":"וויסקי"},
{"alcoholPercent":40,"price":159.00,"discountPrice":0,"cost":132.00,"isActive":false,"name":"ג׳יימסון בלאק בארל","category":"וויסקי"},
{"alcoholPercent":40,"price":149.00,"discountPrice":0,"cost":124.00,"isActive":false,"name":"ג׳יימסון קרסד","category":"וויסקי"},
{"alcoholPercent":40,"price":159.00,"discountPrice":0,"cost":132.00,"isActive":false,"name":"ג׳יימסון סטאוט אדיישן","category":"וויסקי"},
{"alcoholPercent":40,"price":115.00,"discountPrice":85,"cost":85.00,"isActive":true,"name":"דה וורסאל","category":"וויסקי"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"וויט הורס","category":"וויסקי"},
{"alcoholPercent":40,"price":179.00,"discountPrice":0,"cost":149.00,"isActive":false,"name":"וויליאם פיר","category":"וויסקי"},
{"alcoholPercent":43,"price":199.00,"discountPrice":0,"cost":165.00,"isActive":false,"name":"לאגאבולין 16","category":"וויסקי"},
{"alcoholPercent":40,"price":149.00,"discountPrice":0,"cost":124.00,"isActive":false,"name":"לניבט 12","category":"וויסקי"},
{"alcoholPercent":40,"price":199.00,"discountPrice":0,"cost":165.00,"isActive":false,"name":"מקאלן 12","category":"וויסקי"},
{"alcoholPercent":40,"price":249.00,"discountPrice":0,"cost":207.00,"isActive":false,"name":"מקאלן 15","category":"וויסקי"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"מונקי שולדר","category":"וויסקי"},
{"alcoholPercent":40,"price":99.00,"discountPrice":75,"cost":75.00,"isActive":true,"name":"פיר פינדיק","category":"וויסקי"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"טיצ׳ר 12","category":"וויסקי"},
{"alcoholPercent":40,"price":99.00,"discountPrice":0,"cost":82.00,"isActive":false,"name":"טיצ׳ר 18","category":"וויסקי"},
{"alcoholPercent":40,"price":115.00,"discountPrice":0,"cost":95.00,"isActive":false,"name":"טיצ׳ר מורט","category":"וויסקי"},
{"alcoholPercent":40,"price":129.00,"discountPrice":0,"cost":107.00,"isActive":false,"name":"ג׳ק דניאלס 700","category":"וויסקי"},
{"alcoholPercent":40,"price":155.00,"discountPrice":0,"cost":129.00,"isActive":false,"name":"ג׳ק דניאלס ליטר","category":"וויסקי"},
{"alcoholPercent":40,"price":145.00,"discountPrice":0,"cost":120.00,"isActive":false,"name":"ג׳ק דניאלס הני","category":"וויסקי"},
{"alcoholPercent":40,"price":145.00,"discountPrice":0,"cost":120.00,"isActive":false,"name":"ג׳ק דניאלס פייר","category":"וויסקי"},
{"alcoholPercent":40,"price":145.00,"discountPrice":0,"cost":120.00,"isActive":false,"name":"ג׳ק דניאלס אפל","category":"וויסקי"},
{"alcoholPercent":40,"price":129.00,"discountPrice":0,"cost":107.00,"isActive":false,"name":"ג׳ק דניאלס גנטלמן","category":"וויסקי"},
{"alcoholPercent":40,"price":125.00,"discountPrice":0,"cost":104.00,"isActive":false,"name":"ג׳ק דניאלס טנסי ריי","category":"וויסקי"},
{"alcoholPercent":40,"price":109.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"רד לייבל","category":"וויסקי"},
{"alcoholPercent":40,"price":129.00,"discountPrice":0,"cost":107.00,"isActive":false,"name":"בלאק לייבל","category":"וויסקי"},
{"alcoholPercent":40,"price":199.00,"discountPrice":0,"cost":165.00,"isActive":false,"name":"גרין לייבל","category":"וויסקי"},
{"alcoholPercent":40,"price":249.00,"discountPrice":0,"cost":207.00,"isActive":false,"name":"גולד לייבל","category":"וויסקי"},
{"alcoholPercent":40,"price":349.00,"discountPrice":0,"cost":290.00,"isActive":false,"name":"בלו לייבל","category":"וויסקי"},
{"alcoholPercent":40,"price":99.00,"discountPrice":0,"cost":82.00,"isActive":false,"name":"פיר הארט","category":"וויסקי"},
{"alcoholPercent":40,"price":155.00,"discountPrice":0,"cost":129.00,"isActive":false,"name":"קולילה 12","category":"וויסקי"},
{"alcoholPercent":40,"price":189.00,"discountPrice":0,"cost":157.00,"isActive":false,"name":"קולילה 18","category":"וויסקי"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"קראון רויאל","category":"וויסקי"},
{"alcoholPercent":40,"price":115.00,"discountPrice":0,"cost":95.00,"isActive":false,"name":"בוש מילס 10","category":"וויסקי"},
{"alcoholPercent":40,"price":149.00,"discountPrice":0,"cost":124.00,"isActive":false,"name":"בוש מילס 12","category":"וויסקי"},
{"alcoholPercent":40,"price":179.00,"discountPrice":0,"cost":149.00,"isActive":false,"name":"בוש מילס 16","category":"וויסקי"},
{"alcoholPercent":40,"price":199.00,"discountPrice":0,"cost":165.00,"isActive":false,"name":"גלנמוראנג׳י 10","category":"וויסקי"},
{"alcoholPercent":40,"price":249.00,"discountPrice":0,"cost":207.00,"isActive":false,"name":"גלנמוראנג׳י 12","category":"וויסקי"},
{"alcoholPercent":40,"price":299.00,"discountPrice":0,"cost":249.00,"isActive":false,"name":"גלנמוראנג׳י 18","category":"וויסקי"},
{"alcoholPercent":40,"price":59.00,"discountPrice":0,"cost":49.00,"isActive":false,"name":"ניו אמסטרדם","category":"וויסקי"},
{"alcoholPercent":38,"price":49.00,"discountPrice":0,"cost":40.00,"isActive":false,"name":"ג׳ון ברוס","category":"וויסקי"},
{"alcoholPercent":40,"price":175.00,"discountPrice":0,"cost":145.00,"isActive":false,"name":"אוסבורן ווקי שנה 12","category":"וויסקי"},
{"alcoholPercent":40,"price":39.00,"discountPrice":0,"cost":32.00,"isActive":false,"name":"תל אביב","category":"וויסקי"},
{"alcoholPercent":38,"price":75.00,"discountPrice":0,"cost":62.00,"isActive":false,"name":"כהן","category":"וויסקי"},
{"alcoholPercent":40,"price":99.00,"discountPrice":75,"cost":75.00,"isActive":true,"name":"קוואלקד","category":"טקילה"},
{"alcoholPercent":40,"price":159.00,"discountPrice":0,"cost":132.00,"isActive":false,"name":"1800 ריזרב","category":"טקילה"},
{"alcoholPercent":40,"price":109.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"1800 קוקוס","category":"טקילה"},
{"alcoholPercent":40,"price":119.00,"discountPrice":0,"cost":99.00,"isActive":false,"name":"1800 סילבר","category":"טקילה"},
{"alcoholPercent":40,"price":119.00,"discountPrice":0,"cost":99.00,"isActive":false,"name":"1800 אניחו","category":"טקילה"},
{"alcoholPercent":40,"price":129.00,"discountPrice":0,"cost":107.00,"isActive":false,"name":"אוארזו","category":"טקילה"},
{"alcoholPercent":38,"price":109.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"אולמקה","category":"טקילה"},
{"alcoholPercent":40,"price":99.00,"discountPrice":0,"cost":82.00,"isActive":false,"name":"אל הימדור","category":"טקילה"},
{"alcoholPercent":40,"price":119.00,"discountPrice":0,"cost":99.00,"isActive":false,"name":"אל פטרון","category":"טקילה"},
{"alcoholPercent":40,"price":109.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"אסמרלדה","category":"טקילה"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"הוסה קוארבו","category":"טקילה"},
{"alcoholPercent":40,"price":119.00,"discountPrice":0,"cost":99.00,"isActive":false,"name":"הוסה קוארבו בלאק","category":"טקילה"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"סיירה","category":"טקילה"},
{"alcoholPercent":40,"price":109.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"סיירה ריפוסדו","category":"טקילה"},
{"alcoholPercent":40,"price":159.00,"discountPrice":0,"cost":132.00,"isActive":false,"name":"קסמיגוס בלאנקו","category":"טקילה"},
{"alcoholPercent":40,"price":179.00,"discountPrice":0,"cost":149.00,"isActive":false,"name":"קסמיגוס ריפוסדו","category":"טקילה"},
{"alcoholPercent":40,"price":199.00,"discountPrice":0,"cost":165.00,"isActive":false,"name":"קסמיגוס אניחו","category":"טקילה"},
{"alcoholPercent":40,"price":149.00,"discountPrice":0,"cost":124.00,"isActive":false,"name":"דון חוליו בלאנקו","category":"טקילה"},
{"alcoholPercent":40,"price":169.00,"discountPrice":0,"cost":140.00,"isActive":false,"name":"דון חוליו ריפוסדו","category":"טקילה"},
{"alcoholPercent":40,"price":199.00,"discountPrice":0,"cost":165.00,"isActive":false,"name":"דון חוליו אניחו","category":"טקילה"},
{"alcoholPercent":13,"price":55.00,"discountPrice":0,"cost":42.80,"isActive":false,"name":"אדמה - קברנה סוביניון","category":"יין"},
{"alcoholPercent":13,"price":55.00,"discountPrice":0,"cost":42.80,"isActive":false,"name":"אדמה - רוזה","category":"יין"},
{"alcoholPercent":13,"price":55.00,"discountPrice":0,"cost":42.80,"isActive":false,"name":"אדמה - שרדונה","category":"יין"},
{"alcoholPercent":13,"price":55.00,"discountPrice":0,"cost":42.80,"isActive":false,"name":"אדמה - מרלו","category":"יין"},
{"alcoholPercent":13,"price":85.00,"discountPrice":0,"cost":63.00,"isActive":false,"name":"אדמה - קברנה פראנק","category":"יין"},
{"alcoholPercent":13,"price":75.00,"discountPrice":0,"cost":57.00,"isActive":false,"name":"אדמה - סוביניון בלאן","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"אדמה - ויניארד ספיישל","category":"יין"},
{"alcoholPercent":13,"price":49.00,"discountPrice":0,"cost":37.20,"isActive":false,"name":"גיורא - אדום","category":"יין"},
{"alcoholPercent":13,"price":49.00,"discountPrice":0,"cost":37.20,"isActive":false,"name":"גיורא - לבן","category":"יין"},
{"alcoholPercent":13,"price":49.00,"discountPrice":0,"cost":37.20,"isActive":false,"name":"גיורא - רוזה","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"דלתון - אקסלרנס אדום","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"דלתון - אקסלרנס לבן","category":"יין"},
{"alcoholPercent":13,"price":75.00,"discountPrice":0,"cost":57.00,"isActive":false,"name":"דלתון - מוזאיק אדום","category":"יין"},
{"alcoholPercent":13,"price":75.00,"discountPrice":0,"cost":57.00,"isActive":false,"name":"דלתון - מוזאיק לבן","category":"יין"},
{"alcoholPercent":13,"price":99.00,"discountPrice":0,"cost":74.00,"isActive":false,"name":"דלתון - קנאן","category":"יין"},
{"alcoholPercent":13,"price":125.00,"discountPrice":0,"cost":94.00,"isActive":false,"name":"דלתון - כנרות ריזרב","category":"יין"},
{"alcoholPercent":13,"price":75.00,"discountPrice":0,"cost":57.00,"isActive":false,"name":"דלתון - אמור","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"הר אודם - אדום","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"הר אודם - לבן","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"הר אודם - רוזה","category":"יין"},
{"alcoholPercent":13,"price":89.00,"discountPrice":0,"cost":67.00,"isActive":false,"name":"הר אודם - מרלו","category":"יין"},
{"alcoholPercent":13,"price":89.00,"discountPrice":0,"cost":67.00,"isActive":false,"name":"הר אודם - קברנה סוביניון","category":"יין"},
{"alcoholPercent":14,"price":75.00,"discountPrice":58,"cost":58.00,"isActive":true,"name":"טברנה - אדום","category":"יין"},
{"alcoholPercent":14,"price":75.00,"discountPrice":0,"cost":57.00,"isActive":false,"name":"טברנה - לבן","category":"יין"},
{"alcoholPercent":14,"price":75.00,"discountPrice":0,"cost":57.00,"isActive":false,"name":"טברנה - רוזה","category":"יין"},
{"alcoholPercent":13,"price":69.00,"discountPrice":0,"cost":53.00,"isActive":false,"name":"יקב ריינה - קברנה","category":"יין"},
{"alcoholPercent":13,"price":69.00,"discountPrice":0,"cost":53.00,"isActive":false,"name":"יקב ריינה - מרלו","category":"יין"},
{"alcoholPercent":13,"price":69.00,"discountPrice":0,"cost":53.00,"isActive":false,"name":"יקב ריינה - שרדונה","category":"יין"},
{"alcoholPercent":14,"price":119.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"יתיר - חלוץ טמפריניו","category":"יין"},
{"alcoholPercent":14,"price":119.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"יתיר - חלוץ שנין רוסן","category":"יין"},
{"alcoholPercent":14,"price":175.00,"discountPrice":0,"cost":134.80,"isActive":false,"name":"יתיר - נחל יתיר לבן","category":"יין"},
{"alcoholPercent":14,"price":165.00,"discountPrice":0,"cost":126.70,"isActive":false,"name":"יתיר - פטי ורדו","category":"יין"},
{"alcoholPercent":14,"price":85.00,"discountPrice":66,"cost":66.30,"isActive":true,"name":"כישור - ויונייה","category":"יין"},
{"alcoholPercent":14,"price":75.00,"discountPrice":0,"cost":54.30,"isActive":false,"name":"כישור - לבן","category":"יין"},
{"alcoholPercent":14,"price":125.00,"discountPrice":0,"cost":97.20,"isActive":false,"name":"כישור - מצודת תפן","category":"יין"},
{"alcoholPercent":14,"price":229.00,"discountPrice":0,"cost":179.50,"isActive":false,"name":"כישור - עין יפעם","category":"יין"},
{"alcoholPercent":14,"price":89.00,"discountPrice":0,"cost":67.20,"isActive":false,"name":"כישור - קברנה פראנק","category":"יין"},
{"alcoholPercent":14,"price":75.00,"discountPrice":0,"cost":55.70,"isActive":false,"name":"כישור - רוזה","category":"יין"},
{"alcoholPercent":14,"price":89.00,"discountPrice":68,"cost":68.00,"isActive":true,"name":"כישור - ריזלינג","category":"יין"},
{"alcoholPercent":14,"price":75.00,"discountPrice":0,"cost":55.70,"isActive":false,"name":"כישור - אדום","category":"יין"},
{"alcoholPercent":14,"price":109.00,"discountPrice":84,"cost":84.40,"isActive":true,"name":"כישור - תפן לבן","category":"יין"},
{"alcoholPercent":13,"price":109.98,"discountPrice":0,"cost":84.60,"isActive":false,"name":"כרמל סיגנטשר - xperiment","category":"יין"},
{"alcoholPercent":13,"price":79.00,"discountPrice":0,"cost":62.40,"isActive":false,"name":"כרמל סיגנטשר - ויניארדס קברנה סוביניון","category":"יין"},
{"alcoholPercent":13,"price":75.00,"discountPrice":0,"cost":55.00,"isActive":false,"name":"כרמל סיגנטשר - ויניארדס רוזה","category":"יין"},
{"alcoholPercent":13,"price":159.00,"discountPrice":0,"cost":121.60,"isActive":false,"name":"כרמל סיגנטשר - מדטריניאן אדום","category":"יין"},
{"alcoholPercent":13,"price":60.00,"discountPrice":0,"cost":44.10,"isActive":false,"name":"כרמל סיגנטשר - מדיטריניאן 2 וואטס חצי יבש","category":"יין"},
{"alcoholPercent":13,"price":60.00,"discountPrice":0,"cost":44.10,"isActive":false,"name":"כרמל סיגנטשר - מדיטריניאן 2 וואטס יבש","category":"יין"},
{"alcoholPercent":13,"price":60.00,"discountPrice":0,"cost":44.10,"isActive":false,"name":"כרמל סיגנטשר - מדיטרניאן 2 וואטס רוזה","category":"יין"},
{"alcoholPercent":13,"price":60.00,"discountPrice":44,"cost":44.10,"isActive":true,"name":"כרמל סיגנטשר - מדיטרניאן 4 וואטס אדום","category":"יין"},
{"alcoholPercent":13,"price":115.00,"discountPrice":0,"cost":88.00,"isActive":false,"name":"כרמל סיגנטשר - סינגל מרלו","category":"יין"},
{"alcoholPercent":13,"price":115.00,"discountPrice":0,"cost":88.00,"isActive":false,"name":"כרמל סיגנטשר - סינגל סירה","category":"יין"},
{"alcoholPercent":13,"price":99.00,"discountPrice":0,"cost":75.00,"isActive":false,"name":"כרמל סיגנטשר - סינגל שרדונה","category":"יין"},
{"alcoholPercent":13,"price":115.00,"discountPrice":0,"cost":69.50,"isActive":false,"name":"כרמל סיגנטשר - סינגל ריזלינג","category":"יין"},
{"alcoholPercent":13,"price":105.00,"discountPrice":0,"cost":77.00,"isActive":false,"name":"לוריא - פינו גריזו","category":"יין"},
{"alcoholPercent":13,"price":105.00,"discountPrice":0,"cost":77.00,"isActive":false,"name":"לוריא - רוזה","category":"יין"},
{"alcoholPercent":13,"price":119.00,"discountPrice":0,"cost":91.00,"isActive":false,"name":"לוריא - רוסו","category":"יין"},
{"alcoholPercent":13,"price":119.00,"discountPrice":0,"cost":91.00,"isActive":false,"name":"לוריא - שרדונה","category":"יין"},
{"alcoholPercent":13,"price":99.00,"discountPrice":0,"cost":70.80,"isActive":false,"name":"לוריא - טראס","category":"יין"},
{"alcoholPercent":13,"price":85.00,"discountPrice":0,"cost":63.00,"isActive":false,"name":"מדמוזל","category":"יין"},
{"alcoholPercent":13,"price":139.00,"discountPrice":0,"cost":117.12,"isActive":false,"name":"מיראבל","category":"יין"},
{"alcoholPercent":13,"price":45.00,"discountPrice":0,"cost":35.80,"isActive":false,"name":"עברי - קברנה סוביניון","category":"יין"},
{"alcoholPercent":13,"price":45.00,"discountPrice":0,"cost":35.80,"isActive":false,"name":"עברי - רוזה","category":"יין"},
{"alcoholPercent":13,"price":45.00,"discountPrice":0,"cost":35.80,"isActive":false,"name":"עברי - שרדונה","category":"יין"},
{"alcoholPercent":13,"price":49.00,"discountPrice":0,"cost":39.60,"isActive":false,"name":"פורטה 6 - אדום","category":"יין"},
{"alcoholPercent":13,"price":49.00,"discountPrice":0,"cost":39.60,"isActive":false,"name":"פורטה 6 - לבן","category":"יין"},
{"alcoholPercent":13,"price":49.00,"discountPrice":0,"cost":39.60,"isActive":false,"name":"פורטה 6 - רוזה","category":"יין"},
{"alcoholPercent":14,"price":155.00,"discountPrice":0,"cost":117.12,"isActive":false,"name":"צרעה - שורש","category":"יין"},
{"alcoholPercent":11,"price":29.00,"discountPrice":0,"cost":20.00,"isActive":false,"name":"קאווה די מרמו","category":"יין"},
{"alcoholPercent":13,"price":95.00,"discountPrice":0,"cost":69.00,"isActive":false,"name":"קנטיר - g","category":"יין"},
{"alcoholPercent":13,"price":95.00,"discountPrice":0,"cost":68.00,"isActive":false,"name":"קנטיר - רוזה","category":"יין"},
{"alcoholPercent":14,"price":89.00,"discountPrice":0,"cost":63.00,"isActive":false,"name":"רמת הגולן - גמלא בלנד אדום","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":45.30,"isActive":false,"name":"רמת הגולן - גמלא סוביניון בלאן","category":"יין"},
{"alcoholPercent":14,"price":85.00,"discountPrice":0,"cost":61.80,"isActive":false,"name":"רמת הגולן - גמלא קברנה סוביניון","category":"יין"},
{"alcoholPercent":13,"price":69.00,"discountPrice":0,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן גוורץ","category":"יין"},
{"alcoholPercent":14,"price":259.00,"discountPrice":0,"cost":177.30,"isActive":false,"name":"רמת הגולן - ירדן מרלו סינגל","category":"יין"},
{"alcoholPercent":13,"price":69.00,"discountPrice":0,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן סוביניון בלאן","category":"יין"},
{"alcoholPercent":14,"price":125.00,"discountPrice":0,"cost":90.60,"isActive":false,"name":"רמת הגולן - ירדן סירה","category":"יין"},
{"alcoholPercent":14,"price":125.00,"discountPrice":0,"cost":93.80,"isActive":false,"name":"רמת הגולן - ירדן פטי ורדו","category":"יין"},
{"alcoholPercent":13,"price":69.00,"discountPrice":0,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן פינו גרי","category":"יין"},
{"alcoholPercent":14,"price":125.00,"discountPrice":0,"cost":90.50,"isActive":false,"name":"רמת הגולן - ירדן פינו נואר","category":"יין"},
{"alcoholPercent":14,"price":135.00,"discountPrice":0,"cost":104.30,"isActive":false,"name":"רמת הגולן - ירדן ק סוביניון","category":"יין"},
{"alcoholPercent":14,"price":699.00,"discountPrice":0,"cost":520.00,"isActive":false,"name":"רמת הגולן - ירדן קצרין","category":"יין"},
{"alcoholPercent":13,"price":85.02,"discountPrice":0,"cost":65.40,"isActive":false,"name":"רמת הגולן - ירדן רוזה","category":"יין"},
{"alcoholPercent":14,"price":699.00,"discountPrice":0,"cost":519.50,"isActive":false,"name":"רמת הגולן - ירדן רום","category":"יין"},
{"alcoholPercent":13,"price":69.00,"discountPrice":0,"cost":51.20,"isActive":false,"name":"רמת הגולן - ירדן שרדונה","category":"יין"},
{"alcoholPercent":13,"price":65.00,"discountPrice":0,"cost":49.50,"isActive":false,"name":"רקנאטי - כרמי הגליל מרלו","category":"יין"},
{"alcoholPercent":14,"price":115.00,"discountPrice":0,"cost":90.00,"isActive":false,"name":"שבלי","category":"יין"},
{"alcoholPercent":14,"price":95.00,"discountPrice":0,"cost":71.50,"isActive":false,"name":"תל שיפון - אדום","category":"יין"},
{"alcoholPercent":14,"price":95.00,"discountPrice":0,"cost":71.50,"isActive":false,"name":"תל שיפון - לבן","category":"יין"},
{"alcoholPercent":14,"price":115.00,"discountPrice":0,"cost":88.60,"isActive":false,"name":"תל שיפון - ס בלאן","category":"יין"},
{"alcoholPercent":14,"price":115.00,"discountPrice":0,"cost":88.60,"isActive":false,"name":"תל שיפון - סירה","category":"יין"},
{"alcoholPercent":14,"price":115.00,"discountPrice":0,"cost":88.60,"isActive":false,"name":"תל שיפון - ק סוביניון","category":"יין"},
{"alcoholPercent":14,"price":115.00,"discountPrice":0,"cost":88.60,"isActive":false,"name":"תל שיפון - קברנה פראנק","category":"יין"},
{"alcoholPercent":14,"price":95.00,"discountPrice":0,"cost":71.50,"isActive":false,"name":"תל שיפון - רוזה","category":"יין"},
{"alcoholPercent":14,"price":115.00,"discountPrice":89,"cost":88.60,"isActive":true,"name":"תל שיפון - ריזלינג","category":"יין"},
{"alcoholPercent":14,"price":115.00,"discountPrice":89,"cost":88.60,"isActive":true,"name":"תל שיפון - שרדונה","category":"יין"},
{"alcoholPercent":12,"price":65.00,"discountPrice":0,"cost":49.20,"isActive":false,"name":"1883 אבטיח","category":"ליקרים"},
{"alcoholPercent":12,"price":65.00,"discountPrice":0,"cost":46.10,"isActive":false,"name":"1883 אננס","category":"ליקרים"},
{"alcoholPercent":12,"price":65.00,"discountPrice":0,"cost":38.50,"isActive":false,"name":"1883 קוקוס","category":"ליקרים"},
{"alcoholPercent":11,"price":80.00,"discountPrice":0,"cost":71.40,"isActive":false,"name":"אפרול","category":"ליקרים"},
{"alcoholPercent":17,"price":75.00,"discountPrice":0,"cost":60.50,"isActive":false,"name":"בולס","category":"ליקרים"},
{"alcoholPercent":17,"price":90.00,"discountPrice":0,"cost":75.10,"isActive":false,"name":"בייליס 700 מל","category":"ליקרים"},
{"alcoholPercent":15,"price":75.00,"discountPrice":66,"cost":65.50,"isActive":true,"name":"דיזרונו אמרטו","category":"ליקרים"},
{"alcoholPercent":17,"price":105.00,"discountPrice":0,"cost":89.50,"isActive":false,"name":"וילה מאסה","category":"ליקרים"},
{"alcoholPercent":17,"price":115.00,"discountPrice":0,"cost":95.50,"isActive":false,"name":"וילה מאסה מארז","category":"ליקרים"},
{"alcoholPercent":16,"price":99.00,"discountPrice":0,"cost":85.40,"isActive":false,"name":"טובי 60","category":"ליקרים"},
{"alcoholPercent":20,"price":85.00,"discountPrice":0,"cost":69.20,"isActive":false,"name":"טובי נובה","category":"ליקרים"},
{"alcoholPercent":20,"price":115.00,"discountPrice":0,"cost":95.90,"isActive":false,"name":"טובי נייט","category":"ליקרים"},
{"alcoholPercent":16,"price":115.00,"discountPrice":0,"cost":99.00,"isActive":false,"name":"ייגר","category":"ליקרים"},
{"alcoholPercent":25,"price":79.00,"discountPrice":0,"cost":63.30,"isActive":false,"name":"לימונצלו איזואבלה","category":"ליקרים"},
{"alcoholPercent":30,"price":99.00,"discountPrice":0,"cost":75.00,"isActive":false,"name":"מוליס ליטר","category":"ליקרים"},
{"alcoholPercent":20,"price":189.00,"discountPrice":0,"cost":160.00,"isActive":false,"name":"סט ג׳רמן","category":"ליקרים"},
{"alcoholPercent":15,"price":69.00,"discountPrice":0,"cost":58.50,"isActive":false,"name":"פידג׳ ליטר","category":"ליקרים"},
{"alcoholPercent":17,"price":95.00,"discountPrice":0,"cost":81.00,"isActive":false,"name":"פייר בול","category":"ליקרים"},
{"alcoholPercent":20,"price":89.00,"discountPrice":0,"cost":73.50,"isActive":false,"name":"פסאווה פסיפלורה","category":"ליקרים"},
{"alcoholPercent":40,"price":119.00,"discountPrice":0,"cost":101.00,"isActive":false,"name":"קוואנטרו","category":"ליקרים"},
{"alcoholPercent":10,"price":49.00,"discountPrice":0,"cost":42.00,"isActive":false,"name":"קמפרי סודה","category":"ליקרים"},
{"alcoholPercent":25,"price":95.00,"discountPrice":0,"cost":82.30,"isActive":false,"name":"קמפרי","category":"ליקרים"},
{"alcoholPercent":55,"price":299.00,"discountPrice":0,"cost":245.50,"isActive":false,"name":"שרטרז ירוק","category":"ליקרים"},
{"alcoholPercent":43,"price":269.00,"discountPrice":0,"cost":220.00,"isActive":false,"name":"שרטרז צהוב","category":"ליקרים"},
{"alcoholPercent":20,"price":105.00,"discountPrice":0,"cost":88.70,"isActive":false,"name":"שרידנס","category":"ליקרים"},
{"alcoholPercent":40,"price":155.00,"discountPrice":0,"cost":128.80,"isActive":false,"name":"הנסי vs","category":"קוניאק"},
{"alcoholPercent":40,"price":175.00,"discountPrice":145,"cost":145.00,"isActive":true,"name":"הנסי vsop","category":"קוניאק"},
{"alcoholPercent":40,"price":95.00,"discountPrice":75,"cost":75.20,"isActive":true,"name":"סט רמי vsop","category":"קוניאק"},
{"alcoholPercent":40,"price":109.00,"discountPrice":0,"cost":93.20,"isActive":false,"name":"סט רמי xo","category":"קוניאק"},
{"alcoholPercent":40,"price":159.00,"discountPrice":0,"cost":131.20,"isActive":false,"name":"רביזייר vs","category":"קוניאק"},
{"alcoholPercent":40,"price":215.00,"discountPrice":0,"cost":180.90,"isActive":false,"name":"רביזייר vsop","category":"קוניאק"},
{"alcoholPercent":40,"price":649.00,"discountPrice":0,"cost":553.70,"isActive":false,"name":"רביזייר xo","category":"קוניאק"},
{"alcoholPercent":40,"price":299.00,"discountPrice":0,"cost":251.00,"isActive":false,"name":"רמי מרטין 1738","category":"קוניאק"},
{"alcoholPercent":40,"price":249.00,"discountPrice":0,"cost":207.20,"isActive":false,"name":"רמי מרטין vsop","category":"קוניאק"},
{"alcoholPercent":40,"price":799.00,"discountPrice":0,"cost":678.00,"isActive":false,"name":"רמי מרטין xo","category":"קוניאק"},
{"alcoholPercent":40,"price":119.00,"discountPrice":97,"cost":97.00,"isActive":true,"name":"בקרדי לבן ליטר","category":"רום"},
{"alcoholPercent":40,"price":119.00,"discountPrice":0,"cost":97.00,"isActive":false,"name":"בקרדי ספייס 750","category":"רום"},
{"alcoholPercent":40,"price":79.00,"discountPrice":0,"cost":62.40,"isActive":false,"name":"נגריטה לבן","category":"רום"},
{"alcoholPercent":40,"price":129.00,"discountPrice":0,"cost":104.00,"isActive":false,"name":"נגריטה שחור ליטר","category":"רום"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":75.60,"isActive":false,"name":"קפטן מורגן בלאנקו 700 מל","category":"רום"},
{"alcoholPercent":40,"price":89.00,"discountPrice":0,"cost":75.60,"isActive":false,"name":"קפטן מורגן בלאק","category":"רום"},
{"alcoholPercent":40,"price":99.00,"discountPrice":0,"cost":82.70,"isActive":false,"name":"קפטן מורגן ספייס 750 מל","category":"רום"},
{"alcoholPercent":40,"price":129.00,"discountPrice":0,"cost":107.50,"isActive":false,"name":"קרקאן","category":"רום"},
{"alcoholPercent":40,"price":99.00,"discountPrice":0,"cost":83.00,"isActive":false,"name":"קשאסה","category":"רום"}
,
{"alcoholPercent":38,"price":145.00,"discountPrice":0,"cost":105.00,"isActive":false,"name":"רוברטו קוואלי אבטיח", "category":"וודקה"},
{"alcoholPercent":38,"price":145.00,"discountPrice":0,"cost":105.00,"isActive":false,"name":"רוברטו קוואלי אננס", "category":"וודקה"},
{"alcoholPercent":38,"price":145.00,"discountPrice":105,"cost":105.00,"isActive":true,"name":"רוברטו קוואלי מלון", "category":"וודקה"},
{"alcoholPercent":22,"price":105.00,"discountPrice":86,"cost":86.25,"isActive":true,"name":"JB", "category":"וויסקי"},
{"alcoholPercent":19,"price":429.00,"discountPrice":0,"cost":360.00,"isActive":false,"name":"בושמילס 16", "category":"וויסקי"},
{"alcoholPercent":20,"price":129.00,"discountPrice":0,"cost":107.50,"isActive":false,"name":"בושמילס אורינגל", "category":"וויסקי"},
{"alcoholPercent":22,"price":129.00,"discountPrice":0,"cost":106.00,"isActive":false,"name":"בושמילס בלאק בוש", "category":"וויסקי"},
{"alcoholPercent":21,"price":285.00,"discountPrice":0,"cost":236.00,"isActive":false,"name":"בלביני 12", "category":"וויסקי"},
{"alcoholPercent":20,"price":385.00,"discountPrice":0,"cost":321.00,"isActive":false,"name":"בלביני 14", "category":"וויסקי"},
{"alcoholPercent":23,"price":49.00,"discountPrice":0,"cost":40.00,"isActive":false,"name":"ג׳וני ווקר - בלאק לייבל 200 מל", "category":"וויסקי"},
{"alcoholPercent":10,"price":129.00,"discountPrice":0,"cost":117.00,"isActive":false,"name":"ג׳וני ווקר - בלאק לייבל 700", "category":"וויסקי"},
{"alcoholPercent":7,"price":159.00,"discountPrice":0,"cost":148.40,"isActive":false,"name":"ג׳וני ווקר - בלאק לייבל ליטר", "category":"וויסקי"},
{"alcoholPercent":9,"price":155.00,"discountPrice":0,"cost":142.50,"isActive":false,"name":"ג׳וני ווקר - גולד לייבל", "category":"וויסקי"},
{"alcoholPercent":13,"price":229.00,"discountPrice":0,"cost":202.50,"isActive":false,"name":"ג׳וני ווקר - גרין לייבל", "category":"וויסקי"},
{"alcoholPercent":16,"price":165.00,"discountPrice":0,"cost":141.75,"isActive":false,"name":"ג׳וני ווקר - דאבל בלאק", "category":"וויסקי"},
{"alcoholPercent":10,"price":85.00,"discountPrice":0,"cost":77.25,"isActive":false,"name":"ג׳וני ווקר - רד לייבל 700", "category":"וויסקי"},
{"alcoholPercent":11,"price":115.00,"discountPrice":0,"cost":103.50,"isActive":false,"name":"ג׳וני ווקר - רד לייבל ליטר", "category":"וויסקי"},
{"alcoholPercent":22,"price":95.00,"discountPrice":0,"cost":77.60,"isActive":false,"name":"ג׳ים בים ברבן", "category":"וויסקי"},
{"alcoholPercent":22,"price":95.00,"discountPrice":0,"cost":77.60,"isActive":false,"name":"ג׳ים בים דבש", "category":"וויסקי"},
{"alcoholPercent":24,"price":99.00,"discountPrice":0,"cost":80.00,"isActive":false,"name":"ג׳ים בים צ׳רי", "category":"וויסקי"},
{"alcoholPercent":24,"price":125.00,"discountPrice":0,"cost":101.00,"isActive":false,"name":"ג׳ים בים שחור", "category":"וויסקי"},
{"alcoholPercent":24,"price":99.00,"discountPrice":0,"cost":80.00,"isActive":false,"name":"ג׳ים בים תפוח", "category":"וויסקי"},
{"alcoholPercent":28,"price":49.00,"discountPrice":0,"cost":38.20,"isActive":false,"name":"ג׳ק דניאלס 200 מיל", "category":"וויסקי"},
{"alcoholPercent":19,"price":119.00,"discountPrice":100,"cost":100.00,"isActive":true,"name":"ג׳ק דניאלס תפוח", "category":"וויסקי"},
{"alcoholPercent":19,"price":139.00,"discountPrice":0,"cost":117.10,"isActive":false,"name":"גלן גראנט 10", "category":"וויסקי"},
{"alcoholPercent":19,"price":159.00,"discountPrice":0,"cost":133.60,"isActive":false,"name":"גלן גראנט 12", "category":"וויסקי"},
{"alcoholPercent":17,"price":119.00,"discountPrice":0,"cost":102.00,"isActive":false,"name":"גלן גראנט קלאסי", "category":"וויסקי"},
{"alcoholPercent":18,"price":379.00,"discountPrice":321,"cost":320.90,"isActive":true,"name":"גלן גרנט 18", "category":"וויסקי"},
{"alcoholPercent":17,"price":179.00,"discountPrice":0,"cost":153.00,"isActive":false,"name":"גלנדפידיך 12", "category":"וויסקי"},
{"alcoholPercent":20,"price":229.00,"discountPrice":0,"cost":191.40,"isActive":false,"name":"גלנדפידיך 14", "category":"וויסקי"},
{"alcoholPercent":19,"price":249.00,"discountPrice":208,"cost":208.40,"isActive":true,"name":"גלנדפידיך 15", "category":"וויסקי"},
{"alcoholPercent":20,"price":359.00,"discountPrice":300,"cost":300.00,"isActive":true,"name":"גלנדפידיך 18", "category":"וויסקי"},
{"alcoholPercent":12,"price":899.00,"discountPrice":800,"cost":800.00,"isActive":true,"name":"גלנדפידיך 21", "category":"וויסקי"},
{"alcoholPercent":67,"price":2000.00,"discountPrice":1200,"cost":1200.00,"isActive":true,"name":"גלנדפידיך 21 וינטר סטורם", "category":"וויסקי"},
{"alcoholPercent":19,"price":219.00,"discountPrice":0,"cost":184.00,"isActive":false,"name":"גלנליבט 12", "category":"וויסקי"},
{"alcoholPercent":16,"price":299.00,"discountPrice":0,"cost":257.30,"isActive":false,"name":"גלנליבט 15", "category":"וויסקי"},
{"alcoholPercent":15,"price":149.00,"discountPrice":0,"cost":129.90,"isActive":false,"name":"גלנליבט פאונדרס", "category":"וויסקי"},
{"alcoholPercent":17,"price":590.00,"discountPrice":506,"cost":506.00,"isActive":true,"name":"היביקי", "category":"וויסקי"},
{"alcoholPercent":22,"price":329.00,"discountPrice":0,"cost":270.00,"isActive":false,"name":"טינקרס ברבן", "category":"וויסקי"},
{"alcoholPercent":20,"price":245.00,"discountPrice":0,"cost":204.50,"isActive":false,"name":"טליסקר סטורם", "category":"וויסקי"},
{"alcoholPercent":20,"price":269.00,"discountPrice":0,"cost":223.30,"isActive":false,"name":"טליסקר סקאי", "category":"וויסקי"},
{"alcoholPercent":18,"price":499.00,"discountPrice":0,"cost":422.70,"isActive":false,"name":"לגבולין 16", "category":"וויסקי"},
{"alcoholPercent":22,"price":245.00,"discountPrice":0,"cost":201.00,"isActive":false,"name":"לפרויג 10", "category":"וויסקי"},
{"alcoholPercent":22,"price":225.00,"discountPrice":0,"cost":184.30,"isActive":false,"name":"לפרויג סלקט", "category":"וויסקי"},
{"alcoholPercent":21,"price":315.00,"discountPrice":0,"cost":260.00,"isActive":false,"name":"לפרויג קווארטר קאסק", "category":"וויסקי"},
{"alcoholPercent":18,"price":145.00,"discountPrice":0,"cost":122.40,"isActive":false,"name":"מאנקי שולדר", "category":"וויסקי"},
{"alcoholPercent":22,"price":279.00,"discountPrice":0,"cost":228.50,"isActive":false,"name":"מילק & האני חביות יין", "category":"וויסקי"},
{"alcoholPercent":22,"price":279.00,"discountPrice":0,"cost":228.50,"isActive":false,"name":"מילק & האני לייטלי פיטד", "category":"וויסקי"},
{"alcoholPercent":23,"price":285.00,"discountPrice":0,"cost":232.00,"isActive":false,"name":"מילק & האני צרי קסק", "category":"וויסקי"},
{"alcoholPercent":22,"price":209.00,"discountPrice":0,"cost":171.70,"isActive":false,"name":"מילק & האני קלאסיק", "category":"וויסקי"},
{"alcoholPercent":17,"price":699.00,"discountPrice":0,"cost":595.00,"isActive":false,"name":"מקלאן 15", "category":"וויסקי"},
{"alcoholPercent":16,"price":1390.00,"discountPrice":0,"cost":1200.00,"isActive":false,"name":"מקלן 18", "category":"וויסקי"},
{"alcoholPercent":16,"price":209.00,"discountPrice":180,"cost":180.00,"isActive":true,"name":"נוב קריק", "category":"וויסקי"},
{"alcoholPercent":20,"price":145.00,"discountPrice":0,"cost":120.60,"isActive":false,"name":"סינגלטון 12 שנים", "category":"וויסקי"},
{"alcoholPercent":20,"price":145.00,"discountPrice":0,"cost":120.60,"isActive":false,"name":"סינגלטון", "category":"וויסקי"},
{"alcoholPercent":30,"price":260.00,"discountPrice":0,"cost":200.00,"isActive":false,"name":"קאבאלאן", "category":"וויסקי"},
{"alcoholPercent":29,"price":599.00,"discountPrice":0,"cost":466.00,"isActive":false,"name":"קוג׳ירה 10", "category":"וויסקי"},
{"alcoholPercent":29,"price":949.00,"discountPrice":0,"cost":735.44,"isActive":false,"name":"קוג׳ירה 15", "category":"וויסקי"},
{"alcoholPercent":29,"price":425.00,"discountPrice":0,"cost":330.00,"isActive":false,"name":"קוג׳ירה 5", "category":"וויסקי"},
{"alcoholPercent":29,"price":309.00,"discountPrice":0,"cost":240.00,"isActive":false,"name":"קוג׳ירה אינרי", "category":"וויסקי"},
{"alcoholPercent":17,"price":175.00,"discountPrice":0,"cost":149.60,"isActive":false,"name":"שיבאס", "category":"וויסקי"},
{"alcoholPercent":45,"price":45.00,"discountPrice":0,"cost":31.00,"isActive":false,"name":"דולין לבן יבש", "category":"וורמוט"},
{"alcoholPercent":45,"price":45.00,"discountPrice":0,"cost":31.00,"isActive":false,"name":"דולין לבן מתוק", "category":"וורמוט"},
{"alcoholPercent":45,"price":45.00,"discountPrice":0,"cost":31.00,"isActive":false,"name":"דולין שמברי", "category":"וורמוט"},
{"alcoholPercent":31,"price":55.00,"discountPrice":0,"cost":42.00,"isActive":false,"name":"מרטיני אקסטרה דריי", "category":"וורמוט"},
{"alcoholPercent":30,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"מרטיני ביונקו", "category":"וורמוט"},
{"alcoholPercent":20,"price":210.00,"discountPrice":0,"cost":174.50,"isActive":false,"name":"1800 אנייחו", "category":"טקילה"},
{"alcoholPercent":22,"price":185.00,"discountPrice":0,"cost":151.70,"isActive":false,"name":"1800 בלאנקו", "category":"טקילה"},
{"alcoholPercent":20,"price":799.00,"discountPrice":0,"cost":668.30,"isActive":false,"name":"1800 מילניו", "category":"טקילה"},
{"alcoholPercent":20,"price":215.00,"discountPrice":0,"cost":179.10,"isActive":false,"name":"1800 קריסטילינו", "category":"טקילה"},
{"alcoholPercent":21,"price":205.00,"discountPrice":0,"cost":169.00,"isActive":false,"name":"1800 ריפוסדו", "category":"טקילה"},
{"alcoholPercent":30,"price":259.00,"discountPrice":200,"cost":200.00,"isActive":true,"name":"גרן אורנדיאן אניחו", "category":"טקילה"},
{"alcoholPercent":37,"price":1999.00,"discountPrice":1456,"cost":1455.50,"isActive":true,"name":"גרנד מאיין אקסטה אניחו כחול", "category":"טקילה"},
{"alcoholPercent":39,"price":1999.00,"discountPrice":1440,"cost":1440.00,"isActive":true,"name":"גרנד מאיין אקסטרה אניחו 1750 מל", "category":"טקילה"},
{"alcoholPercent":21,"price":729.00,"discountPrice":0,"cost":600.93,"isActive":false,"name":"גרנד מאיין ריפוסדו", "category":"טקילה"},
{"alcoholPercent":13,"price":790.00,"discountPrice":700,"cost":700.00,"isActive":true,"name":"דון חוליו 1942", "category":"טקילה"},
{"alcoholPercent":16,"price":229.00,"discountPrice":0,"cost":197.00,"isActive":false,"name":"פטרון אניחו", "category":"טקילה"},
{"alcoholPercent":16,"price":189.00,"discountPrice":0,"cost":163.10,"isActive":false,"name":"פטרון סילבר", "category":"טקילה"},
{"alcoholPercent":17,"price":135.00,"discountPrice":0,"cost":115.00,"isActive":false,"name":"קווארבו גולד", "category":"טקילה"},
{"alcoholPercent":17,"price":135.00,"discountPrice":0,"cost":115.00,"isActive":false,"name":"קווארבו סילבר", "category":"טקילה"},
{"alcoholPercent":26,"price":135.00,"discountPrice":0,"cost":107.10,"isActive":false,"name":"רוסטו רוחו בלאנקו", "category":"טקילה"},
{"alcoholPercent":24,"price":155.00,"discountPrice":0,"cost":125.00,"isActive":false,"name":"רוסטו רוחו רפסדו", "category":"טקילה"},
{"alcoholPercent":31,"price":99.00,"discountPrice":75,"cost":75.30,"isActive":true,"name":"ארטיזנל - בלנד אדום", "category":"יין"},
{"alcoholPercent":30,"price":208.00,"discountPrice":0,"cost":160.00,"isActive":false,"name":"ארטיזנל - דיזייר", "category":"יין"},
{"alcoholPercent":24,"price":75.00,"discountPrice":0,"cost":60.40,"isActive":false,"name":"ארטיזנל - ויונייה", "category":"יין"},
{"alcoholPercent":26,"price":95.00,"discountPrice":0,"cost":75.30,"isActive":false,"name":"ארטיזנל - מלבק", "category":"יין"},
{"alcoholPercent":30,"price":59.02,"discountPrice":0,"cost":45.40,"isActive":false,"name":"ארטיזנל - שיראז", "category":"יין"},
{"alcoholPercent":24,"price":75.00,"discountPrice":0,"cost":60.40,"isActive":false,"name":"ארטיזנל - שרדונה", "category":"יין"},
{"alcoholPercent":23,"price":49.00,"discountPrice":0,"cost":40.00,"isActive":false,"name":"בלונאן - כשר", "category":"יין"},
{"alcoholPercent":21,"price":55.00,"discountPrice":0,"cost":45.40,"isActive":false,"name":"בלונאן - לבן מבעבע", "category":"יין"},
{"alcoholPercent":21,"price":55.00,"discountPrice":0,"cost":45.40,"isActive":false,"name":"בלונאן - ריזלינג", "category":"יין"},
{"alcoholPercent":21,"price":55.00,"discountPrice":0,"cost":45.40,"isActive":false,"name":"בלונאן - ורוד מבעבע", "category":"יין"},
{"alcoholPercent":23,"price":49.00,"discountPrice":0,"cost":40.00,"isActive":false,"name":"בלונאן גוורץ", "category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":0,"cost":48.00,"isActive":false,"name":"בן דוד - אדר", "category":"יין"},
{"alcoholPercent":31,"price":50.00,"discountPrice":0,"cost":38.30,"isActive":false,"name":"בן דוד - דולמן אדום", "category":"יין"},
{"alcoholPercent":31,"price":50.00,"discountPrice":38,"cost":38.30,"isActive":true,"name":"בן דוד - דולמן לבן", "category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":0,"cost":48.20,"isActive":false,"name":"בן דוד - דליה", "category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":0,"cost":48.20,"isActive":false,"name":"בן דוד - חנה", "category":"יין"},
{"alcoholPercent":31,"price":119.00,"discountPrice":0,"cost":91.00,"isActive":false,"name":"בן דוד - כרם אליה", "category":"יין"},
{"alcoholPercent":48,"price":45.00,"discountPrice":0,"cost":30.50,"isActive":false,"name":"בן דוד - צעיר לבן", "category":"יין"},
{"alcoholPercent":35,"price":65.00,"discountPrice":0,"cost":48.00,"isActive":false,"name":"בן דוד - רחל", "category":"יין"},
{"alcoholPercent":48,"price":45.00,"discountPrice":0,"cost":30.50,"isActive":false,"name":"בן דוד - אדום צעיר", "category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":0,"cost":84.40,"isActive":false,"name":"ברבדו - מרלו", "category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":0,"cost":84.40,"isActive":false,"name":"ברבדו - מרסלן", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":63.80,"isActive":false,"name":"ברבדו - סוביניון בלאן", "category":"יין"},
{"alcoholPercent":42,"price":110.00,"discountPrice":0,"cost":77.50,"isActive":false,"name":"ברבדו - קופז", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":63.80,"isActive":false,"name":"ברבדו - רוזה", "category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":0,"cost":84.40,"isActive":false,"name":"ברבדו - קברנה סוביניון", "category":"יין"},
{"alcoholPercent":36,"price":115.00,"discountPrice":84,"cost":84.40,"isActive":true,"name":"ברבדו - שירז", "category":"יין"},
{"alcoholPercent":36,"price":179.00,"discountPrice":0,"cost":132.00,"isActive":false,"name":"ברבדו - לנדמארק", "category":"יין"},
{"alcoholPercent":40,"price":75.00,"discountPrice":0,"cost":53.50,"isActive":false,"name":"ברבדו - נטע אדום", "category":"יין"},
{"alcoholPercent":40,"price":75.00,"discountPrice":0,"cost":53.50,"isActive":false,"name":"ברבדו - נטע לבן", "category":"יין"},
{"alcoholPercent":40,"price":75.00,"discountPrice":0,"cost":53.50,"isActive":false,"name":"ברבדו - נטע רוזה", "category":"יין"},
{"alcoholPercent":33,"price":99.00,"discountPrice":0,"cost":74.60,"isActive":false,"name":"בת שלמה - ס בלאן", "category":"יין"},
{"alcoholPercent":33,"price":99.00,"discountPrice":0,"cost":74.60,"isActive":false,"name":"בת שלמה - רוזה", "category":"יין"},
{"alcoholPercent":29,"price":179.00,"discountPrice":0,"cost":138.30,"isActive":false,"name":"בת שלמה - בטי קווי", "category":"יין"},
{"alcoholPercent":37,"price":110.00,"discountPrice":0,"cost":80.50,"isActive":false,"name":"בת שלמה - מגנטה", "category":"יין"},
{"alcoholPercent":31,"price":155.00,"discountPrice":0,"cost":118.00,"isActive":false,"name":"בת שלמה - קולאז׳", "category":"יין"},
{"alcoholPercent":32,"price":135.00,"discountPrice":0,"cost":102.00,"isActive":false,"name":"בת שלמה - רגבים", "category":"יין"},
{"alcoholPercent":33,"price":135.00,"discountPrice":0,"cost":101.70,"isActive":false,"name":"בת שלמה - שרדונה", "category":"יין"},
{"alcoholPercent":37,"price":29.00,"discountPrice":21,"cost":21.20,"isActive":true,"name":"ג׳קובזי - אדום", "category":"יין"},
{"alcoholPercent":29,"price":229.00,"discountPrice":0,"cost":177.40,"isActive":false,"name":"גבעות - מצדה", "category":"יין"},
{"alcoholPercent":35,"price":95.00,"discountPrice":0,"cost":70.60,"isActive":false,"name":"גבעות - נווה", "category":"יין"},
{"alcoholPercent":32,"price":159.00,"discountPrice":0,"cost":120.70,"isActive":false,"name":"גבעות - סירה", "category":"יין"},
{"alcoholPercent":33,"price":159.00,"discountPrice":0,"cost":119.40,"isActive":false,"name":"גבעות - קברנה סביניון", "category":"יין"},
{"alcoholPercent":32,"price":159.00,"discountPrice":0,"cost":120.70,"isActive":false,"name":"גבעות - קברנה פרנק", "category":"יין"},
{"alcoholPercent":35,"price":95.00,"discountPrice":0,"cost":70.60,"isActive":false,"name":"גבעות - מחולות בלבן", "category":"יין"},
{"alcoholPercent":37,"price":29.00,"discountPrice":0,"cost":21.20,"isActive":false,"name":"ג׳קובזי - לבן", "category":"יין"},
{"alcoholPercent":27,"price":45.00,"discountPrice":0,"cost":35.30,"isActive":false,"name":"דלתון - כנען אדום", "category":"יין"},
{"alcoholPercent":27,"price":45.00,"discountPrice":0,"cost":35.30,"isActive":false,"name":"דלתון - כנען לבן", "category":"יין"},
{"alcoholPercent":27,"price":45.00,"discountPrice":0,"cost":35.30,"isActive":false,"name":"דלתון - כנען שחור", "category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":0,"cost":61.90,"isActive":false,"name":"דלתון - עלמה אדום", "category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":0,"cost":61.90,"isActive":false,"name":"דלתון - עלמה אדום כהה", "category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":0,"cost":61.90,"isActive":false,"name":"דלתון - עלמה לבן", "category":"יין"},
{"alcoholPercent":28,"price":79.00,"discountPrice":62,"cost":61.90,"isActive":true,"name":"דלתון - עלמה רוזה", "category":"יין"},
{"alcoholPercent":36,"price":95.00,"discountPrice":0,"cost":70.00,"isActive":false,"name":"דלתון - פאט נאט", "category":"יין"},
{"alcoholPercent":30,"price":65.00,"discountPrice":0,"cost":50.00,"isActive":false,"name":"דלתון - פטיט סירה", "category":"יין"},
{"alcoholPercent":32,"price":75.00,"discountPrice":0,"cost":57.00,"isActive":false,"name":"דלתון - פינו גריס", "category":"יין"},
{"alcoholPercent":30,"price":65.00,"discountPrice":50,"cost":50.00,"isActive":true,"name":"דלתון - קברנה סוביניון", "category":"יין"},
{"alcoholPercent":34,"price":89.00,"discountPrice":0,"cost":66.30,"isActive":false,"name":"דרימיה - סהר", "category":"יין"},
{"alcoholPercent":34,"price":89.00,"discountPrice":0,"cost":66.30,"isActive":false,"name":"דרימיה - סוביניון בלאן", "category":"יין"},
{"alcoholPercent":31,"price":115.00,"discountPrice":0,"cost":87.60,"isActive":false,"name":"דרימיה - קברנה סוביניון", "category":"יין"},
{"alcoholPercent":34,"price":89.00,"discountPrice":0,"cost":66.30,"isActive":false,"name":"דרימיה - רוזה", "category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":28,"cost":27.60,"isActive":true,"name":"דרך ארץ - סוביניון בלאן", "category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":0,"cost":27.60,"isActive":false,"name":"דרך ארץ - קברנה סוביניון", "category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":0,"cost":27.60,"isActive":false,"name":"דרך ארץ - שיראז", "category":"יין"},
{"alcoholPercent":41,"price":39.00,"discountPrice":0,"cost":27.60,"isActive":false,"name":"דרך ארץ - שרדונה", "category":"יין"},
{"alcoholPercent":30,"price":299.00,"discountPrice":230,"cost":230.40,"isActive":true,"name":"הר אודם - 1060", "category":"יין"},
{"alcoholPercent":31,"price":255.00,"discountPrice":0,"cost":195.00,"isActive":false,"name":"הר אודם - אלפסי אדום", "category":"יין"},
{"alcoholPercent":30,"price":169.00,"discountPrice":130,"cost":130.10,"isActive":true,"name":"הר אודם - אלפסי לבן", "category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":0,"cost":117.10,"isActive":false,"name":"הר אודם - גמי נואר", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - מרלו ולקני", "category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":0,"cost":117.10,"isActive":false,"name":"הר אודם - נביולו", "category":"יין"},
{"alcoholPercent":32,"price":130.00,"discountPrice":0,"cost":98.20,"isActive":false,"name":"הר אודם - סירה", "category":"יין"},
{"alcoholPercent":29,"price":449.00,"discountPrice":348,"cost":348.40,"isActive":true,"name":"הר אודם - ספיישל אדישן", "category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":0,"cost":117.10,"isActive":false,"name":"הר אודם - ענבר", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - שרדונה וולקני", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - ויונייה ווקלני", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - גמיי נואר וולקני", "category":"יין"},
{"alcoholPercent":31,"price":70.00,"discountPrice":0,"cost":53.40,"isActive":false,"name":"הר אודם - יער אודם", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - קברנה סוביניון ולקני", "category":"יין"},
{"alcoholPercent":32,"price":155.00,"discountPrice":0,"cost":117.10,"isActive":false,"name":"הר אודם - קברנה פראנק", "category":"יין"},
{"alcoholPercent":33,"price":85.00,"discountPrice":0,"cost":64.00,"isActive":false,"name":"הר אודם - ריזלינג ולקני", "category":"יין"},
{"alcoholPercent":52,"price":55.00,"discountPrice":0,"cost":36.10,"isActive":false,"name":"הרי הגליל - אביב אדום", "category":"יין"},
{"alcoholPercent":52,"price":55.00,"discountPrice":0,"cost":36.10,"isActive":false,"name":"הרי הגליל - אביב רוזה", "category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":0,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל אלה", "category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":0,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל אלון", "category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":0,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל אלון לבן", "category":"יין"},
{"alcoholPercent":43,"price":65.00,"discountPrice":0,"cost":45.60,"isActive":false,"name":"הרי הגליל - גליל סירה", "category":"יין"},
{"alcoholPercent":39,"price":145.00,"discountPrice":0,"cost":104.30,"isActive":false,"name":"הרי הגליל - יראון אדום", "category":"יין"},
{"alcoholPercent":37,"price":95.00,"discountPrice":0,"cost":69.30,"isActive":false,"name":"הרי הגליל - יראון סביניון בלאן", "category":"יין"},
{"alcoholPercent":29,"price":135.00,"discountPrice":0,"cost":104.30,"isActive":false,"name":"הרי הגליל - יראון סירה", "category":"יין"},
{"alcoholPercent":30,"price":85.00,"discountPrice":0,"cost":65.50,"isActive":false,"name":"הרי הגליל - יראון רוזה", "category":"יין"},
{"alcoholPercent":30,"price":85.00,"discountPrice":0,"cost":65.50,"isActive":false,"name":"הרי הגליל - יראון שרדונה", "category":"יין"},
{"alcoholPercent":36,"price":49.00,"discountPrice":0,"cost":36.10,"isActive":false,"name":"הרי הגליל - סתיו לבן", "category":"יין"},
{"alcoholPercent":31,"price":75.00,"discountPrice":0,"cost":57.40,"isActive":false,"name":"וילה אנטינורי - טוסקנה", "category":"יין"},
{"alcoholPercent":32,"price":85.00,"discountPrice":0,"cost":64.40,"isActive":false,"name":"וילה אנטינורי - סאן דיווני", "category":"יין"},
{"alcoholPercent":32,"price":105.00,"discountPrice":0,"cost":79.80,"isActive":false,"name":"וילה אנטינורי - קלאסיקו", "category":"יין"},
{"alcoholPercent":36,"price":59.00,"discountPrice":0,"cost":43.40,"isActive":false,"name":"וילה וולף", "category":"יין"},
{"alcoholPercent":31,"price":85.00,"discountPrice":0,"cost":65.00,"isActive":false,"name":"ויתקין - מסע ישראלי לבן", "category":"יין"},
{"alcoholPercent":31,"price":85.00,"discountPrice":0,"cost":65.00,"isActive":false,"name":"ויתקין - מסע ישראלי רוזה", "category":"יין"},
{"alcoholPercent":31,"price":99.00,"discountPrice":0,"cost":75.80,"isActive":false,"name":"ויתקין - גוורץ", "category":"יין"},
{"alcoholPercent":31,"price":149.00,"discountPrice":0,"cost":113.58,"isActive":false,"name":"ויתקין - גרנאש בלאן", "category":"יין"},
{"alcoholPercent":31,"price":149.00,"discountPrice":0,"cost":113.60,"isActive":false,"name":"ויתקין - גרנאש נואר", "category":"יין"},
{"alcoholPercent":32,"price":135.00,"discountPrice":0,"cost":102.20,"isActive":false,"name":"ויתקין - פטיט סירה", "category":"יין"},
{"alcoholPercent":32,"price":125.00,"discountPrice":0,"cost":94.70,"isActive":false,"name":"ויתקין - קברנה פרנק", "category":"יין"},
{"alcoholPercent":31,"price":109.00,"discountPrice":0,"cost":83.30,"isActive":false,"name":"ויתקין - קריניאן", "category":"יין"},
{"alcoholPercent":31,"price":115.00,"discountPrice":0,"cost":88.00,"isActive":false,"name":"ויתקין - ריזלינג", "category":"יין"},
{"alcoholPercent":29,"price":439.00,"discountPrice":340,"cost":340.00,"isActive":true,"name":"ויתקין - שורשים אדום", "category":"יין"},
{"alcoholPercent":26,"price":259.00,"discountPrice":205,"cost":205.00,"isActive":true,"name":"ויתקין - שורשים לבן", "category":"יין"},
{"alcoholPercent":40,"price":119.00,"discountPrice":0,"cost":85.26,"isActive":false,"name":"יתיר - חלוץ שנין רוסאן", "category":"יין"},
{"alcoholPercent":30,"price":79.00,"discountPrice":0,"cost":60.90,"isActive":false,"name":"טוליפ - אספרו אדום", "category":"יין"},
{"alcoholPercent":30,"price":79.00,"discountPrice":0,"cost":60.90,"isActive":false,"name":"טוליפ - אספרו לבן", "category":"יין"},
{"alcoholPercent":34,"price":69.00,"discountPrice":52,"cost":51.50,"isActive":true,"name":"טוליפ - לבן", "category":"יין"},
{"alcoholPercent":32,"price":119.00,"discountPrice":90,"cost":90.00,"isActive":true,"name":"טוליפ - סירה", "category":"יין"},
{"alcoholPercent":34,"price":69.00,"discountPrice":0,"cost":51.50,"isActive":false,"name":"טוליפ - ק סוביניון", "category":"יין"},
{"alcoholPercent":34,"price":69.00,"discountPrice":0,"cost":51.50,"isActive":false,"name":"טוליפ - רוזה", "category":"יין"},
{"alcoholPercent":29,"price":69.00,"discountPrice":0,"cost":53.50,"isActive":false,"name":"טוליפ - מאיה אדום", "category":"יין"},
{"alcoholPercent":29,"price":69.00,"discountPrice":0,"cost":53.50,"isActive":false,"name":"טוליפ - מאיה לבן", "category":"יין"},
{"alcoholPercent":29,"price":69.00,"discountPrice":0,"cost":53.50,"isActive":false,"name":"טוליפ - מאיה רוזה", "category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":0,"cost":36.30,"isActive":false,"name":"טיאמו - פינו גריזו", "category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":0,"cost":36.30,"isActive":false,"name":"טיאמו - פרימיטיבו", "category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":0,"cost":36.30,"isActive":false,"name":"טיאמו - רוזה", "category":"יין"},
{"alcoholPercent":38,"price":50.00,"discountPrice":0,"cost":36.30,"isActive":false,"name":"טיאמו - שרדונה", "category":"יין"},
{"alcoholPercent":32,"price":79.00,"discountPrice":0,"cost":60.00,"isActive":false,"name":"יין - שפו מלון", "category":"יין"},
{"alcoholPercent":30,"price":199.00,"discountPrice":0,"cost":152.70,"isActive":false,"name":"יתיר - בצל העלוה", "category":"יין"},
{"alcoholPercent":34,"price":79.00,"discountPrice":0,"cost":58.80,"isActive":false,"name":"יתיר - דרום לבן", "category":"יין"},
{"alcoholPercent":34,"price":79.00,"discountPrice":0,"cost":58.80,"isActive":false,"name":"יתיר - דרום אדום", "category":"יין"},
{"alcoholPercent":34,"price":79.00,"discountPrice":0,"cost":58.80,"isActive":false,"name":"יתיר - דרום רוזה", "category":"יין"},
{"alcoholPercent":37,"price":105.00,"discountPrice":0,"cost":76.70,"isActive":false,"name":"יתיר - הר עמשא אדום", "category":"יין"},
{"alcoholPercent":37,"price":105.00,"discountPrice":0,"cost":76.70,"isActive":false,"name":"יתיר - הר עמשא לבן", "category":"יין"},
{"alcoholPercent":37,"price":105.00,"discountPrice":0,"cost":76.70,"isActive":false,"name":"יתיר - הר עמשא רוזה", "category":"יין"}
];

// ============================================================
// PRODUCT FUNCTIONS
// ============================================================

/**
 * Returns product array from localStorage (admin edits) or embedded fallback.
 */
function getProducts() {
  try {
    const stored = localStorage.getItem('ginoProducts');
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return EMBEDDED_PRODUCTS.slice();
}

/**
 * Saves product array to localStorage.
 * @param {Array} arr
 */
function saveProducts(arr) {
  localStorage.setItem('ginoProducts', JSON.stringify(arr));
}

// ============================================================
// CART FUNCTIONS
// ============================================================

/**
 * Returns current cart from localStorage.
 * Cart item shape: { name, category, price, discountPrice, qty }
 */
function getCart() {
  try {
    const stored = localStorage.getItem('ginoCart');
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return [];
}

/**
 * Saves cart array to localStorage.
 * @param {Array} arr
 */
function saveCart(arr) {
  localStorage.setItem('ginoCart', JSON.stringify(arr));
}

/**
 * Adds a product to the cart (or increments quantity).
 * @param {Object} product - product object from getProducts()
 * @param {number} qty - quantity to add (default 1)
 */

function addToCart(nameOrObject, price, image) {
    let cart = getCart();
    let finalName = '';
    let finalPrice = 0;
    let finalImage = image || '';

    // אם זה אובייקט מוצר
    if (typeof nameOrObject === 'object' && nameOrObject !== null) {
        finalName = nameOrObject.name || 'מוצר';
        
        finalPrice = (nameOrObject.discountPrice && nameOrObject.discountPrice > 0)
            ? Number(nameOrObject.discountPrice)
            : Number(nameOrObject.price);

        finalImage = nameOrObject.image || image || '';
    } else {
        // אם זה פרמטרים רגילים
        finalName = nameOrObject || 'מוצר';
        finalPrice = Number(price);
    }

    // הגנה שלא יצא NaN
    if (!finalPrice || isNaN(finalPrice)) {
        finalPrice = 0;
    }

    const existingItem = cart.find(item => item.name === finalName);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ 
            name: finalName,
            price: finalPrice,
            qty: 1,
            image: finalImage
        });
    }
    
    localStorage.setItem('ginoCart', JSON.stringify(cart));
    updateCartCountUI();
    
    const popup = document.getElementById('cart-popup');
    if (popup) {
        popup.classList.add('active');
        setTimeout(() => popup.classList.remove('active'), 3000);
    }
}

/**
 * Removes an item from the cart by product name.
 * @param {string} name
 */
function removeFromCart(name) {
  let cart = getCart().filter(item => item.name !== name);
    saveCart(cart);
  updateCartCountUI();
}

/**
 * Clears the entire cart.
 */
function clearCart() {
  saveCart([]);
    updateCartCountUI();
}

/**
 * Updates the cart count badge in the UI (if element exists).
 */
function updateCartCountUI() {
  const el = document.getElementById('cart-count');
  if (el) {
    const cart = getCart();
    const total = cart.reduce((s, i) => s + i.qty, 0);
    el.textContent = total;
}
}

// ============================================================
// SETTINGS FUNCTIONS
// ============================================================

const DEFAULT_SETTINGS = {
  whatsapp: '9720536210899',
  email: 'MAIN@byspace.org',
  deliveryEmail: 'MAIN@byspace.org',
  deliveryWhatsapp: '',
  deliveryPrice: 30,
  storeName: 'GINO VINO'
};

function getSettings() {
  try {
    const stored = localStorage.getItem('ginoSettings');
    if (stored) return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(stored));
  } catch (e) {}
  return Object.assign({}, DEFAULT_SETTINGS);
}

function saveSettings(obj) {
  localStorage.setItem('ginoSettings', JSON.stringify(obj));
}

// ============================================================
// ORDERS FUNCTIONS
// ============================================================

function getOrders() {
  try {
    const stored = localStorage.getItem('ginoOrders');
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return [];
}

function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  // Keep last 100 orders
  localStorage.setItem('ginoOrders', JSON.stringify(orders.slice(0, 100)));
}

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', updateCartCountUI);


// products.js - ניהול עגלת הקניות

// פונקציה לקבלת העגלה מהזיכרון
function getCart() {
    try {
        const cart = localStorage.getItem('ginoCart');
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        return [];
    }
}

// פונקציית הוספה לסל - תואמת למה שקורה ב-index ובקטלוג
function addToCart(nameOrObject, price, image) {
    let cart = getCart();

    let finalName = '';
    let finalPrice = 0;
    let finalImage = image || '';

    // אם זה מוצר מלא
    if (typeof nameOrObject === 'object' && nameOrObject !== null) {
        finalName = nameOrObject.name?.name || nameOrObject.name || 'מוצר';

        finalPrice = Number(
            nameOrObject.discountPrice > 0
                ? nameOrObject.discountPrice
                : nameOrObject.price
        );

        finalImage = nameOrObject.image || '';
    } else {
        finalName = nameOrObject;
        finalPrice = Number(price);
    }

    if (isNaN(finalPrice)) finalPrice = 0;

    const existingItem = cart.find(item => item.name === finalName);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name: finalName,
            price: finalPrice,
            qty: 1,
            image: finalImage
        });
    }

    localStorage.setItem('ginoCart', JSON.stringify(cart));
    updateCartCountUI();
}

// הפעלה ראשונית של המונה
document.addEventListener('DOMContentLoaded', updateCartCountUI);





// פונקציה לקבלת קופונים
function getCoupons() {
    const coupons = localStorage.getItem('ginoCoupons');
    return coupons ? JSON.parse(coupons) : [];
}

// שמירת קופון חדש (לשימוש בדף ניהול)
function saveCoupon(code, discountPercent) {
    let coupons = getCoupons();
    coupons.push({ code: code.toUpperCase(), discount: parseFloat(discountPercent) });
    localStorage.setItem('ginoCoupons', JSON.stringify(coupons));
}

// בדיקה אם קופון קיים ומחזירה את אחוז ההנחה
function validateCoupon(code) {
    const coupons = getCoupons();
    const found = coupons.find(c => c.code === code.toUpperCase());
    return found ? found.discount : 0;
}