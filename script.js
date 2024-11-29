// script.js

// Defineix les cares per cada valoració
var cares = {
    1: '😢',
    2: '😐',
    3: '😊'
};

// Obtenim els botons i el contenidor de respostes
var botoEnviar = document.getElementById('enviar');
var botoMostrar = document.getElementById('mostrar-respostes');
var botoReset = document.getElementById('reset');
var contenedorRespostes = document.getElementById('totes-les-respostes');

// Objecte per emmagatzemar respostes
var respostes = {};

// Modal i formulari per la contrasenya
var modal = document.getElementById("modal");
var closeModal = document.getElementById("close-modal");
var contrasenyaInput = document.getElementById("contrasenya");
var confirmarContrasenya = document.getElementById("confirmar-contrasenya");
var missatgeError = document.getElementById("missatge-error");

// Funció per mostrar el modal
function mostrarModal() {
    modal.style.display = "block";
}

// Funció per amagar el modal
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Funció per verificar la contrasenya i executar l'acció
function verificarContrasenya(accio) {
    var contrasenya = contrasenyaInput.value;

    if (contrasenya === "Tita T'estimo") {
        modal.style.display = "none"; // Tancem el modal
        if (accio === 'reset') {
            localStorage.clear();
            alert('Les respostes han estat esborrades!');
        } else if (accio === 'mostrar') {
            mostrarRespostes();
        }
    } else {
        missatgeError.style.display = "block"; // Mostrem error
    }
}

// Funció per mostrar totes les respostes guardades
function mostrarRespostes() {
    contenedorRespostes.innerHTML = ''; // Reiniciem el contingut
    if (localStorage.length === 0) {
        contenedorRespostes.innerHTML = '<p>No hi ha respostes guardades encara.</p>';
        return;
    }

    // Recollim totes les respostes guardades i les mostrem
    for (var i = 0; i < localStorage.length; i++) {
        var pregunta = localStorage.key(i);
        var resposta = localStorage.getItem(pregunta);
        contenedorRespostes.innerHTML += '<p>' + pregunta + ': ' + cares[resposta] + '</p>';
    }
}

// Funció per enviar les respostes
botoEnviar.addEventListener('click', function() {
    // Recollim totes les respostes
    var preguntes = document.querySelectorAll('.pregunta');
    preguntes.forEach(function(pregunta, index) {
        var resposta = pregunta.querySelector('.cara.seleccionada');
        if (resposta) {
            respostes['Pregunta ' + (index + 1)] = resposta.getAttribute('data-valor');
            localStorage.setItem('Pregunta ' + (index + 1), resposta.getAttribute('data-valor'));
        }
    });

    alert('Valoració enviada!');
});

// Funció per resetear les respostes
botoReset.addEventListener('click', function() {
    mostrarModal(); // Mostrem el modal per demanar la contrasenya
});

// Funció per mostrar les respostes
botoMostrar.addEventListener('click', function() {
    mostrarModal(); // Mostrem el modal per demanar la contrasenya
});

// Funció per seleccionar les cares
document.querySelectorAll('.cara').forEach(function(button) {
    button.addEventListener('click', function() {
        var pregunta = this.parentElement;
        pregunta.querySelectorAll('.cara').forEach(function(btn) {
            btn.classList.remove('seleccionada');
        });
        this.classList.add('seleccionada');
    });
});

// Comportament del botó de confirmar contrasenya
confirmarContrasenya.addEventListener('click', function() {
    verificarContrasenya('reset');
});
