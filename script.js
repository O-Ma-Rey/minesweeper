// Variables

const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

const totalCells = 100;
const totalBombs = 5;
const maxScore = totalCells - totalBombs;
const bombList = [];

let score = 0;

// Functions

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(6, '0');

  if(score === maxScore) {
    endGame(true);
  }
}

function revealAllBombs() {
  const cells = document.querySelectorAll('.cell');
  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];
    if (bombList.includes(i)) {
      cell.classList.add('cell-bomb');
    }
  }
}

function endGame(victory) {
  if (!victory) {
    revealAllBombs();
    endGameScreen.classList.remove('hidden');
  } else {
    endGameText.innerHTML = 'YOU<br>WON'
    endGameScreen.classList.remove('hidden');
    endGameScreen.classList.add('win');
  }
}

// Event Listeners

playAgainButton.addEventListener('click', () => {
  window.location.reload();
});

for (let i=1; i<=totalCells; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');

  cell.addEventListener('click', () => {
    if (cell.classList.contains('cell-clicked')) return;
    if (bombList.includes(i)) {
      cell.classList.add('cell-bomb');
      endGame(false);
    }
    cell.classList.add('cell-clicked');
    updateScore();
  });

  grid.appendChild(cell);
}

while (bombList.length < totalBombs) {
  const randomNum = Math.floor(Math.random() * totalCells) + 1;

  if (!bombList.includes(randomNum)) {
    bombList.push(randomNum);
  }
}


