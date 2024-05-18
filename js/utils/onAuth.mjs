

export const onAuth = () => {
    
    let isFrontPage = true
    if (window.location.pathname.includes('post') || window.location.pathname.includes('account')) {
        isFrontPage = false
    }
    const userInfo = localStorage.getItem('userInfo')
    adminLink1(userInfo)
    adminLink2(userInfo, isFrontPage)
}

const adminLink1 = (userInfo) => {
    const register = document.getElementById('admin-nav-link1');
    if (userInfo) {
        register.innerText = "Create Post";
        register.href = '../post/create.html';
     } else {
        register.innerText = 'Register';
        register.href = '../account/register.html'
     }
};

const adminLink2 = (userInfo, isFrontPage) => {
    const login = document.getElementById('admin-nav-link2');
    if (userInfo) {
        login.innerText = "Log Out";
        login.addEventListener('click', () => {
            localStorage.removeItem('userInfo');
            if (isFrontPage) {
                login.href = 'index.html';   
            } else {
                login.href = '../index.html';
            }
        })
     } else {
        login.innerText = 'Login';
        login.href = '../account/login.html'
     }
};

// edit btn osv osv osv 
