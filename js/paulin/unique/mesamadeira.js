window.mesamadeira = 0;
window.mesamadeiraCustoAtual = 1000;

window.mesamadeiraAction = function (){
    if(money >= window.mesamadeiraCustoAtual && window.mesamadeira < 1) {
        money -= window.mesamadeiraCustoAtual;
        exibeMoney();
        window.mesamadeira++;
        $('.mesa-madeira-progress-info').html(window.mesamadeira+'/1');
        $('.mesa-madeira-progress')[0].style.width = window.mesamadeira+"00%";

        $('.mesa-madeira-value').html('Maximo atingido');
        $('#mesa').removeClass("mesa_branca");
	    $('#mesa').addClass("mesa_madeira");

        clickValue = clickValue + 10;
    }
}



