//Sorularımız (resimli, sesli, videolu) 10 tane ve bazıları 4 şıktan oluşuyor bazıları da 2 şıktan.
// Şık miktarında tekrar değişiklikler yapılabilir
var sorular = [
  {
    Soru: "Dinlemiş olduğunuz türküyü kim söylemektedir?",
    soundURL:"sound/queen.mp3",
    cevaplar: [
      { cevap: "Aşık Veysel", value: true },
      { cevap: "Neşet Ertaş", value: false },
      { cevap: "Ozan Arif", value: false }
    ]
  },
  {
    Soru: "Görüntüdeki basketbolcu kimdir?",
    videoURL:"sound/kafkas.mp4",
    cevaplar: [
      { cevap: "Bryant Johnson", value: false },
      { cevap: "Michael Jordan", value: false },
      { cevap: "Kobe Bryant", value: true },
      { cevap: "Lebron James", value: false }
    ]
  },
  {
    Soru: "Türkiye Milli Futbol Takımı 2002 Dünya Kupasında yarı final oynamıştır.",
    cevaplar: [
      { cevap: "DOĞRU", value: true },
      { cevap: "YANLIŞ", value: false },

    ]
  },
  {
    Soru: "Görüntüdeki Galatasaraylı efsane futbolcu kimdir?",
    imageURL:"img/gs.jpg",
    cevaplar: [
      { cevap: "Ali Sami YEN", value: false },
      { cevap: "Metin OKTAY", value: true },
      { cevap: "Fatih TERİM", value: false },
      { cevap: "Georghe HAGI", value: false }
    ]
  },
  {
    Soru: "Aşağıdakilerden hangisi bir programlama dili değildir?",
    cevaplar: [
      { cevap: "PYTHON", value: false },
      { cevap: "JAVA", value: false },
      { cevap: "PHP", value: false },
      { cevap: "JAVASCRIPT", value: false },
      { cevap: "Hiçbiri", value: true }
    ]
  }
];

var sayac = 0;
var clock;
var timer = 10;
var dogrCvp = 0;
var yanlisCvp = 0;

$(document).ready(function() {

  $('.cevaplar').css('visibility', 'hidden');
  $('body').on('click', '.start-btn', function(event) {
    event.preventDefault();
    soruGetir();
    $('.cevaplar').css('visibility', 'visible');
  });

  $('body').on('click', '.cevap', function(event) {
    
    secilen = $(this).data('id');
    var cevaplar = sorular[sayac].cevaplar;

    // Bu kısımda verdiğimiz cevap yanlış olduğu zaman hangi cevap doğru ise onun yeşil olması sağladı.
    var cevap = $('.cevap');
    clearInterval(clock);

    if(cevaplar[secilen].value) {
      var right = $(this).attr('class', 'sag-cevap cevap');
      dogruCevap();
    } 
    else {
      $(this).attr('class', 'yanlis-cevap cevap');
      yanlisCevap();
    } 
  });

  $('body').on('click', '.reset-button', function(event) {
    event.preventDefault();
    oyunYenile();
  });
});

//Doğru verilen cevaplar için
function dogruCevap() {
  dogrCvp++;
  $('.time').html(timer);
  setTimeout(soruSay, 1500);
}

//Yanlış cevaplar için
function yanlisCevap() {
  yanlisCvp++;
  $('.time').html(timer);
  dogruGoster();
  setTimeout(soruSay, 1500);
}

function dogruGoster() {
  var cevaplar = sorular[sayac].cevaplar;
  var cevap = $('.cevaplar');
  for (var i = 0; i<cevaplar.length; i++) {
    if(cevaplar[i].value==true){
      console.log(cevap.children());
      cevap.children().eq(i).addClass('sag-cevap');
    }
  }
}

//Oyun başladığında
function soruGetir() {
  $('.baslangic').css('display', 'none');
  $('.gizle').css('display', 'block');
  $('.soru-satır').css('visibility', 'visible');
  $('.timer').html('<p>Kronometre : <span class="time">10</span></p>');

  let simdikiSoru = sorular[sayac];
  $('.soru').html('');

  //bu kısımda sorulara resim ekleyebilmemiz sağlandı
  if(simdikiSoru.hasOwnProperty('imageURL')){
    $('.soru').append('<img class="goruntu" src="'+simdikiSoru.imageURL+'"/>');
  }

  //bu kısımda sorulara ses ekleyebilmemiz sağlandı
  if(simdikiSoru.hasOwnProperty('soundURL')){
    $('.soru').append('<audio controls autoplay><source src="'+simdikiSoru.soundURL+'" type="audio/mpeg"></audio>');
  }

  //bu kısımda sorulara video ekleyebilmemiz sağland
  if(simdikiSoru.hasOwnProperty('videoURL')){
    $('.soru').append('<video class="goruntu" controls autoplay><source src="'+simdikiSoru.videoURL+'" type="audio/mpeg"></video>');
  }

  $('.soru').append('<p style="margin-top: 40px;">Soru '+(sayac+1)+' : '+simdikiSoru.Soru+'</p>');

  $('.cevaplar').html('');
  for(let i=0; i<sorular[sayac].cevaplar.length; i++){
     $('.cevaplar').append('<p class="cevap" data-id="'+i+'">'+sorular[sayac].cevaplar[i].cevap+'</p>');
  }

  kronometre();
}

//soru sayısı miktarı için
function soruSay() {
  if (sayac < 4) {
    sayac++;

    $('.sag').html('<p>Puan : ' + dogrCvp +'/' + (sayac+1) +'</p>');

    soruGetir();
    timer = 10;
    kronometre();
  } else {
    oyunSonu();
  }
}

function kronometre() {
  clearInterval(clock);
  clock = setInterval(seconds, 1000);
  function seconds() {
    if (timer === 0) {
      clearInterval(clock);
      yanlisCevap();
    } else if (timer > 0) {
      timer--;
    }
    $('.time').html(timer);
  }
}

//Oyun sonlandığı zaman ekranda yazacak 
function oyunSonu() {
  var son = $('.main')
  .html("<br><br><p>SORULAR BİTTİ..!</p><br><br>")
  .append('<p>Toplam Doğru Sayısı : ' + dogrCvp + '</p>')
  .append('<p>Toplam Yanlış Sayısı : ' + yanlisCvp + '</p>')
  .append('<p>Puanınız : ' + dogrCvp +'/' + (dogrCvp+yanlisCvp) +'</p>');

  $(son).attr('<div>');
  $(son).attr('class', 'son');
  $('.son').append('<button class="btn btn-primary btn-lg reset-button"  onclick="location.href=\'index.html\';">YENİDEN BAŞLAYIN</button>');
  $('.gizle').css('display', 'none');

}
//oyun sıfırlandı
function oyunYenile() {
  sayac = 0;
  dogrCvp = 0;
  yanlisCvp = 0;
  timer = 10;

  soruGetir();
}
