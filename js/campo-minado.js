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
    } else if (difficulty == 'medium') {
        size =10;
    } else if (difficulty == 'hard') {
        size = 15;
    } else if (difficulty == 'rufino') {
        size = 40;
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

    for (var i = 0; i < size; i++) {
        finalboard += "<div class='row'>";

        for (var y = 0; y < size; y++) {
            finalboard += "<div class='square'><p></p></div>";
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