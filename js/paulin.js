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
    'paulin_look.png'
  ];

  var tempImg = []

  for(var x=0;x<preloads.length;x++) {
      tempImg[x] = new Image()
      tempImg[x].src = '../sources/images/paulinpim-game/'.preloads[x]
  }
}