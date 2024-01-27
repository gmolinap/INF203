let slides = [];
let slideIndex = 0;
let timer;
let isPaused = false;

function loadSlides() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'slides.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            slides = JSON.parse(xhr.responseText).slides;
        } else {
            console.error('Error loading slides');
        }
    };
    xhr.send();
}

function playSlideshow() {
    clearTimeout(timer);
    slideIndex = 0;
    isPaused = false;
    displaySlide();
}

function displaySlide() {
    if (slideIndex < slides.length && !isPaused) {
        const slide = slides[slideIndex];
        document.getElementById('container').innerHTML = slide.url ? '<iframe src="' + slide.url + '"></iframe>' : '';
        slideIndex++;
        timer = setTimeout(displaySlide, (slides[slideIndex] ? slides[slideIndex].time : 12) * 1000 - slide.time * 1000);
    }
}

function pauseContinue() {
    isPaused = !isPaused;
    if (!isPaused && slideIndex < slides.length) {
        displaySlide();
    }
}

function nextSlide() {
    clearTimeout(timer);
    if (slideIndex < slides.length) {
        displaySlide();
    }
}

function previousSlide() {
    clearTimeout(timer);
    if (slideIndex > 1) {
        slideIndex -= 2;
        displaySlide();
    }
}

document.addEventListener('DOMContentLoaded', loadSlides);
