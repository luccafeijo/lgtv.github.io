$( document ).ready(function() {
    randomText('minesweepergame');
    randomText('paulingame');
    // randomText('fortnite2game');
    // randomText('fnfgame');
    // randomText('marioVgame');
});

const gametexts = {
  minesweepergame: [
    'V 1.0!',
    'Isso não é uma cópia de Minecraft',
    'Bomba bomba, olha a bomba!',
    'GOTY',
    'Ouvi dizer que tem cheats...'
  ],
  paulingame:[
    'Alguém tem que trabaia né',
    'Puta que pariu em carai'
  ],
  fortnite2game: [
    'by qubsonxd',
    'We got a number one Victory Royale',
    'Hurr Hurr-Hur-Hurr Hurr Hurr-Hur-Hurr Hur-Hurr',
    'SAAAANSSSSS!',
    'Best Game Ever Made',
    'Submit your speedrun!'
  ],
  fnfgame: [
    'Ready, set, GO',
    'Se ela dança, eu danço',
    'SOLTA O SOM CHICO',
    '/dance',
    'linkpark.mp3!',
    'The new Eminem'
  ],
  marioVgame: [
    "It's a me, MARIO",
    'Mamamia',
    'Ya hooo'
  ]
};


function randomText(btnclass) {
    var randomNumber = Math.floor(Math.random() * gametexts[btnclass].length);
    $('.'+btnclass).html(gametexts[btnclass][randomNumber]);
}