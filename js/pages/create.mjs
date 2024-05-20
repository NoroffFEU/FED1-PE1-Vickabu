import { doFetch } from "../utils/doFetch.mjs";
import { API_USER_URL } from "../utils/constants.mjs";


const form = document.getElementById('blogPostForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const tags = formData.getAll('tags');
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
});
