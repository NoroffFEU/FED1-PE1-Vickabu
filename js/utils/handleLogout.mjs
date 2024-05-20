export const handleLogout = (isFrontPage) => {
    localStorage.removeItem('userInfo');
    if (isFrontPage) {
        window.location.href = 'index.html';
    } else {
        window.location.href = '../post/create.html';
    }
};