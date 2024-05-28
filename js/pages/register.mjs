import { doFetch } from "../utils/doFetch.mjs";
import { API_REGISTER_URL } from "../utils/constants.mjs";
import { showLoader, hideLoader } from '../utils/loader.mjs';

const registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const postData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    };

    showLoader(); 

    try {
        const errorMessage = validateForm();
        if (errorMessage) {
            throw new Error(errorMessage);
        }

        const response = await doFetch('POST', API_REGISTER_URL, postData);
        document.getElementById("form-info").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => {
            window.location.href = "../account/login.html"; 
        }, 2000);
    } catch (error) {
        console.error('Registration failed', error);
        document.getElementById("errorMessage").textContent = error.message || "Registration failed.";
    } finally {
        hideLoader(); 
    }
});

function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = "";

    const nameRegex = /^[\w]{1,20}$/;
    if (!nameRegex.test(name)) {
        errorMessage += "Username must contain only letters and underscore.\n";
    }

    const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
    if (!emailRegex.test(email)) {
        errorMessage += "Invalid email address. Email must contain @stud.noroff.no\n";
    }

    if (password.length < 8) {
        errorMessage += "Password must be at least 8 characters long.\n";
    }

    if (password !== confirmPassword) {
        errorMessage += "Passwords do not match.\n";
    }

    return errorMessage;
}

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePasswordCheckbox = document.getElementById("togglePasswordCheckbox");
const toggleConfirmPasswordCheckbox = document.getElementById("toggleConfirmPasswordCheckbox");

togglePasswordCheckbox.addEventListener("click", () => {
    togglePassword(passwordInput);
});

toggleConfirmPasswordCheckbox.addEventListener("click", () => {
    togglePassword(confirmPasswordInput);
});

function togglePassword(inputField) {
    if (inputField.type === "password") {
        inputField.type = "text";
    } else {
        inputField.type = "password";
    }
}

