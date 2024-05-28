import { API_LOGIN_URL } from "../utils/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";
import { showLoader, hideLoader } from '../utils/loader.mjs';

const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const postData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };
    showLoader(); 

    try {
        const response = await doFetch('POST', API_LOGIN_URL, postData);

        if (response && response.accessToken) {
            localStorage.setItem('userInfo', JSON.stringify({ data: { accessToken: response.accessToken } }));
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("form-info").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
            setTimeout(() => {
                window.location.href = "../index.html"; 
            }, 2000);
        } else {
            throw new Error('Invalid login credentials');
        }

    } catch (error) {
        console.error('Login failed:', error);
        document.getElementById("errorMessage").textContent = error.message;
    } finally {
        hideLoader(); 
    }
});

const passwordInput = document.getElementById("password");
const togglePasswordCheckbox = document.getElementById("togglePasswordCheckbox");

togglePasswordCheckbox.addEventListener("click", () => {
    togglePassword(passwordInput);
});

function togglePassword(inputField) {
    if (inputField.type === "password") {
        inputField.type = "text";
    } else {
        inputField.type = "password";
    }
}
