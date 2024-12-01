var tombolMenu = document.getElementsByClassName('tombol-menu')[0];
var menu = document.getElementsByClassName('menu')[0];

tombolMenu.onclick = function() {
    menu.classList.toggle('active');
}

menu.onclick = function() {
    menu.classList.toggle('active');
}


var sliderContainer = document.querySelector('.slider-container');
var cards = sliderContainer.getElementsByClassName('card');
var index = 0;

// Fungsi untuk menampilkan kartu berdasarkan indeks
function showCard() {
    // Mengatur transformasi untuk menggeser slider
    sliderContainer.style.transform = 'translateX(' + (-index * 100) + '%)';
}

// Fungsi untuk menggeser ke kartu berikutnya
function nextCard() {
    index++;
    if (index >= cards.length) {
        index = 0; // Kembali ke kartu pertama
    }
    showCard();
}

// Fungsi untuk menggeser ke kartu sebelumnya
function prevCard() {
    index--;
    if (index < 0) {
        index = cards.length - 1; // Kembali ke kartu terakhir
    }
    showCard();
}

// Menampilkan kartu pertama
showCard();