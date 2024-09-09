window.cursorSummer = 0;
window.cursorSummerCustoAtual = 1000;

window.bgSummer = 0;
window.bgSummerCustoAtual = 5000;

window.skinSummer = 0;
window.skinSummerCustoAtual = 10000;

window.cursorSummerAction = function (){
    if(money >= window.cursorSummerCustoAtual && window.cursorSummer < 1) {
        money -= window.cursorSummerCustoAtual;
        exibeMoney();
        window.cursorSummer++;
        if(window.cursorSummer == 1) {
            $('#loja_summer_cursor').html('Comprado');
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
            $('#loja_summer_bg').html('Comprado');
            $('#scenary').addClass('background_summer');
        }
    }
}

window.skinSummerAction = function (){
    if(money >= window.skinSummerCustoAtual && window.skinSummer < 1) {
        money -= window.skinSummerCustoAtual;
        exibeMoney();
        window.skinSummer++;
        if(window.skinSummer == 1) {
            $('#loja_summer_skin').html('Comprado');
            $('#character').addClass('summer');
        }
    }
}