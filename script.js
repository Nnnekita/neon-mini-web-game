const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDrawEl = document.getElementById('scoreDraw');
const moveSound = document.getElementById('moveSound');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    moveSound.currentTime = 0;
    moveSound.play();

    if (checkWin()) {
        status.textContent = `Победил ${currentPlayer}!`;
        status.style.color = currentPlayer === 'X' ? '#ff007f' : '#00ffff';
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        status.textContent = 'Ничья!';
        status.style.color = '#b388ff';
        scores.draw++;
        updateScores();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Ход: ${currentPlayer}`;
    status.style.color = '#fff';
}

function checkWin() {
    return winConditions.some(condition => {
        const win = condition.every(index => gameBoard[index] === currentPlayer);
        if (win) {
            condition.forEach(index => cells[index].classList.add('winner'));
        }
        return win;
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function updateScores() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDrawEl.textContent = scores.draw;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Ход: X';
    status.style.color = '#fff';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
