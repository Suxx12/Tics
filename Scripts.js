function callEmergency() {
    // Llama al número de emergencias
    window.location.href = "tel:911";
}

        function validatePassword() {
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirm_password").value;
            var errorMessage = document.getElementById("error-message");

            // Validación de coincidencia de contraseñas
            if (password != confirmPassword) {
                errorMessage.textContent = "Las contraseñas no coinciden.";
                return false;
            }

            // Validación de longitud y números en la contraseña
            var passwordPattern = /^(?=.*\d).{6,}$/;
            if (!passwordPattern.test(password)) {
                errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres y contener al menos un número.";
                return false;
            }

            errorMessage.textContent = "";
            return true;
        }

        function togglePasswordVisibility() {
            var passwordField = document.getElementById("password");
            var toggleButton = document.getElementById("toggle-password");
            if (passwordField.type === "password") {
                passwordField.type = "text";
                toggleButton.innerHTML = '<i class="far fa-eye-slash"></i>';
            } else {
                passwordField.type = "password";
                toggleButton.innerHTML = '<i class="far fa-eye"></i>';
            }
        }

        function toggleConfirmPasswordVisibility() {
            var confirmPasswordField = document.getElementById("confirm_password");
            var toggleButton = document.getElementById("toggle-confirm-password");
            if (confirmPasswordField.type === "password") {
                confirmPasswordField.type = "text";
                toggleButton.innerHTML = '<i class="far fa-eye-slash"></i>';
            } else {
                confirmPasswordField.type = "password";
                toggleButton.innerHTML = '<i class="far fa-eye"></i>';
            }
        }
    