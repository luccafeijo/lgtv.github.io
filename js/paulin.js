//interval animacao
var working;

//dinheiro no jogo
var money = 0;

$( document ).ready(function() {

  cacheImages();

  $('.main-action').on('click', function(){
    clearInterval(working);
    $('#character').removeClass("still");
    $('#character').addClass("work");
    addMoney(1);

    working = setTimeout(function() {
      $('#character').removeClass("work");
      $('#character').addClass("still");
    }, 400);
  });

  $('.secondary-action').on('click', function(){
    console.log(this.id);
  });
});

function addMoney(value){
  money += value;
  $('#money').html(money);
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