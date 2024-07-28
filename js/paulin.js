//interval animacao
var working;

//dinheiro no jogo
var money = 0;
var clickValue = 1;
var passiveMoney = 0;
var autoWork = 0;
var headset = 0;

//timer speedrun
let timer_minutes = 0;
let timer_seconds = 0;
let timer_milliseconds = 0;

$(document).ready(function () {
	cacheImages();
	attPassiveMoney();
	attAutoWork();

	$('#iniciar-jogo').on('click', function () {
		$('#main-menu').addClass("hide");
		$('#character').removeClass("hide");
		$('.overlay').removeClass("hide");
		$('#game-actions').removeClass("hide");

		iniciaTimer();
	});

	$('.main-action').on('click', function () {
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
			case 'youtube':
				youtubeAction();
				break;
			case 'chatgpt':
				chatgptAction();
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

function attAutoWork() {
	setInterval(function () {
		if (autoWork) {
			addMoney(clickValue * autoWork);
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
	setInterval(function () {
		timer_milliseconds += 10;

		if (timer_milliseconds >= 1000) {
			timer_milliseconds = 0;
			timer_seconds++;
		}

		if (timer_seconds === 60) {
			timer_seconds = 0;
			timer_minutes++;
		}

		const formattedMinutes = timer_minutes < 10 ? `0${timer_minutes}` : timer_minutes;
		const formattedSeconds = timer_seconds < 10 ? `0${timer_seconds}` : timer_seconds;
		const formattedMilliseconds = Math.floor(timer_milliseconds / 10).toString().padStart(2, '0');

		$('#timer').html(`${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`);
	}, 10);
}

function cacheImages() {
	preloads = [
		'paulin_still.png',
		'paulin_work.png',
		'paulin_still_spotify.png',
		'paulin_work_spotify.png',
		'paulin_look.png',
		'paulin_bg.png',
	];

	preloads.forEach(function (element) {
		var tempImg = new Image()
		tempImg.src = '../sources/images/paulinpim-game/' + element;
	});
}