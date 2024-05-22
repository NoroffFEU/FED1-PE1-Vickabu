export const checkUserLoggedIn = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo && userInfo.data && userInfo.data.accessToken;
}