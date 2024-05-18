import { API_LOGIN_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

export async function loginUser(email, password) {
    const response = await doFetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    localStorage.setItem('userInfo', JSON.stringify(response))
    // console.log(JSON.parse(localStorage.getItem('userInfo')));
    window.location.href = '../index.html'
    }