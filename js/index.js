$( document ).ready(function() {
    randomTextCampoMinado();
    randomTextFortnite2();
});

function randomTextCampoMinado() {
    var randomNumber = Math.floor(Math.random() * 6);
    switch(randomNumber) {
        case 1:
            $('.minesweepergame').html("V 1.0!");
          break;
        case 2:
            $('.minesweepergame').html("Isso não é uma cópia de Minecraft");
          break;
        case 3:
            $('.minesweepergame').html("Bomba bomba, olha a bomba!");
          break;
        case 4:
            $('.minesweepergame').html("GOTY");
            break;
        case 5:
            $('.minesweepergame').html("Ouvi dizer que tem cheats...");
          break;
        default:
          // code block
      }
}

function randomTextFortnite2() {
  var randomNumber = Math.floor(Math.random() * 6);
  switch(randomNumber) {
      case 1:
          $('.fortnite2game').html("We got a number one Victory Royale");
        break;
      case 2:
          $('.fortnite2game').html("Hurr Hurr-Hur-Hurr Hurr Hurr-Hur-Hurr Hur-Hurr");
        break;
      case 3:
          $('.fortnite2game').html("SAAAANSSSSS!");
        break;
      case 4:
          $('.fortnite2game').html("Best Game Ever Made");
          break;
      case 5:
          $('.fortnite2game').html("Submit your speedrun!");
        break;
      default:
        // code block
    }
}