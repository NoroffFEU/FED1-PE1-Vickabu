import { API_REGISTER_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

export async function registerUser(name, email, password) {
    console.log('Register User')
    await doFetch(API_REGISTER_URL, {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });
}

