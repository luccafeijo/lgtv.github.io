//interval animacao
var working;

//dinheiro no jogo
var money = 0;
var clickValue = 1;
var passiveMoney = 0;
var autoWork2 = 0;
var autoWork5 = 0;
var headset = 0;

//timer speedrun
var timer;
var timerInit;
var formattedMinutes = 0;
var formattedSeconds = 0;
var formattedMs = 0;

$(document).ready(function () {
	cacheImages();
	attPassiveMoney();
	attAutoWork2();
	attAutoWork5();
	EnterClickFix();

	$('#iniciar-jogo').on('click', function () {
		$('#main-menu').addClass("hide");
		$('#scenary').removeClass("hide");
		$('#character').removeClass("hide");
		$('#mesa').removeClass("hide");
		$('#cadeira').removeClass("hide");
		$('.overlay').removeClass("hide");
		$('#game-actions').removeClass("hide");
	});

	$('#iniciar-speedrun').on('click', function () {
		$('#main-menu').addClass("hide");
		$('#scenary').removeClass("hide");
		$('#character').removeClass("hide");
		$('#mesa').removeClass("hide");
		$('#cadeira').removeClass("hide");
		$('.overlay').removeClass("hide");
		$('#game-actions').removeClass("hide");
		$('#speedrun-upgrade').removeClass("hide");
		$('#timer').removeClass("hide");

		iniciaTimer();
	});

	$('#save_run').on('click', function () {
		nome = $('#run_name').val();
		alert("Foi mal "+nome+", mas não tem como registrar um scoreboard sem um backend... é complicado...");
	});

	$('.close-end-popup').on('click', function () {
		$('#end-run').addClass("hide");
	});

	//open loja
	$('#store-action').on('click', function () {
		$('#loja').removeClass("hide");
	});

	//close loja
	$('.close-loja-popup').on('click', function () {
		$('#loja').addClass("hide");
	});
	

	$('#password').on('click', function () {
		alert("Ainda não foi implementado mané, por isso está riscado");
	});

	$('#main-action').on('click', function () {
		addMoney(clickValue);
		if (!headset) {
			workAnimation();
		} else {
			musicWorkAnimation();
		}
	});

	$('.secondary-action').on('click', function () {
		switch (this.id) {
			case 'spotify':
				spotifyAction();
				if (spotify == 1) {
					enableHeadset();
				}
				break;
			case 'vscode':
				vscodeAction();
				break;
			case 'php':
				phpAction();
				break;
			case 'youtube':
				youtubeAction();
				break;
			case 'netflix':
				netflixAction();
				break;
			case 'chatgpt':
				chatgptAction();
				break;
			case 'google':
				googleAction();
				break;
			default:
			// code block
		}
	});

	$('.unique-action').on('click', function () {
		switch (this.id) {
			case 'acai':
				acaiAction();
				break;
			default:
			// code block
		}
	});
});

function addMoney(value) {
	money += value;
	money = Math.round(money * 10) / 10;
	exibeMoney();
}

function exibeMoney() {
	$('#money').html(money.toFixed(2).replace(".", ","));
}

function attPassiveMoney() {
	setInterval(function () {
		//corrige imprecisao de valores float
		passiveMoney = Math.round(passiveMoney * 10) / 10;
		addMoney(passiveMoney);
	}, 1000);
}

function attAutoWork2() {
	setInterval(function () {
		if (autoWork2) {
			addMoney(clickValue * autoWork2);
		}
	}, 2000);
}

function attAutoWork5() {
	setInterval(function () {
		if (autoWork5) {
			addMoney(clickValue * autoWork5);
		}
	}, 5000);
}

function enableHeadset() {
	headset = 1;
	$('#character').removeClass("still");
	$('#character').addClass("still_spotify");
}

function workAnimation() {
	clearInterval(working);
	$('#character').removeClass("still");
	$('#character').addClass("work");

	working = setTimeout(function () {
		$('#character').removeClass("work");
		$('#character').addClass("still");
	}, 400);
}

function musicWorkAnimation() {
	clearInterval(working);
	$('#character').removeClass("still_spotify");
	$('#character').addClass("work_spotify");

	working = setTimeout(function () {
		$('#character').removeClass("work_spotify");
		$('#character').addClass("still_spotify");
	}, 400);
}

function iniciaTimer() {
	timerInit = Date.now();

	timer = setInterval(function () {
		const actualTime = Date.now();
		const elapsed = actualTime - timerInit;

		const totalSeconds = Math.floor(elapsed / 1000);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		formattedMinutes = String(minutes).padStart(2, '0');
		formattedSeconds = String(seconds).padStart(2, '0');
		formattedMs = String(elapsed).slice(-3).slice(0, 2);

		$('#timer_minutes').html(`${formattedMinutes}`);
		$('#timer_seconds').html(`${formattedSeconds}`);
		$('#timer_ms').html(`${formattedMs}`);
	}, 10);
}

function cacheImages() {
	preloads = [
		'character/static/paulin_still.png',
		'character/static/paulin_still_spotify.png',
		'character/animations/paulin_work.png',
		'character/animations/paulin_work_spotify.png',
		'character/animations/paulin_look.png',
		'character/background/paulin_bg.png',
		'character/chair/cadeira_azul.png',
		'character/table/mesa_branca.png',
		'character/table/mesa_madeira.png',
	];

	preloads.forEach(function (element) {
		var tempImg = new Image()
		tempImg.src = '../sources/images/paulinpim-game/' + element;
	});
}

function EnterClickFix(){
	var input = document.getElementById("main-action");
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			setTimeout(() => {
                alert("Cabo a farra fih");
            }, 100);
				}
	});
}