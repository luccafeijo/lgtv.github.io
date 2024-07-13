//interval animacao
var working;

//dinheiro no jogo
var money = 0;
var clickValue = 1;
var passiveMoney = 0;
var headset = 0;

$( document ).ready(function() {
  cacheImages();
  attPassiveMoney();

  $('.main-action').on('click', function(){
	
	addMoney(clickValue);
	if(!headset) {
		workAnimation();
	} else {
		musicWorkAnimation();
	}
    
  });

  $('.secondary-action').on('click', function(){
    switch(this.id) {
      case 'spotify':
        spotifyAction();
        if(spotify == 1){
			enableHeadset();
        }
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

function enableHeadset(){
	headset = 1;
	$('#character').removeClass("still");
    $('#character').addClass("still_spotify");
}

function workAnimation(){
	clearInterval(working);
    $('#character').removeClass("still");
    $('#character').addClass("work");

    working = setTimeout(function() {
      $('#character').removeClass("work");
      $('#character').addClass("still");
    }, 400);
}

function musicWorkAnimation(){
	clearInterval(working);
    $('#character').removeClass("still_spotify");
    $('#character').addClass("work_spotify");

    working = setTimeout(function() {
      $('#character').removeClass("work_spotify");
      $('#character').addClass("still_spotify");
    }, 400);
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