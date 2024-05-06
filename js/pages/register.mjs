document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
});

function togglePassword(fieldId) {
    var x = document.getElementById(fieldId);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


function validateForm() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var errorMessage = "";

    // Validering av brukernavn
    var usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
        errorMessage += "Username must contain only letters.\n";
    }

    // Validering av e-post
    var emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        errorMessage += "Invalid email address.\n";
    }

    // Validering av passord
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
        // Send data here
        console.log("whoop");
    }
}



