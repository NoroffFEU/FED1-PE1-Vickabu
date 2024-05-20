import { API_LOGIN_URL } from "../utils/constants.mjs";
import { doFetch } from "../utils/doFetch.mjs";





const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const postData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const response = await doFetch('POST', API_LOGIN_URL, postData);
    
    if (response) {
        localStorage.setItem('userInfo', JSON.stringify({ data: { accessToken: response.accessToken } }));

        document.getElementById("login-form").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => {
            window.location.href = "../../index.html"; 
        }, 3000);
    } else {
        console.error('Login failed');
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

