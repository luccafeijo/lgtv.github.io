$( document ).ready(function() {
    randomTextCampoMinado();
});

function randomTextCampoMinado() {
    var randomNumber = Math.floor(Math.random() * 6);
    console.log(randomNumber);
    switch(randomNumber) {
        case 1:
            $('.ondev').html("V 1.0!");
          break;
        case 2:
            $('.ondev').html("Isso não é uma cópia de Minecraft");
          break;
        case 3:
            $('.ondev').html("Bomba bomba, olha a bomba!");
          break;
        case 4:
            $('.ondev').html("GOTY");
            break;
        case 5:
            $('.ondev').html("Ouvi dizer que tem cheats...");
          break;
        default:
          // code block
      }
}