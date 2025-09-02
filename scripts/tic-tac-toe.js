let currentPlayer = 'x';
let winner = '';
let loser = '';
let gameOver = false;
const cell1 = document.querySelector('.grid-cell-1');
const cell5 = document.querySelector('.grid-cell-5');
const cell9 = document.querySelector('.grid-cell-9');
const cell3 = document.querySelector('.grid-cell-3');
const cell7 = document.querySelector('.grid-cell-7');


document.querySelectorAll('.grid-cell')
  .forEach(cell => {
    cell.addEventListener('click', () => {
      if (isCellEmpty(cell) && !gameOver) {
        cell.innerHTML = currentPlayer;
        if (checkRowWin('x') || checkColWin('x')) {
          winner = 'x';
          loser = 'o';
        } else if (checkRowWin('o') || checkColWin('o')) {
          winner = 'o';
          loser = 'x';
        } else if (checkDiagonalWin('x')) {  //termina las condiciones para los diagonales
          winner = 'x';
          loser = 'o';
        } else if (checkDiagonalWin('o')) {
          winner = 'o';
          loser = 'x';
        };

        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';

        // Display winner and loser
        if (checkRowWin('x') || checkRowWin('o') || checkColWin('x') || checkColWin('o') || checkDiagonalWin('x') || checkDiagonalWin('o')) {
          const displayWinnerHTML = `<div class="display-winner">Winner: ${winner} <br> Loser: ${loser}</div>`;
          document.querySelector('.display-winner').innerHTML = displayWinnerHTML;
          gameOver = true;
        };
        
        // Conditions for a tie
        if (!checkRowWin('x') && !checkRowWin('o')) {
          const allCellsFilled = Array.from(document.querySelectorAll('.grid-cell'))
            .every(cell => cell.textContent.trim() !== '')
          
          if (allCellsFilled){
            document.querySelector('.display-winner').innerHTML = 'It is a Tie!';
          };
        };
      };
    });
  });



function isCellEmpty(cell) {
  return cell.textContent.trim() === '';
}

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    document.querySelectorAll('.grid-cell')
      .forEach(cell => cell.innerHTML = '');
    document.querySelector('.display-winner')
      .innerHTML = '';
    gameOver = false;
  });

document.querySelector('.js-home-button')
  .addEventListener('click', () => {
    window.location.href = './html/home-page.html'
  })

// Conditions for winning

function checkRowWin(player) {
  for (let row = 0; row < 3; row++) {
    const rowCells = Array.from(document.querySelectorAll(`[data-row="${row}"]`))
    if (rowCells.every(cell => cell.textContent === player)) {
      return true;
    } 
  } return false;
}

function checkColWin(player) {
  for (let col = 0; col < 3; col++) {
    const colCells = Array.from(document.querySelectorAll(`[data-col="${col}"]`))
    if (colCells.every(cell => cell.textContent === player)) {
      return true;
    } 
  } return false;
}

function checkDiagonalWin(player) {
  if (cell1.textContent === player && cell5.textContent === player && cell9.textContent === player) {
    return true;
  } else if (cell3.textContent === player && cell5.textContent === player && cell7.textContent === player) {
    return true;
  };
}