let nextBtn = document.getElementById('next-btn');
let prevBtn = document.getElementById('previous-btn');

let sliderImages = document.getElementsByClassName('slider-image');
let currentSliderImage = 0;

function updateShownImage(shownImageIndex) {
    for (let i = 0; i < sliderImages.length; i++) {
        let image = sliderImages[i];
        if (i === shownImageIndex) {
            image.style.display = 'block';
        } else {
            image.style.display = 'none';
        }
    }
}

nextBtn.addEventListener('click', () => {
    currentSliderImage++;
    if (currentSliderImage === sliderImages.length) {
        currentSliderImage = 0;
    }
    updateShownImage(currentSliderImage);
});

prevBtn.addEventListener('click', () => {
    currentSliderImage--;
    if (currentSliderImage < 0) {
        currentSliderImage = sliderImages.length - 1;
    }
    updateShownImage(currentSliderImage);
});