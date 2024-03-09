const board = document.getElementById("board");
const status = document.getElementById("status");
const winnerHistory = JSON.parse(localStorage.getItem("winnerHistory")) || [];

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedIndex = event.target.getAttribute("data-index");
    
    if (gameBoard[clickedIndex] === "" && !checkWinner()) {
        gameBoard[clickedIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }

    if (checkWinner()) {
        const winner = currentPlayer === "X" ? "O" : "X";
        status.textContent = `${winner} wins!🎉🎉`;
        recordWinner(winner);
    } else if (gameBoard.every((cell) => cell !== "")) {
        status.textContent = "It's a draw!";
    }
}

function updateStatus() {
    status.textContent = `Current player: ${currentPlayer}`;
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    status.textContent = "";
    board.innerHTML = "";
    createBoard();
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function recordWinner(winner) {
    winnerHistory.push(winner);
    localStorage.setItem("winnerHistory", JSON.stringify(winnerHistory));
    displayWinnerHistory();
}

function displayWinnerHistory() {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "<h2>Winner History</h2>";

    if (winnerHistory.length === 0) {
        historyContainer.innerHTML += "<p>No winners yet.</p>";
    } else {
        winnerHistory.forEach((winner, index) => {
            historyContainer.innerHTML += `<p>Game ${index + 1}: ${winner} wins</p>`;
        });
    }
}

// Initialize the game and winner history
createBoard();
updateStatus();
displayWinnerHistory();



