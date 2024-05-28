import { doFetch } from '../utils/doFetch.mjs';
import { API_USER_URL } from '../utils/constants.mjs';
import { displayCarousel } from '../utils/carousel.mjs';
import { showLoader, hideLoader } from '../utils/loader.mjs';
import { displayErrorMessage } from '../utils/errorMessage.mjs';

const postsPerPage = 12;
let totalDisplayedPosts = 12;

async function renderHomePage(totalPosts = totalDisplayedPosts) {
    showLoader();
    try {
        const blogPosts = await doFetch('GET', API_USER_URL);
        displayCarousel(blogPosts);
        displayBlogCards(blogPosts, totalPosts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        displayErrorMessage("Uh-oh! Seems like fetching blog posts hit a snag. Try again later when our digital fetcher is feeling less ruff!")
    } finally {
        hideLoader();
    }
}

const viewAllBtn = document.getElementById('filter-all');
const adventureBtn = document.getElementById('filter-adventure');
const fashionBtn = document.getElementById('filter-fashion');
const tipsBtn = document.getElementById('filter-tips');

let chosenTag = '';

viewAllBtn.addEventListener('click', () => {
    chosenTag = '';
    totalDisplayedPosts = postsPerPage;
    renderHomePage();
});

adventureBtn.addEventListener('click', () => {
    chosenTag = 'adventure';
    totalDisplayedPosts = postsPerPage;
    renderHomePage();
});

fashionBtn.addEventListener('click', () => {
    chosenTag = 'fashion';
    totalDisplayedPosts = postsPerPage;
    renderHomePage();
});

tipsBtn.addEventListener('click', () => {
    chosenTag = 'tips';
    totalDisplayedPosts = postsPerPage;
    renderHomePage();
});

async function displayBlogCards(blogPosts, totalDisplayedPosts) {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = '';

    const filteredPosts = chosenTag ? blogPosts.filter(post => post.tags.includes(chosenTag)) : blogPosts;
    const paginatedPosts = filteredPosts.slice(0, totalDisplayedPosts);

    paginatedPosts.forEach(item => {
        const blogCard = generateBlogCard(item);
        displayContainer.appendChild(blogCard);
    });

    const showMoreBtn = document.getElementById('show-more');
    const showLessBtn = document.getElementById('show-less');

    if (totalDisplayedPosts >= filteredPosts.length) {
        showMoreBtn.style.display = 'none';
    } else {
        showMoreBtn.style.display = 'block';
    }

    if (totalDisplayedPosts > postsPerPage) {
        showLessBtn.style.display = 'block';
    } else {
        showLessBtn.style.display = 'none';
    }
}

document.getElementById('show-more').addEventListener('click', () => {
    totalDisplayedPosts += postsPerPage;
    renderHomePage(totalDisplayedPosts);
});

document.getElementById('show-less').addEventListener('click', () => {
    totalDisplayedPosts = postsPerPage;
    renderHomePage(totalDisplayedPosts);
});

export function generateBlogCard(blogPost) {
    const blogCardWrapper = document.createElement('div');
    blogCardWrapper.classList.add('blogcard-wrapper');

    const blogCardContainer = document.createElement('div');
    blogCardContainer.classList.add('blogcard-container');

    const blogCardImg = document.createElement('img');
    blogCardImg.src = blogPost.media.url;
    blogCardImg.alt = blogPost.media.alt;
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

    const createdDate = new Date(blogPost.created);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = createdDate.toLocaleDateString('en-GB', options);
    const date = document.createElement('p');
    date.textContent = `Posted on ${formattedDate} by ${blogPost.author.name}`;

    blogcardInfo.append(heading, date);
    blogCardLink.append(blogCardImg, blogcardInfo);
    blogCardContainer.append(blogCardLink);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.data.accessToken) {
        const editButton = document.createElement('button');
        const editIcon = document.createElement('i');
        editIcon.classList.add('fa-solid', 'fa-pencil');
        editButton.appendChild(editIcon);
        editButton.innerHTML += ' Edit'; 
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            window.location.href = `./post/edit.html?id=${blogPost.id}`;
        });
        blogCardContainer.appendChild(editButton);
    }

    blogCardWrapper.appendChild(blogCardContainer);
    return blogCardWrapper;
}

renderHomePage();
