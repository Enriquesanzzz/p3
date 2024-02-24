let nombreJugador = "";
let puntuacion = 0;
let preguntas = [];

function cargarPreguntas() {
  // Cargar las preguntas desde el archivo JSON local
  fetch('restcountries.json')
    .then(response => response.json())
    .then(data => {
      // Asumiendo que el formato del JSON es un array de países
      preguntas = data;
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function iniciarJuego() {
  const inputNombre = document.getElementById("nombre");
  nombreJugador = inputNombre.value.trim();

  if (nombreJugador !== "") {
    // Guarda el nombre del jugador en el almacenamiento local
    localStorage.setItem("nombreJugador", nombreJugador);

    // Redirige a la página del juego
    window.location.href = 'juego.html';
  } else {
    alert("Por favor, ingresa tu nombre.");
  }
}

function cargarPregunta() {
  // Obtén una pregunta aleatoria del array preguntas
  const preguntaActual = preguntas[Math.floor(Math.random() * preguntas.length)];

  // Muestra la bandera en el contenedor correspondiente.
  const banderaContainer = document.getElementById("bandera-container");
  // Utilizamos el campo "flags" para obtener la URL del PNG
  const urlPNG = preguntaActual.flags.png;
  banderaContainer.innerHTML = `<img src="${urlPNG}" alt="Bandera de ${preguntaActual.name.common}">`;

  // Muestra las opciones en el contenedor correspondiente.
  const opcionesContainer = document.getElementById("opciones-container");

  // Crea un array con las opciones
  const opciones = [preguntaActual.name.common];

  // Agrega otras opciones aleatorias del array preguntas
  for (let i = 0; i < 3; i++) {
    let opcionAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)].name.common;
    opciones.push(opcionAleatoria);
  }

  // Baraja las opciones
  opciones.sort(() => Math.random() - 0.5);

  // Muestra los botones de opciones
  opcionesContainer.innerHTML = opciones.map((opcion, index) => `<button onclick="verificarRespuesta('${opcion}', '${preguntaActual.name.common}')">${index + 1}. ${opcion}</button>`).join('');
}

function verificarRespuesta(respuesta, respuestaCorrecta) {
  // Aquí debes implementar la lógica para verificar si la respuesta es correcta.
  // Actualiza la puntuación y carga la siguiente pregunta.

  if (respuesta === respuestaCorrecta) {
    puntuacion += 1;
  }

  // Actualiza la puntuación en el DOM.
  const puntuacionElement = document.getElementById("puntos");
  puntuacionElement.textContent = puntuacion;

  // Carga la siguiente pregunta.
  cargarPregunta();
}

// Al cargar la página del juego
document.addEventListener("DOMContentLoaded", function () {
  // Recupera el nombre del jugador del almacenamiento local
  const storedNombreJugador = localStorage.getItem("nombreJugador");

  if (storedNombreJugador) {
    nombreJugador = storedNombreJugador;

    // Muestra el nombre del jugador en la página del juego
    const nombreJugadorElement = document.getElementById("nombre-jugador");
    nombreJugadorElement.textContent = `Partida de ${nombreJugador}`;

    // Carga la primera pregunta
    cargarPregunta();
  } else {
    // Si no hay nombre de jugador almacenado, redirige a la página de inicio
    window.location.href = 'index.html';
  }
});
