import { API_LOGIN_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

export async function loginUser(email, password) {
    console.log('User logged in')
    await doFetch(API_LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    });
}