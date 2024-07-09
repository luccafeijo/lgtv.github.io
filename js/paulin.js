$( document ).ready(function() {

  cacheImages();

  action = setInterval(function() {
      $('#character').removeClass("work");
      $('#character').removeClass("still");
      $('#character').removeClass("look");
      
      var randomNumber = Math.floor(Math.random() * 3);
      
      switch(randomNumber) {
          case 1:
              $('#character').addClass("work");
            break;
          case 2:
              $('#character').addClass("look");
            break;
          default:
              $('#character').addClass("still");
        }
  }, 1000);
});

function cacheImages(){
  preloads = [
    'paulin_still.png',
    'paulin_work.png',
    'paulin_look.png',
    'paulin_bgclean.png',
  ];

  preloads.forEach(function(element){
    var tempImg = new Image()
    tempImg.src = '../sources/images/paulinpim-game/'+element;
  });
}