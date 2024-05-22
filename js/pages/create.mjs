import { doFetch } from "../utils/doFetch.mjs";
import { API_USER_URL } from "../utils/constants.mjs";
import { checkUserLoggedIn } from "../utils/checkAuth.mjs";


function checkIfLoggedIn() {
    if(!checkUserLoggedIn()) {
        alert('Only Pawlicious`s crew can access this page, please log in')
        window.location.href = "../account/login.html"; 
    } 
}
checkIfLoggedIn();


const form = document.getElementById('blogPostForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const tags = formData.getAll('tags[]');
    const mediaUrl = formData.get('url');
    const mediaAlt = formData.get('imageAlt');

    const postData = {
        title: formData.get('title'),
        body: formData.get('content'),
        tags: tags,
        media: {
            url: mediaUrl,
            alt: mediaAlt
        }
    };
    doFetch('POST', API_USER_URL, postData)
    alert('Post created successfully!');
    window.location.href = `../../index.html`
});

const urlInput = document.getElementById('createurl');
const imgFrame = document.querySelector('.img-frame');
const noImgFrame = document.querySelector('.no-img-frame');

urlInput.addEventListener('change', function() {
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