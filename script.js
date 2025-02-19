// Переменные
let workTime = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;
let timeLeft = workTime;
let isRunning = false;
let timer;
let cycleCount = 0;

const timeDisplay = document.getElementById("time");
const statusText = document.getElementById("status-text");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const timerCircle = document.getElementById("timer-circle");

// Функция для обновления времени на экране
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Функция для начала таймера
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                nextPhase();
            }
        }, 1000);
    }
}

// Функция для паузы
function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

// Функция для сброса
function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    timeLeft = workTime;
    updateDisplay();
    statusText.textContent = "Work Session";
    timerCircle.style.background = "#ff6347"; // Красный
}

// Функция для смены фаз (автоматическое переключение)
function nextPhase() {
    cycleCount++;
    
    if (statusText.textContent === "Work Session") {
        if (cycleCount % 4 === 0) {
            timeLeft = longBreak;
            statusText.textContent = "Long Break";
            timerCircle.style.background = "#1e90ff"; // Синий
        } else {
            timeLeft = shortBreak;
            statusText.textContent = "Short Break";
            timerCircle.style.background = "#4caf50"; // Зеленый
        }
    } else {
        timeLeft = workTime;
        statusText.textContent = "Work Session";
        timerCircle.style.background = "#ff6347"; // Красный
    }
    updateDisplay();
}

// Слушатели событий
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Инициализация
updateDisplay();