var x = document.getElementById("login");
var y = document.getElementById("registrar");
var z = document.getElementById("elegir");

function validateLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if (email.trim() === "" || password.trim() === "") {
        alert("Por favor, complete todos los campos.");
    } else {
        redirectToHome();
    }
}

function redirectToHome() {
    window.location.href = "home.html";
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
        z.style.left = "110px"; // Si la pantalla es menor a 300px, establece el left en 100px
    } else {
        z.style.left = "120px";
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
