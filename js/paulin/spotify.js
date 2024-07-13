window.spotify = 0;
window.spotifyCustoAtual = 10;
window.spotifyCustoAdicional = 2;

window.spotifyAction = function (){
    if(money >= window.spotifyCustoAtual && window.spotify < 10) {
        money -= window.spotifyCustoAtual;
        exibeMoney();
        window.spotifyCustoAtual += window.spotifyCustoAdicional;
        window.spotify++;
        $('.spotify-progress').html(window.spotify+'/10');
        $('.spotify-value').html(window.spotifyCustoAtual + ' Paulocoins');
        passiveMoney += 0.1;
    }
}