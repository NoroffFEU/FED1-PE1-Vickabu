async function displayBlogPost(blogPost) {
    const blogPostContainer = document.getElementById('blogpost-container');
    blogPostContainer.innerHTML = ''; 

    const blogCardImg = document.createElement('img');
    blogCardImg.src = blogPost.media.url;

    const heading = document.createElement('h3');
    heading.textContent = blogPost.title;

    const content = document.createElement('p');
    content.textContent = blogPost.body;

    blogPostContainer.append(blogCardImg, heading, content);
}

async function renderPostPage() {
    try {
        const postId = localStorage.getItem('blogPostId');

        const responseData = await fetch(`https://v2.api.noroff.dev/blog/posts/Noah/${postId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // Authorization: Bearer ${acsesstoken},
            },
        });

        const blogPost = await responseData.json();
        await displayBlogPost(blogPost);

        console.log('Logging post data:', blogPost);

    } catch (error) {
        console.error('Error rendering post page:', error);
    }
}

async function main() {
    try {
        await renderPostPage();
    } catch (error) {
        console.error('Main error:', error);
    }
}

main();
