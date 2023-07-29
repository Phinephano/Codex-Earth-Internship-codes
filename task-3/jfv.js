document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const errorMessagesDiv = document.getElementById("errorMessages");
    errorMessagesDiv.innerHTML = ""; // Clear previous error messages

    let isValid = true;

    if (nameInput.value.trim() === "") {
        displayErrorMessage("Name is required.", nameInput);
        isValid = false;
    }

    if (emailInput.value.trim() === "") {
        displayErrorMessage("Email is required.", emailInput);
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        displayErrorMessage("Invalid email format.", emailInput);
        isValid = false;
    }

    if (isValid) {
        // Form is valid, submit it or perform other actions here
        console.log("Form submitted!");
    }
});

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function displayErrorMessage(message, inputElement) {
    const errorMessagesDiv = document.getElementById("errorMessages");
    const errorMessage = document.createElement("div");
    errorMessage.className = "error";
    errorMessage.textContent = message;
    errorMessagesDiv.appendChild(errorMessage);

    inputElement.style.borderColor = "red";
    errorMessage.style.display = "block";

    inputElement.addEventListener("input", function() {
        errorMessage.style.display = "none";
        inputElement.style.borderColor = "";
    });
}