# Project Exam 1: Noah Pawlicious's blog. 

Welcome to Noah Pawlicious's blog project! 
This repository contains the content and resources for Noah's delightful adventures. 
Noah, a charming 2.5 kg Chihuahua from Norway, shares his tales of exploration and joy to entertain and inspire fellow canine enthusiasts.

This blog is a platform for showcasing his adventures, promoting responsible pet ownership, and fostering a sense of community among pet lovers.

## Project Overview

This project documents the development and content of Noah's blog. It includes:
- Stories and anecdotes of Noah's adventures.
- Images capturing the highlights of his escapades.
- Information and tips for fellow dog owners.

## Client Information (fictional)

- **Name:** Noah Pawlicious
- **Sector:** Private
- **Size:** 1 person
- **Location:** Norway
- **Mission:** To entertain and inspire fellow canine enthusiasts with charming tales of his adventures, showcasing his good spirit and boundless curiosity as a pint-sized explorer. Through witty anecdotes and endearing escapades, he aims to foster a sense of joy, laughter, and camaraderie among readers, while also promoting responsible pet ownership and the importance of embracing life's adventures, no matter how small.

## Content License

Please do not use, distribute, or reproduce any images or text without permission. If you wish to use any part of this project, please contact first for permission.


## User Stories

### Blog Feed Page

- Users can see an interactive banner carousel with the 3 latest posts.
- Users can click on carousel items to navigate to the blog post page.
- Users can use previous and next buttons to navigate through carousel items.
- The carousel loops back to the first post after reaching the end.
- Users can view a static list of the 12 latest posts in a responsive thumbnail grid.
- Each thumbnail in the blog feed is clickable, leading to the respective blog post.

### Blog Post Public Page

- Users can see a responsive layout showing the post title, author, publication date, image banner, and post content.
- Each blog post has a shareable URL with a query string or hash parameter containing the post ID.

### Blog Post Edit Page

- The edit page is accessible only to the owner when logged in.
- The owner can delete a post by sending a DELETE request to the API.
- The owner can update the title, body content, or image by sending a PUT request to the API.

### Account Login Page

- The owner can log in using a validated login form, which requests and saves a token to the browser.

### Account Register Page

- The owner can create a new account using a validated register form.

## Sitemap

- `/index.html` - Blog Feed Page
- `/post/index.html` - Blog Post Public Page
- `/post/edit.html` - Blog Post Edit Page
- `/account/login.html` - Account Login Page
- `/account/register.html` - Account Register Page

## Getting Started

### Installing

Get a local copy:

1. Clone the repo:

```bash
gh repo clone NoroffFEU/FED1-PE1-Vickabu
```


## Contributing
Note: No changes will be made before end of june as the Project Exam 1 is currently under grade review. 

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Contact

- More information will come soon, meanwhile contact @Vickabu on GitHub if you have any questions. 

## Acknowledgments

Thank you to all contributors and supporters of this project.

