$( document ).ready(function() {
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