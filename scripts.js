
// Gameboard 
/*
1 | 2 | 3
--|---|---
4 | 5 | 6
--|---|---
7 | 8 | 9
*/

// Game mechanic ____ TO UPDATE
/* 
    Init Board at initial stage
    if valide, each move brings the game to a next stage
    Then check victory or draw
        -   change player if no victory
        -   claim draw and init game board 
        -   claim victory and init game board
*/

// Players, initalize at least twice
// Factory function
function createPlayer(playerName, playerSymbol) {
    const symbol = playerSymbol;
    const name = playerName;
    const playerMoves = Array(9).fill(null);
    let playerScore = 0;
    const addScore = () => playerScore++;
    const getScore = () => playerScore;
    return { symbol, playerMoves, addScore, getScore, name }
}

// Game function, initialize only once
// Immediately Invoked Function Expression (IIFE)


const game = (function () {
    // Game variables 
    const player1 = createPlayer("Player 1", "X");
    document.querySelector("#playerOneName").value = "Player 1"
    document.querySelector("#playerTwoName").value = "Player 2"
    const player2 = createPlayer("Player 2", "O");
    const players = [player1, player2];
    let playerTurn = 0;
    gameGrid = Array(9).fill(null);

    // Game functions

    const updateScore = () => {
        document.querySelector("#playerScore1").innerHTML = player1.getScore();
        document.querySelector("#playerScore2").innerHTML = player2.getScore();
    };

    const computeMove = (move) => {
        const isMoveValid = playMove(move, players[game.playerTurn % 2]);
        if (isMoveValid) {
            const gameStatus = game.checkGameOver(game.playerTurn, move)
            if (gameStatus == 1) {
                game.processWin(game.playerTurn);
                game.newRound();
            } else if (gameStatus == 0) {
                game.processDraw();
                game.newRound();
            } else {
                game.playerTurn += 1;
            };
        }
    };
    const playMove = (move, player) => {
        if (gameGrid[move] == null && !isNaN(move)) {
            gameGrid[move] = player.symbol;
            player.playerMoves[move] = 1;
            const grid = document.querySelector("#gridCell".concat(move.toString()));
            const logoContainer = document.createElement("div");
            if (player.symbol == "X") {
                logoContainer.style.backgroundImage = "url('./src/x.svg')";
            } else {
                logoContainer.style.backgroundImage = "url('./src/circle.svg')";
            }
            logoContainer.style.backgroundSize = "100% 100%"
            grid.appendChild(logoContainer);
            return true
        } else {
            alert("Move not possible. Play again.")
            return false
        }
    };

    const checkGameOver = (playerTurn, move) => {
        const currentPlayer = players[playerTurn % 2];
        let gameStatus = 2;
        // check for draw
        if (gameGrid.indexOf(null) == -1) {
            gameStatus = 0;
        } else { // check for victory
            const row = Math.floor(move / 3);
            if (currentPlayer.playerMoves[row * 3] && currentPlayer.playerMoves[row * 3 + 1] && currentPlayer.playerMoves[row * 3 + 2]) {
                gameStatus = 1;
            }
            if (currentPlayer.playerMoves[move % 9] && currentPlayer.playerMoves[(move + 3) % 9] && currentPlayer.playerMoves[(move + 6) % 9]) {
                gameStatus = 1;
            }
            if (currentPlayer.playerMoves[0] && currentPlayer.playerMoves[4] && currentPlayer.playerMoves[8] || (currentPlayer.playerMoves[2] && currentPlayer.playerMoves[4] && currentPlayer.playerMoves[6])) {
                gameStatus = 1;
            }
        }
        return gameStatus
    };

    const processWin = (playerTurn) => {
        players[playerTurn % 2].addScore();
        if (playerTurn % 2 == 0) {
            players[playerTurn % 2].name = document.querySelector("#playerOneName").value
        } else {
            players[playerTurn % 2].name = document.querySelector("#playerTwoName").value
        }
        document.querySelector(".lastGameIssue").innerHTML = players[playerTurn % 2].name.concat(" wins !");
        updateScore();
    };

    const processDraw = () => {
        document.querySelector(".lastGameIssue").innerHTML = "Draw !";
        updateScore();
    };

    const newRound = () => {
        player1.playerMoves = Array(9).fill(null);
        player2.playerMoves = Array(9).fill(null);
        gameGrid = Array(9).fill(null);
        const gridCells = document.querySelectorAll(".gridCells")
        for (i = 0; i < gridCells.length; i++) {
            gridCells[i].style.backgroundColor = "white";
            gridCells[i].innerHTML = "";
        };
    }

    // init
    updateScore();
    return { computeMove, checkGameOver, playerTurn, newRound, processWin, processDraw };
})();

const gridCells = document.querySelectorAll(".gridCells");
for (i = 0; i < gridCells.length; i++) {
    const gridCell = gridCells[i];
    gridCell.addEventListener("click", (e) => {
        const inputMove = e.target.id.slice(-1);
        game.computeMove(inputMove);
    });
};


const playAgainButton = document.querySelector(".playAgainButton");
playAgainButton.addEventListener("click", () => {
    game.newRound();
});