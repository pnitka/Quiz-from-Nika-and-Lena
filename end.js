const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})
saveHighScore = (e) => {
    e.preventDefault();
    const score = Math.floor(Math.random() * 100);
    const scoreObj = {
        score: score,
        name: username.value
    }
    localStorage.setItem('highscores', JSON.stringify(scoreObj));
    window.location.assign('highscores.html');
}