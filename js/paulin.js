//interval animacao
var working;

//dinheiro no jogo
var money = 0;
var clickValue = 1;
var passiveMoney = 0;

//upgrades secundarios
var vscode = 0;
var vscodeCustoAtual = 20;
var vscodeCustoAdicional = 20;

var spotify = 0;
var spotifyCustoAtual = 10;
var spotifyCustoAdicional = 2;

$( document ).ready(function() {

  cacheImages();
  attPassiveMoney();

  $('.main-action').on('click', function(){
    clearInterval(working);
    $('#character').removeClass("still");
    $('#character').addClass("work");
    addMoney(clickValue);

    working = setTimeout(function() {
      $('#character').removeClass("work");
      $('#character').addClass("still");
    }, 400);
  });

  $('.secondary-action').on('click', function(){
    switch(this.id) {
      case 'spotify':
        if(money >= spotifyCustoAtual && spotify < 10) {
          money -= spotifyCustoAtual;
          exibeMoney();
          spotifyCustoAtual += spotifyCustoAdicional;
          spotify++;
          $('.'+this.id+'-progress').html(spotify+'/10');
          $('.'+this.id+'-value').html(spotifyCustoAtual + ' Paulocoins');
          passiveMoney += 0.1;

          //corrige imprecisao de valores float
          passiveMoney = Math.round(passiveMoney * 10) / 10;
        }
        break;
      case 'vscode':
        if(money >= vscodeCustoAtual && vscode < 10) {
          money -= vscodeCustoAtual;
          exibeMoney();
          vscodeCustoAtual += vscodeCustoAdicional;
          vscode++;
          $('.'+this.id+'-progress').html(vscode+'/10');
          $('.'+this.id+'-value').html(vscodeCustoAtual + ' Paulocoins');
          clickValue = clickValue + 1;
        }
        break;
      default:
        // code block
    }
    console.log(this.id);
  });
});

function addMoney(value){
  money += value;
  exibeMoney();
}

function exibeMoney() {
  $('#money').html(money.toFixed(2).replace(".", ","));
}

function attPassiveMoney(){
  setInterval(function() {
    addMoney(passiveMoney);
  }, 1000);
}

function cacheImages(){
  preloads = [
    'paulin_still.png',
    'paulin_work.png',
    'paulin_look.png',
    'paulin_bg.png',
  ];

  preloads.forEach(function(element){
    var tempImg = new Image()
    tempImg.src = '../sources/images/paulinpim-game/'+element;
  });
}