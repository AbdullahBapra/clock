// Get references to the elements
const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");
const timerLabel = document.getElementById("timer-label");
const timeLeft = document.getElementById("time-left");
const startStopButton = document.getElementById("start_stop");
const resetButton = document.getElementById("reset");
const beep = document.getElementById("beep");

let breakTime = 5;  // Default break length
let sessionTime = 25;  // Default session length
let isSession = true;  // Initially in session
let timer;
let timeRemaining = sessionTime * 60;  // Initial time for session in seconds
let isTimerRunning = false;  // To control the timer state

// Update the time left display
function updateTimeLeft() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timeLeft.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Start/Stop the timer
function startStopTimer() {
  if (isTimerRunning) {
    clearInterval(timer);  // Stop the timer
    isTimerRunning = false;
    startStopButton.textContent = "Start";
  } else {
    timer = setInterval(updateTimer, 1000);  // Start the timer
    isTimerRunning = true;
    startStopButton.textContent = "Pause";
  }
}

// Update the timer and switch between session and break
function updateTimer() {
  timeRemaining--;

  if (timeRemaining < 0) {
    if (isSession) {
      beep.play();  // Play sound when session ends
      isSession = false;
      timeRemaining = breakTime * 60;  // Reset to break time
      timerLabel.textContent = "Break";
    } else {
      beep.play();  // Play sound when break ends
      isSession = true;
      timeRemaining = sessionTime * 60;  // Reset to session time
      timerLabel.textContent = "Session";
    }
  }

  updateTimeLeft();
}

// Reset the clock
function resetClock() {
  clearInterval(timer);  // Stop the timer
  isTimerRunning = false;
  startStopButton.textContent = "Start";
  breakTime = 5;
  sessionTime = 25;
  timeRemaining = sessionTime * 60;  // Reset session time
  breakLength.textContent = breakTime;
  sessionLength.textContent = sessionTime;
  timerLabel.textContent = "Session";
  updateTimeLeft();
  beep.pause();
  beep.currentTime = 0;
}

// Decrement the break length
function decrementBreakLength() {
  if (breakTime > 1) {
    breakTime--;
    breakLength.textContent = breakTime;
  }
}

// Increment the break length
function incrementBreakLength() {
  if (breakTime < 60) {
    breakTime++;
    breakLength.textContent = breakTime;
  }
}

// Decrement the session length
function decrementSessionLength() {
  if (sessionTime > 1) {
    sessionTime--;
    sessionLength.textContent = sessionTime;
    if (isSession) {
      timeRemaining = sessionTime * 60;  // Update session time if running
      updateTimeLeft();
    }
  }
}

// Increment the session length
function incrementSessionLength() {
  if (sessionTime < 60) {
    sessionTime++;
    sessionLength.textContent = sessionTime;
    if (isSession) {
      timeRemaining = sessionTime * 60;  // Update session time if running
      updateTimeLeft();
    }
  }
}

// Add event listeners to buttons
startStopButton.addEventListener("click", startStopTimer);
resetButton.addEventListener("click", resetClock);
document.getElementById("break-decrement").addEventListener("click", decrementBreakLength);
document.getElementById("break-increment").addEventListener("click", incrementBreakLength);
document.getElementById("session-decrement").addEventListener("click", decrementSessionLength);
document.getElementById("session-increment").addEventListener("click", incrementSessionLength);

// Initial setup
updateTimeLeft();
