window.acai = 0;
window.acaiCustoAtual = 10000;

window.acaiAction = function (){
    if(money >= window.acaiCustoAtual && window.acai < 10) {
        money -= window.acaiCustoAtual;
        exibeMoney();
        window.acai++;
        $('.acai-progress-info').html(window.acai+'/1');
        $('.acai-progress')[0].style.width = window.acai+"00%";
        if(window.acai == 1) {
            clearInterval(timer);
            $('.acai-value').html('Maximo atingido');
            var yay = new Audio('../sources/audio/yay.mp3');
            yay.play();
            $('.resultado_run').html(`${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`);
            $('#end-run').removeClass("hide");
        } else {
            $('.acai-value').html(window.acaiCustoAtual + ' Paulocoins');
        }
    }
}