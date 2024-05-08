async function displayBlogCards(blogPost) {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = ''; 
    blogPost.forEach(item => {
        const blogCard = generateBlogCard(item);
        displayContainer.appendChild(blogCard);
    });
}

export function generateBlogCard(blogPost) {
    const blogCardWrapper = document.createElement('div');
    blogCardWrapper.classList.add('blogcard-wrapper');

    const blogCardContainer = document.createElement('div');
    blogCardContainer.classList.add('blogcard-container');

    const blogCardImg = document.createElement('img');
    blogCardImg.src = blogPost.media.url;
    blogCardImg.classList.add('blogcard-image');

    blogCardImg.addEventListener('click', () => {
        localStorage.setItem('blogPostId', blogPost.id);
    });    
        
    const blogCardLink = document.createElement('a');
    blogCardLink.href= `./post/index.html?id=${blogPost.id}/`;


    const heading = document.createElement('h3');
    heading.textContent = blogPost.title;

    const content = document.createElement('p');
    content.textContent = blogPost.body;

    blogCardLink.append(blogCardImg);
    blogCardContainer.append(blogCardLink, heading, content);
    blogCardWrapper.appendChild(blogCardContainer);
    return blogCardWrapper;
}

async function renderHomePage() {
    try {
        const responseData = await fetch('https://v2.api.noroff.dev/blog/posts/Noah', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                // Authorization: Bearer ${acsesstoken},
            },
        });
        const blogPost = await responseData.json();
        await displayBlogCards(blogPost.data); 
        console.log('Logging data: ', blogPost);

    } catch (error) {
        console.error('Error rendering home page:', error);
    }
}

async function main() {
    try {
        await renderHomePage();
    } catch (error) {
        console.error('Main error:', error);
    }
}

main();