window.cursorSummer = 0;
window.cursorSummerCustoAtual = 1000;

window.bgSummer = 0;
window.bgSummerCustoAtual = 5000;

window.cursorSummerAction = function (){
    if(money >= window.cursorSummerCustoAtual && window.cursorSummer < 1) {
        money -= window.cursorSummerCustoAtual;
        exibeMoney();
        window.cursorSummer++;
        if(window.cursorSummer == 1) {
            $('body').addClass('cursor_summer');
        }
    }
}

window.bgSummerAction = function (){
    if(money >= window.bgSummerCustoAtual && window.bgSummer < 1) {
        money -= window.bgSummerCustoAtual;
        exibeMoney();
        window.bgSummer++;
        if(window.bgSummer == 1) {
            $('#scenary').addClass('background_summer');
        }
    }
}