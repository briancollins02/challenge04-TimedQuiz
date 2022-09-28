// attatch variables to doc
var savedHighScore = JSON.parse(localStorage.getItem('high-score')) || 0;
var scoreDisplay = document.getElementById('high-score');
// write high score data on home-page
if (savedHighScore !== 0) {
    scoreDisplay.innerText = savedHighScore.initials + " Holds the High-Score of " + savedHighScore.pointTotal;
}   