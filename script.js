let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const h1 = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const darkModeToggle = document.getElementById("darkModeToggle");

// const darkModeToggle = document.querySelector("button");
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = () => "Game ended in a draw!";
const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn`;

const message = document.getElementById("message");
const board = document.getElementById("board");

message.textContent = currentPlayerTurn();

function makeMove(cellIndex) {
    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }

    // gameState[cellIndex] = currentPlayer;
    // document.getElementsByClassName("cell")[cellIndex].textContent = currentPlayer;

    gameState[cellIndex] = currentPlayer;
    const cell = document.getElementsByClassName("cell")[cellIndex];
    cell.textContent = currentPlayer;
    cell.classList.add("glow");

    if (checkWin()) {
        message.textContent = winningMessage();
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        message.textContent = drawMessage();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = currentPlayerTurn();
}

function checkWin() {
    for (let condition of winningConditions) {
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return gameState.every(cell => cell !== "");
}

function resetBoard() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    message.textContent = currentPlayerTurn();

    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.textContent = "";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    message.classList.toggle("dark-mode");
    board.classList.toggle("dark-mode");
    h1.classList.toggle("dark-mode");
    // header.classList.toggle("dark-mode")
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.classList.toggle("dark-mode");
        // Update the inner X and O elements
        let xElement = cell.querySelector(".x");
        let oElement = cell.querySelector(".o");
        if (xElement) {
            xElement.classList.toggle("dark-mode");
        }
        if (oElement) {
            oElement.classList.toggle("dark-mode");
        }
    }
     resetButton.classList.toggle("dark-mode");
     darkModeToggle.classList.toggle("dark-mode");
}

function resetBoard() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    message.textContent = currentPlayerTurn();

    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.textContent = "";
        cell.classList.remove("glow");
    }
}