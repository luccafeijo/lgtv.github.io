window.netflix = 0;
window.netflixCustoAtual = 100;
window.netflixCustoAdicional = 50;

window.netflixAction = function (){
    if(money >= window.netflixCustoAtual && window.netflix < 10) {
        money -= window.netflixCustoAtual;
        exibeMoney();
        window.netflixCustoAtual += window.netflixCustoAdicional;
        window.netflix++;
        $('.netflix-progress-info').html(window.netflix+'/10');
        $('.netflix-progress')[0].style.width = window.netflix+"0%";

        if(window.netflix == 10) {
            $('.netflix-value').html('Maximo atingido');
        } else {
            $('.netflix-value').html(window.netflixCustoAtual + ' Paulocoins');
        }

        passiveMoney += 1;
    }
}