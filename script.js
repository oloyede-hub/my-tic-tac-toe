let board 
let humanPlayer = "🤩";
let aiPlayer = "💻";
const possibleWins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]
let cells = document.querySelectorAll(".cell");
let table = document.querySelector("table");
let result_display = document.querySelector(".result-display");
let text = document.querySelector(".result-display .text");



gameStart()

function gameStart () {
    board = Array.from(Array(9).keys());
    result_display.style.visibility = "hidden";
    table.classList.remove("active");
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.textContent = ""
        cell.style.removeProperty("background-color");
        cell.addEventListener("click", displayPlayer, false);
    }
}

function disableShow(cell) {
    table.classList.remove("active");
    result_display.style.visibility = "hidden";
    cell.style.removeProperty("background")
    cell.textContent = "";
}



function displayPlayer (squareId) {
    let id = squareId.target.id;
    if(typeof board[id] == "number") {
        display(id, humanPlayer);
        setTimeout(() => {
        if(!checkDraw()) display(bestSpot(), aiPlayer);
        },400)
    }
}


let display = (id, player) => {
    board[id] = player;
    document.getElementById(id).innerText = player;
    const gameWon = checkWin(board, player);
    if(gameWon) gameOver(gameWon)
}


function checkWin(board, player) {
    let plays = board.reduce((a,e, i) => (e === player? a.concat(i): a) ,[])
    let gameWon = null;
    for(let [index, win] of possibleWins.entries()) {
        if(win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index:index, player:player};
            break;
        }
    }
    return gameWon;
}



function gameOver(gameWon) {
    for (const index of possibleWins[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player === humanPlayer ? "lightgreen" : "lightblue";
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", displayPlayer, false);
    }
    showWinner(gameWon.player == humanPlayer ? `You won! ${humanPlayer}`: "You lose!");
}

function showWinner(who) {
    result_display.style.visibility = "visible";
    text.textContent = who;
    table.classList.add("active");
}
function emptySquare() {
    return board.filter(s => typeof s == "number");
}

function bestSpot() {
    return emptySquare()[0];
}


function checkDraw() {
    if(emptySquare().length == 0) {
        showWinner("Draw Game!");
        return true;
    }
    return false;

}

