import { doFetch } from "../utils/doFetch.mjs";
import { API_USER_URL } from "../utils/constants.mjs";
import { checkUserLoggedIn } from "../utils/checkAuth.mjs";
import { showLoader, hideLoader } from '../utils/loader.mjs';

function checkIfLoggedIn() {
    if (!checkUserLoggedIn()) {
        alert('Only Pawlicious`s crew can access this page, please log in');
        window.location.href = "../account/login.html";
        return;
    }
}
checkIfLoggedIn();

const form = document.getElementById('blogPostForm');
const urlInput = document.getElementById('createurl');
const editor = document.getElementById('editor');
const imgFrame = document.querySelector('.img-frame');
const noImgFrame = document.querySelector('.no-img-frame');
const contentError = document.getElementById('contentError');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    contentError.textContent = '';
    let isValid = true;

    if (!editor.innerHTML.trim()) {
        contentError.textContent = 'Content is required!';
        isValid = false;
    }

    if (!isValid) {
        return; 
    }

    const formData = new FormData(form);
    const tags = formData.getAll('tags[]');
    const mediaUrl = formData.get('url');
    const mediaAlt = formData.get('imageAlt');
    const postData = {
        title: formData.get('title'),
        body: editor.innerHTML,
        tags: tags,
        media: {
            url: mediaUrl,
            alt: mediaAlt
        }
    };

    try {
        showLoader(); 
        await doFetch('POST', API_USER_URL, postData);
        hideLoader(); 
        alert('Post created successfully!');
        window.location.href = `../index.html`;
    } catch (error) {
        hideLoader(); 
        console.error('Error creating post:', error);
        alert("Oops! Looks like creating your pawsome post didn't go as planned. Let's give it another go, shall we? 🐾");
    }
});

urlInput.addEventListener('change', function () {
    const imageUrl = this.value.trim();

    if (imageUrl) {
        imgFrame.style.backgroundImage = `url('${imageUrl}')`;
        imgFrame.style.backgroundSize = 'cover';
        imgFrame.style.backgroundPosition = 'center';
        imgFrame.style.backgroundRepeat = 'no-repeat';
        noImgFrame.style.display = 'none';
    } else {
        imgFrame.style.backgroundImage = 'none';
        noImgFrame.style.display = 'block';
    }
});
