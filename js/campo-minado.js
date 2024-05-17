
    var gametimer;
    var gametimerValue = 0;
    var score = 0;
    var showscore;
    var difficulty;
    var numbershowsize = 3;

$( document ).ready(function() {
    animacaoTitulo();
});

$('.option-btn').click(function () {

    difficulty = $(this).data('dif');
    //esconde seleção
    $('.game-options').hide();

    //inicia o game
    $('.game-board').show();
    montaTabela(difficulty);
});

$(document).on('click','.emojip',function(){
    reset();
});


$('#back-to-selection').click(function () {
    clearInterval(gametimer);
    //esconde board
    $('.game-board').hide();
    
    //exibe selecao
    $('.game-options').show();
});

$(document).on('click','.square',function() {
    if(!this.classList.contains("showing")) {
        checkBomb(this);
        this.classList.add("showing");
        if (difficulty == 'easy' && score == 32) {
            wingame(score, (99 - gametimerValue));
        } else if (difficulty == 'medium' && score == 75) {
            wingame(score, (999 - gametimerValue));
        } else if (difficulty == 'hard' && score == 145) {
            wingame(score, (999 - gametimerValue));
        } else if (difficulty == 'rufino' && score == 900) {
            wingame(score, (9999 - gametimerValue));
        }
    }
});

$('#secret').click(function () {
    $('.secret').show();
});

$('#apply-code').click(function () {
    var secretCode = $('#code').val();
    if (secretCode == 'wallhack') {
        wallhack();
    } else if (secretCode == '') {
        clearCodes();
    }
    $('#code').val("");
    $('.secret').hide();
});

function montaTabela (difficulty) {
    //default
    var size = 1;

    //8
    var num = '000';
    var minwid = '55px';
    
    if (difficulty == 'easy') {
        size = 6;
        bombs = espalhaBombas(4, 36);
        num = '00';
        numbershowsize = 2;
        minwid = '41px';
    } else if (difficulty == 'medium') {
        size =10;
        numbershowsize = 3;
        bombs = espalhaBombas(25, 100);
    } else if (difficulty == 'hard') {
        size = 15;
        bombs = espalhaBombas(80, 225);
    } else if (difficulty == 'rufino') {
        size = 40;
        numbershowsize = 3;
        bombs = espalhaBombas(700, 1600);
        num = '0000';
        numbershowsize = 4;
        minwid = '69px';
    }

    iniciaTimer(numbershowsize);

    var timenum = '<p class="timer-numbers" style="min-width: '+minwid+'">'+num+'</p>';
    var scorenum = '<p class="score-numbers" style="min-width: '+minwid+'">'+num+'</p>';

    var finalboard = '<div class="game-case">' +
    '<div class="case-header">' +
        '<div class="timer">' +
        timenum +
        '</div>' +
        '<div class="emoji">' +
            '<p class="emojip">🙂</p>' +
        '</div>' +
        '<div class="score">' +
        scorenum +
        '</div>' +
    '</div>' +
    '<div class="gameplay">';

    var board = [];

    for (var i = 0; i < size; i++) {
        board[i] = [];
    }

    // Distribua as bombas
    for (var i = 0; i < bombs.length; i++) {
        var bombPos = bombs[i];
        var row = Math.floor((bombPos - 1) / size);
        var col = (bombPos - 1) % size;
        board[row][col] = 'bomb';
    }

    // Marque os números ao redor das bombas
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (board[i][j] !== 'bomb') {
                var count = 0;

                // Verifique as células ao redor da célula atual
                for (var x = Math.max(0, i - 1); x <= Math.min(size - 1, i + 1); x++) {
                    for (var y = Math.max(0, j - 1); y <= Math.min(size - 1, j + 1); y++) {
                        if (board[x][y] === 'bomb') {
                            count++;
                        }
                    }
                }

                // Atribua o número contado à célula
                board[i][j] = count;
            }
        }
    }

    // Renderize o tabuleiro com os números
    for (var i = 0; i < size; i++) {
        finalboard += "<div class='row'>";

        for (var j = 0; j < size; j++) {
            if (board[i][j] === 'bomb') {
                finalboard += "<div class='square bomb'><p>💣</p></div>";
            } else {
                if(board[i][j] != 0) {
                    finalboard += "<div class='square around-"+board[i][j]+"'><p><b>" + board[i][j] + "</b></p></div>";
                } else {
                    finalboard += "<div class='square none'><p></p></div>";
                }
            }
        }

        finalboard += "</div>";
    }

    finalboard += "</div></div>";

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

function checkBomb(el) {
    if (el.classList.contains("bomb")) {
       lose();
    } else {
        score++;
        showscore = score.toString();
        while (showscore.length < numbershowsize) showscore = "0" + showscore;
        $('.score-numbers').html(showscore);
        $('.emojip').html("😲");
        setTimeout(function (){
            $('.emojip').html("🙂")
        }, 200);
    }
}

function iniciaTimer(size){
    var timer = 0;
    gametimer = setInterval(function() {
        timer++;

        if (timer.toString().length <= size) {
            num = timer.toString();
            while (num.length < size) num = "0" + num;
            gametimerValue = num;
            $('.timer-numbers').html(gametimerValue);
        } else {
            alert("Acabou o tempo mané");
            lose();
        }
        
      }, 1000);
}

function reset() {
    clearInterval(gametimer);
    montaTabela(difficulty);
}

function lose(){
    clearInterval(gametimer);
    $('.square').addClass("showing");
    $('.emojip').html("☠️");
    score = 0;
}

function wingame(totalScore, TimeBonusScore) {
    clearInterval(gametimer);
    score = 0;
    setTimeout(function (){
        $('.emojip').html("😎");
        alert("GG \nPontuação: " + totalScore + "\nBonus de tempo: " + TimeBonusScore + "\nPontuação Total: " + (totalScore + TimeBonusScore));
    }, 300);
}

// Codes

function wallhack(){
    $('.game-board').addClass("code1");
}

function clearCodes(){
    $('.game-board').removeClass("code1");
}