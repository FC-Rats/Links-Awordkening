document.addEventListener("DOMContentLoaded", function () {

    function togglePasswordField(inputElement, toggleButton) {
        toggleButton.addEventListener("mousedown", function () {
            inputElement.type = "text";
        });

        toggleButton.addEventListener("mouseup", function () {
            inputElement.type = "password";
        });

        toggleButton.addEventListener("mouseout", function () {
            inputElement.type = "password";
        });
    }

    const passwordInput = document.getElementById("password");
    togglePasswordField(passwordInput, document.getElementById("toggle-password"));

    const confirmPasswordInput = document.getElementById("confirm-password");
    if (confirmPasswordInput) {
        togglePasswordField(confirmPasswordInput, document.getElementById("toggle-confirm-password"));
    }
});
