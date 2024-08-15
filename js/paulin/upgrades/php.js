window.php = 0;
window.phpCustoAtual = 250;
window.phpCustoAdicional = 110;

window.phpAction = function (){
    if(money >= window.phpCustoAtual && window.php < 10) {
        money -= window.phpCustoAtual;
        exibeMoney();
        window.phpCustoAtual += window.phpCustoAdicional;
        window.php++;
        $('.php-progress-info').html(window.php+'/10');
        $('.php-progress')[0].style.width = window.php+"0%";

        if(window.php == 10) {
            $('.php-value').html('Maximo atingido');
        } else {
            $('.php-value').html(window.phpCustoAtual + ' Paulocoins');
        }

        clickValue += 2;
    }
}
''


