const boxes = Array.from(document.getElementsByClassName('box'));
const resetBtn = document.getElementById('resetBtn');
const playText = document.getElementById('play');
const areas = Array(9).fill(null);
let winBoxesIds = [];

// Player names and symbols
let playerXName, playerOName;
let playerXSymbol = "X";
let playerOSymbol = "O";
let currentPlayerName, currentPlayerSymbol;

// Fetch player names from input fields
function setPlayerNames() {
    playerXName = document.getElementById('playerXName').value || "Player 1";
    playerOName = document.getElementById('playerOName').value || "Player 2";
    currentPlayerName = playerXName;
    currentPlayerSymbol = playerXSymbol;
}

// Initialize the game
function initializeGame() {
    setPlayerNames();
    boxes.forEach(box => box.addEventListener('click', handleBoxClick));
    resetBtn.addEventListener('click', resetGame);
}

function handleBoxClick(e) {
    if (winBoxesIds.length > 0) return; // Game already won, no further moves

    const id = e.target.id;
    if (!areas[id]) {
        areas[id] = currentPlayerSymbol;
        e.target.innerHTML = currentPlayerSymbol;

        if (hasPlayerWon(currentPlayerSymbol)) {
            playText.innerHTML = `${currentPlayerName} (${currentPlayerSymbol}) has won!`;
            playText.style.background = "lightgreen";
            highlightWinBoxes();
            return;
        }

        // Check for a draw
        if (areas.every(area => area !== null)) {
            playText.innerHTML = "It's a draw!";
            playText.style.background = "orange";
            return;
        }

        // Switch players
        if (currentPlayerSymbol === playerXSymbol) {
            currentPlayerSymbol = playerOSymbol;
            currentPlayerName = playerOName;
        } else {
            currentPlayerSymbol = playerXSymbol;
            currentPlayerName = playerXName;
        }
    }
}

// Check if the current player has won
function hasPlayerWon(cPlayerSymbol) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8]  // Columns
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (areas[a] === cPlayerSymbol && areas[b] === cPlayerSymbol && areas[c] === cPlayerSymbol) {
            winBoxesIds = condition;
            return true;
        }
    }
    return false;
}

// Highlight winning boxes
function highlightWinBoxes() {
    winBoxesIds.forEach(id => {
        boxes[id].style.background = 'lightgreen';
    });
    boxes.forEach(box => box.style.cursor = 'not-allowed');
}

// Reset the game
function resetGame() {
    winBoxesIds = [];
    areas.fill(null);
    boxes.forEach(box => {
        box.innerHTML = '';
        box.style.background = '';
        box.style.cursor = 'pointer';
    });
    playText.innerHTML = "Let's play...";
    playText.style.background = '';

    // Reinitialize player names and symbols
    setPlayerNames();
}

// Start the game
initializeGame();
