window.youtube = 0;
window.youtubeCustoAtual = 40;
window.youtubeCustoAdicional = 30;

window.youtubeAction = function (){
    if(money >= window.youtubeCustoAtual && window.youtube < 10) {
        money -= window.youtubeCustoAtual;
        exibeMoney();
        window.youtubeCustoAtual += window.youtubeCustoAdicional;
        window.youtube++;
        $('.youtube-progress-info').html(window.youtube+'/10');
        $('.youtube-progress')[0].style.width = window.youtube+"0%";

        if(window.youtube == 10) {
            $('.youtube-value').html('Maximo atingido');
        } else {
            $('.youtube-value').html(window.youtubeCustoAtual + ' Paulocoins');
        }

        passiveMoney += 0.5;
    }
}