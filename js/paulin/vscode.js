window.vscode = 0;
window.vscodeCustoAtual = 20;
window.vscodeCustoAdicional = 20;

window.vscodeAction = function (){
    if(money >= window.vscodeCustoAtual && window.vscode < 10) {
        money -= window.vscodeCustoAtual;
        exibeMoney();
        window.vscodeCustoAtual += window.vscodeCustoAdicional;
        window.vscode++;
        $('.vscode-progress').html(window.vscode+'/10');

        if(window.vscode == 10) {
            $('.vscode-value').html('Maximo atingido');
        } else {
            $('.vscode-value').html(window.vscodeCustoAtual + ' Paulocoins');
        }

        clickValue = clickValue + 1;
    }
}



