var working;

$( document ).ready(function() {

  cacheImages();

  // action = setInterval(function() {
  //     $('#character').removeClass("work");
  //     $('#character').removeClass("still");
  //     $('#character').removeClass("look");
      
  //     var randomNumber = Math.floor(Math.random() * 3);
      
  //     switch(randomNumber) {
  //         case 1:
  //             $('#character').addClass("work");
  //           break;
  //         case 2:
  //             $('#character').addClass("look");
  //           break;
  //         default:
  //             $('#character').addClass("still");
  //       }
  // }, 1000);

  $('#main-action').on('click', function(){
    clearInterval(working);
    $('#character').removeClass("still");
    $('#character').addClass("work");

    working = setInterval(function() {
      $('#character').removeClass("work");
      $('#character').addClass("still");
    }, 400);
  });
});

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