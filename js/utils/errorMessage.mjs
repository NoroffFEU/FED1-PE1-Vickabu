export function displayErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    document.body.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}