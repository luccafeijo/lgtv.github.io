$( document ).ready(function() {
    animacaoTitulo();
});

$('.option-btn').click(function () {

    var difficulty = $(this).data('dif');
    //esconde seleção
    $('.game-options').hide();

    //inicia o game
    $('.game-board').show();
    // espalhaBomba();
    montaTabela(difficulty);
});

$('#back-to-selection').click(function () {
    //esconde board
    $('.game-board').hide();
    
    //exibe selecao
    $('.game-options').show();
});

function montaTabela (difficulty) {
    //default
    var size = 1;

    //8
    if (difficulty == 'easy') {
        size = 5;
        bombs = espalhaBombas(4, 25);
    } else if (difficulty == 'medium') {
        size =10;
        bombs = espalhaBombas(25, 100);
    } else if (difficulty == 'hard') {
        size = 15;
        bombs = espalhaBombas(80, 225);
    } else if (difficulty == 'rufino') {
        size = 40;
        bombs = espalhaBombas(700, 1600);
    }

    var finalboard = '<div class="game-case">' +
    '<div class="case-header">' +
        '<div class="timer">' +
            '<p class="numbers">000</p>' +
        '</div>' +
        '<div class="emoji">' +
            '<p class="emojip">🙂</p>' +
        '</div>' +
        '<div class="score">' +
            '<p class="numbers">000</p>' +
        '</div>' +
    '</div>' +
    '<div class="gameplay">';

    var contagem = 0;

    for (var i = 0; i < size; i++) {
        finalboard += "<div class='row'>";

        for (var y = 0; y < size; y++) {
            contagem++;
            if(bombs.includes(contagem)) {
                finalboard += "<div class='square'><p>?</p></div>";
            } else {
                finalboard += "<div class='square'><p></p></div>";
            }
            // console.log(finalboard.length);
        }

        finalboard += "</div>";
    }
    finalboard += "</div>" +
    "</div>";

    $('#game-active').html(finalboard);
}

function animacaoTitulo(){

    let delay = 200;
    
    let h1 = document.getElementById("wave_animated");

    // console.log(h1.innerHTML.split(""));
    text = h1.innerHTML;
    h1.innerHTML = text
    .split("")
    .map(letter => {
        return `<span>` + letter + `</span>`;
    })
    .join("");

    Array.from(h1.children).forEach((span, index) => {
        setTimeout(() => {
            span.classList.add("wavy");
        }, index * 60 + delay);
    });
}

function espalhaBombas(quantidade, totalArea) {
    var array = [];
    while (array.length < quantidade) {
        var randomNumber = getRandomNumber(1, totalArea);
        if (!array.includes(randomNumber)) {
          array.push(randomNumber);
        }
    }
    return array;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }