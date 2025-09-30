/* ===== VARIABLES GLOBALES Y CLASES ===== */
let numeroMagico;
let datosPersona;

let tiempoCronometro = 0;
let intervaloCronometro;
let estaCorriendoCronometro = false;

let tiempoInicialTemporizador = 0;
let tiempoRestanteTemporizador = 0;
let intervaloTemporizador;
let estaCorriendoTemporizador = false;

// EJERCICIO 1: Adivina el Número
const comenzarBtn = document.getElementById("comenzarBtn");
const seccionJuego = document.getElementById("juego");
const enviarBtn = document.getElementById("enviarBtn");
const inputNumero = document.getElementById("ingresarNumero");

// EJERCICIO 2: Información de la Persona
class Persona {
    constructor(nombre, edad, DNI, sexo, peso, altura, añoNacimiento) {
        this.nombre = nombre;
        this.edad = edad;
        this.DNI = DNI;
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
        this.añoNacimiento = añoNacimiento;
    }

    get mostrarGeneracion() {
        if (this.añoNacimiento >= 1994 && this.añoNacimiento <= 2010) {
            return `Generación Z, rasgo característico: Irreverencia`;
        } else if (this.añoNacimiento >= 1981 && this.añoNacimiento <= 1993) {
            return `Generación Y (Millennials), rasgo característico: Frustración`;
        } else if (this.añoNacimiento >= 1969 && this.añoNacimiento <= 1980) {
            return `Generación X, rasgo característico: Obsesión por el éxito`;
        } else if (this.añoNacimiento >= 1949 && this.añoNacimiento <= 1968) {
            return `Baby Boom, rasgo característico: Ambición`;
        } else if (this.añoNacimiento >= 1930 && this.añoNacimiento <= 1948) {
            return `Silent Generation (Generación Silenciosa), rasgo característico: Austeridad`;
        } else {
            return `Año de nacimiento fuera de los rangos establecidos`;
        }
    }
    get esMayorDeEdad() {
        return this.edad >= 18 ? 'Es mayor de edad' : 'Es menor de edad';
    }
    get mostrarDatos() {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}, DNI: ${this.DNI}, Sexo: ${this.sexo}, Peso: ${this.peso}kg, Altura: ${this.altura}m, Año de Nacimiento: ${this.añoNacimiento}`;
    }
}
function capturarDatos() {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const DNI = document.getElementById('dni').value;
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const añoNacimiento = parseInt(document.getElementById('añoNacimiento').value);
    if (isNaN(DNI) || DNI.length !== 8) {
        alert('Por favor, ingrese un DNI válido de 8 dígitos.');
        return;
    }
    datosPersona = new Persona(nombre, edad, DNI, sexo, peso, altura, añoNacimiento);
    document.getElementById("seMuestraGeneracion").innerHTML = datosPersona.mostrarGeneracion;
    document.getElementById("seMuestraEdad").innerHTML = datosPersona.esMayorDeEdad;
    document.getElementById("seMuestraDatos").innerHTML = datosPersona.mostrarDatos;
}

// EJERCICIO 3: Lista de Tareas
const tareaInput = document.getElementById('tareaInput');
const agregarBtn = document.getElementById('agregarBtn');
const listaDeTareas = document.getElementById('listaDeTareas');
function agregarTarea() {
    const textoTarea = tareaInput.value.trim();
    if (textoTarea !== "") {
        const nuevaTarea = document.createElement('li');
        nuevaTarea.className = "list-group-item d-flex justify-content-between align-items-center";
        nuevaTarea.textContent = textoTarea;
        const botonEliminar = document.createElement('button');
        botonEliminar.className = "btn btn-danger btn-sm";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener('click', function() {
            listaDeTareas.removeChild(nuevaTarea);
        });
        nuevaTarea.appendChild(botonEliminar);
        listaDeTareas.appendChild(nuevaTarea);
        tareaInput.value = "";
    }
}

// EJERCICIO 4: Reloj
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",];
const reloj = document.getElementById("reloj");
setInterval(() => {
    const fecha = new Date();
    const diaSemana = diasSemana[fecha.getDay()];
    const diaMes = `${fecha.getDate()} de ${meses[fecha.getMonth()]}`;
    const hora = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    const segundos = fecha.getSeconds().toString().padStart(2, "0");
    const ampm = hora >= 12 ? "PM" : "AM";
    reloj.innerHTML = `
    <div>${diaSemana} ${diaMes}</div>
    <div>${hora}:${minutos}:${segundos} ${ampm}</div>`;
}, 1000);

// EJERCICIO 5: Cronómetro
const displayCronometro = document.getElementById('displayCronometro');
const botonIniciarCronometro = document.getElementById('iniciarCronometro');
const botonPausarCronometro = document.getElementById('pausarCronometro');
const botonResetCronometro = document.getElementById('resetCronometro');
function formatearTiempoCronometro(ms) {
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
    const formato = num => num.toString().padStart(2, '0');
    return `${formato(horas)}:${formato(minutos)}:${formato(segundos)}`;
}
function actualizarDisplayCronometro() {
    tiempoCronometro += 1000;
    displayCronometro.textContent = formatearTiempoCronometro(tiempoCronometro);
}

// EJERCICIO 6: Temporizador
const minutosInput = document.getElementById('minutosInput');
const segundosInput = document.getElementById('segundosInput');
const displayTemporizador = document.getElementById('displayTemporizador');
const botonIniciarTemporizador = document.getElementById('iniciarTemporizador');
const botonPausarTemporizador = document.getElementById('pausarTemporizador');
const botonResetTemporizador = document.getElementById('resetTemporizador');
function formatearTiempoTemporizador(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    const formato = num => num.toString().padStart(2, '0');
    return `${formato(min)}:${formato(seg)}`;
}
function actualizarTemporizador() {
    if (tiempoRestanteTemporizador <= 0) {
        clearInterval(intervaloTemporizador);
        estaCorriendoTemporizador = false;
        displayTemporizador.textContent = "00:00";
        alert("¡Tiempo finalizado!");
        return;
    }
    tiempoRestanteTemporizador--;
    displayTemporizador.textContent = formatearTiempoTemporizador(tiempoRestanteTemporizador);
}

// ====== EVENT LISTENERS UNIFICADOS =======

// Eventos: Adivina el Número
comenzarBtn.addEventListener("click", () => {
    numeroMagico = Math.floor(Math.random() * 100) + 1;
    seccionJuego.classList.remove("d-none");
    comenzarBtn.classList.add("d-none");
});
enviarBtn.addEventListener("click", () => {
    const numeroIngresado = parseInt(inputNumero.value);
    if (numeroIngresado === numeroMagico) {
        Swal.fire({
            title: "¡Felicidades! Has adivinado el número.",
            icon: "success",
            draggable: true,
            confirmButtonColor: '#0d6efd',
        });
        seccionJuego.classList.add("d-none");
        comenzarBtn.classList.remove("d-none");
    } else if (numeroIngresado < numeroMagico) {
        Swal.fire({
            icon: "error",
            title: "El número es mayor.",
            text: "¡Intenta de nuevo!",
            confirmButtonColor: '#0d6efd',
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "El número es menor.",
            text: "¡Intenta de nuevo!",
            confirmButtonColor: '#0d6efd',
        });
    }
    inputNumero.value = "";
    inputNumero.focus();
});
inputNumero.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        enviarBtn.click();
    }
});

// Eventos: Información de la Persona
document.getElementById('formDatosPersona').addEventListener('submit', function(event) {
    event.preventDefault();
    capturarDatos();
});
document.getElementById('generacionBtn').addEventListener('click', function() {
    if (datosPersona) {
        document.getElementById("seMuestraGeneracion").innerHTML = datosPersona.mostrarGeneracion;
    } else {
        document.getElementById("seMuestraGeneracion").innerHTML = "Por favor, ingrese sus datos primero.";
    }
});
document.getElementById('mayorMenorBtn').addEventListener('click', function() {
    if (datosPersona) {
        document.getElementById("seMuestraEdad").innerHTML = datosPersona.esMayorDeEdad;
    } else {
        document.getElementById("seMuestraEdad").innerHTML = "Por favor, ingrese sus datos primero.";
    }
});
document.getElementById('mostrarDatosBtn').addEventListener('click', function() {
    if (datosPersona) {
        document.getElementById("seMuestraDatos").innerHTML = datosPersona.mostrarDatos;
    } else {
        document.getElementById("seMuestraDatos").innerHTML = "Por favor, ingrese sus datos primero.";
    }
});

// Eventos: Lista de Tareas
agregarBtn.addEventListener('click', agregarTarea);
tareaInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Eventos: Cronómetro
botonIniciarCronometro.addEventListener('click', () => {
    if (!estaCorriendoCronometro) {
        intervaloCronometro = setInterval(actualizarDisplayCronometro, 1000);
        estaCorriendoCronometro = true;
    }
});
botonPausarCronometro.addEventListener('click', () => {
    if (estaCorriendoCronometro) {
        clearInterval(intervaloCronometro);
        estaCorriendoCronometro = false;
    }
});
botonResetCronometro.addEventListener('click', () => {
    clearInterval(intervaloCronometro);
    estaCorriendoCronometro = false;
    tiempoCronometro = 0;
    displayCronometro.textContent = "00:00:00";
});

// Eventos: Temporizador
botonIniciarTemporizador.addEventListener('click', () => {
    if (!estaCorriendoTemporizador) {
        const minutos = parseInt(minutosInput.value) || 0;
        const segundos = parseInt(segundosInput.value) || 0;
        tiempoInicialTemporizador = (minutos * 60) + segundos;
        if (tiempoInicialTemporizador > 0) {
            tiempoRestanteTemporizador = tiempoInicialTemporizador;
            estaCorriendoTemporizador = true;
            actualizarTemporizador();
            intervaloTemporizador = setInterval(actualizarTemporizador, 1000);
        } else {
            alert('Por favor, ingrese un tiempo válido mayor a 0.');
        }
    }
});
botonPausarTemporizador.addEventListener('click', () => {
    if (estaCorriendoTemporizador) {
        clearInterval(intervaloTemporizador);
        estaCorriendoTemporizador = false;
    }
});
botonResetTemporizador.addEventListener('click', () => {
    clearInterval(intervaloTemporizador);
    estaCorriendoTemporizador = false;
    tiempoRestanteTemporizador = tiempoInicialTemporizador;
    displayTemporizador.textContent = formatearTiempoTemporizador(tiempoRestanteTemporizador);
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');

    function toggleTheme() {

        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            moonIcon.classList.add('d-none');
            sunIcon.classList.remove('d-none');
        } else {
            moonIcon.classList.remove('d-none');
            sunIcon.classList.add('d-none');
        }
    }

    themeToggleBtn.addEventListener('click', toggleTheme);
});