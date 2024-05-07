async function displayBlogCards(data) {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = ''; 
    data.forEach(item => {
        const blogCard = generateBlogCard(item);
        displayContainer.appendChild(blogCard);
    });
}

function generateBlogCard(data) {
    const blogCardWrapper = document.createElement('div');
    blogCardWrapper.classList.add('blogcard-wrapper');

    const blogCardContainer = document.createElement('div');
    blogCardContainer.classList.add('blogcard-container');

    const blogCardImg = document.createElement('img');
    blogCardImg.src = data.media.url;
    blogCardImg.classList.add('blogCard-image');

    blogCardImg.addEventListener('click', () => {
        localStorage.setItem('dataId', data.id);
    });    
        
    const blogCardLink = document.createElement('a');
    blogCardLink.href= `./product/index.html?id=${data.id}/`;

    const heading = document.createElement('h3');
    heading.textContent = data.title;

    const content = document.createElement('p');
    content.textContent = data.body;

    blogCardContainer.append(blogCardImg, heading, content);
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
        const data = await responseData.json();
        console.log('Data from API:', data);
        await displayBlogCards(data.data); 
        console.log('Logging data: ', data);

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