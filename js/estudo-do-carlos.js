const timeButtons = document.querySelectorAll(".time-option");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const selectedTimeLabel = document.getElementById("selected-time");
const statusText = document.getElementById("status-text");
const timerScreen = document.getElementById("timer-screen");
const alarmAudio = document.getElementById("alarm-audio");

let selectedMinutes = 15;
let remainingSeconds = selectedMinutes * 60;
let timerInterval = null;
let audioUnlocked = false;

function formatClock(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function updateSelectedLabel() {
    selectedTimeLabel.textContent = `${selectedMinutes} min`;
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

async function unlockAudio() {
    if (audioUnlocked) {
        return;
    }

    try {
        alarmAudio.volume = 0;
        await alarmAudio.play();
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
        alarmAudio.volume = 1;
        audioUnlocked = true;
    } catch (error) {
        alarmAudio.volume = 1;
    }
}

function playFallbackBeep() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
        return;
    }

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1.15);
    oscillator.onended = () => audioContext.close();
}

async function playAlarm() {
    try {
        alarmAudio.currentTime = 0;
        await alarmAudio.play();
    } catch (error) {
        playFallbackBeep();
    }
}

function setTime(minutes) {
    selectedMinutes = minutes;
    remainingSeconds = minutes * 60;
    updateSelectedLabel();
    formatClock(remainingSeconds);
    timerScreen.classList.remove("finished");
    statusText.textContent = `Tempo ajustado para ${minutes} minutos.`;

    timeButtons.forEach((button) => {
        button.classList.toggle("active", Number(button.dataset.minutes) === minutes);
    });
}

function finishTimer() {
    stopTimer();
    remainingSeconds = 0;
    formatClock(remainingSeconds);
    timerScreen.classList.add("finished");
    statusText.textContent = "Tempo encerrado. Hora de avisar a live.";
    playAlarm();
}

function tick() {
    if (remainingSeconds <= 0) {
        finishTimer();
        return;
    }

    remainingSeconds -= 1;
    formatClock(remainingSeconds);

    if (remainingSeconds <= 0) {
        finishTimer();
    }
}

timeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        stopTimer();
        setTime(Number(button.dataset.minutes));
    });
});

startButton.addEventListener("click", async () => {
    await unlockAudio();

    if (timerInterval) {
        return;
    }

    if (remainingSeconds <= 0) {
        remainingSeconds = selectedMinutes * 60;
        formatClock(remainingSeconds);
    }

    timerScreen.classList.remove("finished");
    statusText.textContent = `Contagem iniciada em ${selectedMinutes} minutos.`;
    timerInterval = setInterval(tick, 1000);
});

pauseButton.addEventListener("click", () => {
    stopTimer();
    statusText.textContent = "Timer pausado.";
});

resetButton.addEventListener("click", () => {
    stopTimer();
    setTime(selectedMinutes);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    statusText.textContent = `Timer reiniciado para ${selectedMinutes} minutos.`;
});

setTime(selectedMinutes);
