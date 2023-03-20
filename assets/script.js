var timerEl = document.getElementById("timer");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("#questions")
var initialsEl = document.getElementById("#initials");
var feedbackEl = document.getElementById("#feedback");
var choicesEl = document.getElementById("#choices");

// quiz status variables

var currentQuestionIndex = 0;
var timer = questions.length * 15;
var timerID;

function start() {
  // Hitting the start button will make the opening screen hidden.
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hidden");

  // it will also un-hide the questions 
  questionsEl.removeAttribute("class")
}

