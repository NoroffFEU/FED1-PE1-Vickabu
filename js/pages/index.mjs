import { doFetch } from '../utils/doFetch.mjs';
import {API_USER_URL} from '../utils/constants.mjs'
import { displayCarousel } from '../utils/carousel.mjs';

async function renderHomePage() {
    const blogPosts = await doFetch('GET', API_USER_URL);
    console.log(blogPosts);

    displayCarousel(blogPosts);
    displayBlogCards(blogPosts);
}

const viewAllBtn = document.getElementById('filter-all');
const adventureBtn = document.getElementById('filter-adventure');
const fashionBtn = document.getElementById('filter-fashion');
const tipsBtn = document.getElementById('filter-tips');

let chosenTag = '';

viewAllBtn.addEventListener('click', () => {
    chosenTag = '';
    renderHomePage();
});

adventureBtn.addEventListener('click', () => {
    chosenTag = 'adventure';
    renderHomePage();
});

fashionBtn.addEventListener('click', () => {
    chosenTag = 'fashion';
    renderHomePage();
});

tipsBtn.addEventListener('click', () => {
    chosenTag = 'tips';
    renderHomePage();
});

async function displayBlogCards(blogPosts) {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = ''; 

    const filteredPosts = chosenTag ? blogPosts.filter(post => post.tags.includes(chosenTag)) : blogPosts;
    console.log('filteredPosts', filteredPosts);
    filteredPosts.forEach(item => {
        const blogCard = generateBlogCard(item);
        displayContainer.appendChild(blogCard);
    });
}

export function generateBlogCard(blogPost) {
    const blogCardWrapper = document.createElement('div');
    blogCardWrapper.classList.add('blogcard-wrapper');

    const blogCardContainer = document.createElement('div');
    blogCardContainer.classList.add('blogcard-container');

    const blogCardImg = document.createElement('img');
    blogCardImg.src = blogPost.media.url;
    blogCardImg.classList.add('blogcard-image');

    blogCardImg.addEventListener('click', () => {
        localStorage.setItem('blogPostId', blogPost.id);
    });

    const blogcardInfo = document.createElement('div');
    blogcardInfo.classList.add('blogcard-info');

    const blogCardLink = document.createElement('a');
    blogCardLink.href = `./post/index.html?id=${blogPost.id}/`;

    const heading = document.createElement('h3');
    heading.textContent = blogPost.title;

    const authorName = document.createElement('p');
    authorName.textContent = `Author: ${blogPost.author.name}`;

    const createdDate = new Date(blogPost.created);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = createdDate.toLocaleDateString('en-GB', options);
    const date = document.createElement('p');
    date.textContent = `Published: ${formattedDate}`;

    const readMoreBtn = document.createElement('button');
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.addEventListener('click', () => {
        window.location.href = `./post/index.html?id=${blogPost.id}/`;
    });

    blogcardInfo.append(heading, authorName, date, readMoreBtn);
    blogCardLink.append(blogCardImg);
    blogCardContainer.append(blogCardLink, blogcardInfo);
    blogCardWrapper.appendChild(blogCardContainer);
    return blogCardWrapper;
}

renderHomePage();

