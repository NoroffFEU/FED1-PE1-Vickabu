import { doFetch } from '../utils/doFetch.mjs';
import { API_USER_URL } from '../utils/constants.mjs';
import { checkUserLoggedIn } from '../utils/checkAuth.mjs';
import { showLoader, hideLoader } from '../utils/loader.mjs';
import { displayErrorMessage } from '../utils/errorMessage.mjs';

async function getBlogPost() {
    if (!checkUserLoggedIn()) {
        alert('Only Pawlicious`s crew can access this page, please log in');
        window.location.href = "../account/login.html";
        return;
    } 
    showLoader(); 
    
    const id = new URLSearchParams(window.location.search).get('id');
    try {
        const response = await doFetch('GET', `${API_USER_URL}/${id}`);
        populateForm(response);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        displayErrorMessage("Oops! Looks like we couldn't fetch our pawsome blog posts this time. Please try again later.🐾");
    } finally {
        hideLoader(); 
    }
}

function populateForm(blogPost) {
    document.getElementById('title').value = blogPost.title;
    document.getElementById('createurl').value = blogPost.media.url;
    document.getElementById('imageAlt').value = blogPost.media.alt;
    document.getElementById('editor').innerHTML = blogPost.body;

  
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = blogPost.media.url;

    const tags = blogPost.tags;
    tags.forEach(tag => {
        const checkbox = document.querySelector(`input[name="tags[]"][value="${tag}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

document.getElementById('createurl').addEventListener('input', function() {
    const imageUrl = this.value.trim();
    const imagePreview = document.getElementById('imagePreview');
    if (imageUrl) {
        imagePreview.src = imageUrl;
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }
});

document.getElementById('blogPostForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = new URLSearchParams(window.location.search).get('id');
    const formData = new FormData(event.target);
    const editorContent = document.getElementById('editor').innerHTML;
    const postData = {
        title: formData.get('title'),
        media: {
            url: formData.get('url'),
            alt: formData.get('imageAlt'),
        },
        tags: formData.getAll('tags[]'),
        body: editorContent,
    };

    await doFetch('PUT', `${API_USER_URL}/${id}`, postData);
    alert('Post updated successfully');
    window.location.href = `./index.html?id=${id}`;
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    window.history.back();
});

document.getElementById('delete-btn').addEventListener('click', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const confirmation = confirm('Are you sure you want to delete this post?');

    if (confirmation) {
        try {
            await doFetch('DELETE', `${API_USER_URL}/${id}`);
            alert('Post deleted successfully');
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Error deleting the post:', error);
            alert('Whoops! Looks like Noah is holding onto that post tight! Try giving it another shot');
        }
    }
});

getBlogPost();
