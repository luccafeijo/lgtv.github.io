let listaNomes = [];
let ordem = 0;
let inicial = true;
let umnome = true;

$( document ).ready(function() {
    $('#perguntas1').show();
    $('#perguntas2').hide();
    $('#resultado').hide();
});


$('#etapa1').click(function () {
    var quantidade = $('#quantidade_pessoas').val();
    if(quantidade && $.isNumeric(quantidade)) {
        $('#perguntas1').hide();
        $('#perguntas2').show();
        
        var perguntas2 = '<h2>Informe os nomes</h2><br/>';
        for (var i = 1; i <= quantidade; i++) {
            perguntas2 += '<p>Pessoa '+i+' </p><input type="text" id="pessoa'+i+'" required minlength="2" maxlength="15" size="15" /><br/><br/>';
        }
        perguntas2 += '<button id="etapa2">Continuar</button>';

        $('#perguntas2').html(perguntas2);
    }
});

$('body').on('click', '#etapa2', function(){
    
    var quantidade = $('#quantidade_pessoas').val();
    for (var i = 1; i <= quantidade; i++) {
        listaNomes.push($('#pessoa'+i).val());
    }

    shuffleArray(listaNomes);
    $('#perguntas2').hide();
    $('#resultado').show(mostraResultado(listaNomes[0], null));
});

$('body').on('click', '#proximoNome', function() {
    if (inicial) {
        if (listaNomes[1]) {
            mostraResultado(listaNomes[0], listaNomes[1]);
            inicial = false;
            ordem = 0;
        }
    } else {
        if(umnome) {
            mostraResultado(listaNomes[ordem+1], null);
            umnome = false;
        } else {
            ordem += 1;
            if(listaNomes[ordem+1]) {
                mostraResultado(listaNomes[ordem], listaNomes[ordem+1]);
                umnome = true;
            } else {
                mostraResultado(listaNomes[ordem], listaNomes[0]);
                ordem = -1;
                umnome = true;
            }
        }
    }
    
});

function mostraResultado(etapa, target) {
    console.log("etapa");
    console.log(etapa);
    console.log("target");
    console.log(target);
    var resultado = '<h2>Resultado:</h2>';
    resultado += '<p>' + etapa + '</p>';
    if(target) {
        resultado += '<p>↓</p>';
        resultado += '<p>' + target + '</p>';
    }
    resultado += '<button id="proximoNome">Continuar</button>';
    $('#resultado').html(resultado);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}