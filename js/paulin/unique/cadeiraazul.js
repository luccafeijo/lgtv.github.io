window.cadeiraazul = 0;
window.cadeiraazulCustoAtual = 1000;

window.cadeiraazulAction = function (){
    if(money >= window.cadeiraazulCustoAtual && window.cadeiraazul < 1) {
        money -= window.cadeiraazulCustoAtual;
        exibeMoney();
        window.cadeiraazul++;
        $('.cadeira-azul-progress-info').html(window.cadeiraazul+'/1');
        $('.cadeira-azul-progress')[0].style.width = window.cadeiraazul+"00%";

        $('.cadeira-azul-value').html('Maximo atingido');
        $('#cadeira').removeClass("cadeira_verde");
	    $('#cadeira').addClass("cadeira_azul");

        passiveMoney += 10;
    }
}



