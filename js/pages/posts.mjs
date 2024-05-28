import { API_USER_URL } from "../utils/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";
import { displayErrorMessage } from "../utils/errorMessage.mjs";
import { showLoader, hideLoader } from "../utils/loader.mjs";

let allBlogPosts = [];
let currentPostIndex = null;

async function getAllBlogPosts() {
    showLoader(); 
    try {
        const response = await doFetch('GET', API_USER_URL);
        allBlogPosts = response;
    } catch (error) {
        console.error("Error fetching all blog posts:", error);
    } finally {
        hideLoader(); 
    }
}

async function getBlogPostId() {
    showLoader(); 
    try {
        const id = new URLSearchParams(window.location.search).get('id');
        const response = await doFetch('GET', `${API_USER_URL}/${id}`);
        await getAllBlogPosts();
        currentPostIndex = allBlogPosts.findIndex(post => post.id === response.id);
        generateBlogCard(response);
        updateNavigationButtons();
    } catch (error) {
        console.error("Error fetching blog post by ID:", error);
        displayErrorMessage("Looks like there's a hiccup in fetching that blog post! Time to send our digital detectives on the case.🕵️‍♂️")
    } finally {
        hideLoader(); 
    }
}

function generateBlogCard(blogPost) {
    const blogPostContainer = document.getElementById('blogpost-container');
    blogPostContainer.innerHTML = ''; 

    const blogCardImg = document.createElement('img');
    blogCardImg.src = blogPost.media.url;
    blogCardImg.classList.add('blogcard-image');

    const publishInfo = document.createElement('div');
    publishInfo.classList.add('publish-info');

    const createdDate = new Date(blogPost.created);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = createdDate.toLocaleDateString('en-GB', options);
    const date = document.createElement('p');
    date.classList.add('posted-by-date')
    date.textContent = `By ${blogPost.author.name} | Posted on ${formattedDate}`;

    const avatarImg = document.createElement('img');
    avatarImg.src = blogPost.author.avatar.url;
    avatarImg.classList.add('avatar-image');

    const heading = document.createElement('h1');
    heading.textContent = blogPost.title;

    const content = document.createElement('p');
    content.innerHTML = blogPost.body;

    publishInfo.append(avatarImg, date);
    blogPostContainer.append(heading, publishInfo, blogCardImg, content);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.data.accessToken) {
        const adminBtnsContainer = document.createElement('div');
        adminBtnsContainer.classList.add('admin-btns');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            window.location.href = `./edit.html?id=${blogPost.id}`;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', async () => {
            const confirmDelete = confirm('Are you sure you want to delete this post?');
            if (confirmDelete) {
                showLoader(); 
                try {
                    await doFetch('DELETE', `${API_USER_URL}/${blogPost.id}`);
                    alert('Post deleted successfully');
                    window.location.href = '../index.html';
                } catch (error) {
                    console.error('Error deleting post:', error);
                    alert('Whoops! Looks like Noah is holding onto that post tight! Try giving it another shot');
                } finally {
                    hideLoader(); 
                }
            }
        });

        adminBtnsContainer.append(editButton, deleteButton);
        publishInfo.append(adminBtnsContainer);
    }
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    if (currentPostIndex > 0) {
        prevButton.style.display = 'block';
    } else {
        prevButton.style.display = 'none';
    }

    if (currentPostIndex < allBlogPosts.length - 1) {
        nextButton.style.display = 'block';
    } else {
        nextButton.style.display = 'none';
    }
}

function navigateToNextPost() {
    if (currentPostIndex !== null && currentPostIndex < allBlogPosts.length - 1) {
        currentPostIndex++;
        const nextPost = allBlogPosts[currentPostIndex];
        generateBlogCard(nextPost);
        window.history.pushState(null, '', `?id=${nextPost.id}`);
        updateNavigationButtons();
    }
}

function navigateToPreviousPost() {
    if (currentPostIndex !== null && currentPostIndex > 0) {
        currentPostIndex--;
        const prevPost = allBlogPosts[currentPostIndex];
        generateBlogCard(prevPost);
        window.history.pushState(null, '', `?id=${prevPost.id}`);
        updateNavigationButtons();
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    showLoader(); 
    try {
        await getAllBlogPosts();
        await getBlogPostId();
    } finally {
        hideLoader(); 
    }

    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');

    nextButton.addEventListener('click', navigateToNextPost);
    prevButton.addEventListener('click', navigateToPreviousPost);
});