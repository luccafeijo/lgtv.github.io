
    var gametimer;
    var gametimerValue = 0;
    var score = 0;
    var showscore;
    var difficulty;
    var numbershowsize = 3;
    var flag = 0;

    //hacks
    var patrickHack;
    var ggizi = 0;

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

$(document).on("keypress", function (e) {
    // use e.which
    if(e.keyCode == 102) {
        if(flag == 0) {
            flag = 1;
            $('.flag-notification').show();
        } else {
            flag = 0;
            $('.flag-notification').hide();
        }
    }
});

$(document).on('click','.square',function() {
    if(!flag) {
        
        if(ggizi) {
            izi();
        }

        checkSquare(this);
    } else {
        setFlag(this);
    }
});

$(document).on('click','.square-flag',function() {
    if(flag) {
        $('.flag-'+this.dataset.num).hide();
    }
});

$('#secret').click(function () {
    $('.secret').show();
    $('#code').focus();
});

$('.close-secret').click(function () {
    $('#code').val("");
    $('.secret').hide();
});

$("#code").on("keypress", function (e) {
    if(e.keyCode == 13) {
        $('#apply-code').trigger('click');
    }
});

$('#apply-code').click(function () {
    var secretCode = $('#code').val();
    //code "wallhack"
    if (secretCode == 'wallhack') {
        wallhack();
    //code "patrick"
    } else if (secretCode == 'patrick') {
        noTime();
    //code "god"
    } else if (secretCode == 'god') {
        godmode();
    //code "lgtv"
    } else if (secretCode == 'lgtv') {
        lgtv();
    //code "miope"
    } else if (secretCode == 'miope') {
        miope();
    //code "ggizi"
    } else if (secretCode == 'ggizi') {
        ggizi = 1;
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
        bombs = espalhaBombas(20, 100);
    } else if (difficulty == 'hard') {
        size = 15;
        bombs = espalhaBombas(60, 225);
    } else if (difficulty == 'rufino') {
        size = 40;
        numbershowsize = 3;
        bombs = espalhaBombas(500, 1600);
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

    var squarenum = 0;
    for (var i = 0; i < size; i++) {
        finalboard += "<div class='row' data-size='"+size+"'>";

        for (var j = 0; j < size; j++) {
            squarenum++;
            finalboard += "<div class='square-flag flag-"+squarenum+"' data-num='"+squarenum+"'><p>🚩</p></div>";
            if (board[i][j] === 'bomb') {
                finalboard += "<div class='square bomb num-"+squarenum+"' data-num='"+squarenum+"'><p>💣</p></div>";
            } else {
                if(board[i][j] != 0) {
                    finalboard += "<div class='square num-"+squarenum+" around-"+board[i][j]+"' data-num='"+squarenum+"'><p><b>" + board[i][j] + "</b></p></div>";
                } else {
                    finalboard += "<div class='square num-"+squarenum+" none' data-num='"+squarenum+"'><p></p></div>";
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

function checkSquare(element) {
    if(!element.classList.contains("showing")) {
        element.classList.add("showing");
        checkBomb(element);

        if (difficulty == 'easy' && score == 32) {
            wingame(score, (99 - gametimerValue));
        } else if (difficulty == 'medium' && score == 80) {
            wingame(score, (999 - gametimerValue));
        } else if (difficulty == 'hard' && score == 165) {
            wingame(score, (999 - gametimerValue));
        } else if (difficulty == 'rufino' && score == 1100) {
            wingame(score, (9999 - gametimerValue));
        }
    }
}

function setFlag(element){
    // console.log(element.dataset.num);
    $('.flag-'+element.dataset.num).show();
}

function checkBomb(el) {
    if (el.classList.contains("bomb")) {
       lose();
    } else {
        score++;
        showscore = score.toString();
        while (showscore.length < numbershowsize) showscore = "0" + showscore;
        if (el.classList.contains("none")) {
            triggerClickAround(el.dataset.num, el.parentElement.dataset.size);
        }
        $('.score-numbers').html(showscore);
        $('.emojip').html("😲");
        setTimeout(function (){
            $('.emojip').html("🙂")
        }, 200);
    }
}

function triggerClickAround(atual, size) {
    primeiro = 1;
    bordaEsquerda = [];
    bordaDireita = [];
    bordaSuperior = [primeiro];

    ultimo = parseInt(size);
    bordaInferior = [ultimo];

    for (var i = 1; i < size; i++) {
        primeiro += parseInt(size);
        bordaSuperior.push(primeiro);

        ultimo += parseInt(size);
        bordaInferior.push(ultimo);
    }

    for (var i = 1; i <= size; i++) {
        bordaEsquerda.push(i);
        bordaDireita.push(ultimo + 1 - i);
    }

    emvolta = [];
    const actualSquare = parseInt(atual);
    const actualSize = parseInt(size);

    if(bordaSuperior.includes(actualSquare)) {
        //canto superior esquerdo
        if (bordaEsquerda.includes(actualSquare)) {
            emvolta.push((actualSquare + 1));
            emvolta.push((actualSquare + actualSize));
            emvolta.push((actualSquare + actualSize + 1));
        
        //canto superior direito
        } else if (bordaDireita.includes(actualSquare)) {
            emvolta.push((actualSquare - actualSize));
            emvolta.push((actualSquare - actualSize + 1));
            emvolta.push((actualSquare + 1));

        //canto superior no meio
        } else {
            emvolta.push((actualSquare - actualSize));
            emvolta.push((actualSquare - actualSize + 1));

            emvolta.push((actualSquare + 1));

            emvolta.push((actualSquare + actualSize));
            emvolta.push((actualSquare + actualSize + 1));
        }
    } else if (bordaInferior.includes(actualSquare)) {
       //canto inferior esquerdo
        if (bordaEsquerda.includes(actualSquare)) {
            emvolta.push((actualSquare - 1));
            emvolta.push((actualSquare + actualSize - 1));
            emvolta.push((actualSquare + actualSize));
    
        //canto inferior direito
        } else if (bordaDireita.includes(actualSquare)) {
            emvolta.push((actualSquare - actualSize - 1));
            emvolta.push((actualSquare - actualSize));
            emvolta.push((actualSquare - 1));

        //canto inferior no meio
        } else {
            emvolta.push((actualSquare - actualSize - 1));
            emvolta.push((actualSquare - actualSize));

            emvolta.push((actualSquare - 1));

            emvolta.push((actualSquare + actualSize - 1));
            emvolta.push((actualSquare + actualSize));
        }
    } else if (bordaEsquerda.includes(actualSquare)) {
        emvolta.push((actualSquare - 1));
        emvolta.push((actualSquare + 1));

        emvolta.push((actualSquare + actualSize - 1));
        emvolta.push((actualSquare + actualSize));
        emvolta.push((actualSquare + actualSize + 1));
    } else if (bordaDireita.includes(actualSquare)) {
        emvolta.push((actualSquare - actualSize - 1));
        emvolta.push((actualSquare - actualSize));
        emvolta.push((actualSquare - actualSize + 1));

        emvolta.push((actualSquare - 1));
        emvolta.push((actualSquare + 1));
    } else {
        emvolta.push((actualSquare - actualSize - 1));
        emvolta.push((actualSquare - actualSize));
        emvolta.push((actualSquare - actualSize + 1));

        emvolta.push((actualSquare - 1));
        emvolta.push((actualSquare + 1));

        emvolta.push((actualSquare + actualSize - 1));
        emvolta.push((actualSquare + actualSize));
        emvolta.push((actualSquare + actualSize + 1));
    }

    emvolta.forEach(function(numero, i) {
        if(numero >= 1 && numero <= ultimo) {
            $('.num-'+numero).trigger('click');
            // $('.num-'+numero).addClass("showing");
        }
    });
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
    score = 0;
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

function izi(){
    $('.square').addClass("showing");
    wingame(999999999, 1);
}

// Codes

function wallhack(){
    $('.game-board').addClass("code1");
}

function noTime() {
    patrickHack = setInterval(function() {
        clearInterval(gametimer);
    }, 500);
}

function godmode() {
    $('.game-case').addClass("spingod");
}

function lgtv() {
    $('.game-board').addClass("lgtv");
}

function miope() {
    $('.game-board').addClass("blur");
}

function clearCodes(){
    $('.game-board').removeClass("code1");
    $('.game-case').removeClass("spingod");
    $('.game-board').removeClass("lgtv");
    $('.game-board').removeClass("blur");
    clearInterval(patrickHack);
    ggizi = 0;
}