window.youtube = 0;
window.youtubeCustoAtual = 40;
window.youtubeCustoAdicional = 40;

window.youtubeAction = function (){
    if(money >= window.youtubeCustoAtual && window.youtube < 10) {
        money -= window.youtubeCustoAtual;
        exibeMoney();
        window.youtubeCustoAtual += window.youtubeCustoAdicional;
        window.youtube++;
        $('.youtube-progress').html(window.youtube+'/10');

        if(window.youtube == 10) {
            $('.youtube-value').html('Maximo atingido');
        } else {
            $('.youtube-value').html(window.youtubeCustoAtual + ' Paulocoins');
        }
        
        passiveMoney += 0.5;
    }
}