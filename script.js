let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const currentPlayerElement = document.getElementById('current-player');
const resetBtn = document.getElementById('reset-btn');
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);

function handleClick(e) {
    const cellIndex = parseInt(e.target.dataset.index);

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWin()) {
        currentPlayerElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        setTimeout(resetGame, 2000);
        return;
    }
    
    if (checkTie()) {
        currentPlayerElement.textContent = "It's a tie!";
        gameActive = false;
        setTimeout(resetGame, 2000);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerElement.textContent = `Current Player: ${currentPlayer}`;
}

function checkWin() {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    currentPlayerElement.textContent = 'Current Player: X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
