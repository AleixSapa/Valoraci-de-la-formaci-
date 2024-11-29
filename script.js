// script.js

var cares = {
    1: '😢',
    2: '😐',
    3: '😊'
};

// Obtenim els botons i el contenidor de respostes
var botoEnviar = document.getElementById('enviar');
var botoMostrar = document.getElementById('mostrar-respostes');
var botoEliminar = document.getElementById('eliminar-respostes');
var contenedorRespostes = document.getElementById('totes-les-respostes');

// Objecte per emmagatzemar respostes
var respostes = {};

// La contrasenya per mostrar o eliminar les respostes
var contrasenya = 'Tita T\'estimo';  // Aquí es canvia la contrasenya

// Funció per mostrar totes les respostes
function mostrarRespostes() {
    var inputContrasenya = prompt("Introdueix la contrasenya per veure les respostes:");
    if (inputContrasenya === contrasenya) {
        contenedorRespostes.innerHTML = ''; // Reiniciem el contingut
        if (localStorage.length === 0) {
            contenedorRespostes.innerHTML = '<p>No hi ha respostes guardades encara.</p>';
            return;
        }

        // Recollim totes les respostes guardades i les mostrem
        for (var i = 0; i < localStorage.length; i++) {
            var clau = localStorage.key(i);
            if (clau.startsWith('usuari_')) {
                var respostesGuardades = JSON.parse(localStorage.getItem(clau));
                var llista = `<h3>Respostes de ${clau}:</h3><ul>`;
                for (var pregunta in respostesGuardades) {
                    llista += `<li>${pregunta}: ${cares[respostesGuardades[pregunta]]} (${respostesGuardades[pregunta]})</li>`;
                }
                llista += '</ul>';
                contenedorRespostes.innerHTML += llista;
            }
        }
    } else {
        alert("Contrasenya incorrecta.");
    }
}

// Funció per eliminar totes les respostes
function eliminarRespostes() {
    var inputContrasenya = prompt("Introdueix la contrasenya per eliminar les respostes:");
    if (inputContrasenya === contrasenya) {
        if (localStorage.length === 0) {
            alert("No hi ha respostes guardades per eliminar.");
        } else {
            localStorage.clear();
            alert("Totes les respostes han estat eliminades.");
        }
    } else {
        alert("Contrasenya incorrecta.");
    }
}

// Quan es volen enviar les respostes
botoEnviar.addEventListener('click', function() {
    // Comprovem que s'han respost totes les preguntes
    if (Object.keys(respostes).length < 6) {
        alert('Si us plau, respon totes les preguntes!');
        return;
    }

    // Demanem el nom de l'usuari abans de guardar les respostes
    var nomUsuari = prompt("Introdueix el teu nom:");

    if (nomUsuari) {
        // Guardem les respostes al localStorage amb el nom de l'usuari com a identificador
        var idUsuari = 'usuari_' + nomUsuari;
        localStorage.setItem(idUsuari, JSON.stringify(respostes));

        alert('Gràcies per la teva valoració!');
        location.reload();  // Reiniciem el formulari per un nou usuari
        respostes = {};  // Esborrem les respostes
    } else {
        alert("El nom és necessari per guardar les respostes.");
    }
});

// Afegir esdeveniments per a cada cara de valoració
var preguntes = document.querySelectorAll('.pregunta');
preguntes.forEach(function(pregunta, index) {
    var caresPregunta = pregunta.querySelectorAll('.cara');
    caresPregunta.forEach(function(cara) {
        cara.addEventListener('click', function() {
            // Desseleccionem totes les cares
            caresPregunta.forEach(function(c) {
                c.classList.remove('seleccionada');
            });
            // Seleccionem la cara clicada
            cara.classList.add('seleccionada');
            // Guardem la resposta
            var valor = cara.getAttribute('data-valor');
            respostes['pregunta' + (index + 1)] = valor;
        });
    });
});

// Afegim els esdeveniments per mostrar i eliminar respostes
botoMostrar.addEventListener('click', mostrarRespostes);
botoEliminar.addEventListener('click', eliminarRespostes);
