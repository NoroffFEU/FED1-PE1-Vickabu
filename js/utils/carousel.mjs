import { doFetch } from "../utils/doFetch.mjs";
import { API_USER_URL } from "../utils/constants.mjs";

async function fetchBlogPosts() {
    const blogPosts = await doFetch('GET', API_USER_URL);
    displayCarousel(blogPosts);
}

export function displayCarousel(blogPosts) {
    const carouselContainer = document.getElementById('carousel-slides');
    carouselContainer.innerHTML = '';

    const sortedPosts = blogPosts.sort((a, b) => new Date(b.created) - new Date(a.created));
    const latestPosts = sortedPosts.slice(0, 3);

    latestPosts.forEach(post => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');

        const img = document.createElement('img');
        img.src = post.media.url;
        img.alt = post.media.alt;

        const infoFrame = document.createElement('div');
        infoFrame.classList.add('info-frame');

        const title = document.createElement('h3');
        title.textContent = post.title;

        const readMoreBtn = document.createElement('button');
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.addEventListener('click', () => {
            window.location.href = `./post/index.html?id=${post.id}`;
        });

        infoFrame.appendChild(title);
        infoFrame.appendChild(readMoreBtn);
        slide.appendChild(img);
        slide.appendChild(infoFrame);
        carouselContainer.appendChild(slide);
    });

    initializeCarousel(latestPosts.length);
}

function initializeCarousel(slideCount) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlides();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlides();
    });

    updateSlides();
}

fetchBlogPosts();

fetchBlogPosts();