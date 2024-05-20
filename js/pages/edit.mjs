import { doFetch } from '../utils/doFetch.mjs';
import { API_USER_URL } from '../utils/constants.mjs';

async function getBlogPost() {
    const id = new URLSearchParams(window.location.search).get('id');
    const response = await doFetch('GET', `${API_USER_URL}/${id}`);
    populateForm(response);
}

function populateForm(blogPost) {
    document.getElementById('title').value = blogPost.title;
    document.getElementById('createurl').value = blogPost.media.url;
    document.getElementById('imageAlt').value = blogPost.media.alt;
    document.getElementById('content').value = blogPost.body;


    const tags = blogPost.tags;
    tags.forEach(tag => {
        const checkbox = document.querySelector(`input[name="tags[]"][value="${tag}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

document.getElementById('blogPostForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = new URLSearchParams(window.location.search).get('id');
    const formData = new FormData(event.target);
    const postData = {
        title: formData.get('title'),
        media: {
            url: formData.get('url'),
            alt: formData.get('imageAlt'),
        },
        tags: formData.getAll('tags[]'),
        body: formData.get('content'),
    };

    await doFetch('PUT', `${API_USER_URL}/${id}`, postData);
    alert('Post updated successfully');
    window.location.href = `./post.html?id=${id}`;
});

document.getElementById('cancelButton').addEventListener('click', () => {
    window.history.back();
});

getBlogPost();