const applyTimeButton = document.getElementById("apply-time-button");
const customMinutesInput = document.getElementById("custom-minutes");
const addTimeButtons = document.querySelectorAll("[data-add-minutes]");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const chromaToggle = document.getElementById("chroma-toggle");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const selectedTimeLabel = document.getElementById("selected-time");
const statusText = document.getElementById("status-text");
const timerScreen = document.getElementById("timer-screen");
const displayPanel = document.querySelector(".display-panel");
const alarmAudio = document.getElementById("alarm-audio");

let configuredMinutes = 15;
let remainingSeconds = configuredMinutes * 60;
let timerInterval = null;
let audioUnlocked = false;

function formatClock(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function updateSelectedLabel() {
    selectedTimeLabel.textContent = `${Math.floor(remainingSeconds / 60)} min ${String(remainingSeconds % 60).padStart(2, "0")} s`;
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

function refreshTimerText() {
    updateSelectedLabel();
    formatClock(remainingSeconds);
    timerScreen.classList.remove("finished");
}

function setTime(minutes) {
    configuredMinutes = minutes;
    remainingSeconds = minutes * 60;
    customMinutesInput.value = String(minutes);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    refreshTimerText();
    statusText.textContent = `Tempo definido para ${minutes} minutos.`;
}

function addMinutes(minutesToAdd) {
    const extraSeconds = minutesToAdd * 60;
    configuredMinutes += minutesToAdd;
    remainingSeconds += extraSeconds;
    customMinutesInput.value = String(configuredMinutes);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    refreshTimerText();
    statusText.textContent = `Foram adicionados ${minutesToAdd} minutos ao contador.`;
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

function applyCustomTime() {
    const parsedMinutes = Number(customMinutesInput.value);

    if (!Number.isFinite(parsedMinutes) || parsedMinutes < 1) {
        customMinutesInput.value = String(configuredMinutes);
        statusText.textContent = "Digite um valor valido maior que zero.";
        return;
    }

    stopTimer();
    setTime(Math.floor(parsedMinutes));
}

applyTimeButton.addEventListener("click", () => {
    applyCustomTime();
});

customMinutesInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        applyCustomTime();
    }
});

addTimeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        addMinutes(Number(button.dataset.addMinutes));
    });
});

startButton.addEventListener("click", async () => {
    await unlockAudio();

    if (timerInterval) {
        return;
    }

    if (remainingSeconds <= 0) {
        remainingSeconds = configuredMinutes * 60;
        formatClock(remainingSeconds);
    }

    timerScreen.classList.remove("finished");
    updateSelectedLabel();
    statusText.textContent = `Contagem iniciada com ${customMinutesInput.value} minutos configurados.`;
    timerInterval = setInterval(tick, 1000);
});

pauseButton.addEventListener("click", () => {
    stopTimer();
    statusText.textContent = "Timer pausado.";
});

resetButton.addEventListener("click", () => {
    stopTimer();
    setTime(configuredMinutes);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    statusText.textContent = `Timer reiniciado para ${configuredMinutes} minutos.`;
});

chromaToggle.addEventListener("change", () => {
    displayPanel.classList.toggle("chroma-active", chromaToggle.checked);
});

setTime(configuredMinutes);
