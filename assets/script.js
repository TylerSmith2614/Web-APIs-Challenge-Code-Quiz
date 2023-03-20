// Variables for 
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
var feedbackEl = document.getElementById("feedback");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");

// Variables for the quiz timer.
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// The starting screen will dissappear upon click of start button.
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // The questions section will be visible upon click of start button.
  questionsEl.removeAttribute("class");

  // The timer will start upon click of start button.
  timerId = setInterval(clockTick, 1000);

  // Makes the time value visible.
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // Pulls the current question from the questions array.
  var currentQuestion = questions[currentQuestionIndex];

  // The question title will be updated each time.
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  // The previous question choices are set to blank.
  choicesEl.innerHTML = "";

  // Creates a loop for the choices to appear once.
  currentQuestion.choices.forEach(function(choice, i) {
    // Each choice becomes a button.
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // Each choice button will have an event listener activated by click.
    choiceNode.onclick = questionClick;

    // The choices are appended onto the page.
    choicesEl.appendChild(choiceNode);
  });
}

// Upon click, a conditional statement evaluates if the answer was correct or incorrect.
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    // If the user was wrong, they will lose 5 seconds from the timer.
    time -= 5;

    if (time < 0) {
      time = 0;
    }
    // The new time is displayed if the answer was incorrect.
    timerEl.textContent = time;
    feedbackEl.textContent = "Incorrect! 😔";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "50px";
  } else {
    feedbackEl.textContent = "Correct! 😊";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "50px";
  }

  // Feedback will appear for 1 second.
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Moves onto the next question in the Array.
  currentQuestionIndex++;

  // Checks the timer.
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
// Ends the quiz and stops the timer.
function quizEnd() {
  clearInterval(timerId);

  // The end screen will appear.
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // The final score will appear.
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // The last question will be hidden.
  questionsEl.setAttribute("class", "hide");
}
// The time is updated.
function clockTick() {
  time--;
  timerEl.textContent = time;

  // Will check to see if the user ran out of time.
  if (time <= 0) {
    quizEnd();
  }
}
// Gets the value of the input box 
function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Get saved scores from te localstorage, or  sets to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Will format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // Will save score to localstorage.
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Will redirect to next page.
    window.location.href = "highscore.html";
  }
}
// Saves the high score.
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Will enter the initials into the local storage
submitBtn.onclick = saveHighscore;

// Upon click of start button, the quiz will start
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;