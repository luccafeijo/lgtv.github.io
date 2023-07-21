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
    var semanas = getsemanas(totaldias);
    var exibir = "";

    //verifica os dias que faltaram para completar uma semana
    diasRestantes = totaldias - (7*semanas);
     
    if (diasRestantes > 0) {
        exibir = semanas + " semanas e " + diasRestantes + " dias";
    } else {
        exibir = semanas + " semanas";
    }
     
    return "<p>"+exibir+"</p>";
}

function Curiosidade(inicio, hoje) {
    const totaldias = Math.ceil(Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24));
    var semanas = getsemanas(totaldias);

    //verifica os dias que faltaram para completar uma semana
    diasRestantes = totaldias - (7*semanas);

    //base tamanho
    //https://blog-pt.kinedu.com/tamanho-do-bebe/
    switch (semanas) {
        //primeiro trimestre
        case 1:
            return "<p>Você já descobriu a gravidez? sério?</p>";
            break;
        case 2:
            return "<p>Ainda é muito pequeno para informar um tamanho</p>";
            break;
        case 3:
            return "<p>Se tiver 1 mm de tamanho é muuuuito</p>";
            break;
        case 4:
            return "<p>aproximadamente 2 mm</p>";
            break;
        case 5:
            return "<p>aproximadamente 3 mm</p>";
            break;
        case 6:
            return "<p>aproximadamente 4 mm</p>";
            break;
        case 7:
            return "<p>aproximadamente 8 mm</p>";
            break;
        case 8:
            return "<p>aproximadamente 11 mm</p>";
            break;
        case 9:
            return "<p>aproximadamente 2,5 cm</p>";
            break;
        case 10:
            return "<p>aproximadamente 3 cm</p>";
            break;
        case 11:
            return "<p>aproximadamente 4 cm</p>";
            break;
        case 12:
            return "<p>aproximadamente 5 cm</p>";
            break;
        case 13:
            return "<p>aproximadamente 7 cm</p>";
            break;
        //segundo trimestre
        case 14:
            return "<p>aproximadamente 8 cm</p>";
            break;
        case 15:
            return "<p>aproximadamente 10 cm</p>";
            break;
        case 16:
            return "<p>aproximadamente 11 cm</p>";
            break;
        case 17:
            return "<p>aproximadamente 13 cm</p>";
            break;
        case 18:
            return "<p>aproximadamente 14 cm</p>";
            break;
        case 19:
            return "<p>aproximadamente 15 cm</p>";
            break;
        case 20:
            return "<p>aproximadamente 20 cm</p>";
            break;
        case 21:
            return "<p>aproximadamente 26 cm</p>";
            break;
        case 22:
            return "<p>aproximadamente 27 cm</p>";
            break;
        case 23:
            return "<p>aproximadamente 29 cm</p>";
            break;
        case 24:
            return "<p>aproximadamente 30 cm</p>";
            break;
        case 25:
            return "<p>aproximadamente 34 cm</p>";
            break;
        case 26:
            return "<p>aproximadamente 35 cm</p>";
            break;
        //Terceiro trimestre
        case 27:
            return "<p>aproximadamente 36 cm</p>";
            break;
        case 28:
            return "<p>aproximadamente 37 cm</p>";
            break;
        case 29:
            return "<p>aproximadamente 38 cm</p>";
            break;
        case 30:
            return "<p>aproximadamente 39 cm</p>";
            break;
        case 31:
            return "<p>aproximadamente 41 cm</p>";
            break;
        case 32:
            return "<p>aproximadamente 42 cm</p>";
            break;
        case 33:
            return "<p>aproximadamente 43 cm</p>";
            break;
        case 34:
            return "<p>aproximadamente 45 cm</p>";
            break;
        case 35:
            return "<p>aproximadamente 46 cm</p>";
            break;
        case 36:
            return "<p>aproximadamente 47 cm</p>";
            break;
        case 37:
            return "<p>aproximadamente 48 cm</p>";
            break;
        case 38:
            return "<p>aproximadamente 49 cm</p>";
            break;
        case 39:
            return "<p>aproximadamente 50 cm</p>";
            break;
        case 40:
            return "<p>aproximadamente 51 cm</p>";
            break;
        default:
            return "<p>Vix, sei não</p>";
    }
}

function getsemanas(totaldias) {
    //contagem de semanas (sem valor quebrado igual em totaldias/7)
    for (var i = 0; i <= totaldias/7; i++) {
        semanas = i;
    }

    return semanas;
  }

function logData(data) {
    console.log(data.getDate() + "/" + Math.abs(data.getMonth()+1) + "/" + data.getFullYear());
}

//Mano, n olha o código, sei q ta paia