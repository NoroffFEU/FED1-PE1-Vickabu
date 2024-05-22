import { API_USER_URL } from "../utils/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";


async function getBlogPostId() {
    const id = new URLSearchParams(window.location.search).get('id');
    const response = await doFetch('GET', `${API_USER_URL}/${id}`);
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
    content.innerHTML = blogPost.body;

    blogPostContainer.append(heading, authorName, date, blogCardImg, content);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.data.accessToken) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

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
                try {
                    await doFetch('DELETE', `${API_USER_URL}/${blogPost.id}`);
                    alert('Post deleted successfully');
                    window.location.href = '../index.html';
                } catch (error) {
                    console.error('Error deleting post:', error);
                    alert('Failed to delete post');
                }
            }
        });

        buttonContainer.append(editButton, deleteButton);
        blogPostContainer.appendChild(buttonContainer);
    }
}





getBlogPostId();