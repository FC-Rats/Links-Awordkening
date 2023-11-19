document.addEventListener("DOMContentLoaded", function () {

    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const emailInput = document.getElementById("email");
    const conditions = {
        length: { element: document.getElementById("length-condition"), regex: /.{12,}/ },
        uppercase: { element: document.getElementById("uppercase-condition"), regex: /[A-Z]/ },
        digit: { element: document.getElementById("digit-condition"), regex: /\d/ },
        specialCharacter: { element: document.getElementById("special-character-condition"), regex: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/ },
        match: { element: document.getElementById("match-condition"), func: () => passwordInput.value === confirmPasswordInput.value && passwordInput.value !== "" }
    };
    const submitButton = document.getElementById("submit-button");

    function updateCondition(condition) {
        const element = condition.element;
        const conditionMet = condition.regex ? condition.regex.test(passwordInput.value) : condition.func();
        element.classList.toggle("valid", conditionMet);
        element.querySelector("span").innerText = conditionMet ? "✔" : "";
        return conditionMet;
    }

    function updateEmail() {
        if (emailInput) { // Vérifie si l'élément e-mail existe
            const element = document.getElementById("email-condition");
            const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const emailConditionMet = regex.test(emailInput.value);
            element.classList.toggle("valid", emailConditionMet);
            element.querySelector("span").innerText = emailConditionMet ? "✔" : "";
        }
    }

    function validateForm() {
        const conditionsMet = Object.values(conditions).map(updateCondition);
        updateEmail(); // Appel de la fonction pour mettre à jour la condition de l'e-mail
        const allConditionsMet = conditionsMet.every(condition => condition);
        submitButton.disabled = !allConditionsMet;
    }

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

    togglePasswordField(passwordInput, document.getElementById("toggle-password"));
    togglePasswordField(confirmPasswordInput, document.getElementById("toggle-confirm-password"));

    passwordInput.addEventListener("input", validateForm);
    confirmPasswordInput.addEventListener("input", validateForm);

    if (emailInput) {
        emailInput.addEventListener("input", validateForm); // Ajoutez cette ligne uniquement si l'élément e-mail existe
    }
    
    validateForm(); 
});
