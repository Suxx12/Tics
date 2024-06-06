document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io('http://localhost:3000');

    socket.on('nuevosDatos', (datos) => {
        document.getElementById('temperatura-valor').innerText = datos.temperatura + ' °C';
        document.getElementById('ph-valor').innerText = datos.ph;
        document.getElementById('turbidez-valor').innerText = datos.turbidez + ' V';
        document.getElementById('deteccion-estado').innerText = datos.caida;
    });
});

function toggleSettings() {
    const overlay = document.getElementById('settings-overlay');
    overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
}

function start() {
    console.log("Monitoreo iniciado");
}

var x = document.getElementById("login");
var y = document.getElementById("registrar");
var z = document.getElementById("elegir");

function validateLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("loginPassword").value;
    var rememberPassword = document.getElementById("rememberPasswordCheckbox").checked;

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim() === "" || password.trim() === "") {
        alert("Por favor, complete todos los campos.");
    } else if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
    } else {
        if (rememberPassword) {
            // Aquí podrías implementar la lógica para recordar la contraseña
            alert("Contraseña recordada.");
        }
        redirectToHome();
    }
}

function redirectToHome() {
    window.location.href = "Home.html";
}

function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

function registrar() {
    x.style.left = "-400px";
    y.style.left = "50px";
    if (window.innerHeight < 300) {
        z.style.left = "110px"; // Si la pantalla es menor a 300px, establece el left en 110px
    } else {
        z.style.left = "120px";
    }
}

function validateRegister() {
    var checkBox = document.getElementById("terms").checked;
    var email = document.querySelector("#registrar input[type='email']").value;
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var hasNumber = /\d/;

    if (!checkBox) {
        alert("Debe aceptar los términos y condiciones.");
    } else if (!emailPattern.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido con dominios permitidos.");
    } else if (password.length < 5) { // Cambiado a < 5 para requerir al menos 5 caracteres
        alert("La contraseña debe tener al menos 5 caracteres.");
    } else if (!hasNumber.test(password)) {
        alert("La contraseña debe contener al menos un número.");
    } else if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
    } else {
        alert("Registro exitoso."); // Puedes redirigir a otra página o hacer otra acción
    }
}

// Función para mostrar u ocultar el menú de ajustes
function toggleSettings() {
    let overlay = document.getElementById('settings-overlay');
    overlay.style.display = (overlay.style.display == "block") ? "none" : "block";
}

function showInfo() {
    var infoOverlay = document.getElementById('info-overlay');
    infoOverlay.style.display = 'block';
}

function hideInfo() {
    var infoOverlay = document.getElementById('info-overlay');
    infoOverlay.style.display = 'none';
}
