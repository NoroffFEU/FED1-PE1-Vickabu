
import { loginUser } from "../utils/loginUser.mjs";



const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    const [emailInput, passwordInput] = event.target.elements;
    const email = emailInput.value;
    const password = passwordInput.value;
    loginUser(email, password);
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

