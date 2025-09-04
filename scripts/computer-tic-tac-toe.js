let gameOver = false;
let board = Array(9).fill('');

const cells = document.querySelectorAll('.grid-cell');
const displayWinner = document.querySelector('.display-winner');

document.querySelectorAll('.grid-cell').forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (gameOver || cell.textContent !== '') {
      return // basically do nothing if game is over or if there is some text in the cell
    }

    cell.textContent = 'x';
    board[index] = 'x';

    if (checkWin('x')) {
      displayWinner.innerHTML = 'Winner: x<br>Loser: o';
      gameOver = true;
      return;
    }

    if (checkTie()) {
      displayWinner.innerHTML = 'It is a tie';
      gameOver = true;
      return;
    }

    setTimeout(() => {
      computerMove();
    }, 500);

  });
});

function checkWin(player) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winConditions.some(condition => {
    return condition.every(index => board[index] === player);
  });
}

function checkTie() {
  return board.every(cell => cell !== '');
}

function computerMove() {
  if (gameOver) {
    return;
  }

  let emptyCells = [];

  board.forEach((cell, index) => {
    if (cell === '') {
      emptyCells.push(index);
    }
  });

  if (emptyCells.length === 0) {
    displayWinner.innerHTML = 'It is a tie';
    gameOver = true;
    return;
  };

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const moveIndex = emptyCells[randomIndex];

  cells[moveIndex].textContent = 'o';
  board[moveIndex] = 'o';

  if (checkWin('o')) {
    displayWinner.innerHTML = 'Winner: o<br>Loser: x';
    gameOver = true;
  } else if (checkTie()) {
    displayWinner.innerHTML = 'It is a tie';
    gameOver = true;
  }
}

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    cells.forEach(cell => cell.textContent = '');
    displayWinner.innerHTML = '';
    board.fill('');
    gameOver = false;
  });

document.querySelector('.js-home-button')
  .addEventListener('click', () => {
    window.location.href = '../index.html';
  });