let currentIndex = 0;
const photoItems = document.querySelectorAll('.photo-item');
const dotsContainer = document.querySelector('.slider-dots');
const photoSliderWrapper = document.querySelector('.photo-slider-wrapper');
const backgroundOverlay = document.querySelector('.background-overlay');

function showSlide(index) {
    // Menentukan index yang valid
    if (index >= photoItems.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = photoItems.length - 1;
    } else {
        currentIndex = index;
    }

    // Mengubah posisi slider
    photoSliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Mengubah latar belakang overlay dengan gambar slider yang ditampilkan
    const imgSrc = photoItems[currentIndex].querySelector('img').src;
    backgroundOverlay.style.backgroundImage = `url(${imgSrc})`;

    // Memastikan gambar latar belakang overlay menutupi elemen dengan benar
    backgroundOverlay.style.backgroundSize = 'cover';
    backgroundOverlay.style.backgroundPosition = 'center';

    // Update dots
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function handleSwipe() {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Gerakan horizontal lebih besar dari gerakan vertikal
        if (deltaX > 0) {
            showSlide(currentIndex - 1); // Swipe kiri
        } else {
            showSlide(currentIndex + 1); // Swipe kanan
        }
    }
}

function createDots() {
    photoItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });
    updateDots();
}

function updateBackgroundOverlay() {
    const imgSrc = photoItems[currentIndex].querySelector('img').src;
    backgroundOverlay.style.backgroundImage = `url(${imgSrc})`;
}

let startX, startY, endX, endY;
const sliderWrapper = document.querySelector('.photo-slider');

sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

sliderWrapper.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    handleSwipe();
});

window.addEventListener('scroll', () => {
    updateBackgroundOverlay();
});

document.addEventListener('DOMContentLoaded', () => {
    createDots();
    showSlide(currentIndex);
    updateBackgroundOverlay(); // Set initial background overlay
});
