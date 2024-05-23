import { handleLogout } from "./handleLogout.mjs";




export const configureUserAccess = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isFrontPage = !(window.location.pathname.includes('post') || window.location.pathname.includes('account'));
    setupAdminLinks(userInfo, isFrontPage);
};




const setupAdminLinks = (userInfo, isFrontPage) => {
    const adminNav = document.querySelector('.admin-nav');
    adminNav.innerHTML = '';

    const adminFoot = document.querySelector('.admin-foot');
    adminFoot.innerHTML = '';

    const prefix = isFrontPage ? "" : "../";

    if (userInfo) {
        createLink(adminNav, "Create Post", prefix + "post/create.html", "admin-nav-link1");
        createLink(adminNav, "Log Out", "", "admin-nav-link2", () => handleLogout(isFrontPage));

        createLink(adminFoot, "Create Post", prefix + "post/create.html", "admin-foot-link1");
        createLink(adminFoot, "Log Out", "", "admin-foot-link2", () => handleLogout(isFrontPage));
    } else {
        createLink(adminNav, "Register", prefix + "account/register.html", "admin-nav-link1");
        createLink(adminNav, "Login", prefix + "account/login.html", "admin-nav-link2");

        createLink(adminFoot, "Register", prefix + "account/register.html", "admin-foot-link1");
        createLink(adminFoot, "Login", prefix + "account/login.html", "admin-foot-link2");
    }
};

const createLink = (parent, text, href, id, clickHandler) => {
    const link = document.createElement('a');
    link.innerText = text;
    link.href = href;
    link.id = id;
    link.style.cursor = 'pointer';
    
    if (clickHandler) {
        link.addEventListener('click', clickHandler);
    }

    parent.appendChild(link);
};

document.addEventListener('DOMContentLoaded', configureUserAccess);
