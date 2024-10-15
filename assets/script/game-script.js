// Constants for the game
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = '';
let board = Array(9).fill(EMPTY); // Initialize the game board
let currentPlayer = PLAYER_X; // Start with Player X
let gameMode = 'bot'; // Default game mode
let scores = { X: 0, O: 0, Draw: 0 }; // Score tracking

// Initialize the game
document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll('#game-canvas div');
    const resetButton = document.querySelector('#score-bord button');
    const playWithSelect = document.querySelector('#play-with');

    // Click event for each square
    squares.forEach((square, index) => {
        square.addEventListener('click', () => handleSquareClick(index, square));
    });

    // Reset button functionality
    resetButton.addEventListener('click', resetGame);
    
    // Change game mode
    playWithSelect.addEventListener('change', (e) => {
        gameMode = e.target.value.toLowerCase();
        resetGame();
    });
});

// Check if the game is still active (not won or drawn)
function isGameActive() {
    return !checkWin(PLAYER_X) && !checkWin(PLAYER_O) && !board.every(cell => cell !== EMPTY);
}

// Handle square clicks
function handleSquareClick(index, square) {
    if (board[index] !== EMPTY || !isGameActive()) return; // Ignore if square is taken or game is over
    board[index] = currentPlayer;
    square.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        updateScore(currentPlayer);
        alert(`${currentPlayer} wins!`);
    } else if (board.every(cell => cell !== EMPTY)) {
        scores.Draw++;
        alert("It's a draw!");
        setScore()
    } else {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X; // Switch player
        if (gameMode === 'bot' && currentPlayer === PLAYER_O) {
            botMove(); // If playing against bot, make bot's move
        }
    }
}

// Bot's move using Minimax algorithm
function botMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === EMPTY) {
            board[i] = PLAYER_O; // Try the move
            let score = minimax(board, 0, false);
            board[i] = EMPTY; // Undo the move
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    board[move] = PLAYER_O; // Make the best move
    document.querySelectorAll('#game-canvas div')[move].textContent = PLAYER_O;
    if (checkWin(PLAYER_O)) {
        updateScore(PLAYER_O);
        alert(`${PLAYER_O} wins!`);
    } else if (board.every(cell => cell !== EMPTY)) {
        scores.Draw++;
        setScore()
        alert("It's a draw!");
    } else {
        currentPlayer = PLAYER_X; // Switch back to player X
    }
}

// Minimax algorithm implementation
function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        Draw: 0
    };

    // Check for terminal states
    if (checkWin(PLAYER_O)) return scores.O; // Bot wins
    if (checkWin(PLAYER_X)) return scores.X; // Player X wins
    if (board.every(cell => cell !== EMPTY)) return scores.Draw; // Draw

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === EMPTY) {
                board[i] = PLAYER_O; // Bot's turn
                let score = minimax(board, depth + 1, false);
                board[i] = EMPTY; // Undo move
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === EMPTY) {
                board[i] = PLAYER_X; // Player X's turn
                let score = minimax(board, depth + 1, true);
                board[i] = EMPTY; // Undo move
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Check for a win condition
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

// Update the score
function updateScore(winner) {
    if (winner === PLAYER_X) {
        scores.X++;
    } else if (winner === PLAYER_O) {
        scores.O++;
    }
    setScore()
}
function setScore(){
    document.querySelector('#score-x').textContent = scores.X;
    document.querySelector('#score-o').textContent = scores.O;
    document.querySelector('#score-draw').textContent = scores.Draw;
}
// Reset the game state
function resetGame() {
    board.fill(EMPTY); // Clear the board
    currentPlayer = PLAYER_X; // Reset to Player X
    document.querySelectorAll('#game-canvas div').forEach(square => {
        square.textContent = EMPTY; // Clear displayed values
    });
}
