const inicio = new Date('2023-04-12 00:00:00');
const hoje = new Date();

$('#box-mes-dia').html(MostraMesDias(inicio, hoje));
$('#box-semanas').html(MostraSemanasDias(inicio, hoje));

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

function logData(data) {
    console.log(data.getDate() + "/" + Math.abs(data.getMonth()+1) + "/" + data.getFullYear());
}