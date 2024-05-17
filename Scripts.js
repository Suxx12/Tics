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
        
    // Inicialización de los valores de los sensores
let valoresSensores = {
    temperatura: 0,
    ph: 0,
    turbidez: 0,
    deteccion: "No detectado"
};

// Función para actualizar los valores de los sensores en la página
function actualizarValoresSensores() {
    // Simulación de valores de los sensores (para propósitos de demostración)
    valoresSensores.temperatura = Math.random() * 30 + 10; // Temperatura entre 10°C y 40°C
    valoresSensores.ph = Math.random() * 4 + 6; // pH entre 6 y 10
    valoresSensores.turbidez = Math.random() * 5; // Turbidez entre 0 y 5
    
    document.getElementById('temperatura-valor').innerText = valoresSensores.temperatura.toFixed(1) + "°C";
    document.getElementById('ph-valor').innerText = valoresSensores.ph.toFixed(1);
    document.getElementById('turbidez-valor').innerText = valoresSensores.turbidez.toFixed(1);
    document.getElementById('deteccion-estado').innerText = valoresSensores.deteccion;
}

// Función para simular la detección de una caída
function detectarCaida() {
    valoresSensores.deteccion = "¡EMERGENCIA! Caída detectada";
    actualizarValoresSensores();
    let audio = document.getElementById('emergency-sound');
    audio.play();
    let alerta = alert("¡EMERGENCIA! Se ha detectado una caída en la piscina");
    if (!alerta || alerta.closed) {
        audio.pause();
    }
}

// Función para iniciar la simulación
function start() {
    // Llamar a la función para mostrar los valores de los sensores cada 5 segundos
    setInterval(actualizarValoresSensores, 5000);

    // Llamar a la función para simular valores al cargar la página
    actualizarValoresSensores();

    // Simular la detección de una caída cada 20 segundos (para propósitos de demostración)
    setInterval(detectarCaida, 20000);
}

// Función para mostrar u ocultar el menú de ajustes
function toggleSettings() {
    let overlay = document.getElementById('settings-overlay');
    overlay.style.display = (overlay.style.display == "block") ? "none" : "block";
}