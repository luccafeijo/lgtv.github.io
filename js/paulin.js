//interval animacao
var working;

//dinheiro no jogo
var money = 0;
var clickValue = 1;
var passiveMoney = 0;

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
        spotifyAction();
        break;
      case 'vscode':
        vscodeAction();
        break;
      default:
        // code block
    }
    console.log(this.id);
  });
});

function addMoney(value){
  money += value;
  money = Math.round(money * 10) / 10;
  exibeMoney();
}

function exibeMoney() {
  $('#money').html(money.toFixed(2).replace(".", ","));
}

function attPassiveMoney(){
  setInterval(function() {
    //corrige imprecisao de valores float
    passiveMoney = Math.round(passiveMoney * 10) / 10;
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