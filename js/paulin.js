//interval animacao
var working;

//dinheiro no jogo
var money = 0;
var clickValue = 1;
var passiveMoney = 0;

//upgrades secundarios
var vscode = 0;
var vscodeCustoInicial = 20;
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
        // console.log(money);
        // console.log(spotifyCustoAtual);
        if(money >= spotifyCustoAtual && spotify < 10) {
          money -= spotifyCustoAtual;
          exibeMoney();
          spotifyCustoAtual += spotifyCustoAdicional;
          spotify++;
          $('.'+this.id+'-progress').html(spotify+'/10');
          $('.'+this.id+'-value').html(spotifyCustoAtual + ' Paulocoins');
          passiveMoney += 0.1;

          //TODO
          // ta bugado, o passive money, ao acressentar 0.1 de valor, as vezes fica com o número quebrado, tipo "0.30000000000000004" (exemplo real)
          // console.log(passiveMoney);
        }
        break;
      case 'vs_code':
        clickValue = clickValue * 2;
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