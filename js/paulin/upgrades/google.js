window.google = 0;
window.googleCustoAtual = 250;
window.googleCustoAdicional = 75;

window.googleAction = function (){
    if(money >= window.googleCustoAtual && window.google < 10) {
        money -= window.googleCustoAtual;
        exibeMoney();
        window.googleCustoAtual += window.googleCustoAdicional;
        window.google++;
        $('.google-progress-info').html(window.google+'/10');
        $('.google-progress')[0].style.width = window.google+"0%";
        if(window.google == 10) {
            $('.google-value').html('Maximo atingido');
        } else {
            $('.google-value').html(window.googleCustoAtual + ' Paulocoins');

        }
        autoWork2++;
    }
}