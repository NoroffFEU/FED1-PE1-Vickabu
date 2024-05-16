
import { registerUser } from "../utils/registerUser.mjs";



const registerForm = document.querySelector('#registerForm');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const [nameInput, emailInput, passwordInput] = event.target.elements;
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    validateAndSubmitForm(name, email, password);
});



function validateAndSubmitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = "";

    const nameRegex = /^[\w]{1,20}$/;
    if (!nameRegex.test(name)) {
        errorMessage += "Username must contain only letters.\n";
    }

    const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
    if (!emailRegex.test(email)) {
        errorMessage += "Invalid email address.\n";
    }

    if (password.length < 8) {
        errorMessage += "Password must be at least 8 characters long.\n";
    }

    if (password !== confirmPassword) {
        errorMessage += "Passwords do not match.\n";
    }

    if (errorMessage !== "") {
        document.getElementById("errorMessage").textContent = errorMessage;
    } else {
        document.getElementById("errorMessage").textContent = "";
        registerUser(name, email, password);
        console.log("Validation passed, submitting form...");
        document.getElementById("form-info").style.display = "none";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => {
            window.location.href = "../../account/login.html"; 
        }, 3000);
    }
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

