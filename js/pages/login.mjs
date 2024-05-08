import { loginUser } from "../utils/loginUser.mjs";

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const [emailInput, passwordInput] = event.target.elements;
    const email = emailInput.value;
    const password = passwordInput.value;
    await validateAndSubmitForm(email, password);
});

async function validateAndSubmitForm(email, password) {
    let errorMessage = "";

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        errorMessage += "Invalid email address.\n";
    }

    if (password.length < 8) {
        errorMessage += "Password must be at least 8 characters long.\n";
    }

    if (errorMessage !== "") {
        document.getElementById("errorMessage").textContent = errorMessage;
    } else {
        document.getElementById("errorMessage").textContent = "";
        try {
            // Check if user exists
            const userExists = await checkUserExists(email);
            if (userExists) {
                console.log("User exists, logging in...");
                await loginUser(email, password);
            } else {
                document.getElementById("errorMessage").textContent = "User does not exist.";
            }
        } catch (error) {
            console.error("Error while checking user:", error);
            document.getElementById("errorMessage").textContent = "Error while checking user.";
        }
    }
}

async function checkUserExists(email) {
    try {
        // You need to implement the logic to check if the user exists.
        // This might involve sending a request to your server to check if the user exists in your database.
        // If you don't have a dedicated API endpoint for this, you'll need to figure out a way to do it based on your existing backend logic.
        // For demonstration purposes, I'll leave this function empty, assuming you'll fill it with your backend logic.
        // Once implemented, this function should return true if the user exists and false otherwise.
        return true; // Placeholder
    } catch (error) {
        console.error("Error while checking user:", error);
        throw error;
    }
}