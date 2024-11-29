// script.js

// Defineix les cares per cada valoració
var cares = {
    1: '😢',
    2: '😐',
    3: '😊'
};

// Obtenim les preguntes i el formulari
var preguntes = document.querySelectorAll('.pregunta');
var botoEnviar = document.getElementById('enviar');
var botoMostrar = document.getElementById('mostrar-respostes');
var contenedorRespostes = document.getElementById('totes-les-respostes');

// Objecte per emmagatzemar respostes
var respostes = {};

// Per cada pregunta, afegim els esdeveniments a les opcions
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

// Quan s'envien les respostes
botoEnviar.addEventListener('click', function() {
    if (Object.keys(respostes).length < 6) {
        alert('Si us plau, respon totes les preguntes!');
        return;
    }

    // Generem el resum de les respostes amb les caretes
    var resum = 'Has guardat les següents respostes:\n';
    var preguntaCount = 1;
    
    for (var pregunta in respostes) {
        // Agafem el valor de la resposta i convertim a la cara corresponent
        var resposta = respostes[pregunta];
        resum += `Pregunta ${preguntaCount}: ${cares[resposta]} (${resposta})\n`;
        preguntaCount++;
    }

    // Guardem les respostes al localStorage amb un ID únic
    var idUsuari = 'usuari_' + Date.now();
    localStorage.setItem(idUsuari, JSON.stringify(respostes));

    // Mostrem el missatge amb el resum
    alert(resum + '\nGràcies per la teva valoració!');

    // Reiniciem el formulari per un nou usuari
    preguntes.forEach(function(pregunta) {
        var cares = pregunta.querySelectorAll('.cara');
        cares.forEach(function(c) {
            c.classList.remove('seleccionada');
        });
    });
    respostes = {};
});

// Quan es mostren totes les respostes guardades
botoMostrar.addEventListener('click', function() {
    contenedorRespostes.innerHTML = ''; // Reiniciem el contingut
    if (localStorage.length === 0) {
        contenedorRespostes.innerHTML = '<p>No hi ha respostes guardades encara.</p>';
        return;
    }
    
    // Recollim totes les respostes guardades i les mostrem
    for (var i = 0; i < localStorage.length; i++) {
        var clau = localStorage.key(i);
        // Comprovem si la clau correspon a un usuari
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
});
