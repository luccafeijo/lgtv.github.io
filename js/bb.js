const inicio = new Date('2023-04-12 00:00:00');

const hoje = new Date();

$('#box-mes-dia').html(MostraMesDias(inicio, hoje));
$('#box-semanas').html(MostraSemanasDias(inicio, hoje));

function MostraMesDias(inicio, hoje) {
    const monthDiff = hoje.getMonth() - inicio.getMonth();
    const yearDiff = hoje.getYear() - inicio.getYear();
    const meses = monthDiff + yearDiff * 12;

    // console.log(Math.ceil(Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24)));
    return "<p>x mês e x dias</p>";
}

function MostraSemanasDias(inicio, hoje) {
    const totaldias = Math.ceil(Math.abs(hoje - inicio) / (1000 * 60 * 60 * 24));
    var semanas = 0;
    var dias = 0;
    var exibir = "";

    for (var i = 0; i <= totaldias/7; i++) {
        semanas = i;
    }

    dias = totaldias - (7*semanas);
     
    if (dias > 0) {
        exibir = semanas + " semanas e " + dias + " dias";
    } else {
        exibir = semanas + " semanas";
    }
     
    return "<p>"+exibir+"</p>";
}