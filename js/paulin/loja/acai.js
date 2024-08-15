window.acai = 0;
window.acaiCustoAtual = 10000;

window.acaiAction = function (){
    if(money >= window.acaiCustoAtual && window.acai < 1) {
        money -= window.acaiCustoAtual;
        exibeMoney();
        window.acai++;
        if(window.acai == 1) {
            clearInterval(timer);
            var yay = new Audio('../sources/audio/yay.mp3');
            yay.play();
            $('.resultado_run').html(`${formattedMinutes}:${formattedSeconds}:${formattedMs}`);
            $('#loja').addClass("hide");
            $('#end-run').removeClass("hide");
        }
    }
}