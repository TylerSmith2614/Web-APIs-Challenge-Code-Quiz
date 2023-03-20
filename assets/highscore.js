// javascript for the Highscores Button and the highsccores page. linked to highscore.js.

function printHighscores() {
  // Pulls from localstorage. If local storage is empty, it will set to an empty array. 
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // This sorts highscores by score property in descending order.
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });
// Creates a li tag in a an ordered list.
  highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // Displays on score page.
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}
// Removes the saved scores from local storage...
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
// When the Clear Highscores button is pressed.
document.getElementById("clear").onclick = clearHighscores;

// The high scores will appear when the page loads.
printHighscores();