document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io('http://34.196.28.143:3000');

    socket1.on('datosSensor', (datos) => {
        console.log('Conexión establecida con el servidor');
        // Actualizar los valores en el HTML
        document.getElementById('temperatura-valor').innerText = datos.temperatura + ' °C';
        document.getElementById('ph-valor').innerText = datos.ph;
        document.getElementById('turbidez-valor').innerText = datos.turbidez + ' NTU';
        document.getElementById('deteccion-estado').innerText = datos.caida;
    });

    const infoLink = document.getElementById('info-link');
    if (infoLink) {
        infoLink.addEventListener('click', showInfo);
    }
});

function showInfo() {
    let overlay = document.getElementById('info-overlay');
    overlay.style.display = 'block';
}

function hideInfo() {
    let overlay = document.getElementById('info-overlay');
    overlay.style.display = 'none';
}

function toggleSettings() {
    let overlay = document.getElementById('settings-overlay');
    overlay.style.display = (overlay.style.display == "block") ? "none" : "block";
}

function start() {
    console.log("Monitoreo iniciado");
}

function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
    console.log("Inicio de sesión realizado");
}

function registrar() {
    x.style.left = "-400px";
    y.style.left = "50px";
    if (window.innerHeight < 300) {
        z.style.left = "110px"; // Si la pantalla es menor a 300px, establece el left en 110px
    } else {
        z.style.left = "120px";
    }
    console.log("Registro realizado");
}

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

function redirectToHome() {
    window.location.href = "Home.html";
}

// Variables para el manejo de formularios
var x = document.getElementById("login");
var y = document.getElementById("registrar");
var z = document.getElementById("elegir");
