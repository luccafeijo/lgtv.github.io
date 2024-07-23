window.chatgpt = 0;
window.chatgptCustoAtual = 200;
window.chatgptCustoAdicional = 300;

window.chatgptAction = function (){
    if(money >= window.chatgptCustoAtual && window.chatgpt < 10) {
        money -= window.chatgptCustoAtual;
        exibeMoney();
        window.chatgptCustoAtual += window.chatgptCustoAdicional;
        window.chatgpt++;
        $('.chatgpt-progress-info').html(window.chatgpt+'/10');
        $('.chatgpt-progress')[0].style.width = window.chatgpt+"0%";
        if(window.chatgpt == 10) {
            $('.chatgpt-value').html('Maximo atingido');
        } else {
            $('.chatgpt-value').html(window.chatgptCustoAtual + ' Paulocoins');

        }
        autoWork++;
    }
}