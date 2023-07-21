const inicio = new Date('2023-04-12 00:00:00');
const hoje = new Date();

$('#box-mes-dia').html(MostraMesDias(inicio, hoje));
$('#box-semanas').html(MostraSemanasDias(inicio, hoje));
$('#curiosidade').html(Curiosidade(inicio, hoje));

function MostraMesDias(inicio, hoje) {
    var exibir = "";

    //diferença de dias entre o dia 1 e o dia atual
    var diff = inicio.getDate() -1;

    //removendo a diferença, a data vai ficar como dia 1
    inicio.setDate(inicio.getDate() - diff);
    var mesinicio = Math.abs(inicio.getMonth()+1); //+1 apenas para deixar a numeracao correta, ja que "janeiro" começa com o valor "0"

    //removendo a diferença que possuia do inicio, hoje pode acabar mudando de mês, e com isso, verificar se é diferente do mês de inicio
    hoje.setDate(hoje.getDate() - diff);
    var meshoje = Math.abs(hoje.getMonth()+1); //+1 apenas para deixar a numeracao correta, ja que "janeiro" começa com o valor "0"

    exibir = meshoje - mesinicio;
     
    return "<p>"+exibir+" meses e "+ Math.abs(hoje.getDate()-1) +" dias</p>";
}

function MostraSemanasDias(inicio, hoje) {
    const totaldias = Math.ceil(Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24));
    var semanas = 0;
    var dias = 0;
    var exibir = "";

    //contagem de semanas (sem valor quebrado igual em totaldias/7)
    for (var i = 0; i <= totaldias/7; i++) {
        semanas = i;
    }

    //verifica os dias que faltaram para completar uma semana
    dias = totaldias - (7*semanas);
     
    if (dias > 0) {
        exibir = semanas + " semanas e " + dias + " dias";
    } else {
        exibir = semanas + " semanas";
    }
     
    return "<p>"+exibir+"</p>";
}

function Curiosidade(inicio, hoje) {
    const totaldias = Math.ceil(Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24));
    var semanas = 0;
    var dias = 0;
    var exibir = "";

    //contagem de semanas (sem valor quebrado igual em totaldias/7)
    for (var i = 0; i <= totaldias/7; i++) {
        semanas = i;
    }

    //verifica os dias que faltaram para completar uma semana
    dias = totaldias - (7*semanas);

    console.log(semanas);
    switch (semanas) {
        //primeiro trimestre
        case 1:
            exibir = "<p>Você já descobriu a gravidez? sério?</p>";
            break;
        case 2:
            exibir = "<p>Ainda é muito pequeno para informar um tamanho</p>";
            break;
        case 3:
            exibir = "<p>Se tiver 1 mm de tamanho é muuuuito</p>";
            break;
        case 4:
            exibir = "<p>aproximadamente 2 mm</p>";
            break;
        case 5:
            exibir = "<p>aproximadamente 3 mm</p>";
            break;
        case 6:
            exibir = "<p>aproximadamente 4 mm</p>";
            break;
        case 7:
            exibir = "<p>aproximadamente 8 mm</p>";
            break;
        case 8:
            exibir = "<p>aproximadamente 11 mm</p>";
            break;
        case 9:
            exibir = "<p>aproximadamente 2,5 cm</p>";
            break;
        case 10:
            exibir = "<p>aproximadamente 3 cm</p>";
            break;
        case 11:
            exibir = "<p>aproximadamente 4 cm</p>";
            break;
        case 12:
            exibir = "<p>aproximadamente 5 cm</p>";
            break;
        case 13:
            exibir = "<p>aproximadamente 7 cm</p>";
            break;
        //segundo trimestre
        case 14:
            exibir = "<p>aproximadamente 8 cm</p>";
            break;
        case 15:
            exibir = "<p>aproximadamente 10 cm</p>";
            break;
        case 16:
            exibir = "<p>aproximadamente 11 cm</p>";
            break;
        case 17:
            exibir = "<p>aproximadamente 13 cm</p>";
            break;
        case 18:
            exibir = "<p>aproximadamente 14 cm</p>";
            break;
        case 19:
            exibir = "<p>aproximadamente 15 cm</p>";
            break;
        case 20:
            exibir = "<p>aproximadamente 20 cm</p>";
            break;
        case 21:
            exibir = "<p>aproximadamente 26 cm</p>";
            break;
        case 22:
            exibir = "<p>aproximadamente 27 cm</p>";
            break;
        case 23:
            exibir = "<p>aproximadamente 29 cm</p>";
            break;
        case 24:
            exibir = "<p>aproximadamente 30 cm</p>";
            break;
        case 25:
            exibir = "<p>aproximadamente 34 cm</p>";
            break;
        case 26:
            exibir = "<p>aproximadamente 35 cm</p>";
            break;
        //Terceiro trimestre
        case 27:
            exibir = "<p>aproximadamente 36 cm</p>";
            break;
        case 28:
            exibir = "<p>aproximadamente 37 cm</p>";
            break;
        case 29:
            exibir = "<p>aproximadamente 38 cm</p>";
            break;
        case 30:
            exibir = "<p>aproximadamente 39 cm</p>";
            break;
        case 31:
            exibir = "<p>aproximadamente 41 cm</p>";
            break;
        case 32:
            exibir = "<p>aproximadamente 42 cm</p>";
            break;
        case 33:
            exibir = "<p>aproximadamente 43 cm</p>";
            break;
        case 34:
            exibir = "<p>aproximadamente 45 cm</p>";
            break;
        case 35:
            exibir = "<p>aproximadamente 46 cm</p>";
            break;
        case 36:
            exibir = "<p>aproximadamente 47 cm</p>";
            break;
        case 37:
            exibir = "<p>aproximadamente 48 cm</p>";
            break;
        case 38:
            exibir = "<p>aproximadamente 49 cm</p>";
            break;
        case 39:
            exibir = "<p>aproximadamente 50 cm</p>";
            break;
        case 40:
            exibir = "<p>aproximadamente 51 cm</p>";
            break;
        default:
            exibir = "<p>Vix, sei não</p>";
    }
    return exibir;
}

function logData(data) {
    console.log(data.getDate() + "/" + Math.abs(data.getMonth()+1) + "/" + data.getFullYear());
}

//Mano, n olha o código, sei q ta paia