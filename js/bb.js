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
    
    var anoinicio = Math.abs(inicio.getFullYear());
    var anohoje = Math.abs(hoje.getFullYear());

    var diferenca_ano = 0;

    if(anohoje > anoinicio) {
        diferenca_ano = 12 * (anohoje-anoinicio);
    }
    
    var mesinicio = Math.abs(inicio.getMonth()+1); //+1 apenas para deixar a numeracao correta, ja que "janeiro" começa com o valor "0"

    //removendo a diferença que possuia do inicio, hoje pode acabar mudando de mês, e com isso, verificar se é diferente do mês de inicio
    hoje.setDate(hoje.getDate() - diff);
    var meshoje = Math.abs(hoje.getMonth()+1); //+1 apenas para deixar a numeracao correta, ja que "janeiro" começa com o valor "0"
    exibir = (meshoje - mesinicio) + diferenca_ano;
     
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

    let semanaTamanho = [
        null, //0
        null, //1 - começo primeiro trimestre
        null, //2
        null, //3
        "1 mm", //4
        "3 mm", //5
        "4 mm", //6
        "8 mm", //7
        "11 mm", //8
        "2,5 cm", //9
        "3 cm", //10
        "4 cm", //11
        "5 cm", //12
        "7 cm", //13
        "8 cm", //14 - começo segundo trimestre
        "10 cm", //15
        "11 cm", //16
        "13 cm", //17
        "14 cm", //18
        "15 cm", //19
        "20 cm", //20
        "26 cm", //21
        "27 cm", //22
        "29 cm", //23
        "30 cm", //24
        "34 cm", //25
        "35 cm", //26
        "36 cm", //27 - começo terceiro trimestre
        "37 cm", //28
        "38 cm", //29
        "39 cm", //30
        "41 cm", //31
        "42 cm", //32
        "43 cm", //33
        "45 cm", //34
        "46 cm", //35
        "47 cm", //36
        "48 cm", //37
        "49 cm", //38
        "50 cm", //39
        "51 cm", //40
    ];

    if (semanas >= 1 && semanas <= 40) {
        if (semanas == 1) {
            return "<p>Você já descobriu a gravidez? sério?</p>";
        } else if (semanas == 2) {
            return "<p>Ainda é muito pequeno para informar um tamanho</p>";
        } else if (semanas == 3) {
            return "<p>Se tiver 1 mm de tamanho é muuuuito</p>";
        } else {
            return "<p>aproximadamente "+ semanaTamanho[semanas] +"</p>";
        }
    } else {
        return "<p>Vix, sei não, deve estar gigante!</p>";
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