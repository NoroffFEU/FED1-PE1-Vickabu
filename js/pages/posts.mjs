import { API_USER_URL } from "../utils/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";


async function getBlogPostId() {
    const id = window.location.search.slice(4)
    const response = await doFetch('GET', API_USER_URL + id);
    generateBlogCard(response)
}



function generateBlogCard(blogPost) {
    const blogPostContainer = document.getElementById('blogpost-container');
    blogPostContainer.innerHTML = ''; 

    const blogCardImg = document.createElement('img');
    blogCardImg.src = blogPost.media.url;
    blogCardImg.classList.add('blogcard-image')

    const authorName = document.createElement('p');
    authorName.textContent = `Author: ${blogPost.author.name}`;

    const createdDate = new Date(blogPost.created);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = createdDate.toLocaleDateString('en-GB', options);
    const date = document.createElement('p');
    date.textContent = `Published: ${formattedDate}`;

    const heading = document.createElement('h3');
    heading.textContent = blogPost.title;

    const content = document.createElement('p');
    content.textContent = blogPost.body;

    blogPostContainer.append(heading, blogCardImg, authorName, date, content);
}

getBlogPostId();