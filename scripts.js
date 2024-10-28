
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
    each play brings to next stage
    Then check victory
        -   change player if no victory
        -   claim victory and init game board
*/

// Players, initalize at least twice
// Factory function
function createPlayer(name, playerSymbol) {
    const getName = () => name;
    const symbol = playerSymbol;
    const playerMoves = Array(9).fill(null);
    let playerScore = 0;
    const addScore = () => playerScore++;
    const getScore = () => playerScore;
    return { symbol, playerMoves, addScore, getName, getScore }
}

// Game function, initialize only once
// Immediately Invoked Function Expression (IIFE)


const game = (function () {
    // Game variables 
    const symbols = ["X", "O"];
    const firstValue = Math.floor(Math.random() * 2);
    const player1 = createPlayer("Pierre", symbols[firstValue]);
    const player2 = createPlayer("Sarah", symbols[(firstValue + 1) % 2]);
    const players = [player1, player2];
    let playerTurn = 0;
    gameGrid = Array(9).fill(null);

    const playMove = (move, player) => {
        if (gameGrid[move] == null) {
            gameGrid[move] = player.symbol;
            player.playerMoves[move] = 1;
            return true
        } else {
            console.log("Move not possible. Play again.")
            return false
        }
    };
    const computeMove = (move) => {
        const isMoveValid = playMove(parseInt(move, 10), players[playerTurn % 2]);
        if (isMoveValid) {
            playerTurn += 1;
            console.log(gameGrid);
        }
    };

    const newRound = () => {
        player1.playerMoves = Array(9).fill(null);
        player2.playerMoves = Array(9).fill(null);
        gameGrid = Array(9).fill(null);
    };

    const processWin = (playerTurn) => {
        players[playerTurn % 2].addScore();
        console.log(players[playerTurn % 2].getName(), "wins !");
        console.log(players[0].getName(), players[0].getScore(), " - ", players[1].getName(), players[1].getScore());
    };



    const checkGameOver = (playerTurn) => {
        // check for draw 
        const player = players[playerTurn % 2];
        let gameStatus = 2;
        if (gameGrid.indexOf(null) == -1) {
            gameStatus = 0;
        } else {
            for (index = 0; index < 9; index++) {
                if (player.playerMoves[index] && player.playerMoves[index + 1] && player.playerMoves[index + 2]) {
                    gameStatus = 1;
                }
            }
            for (index = 0; index < 3; index++) {
                if (player.playerMoves[index] && player.playerMoves[index + 3] && player.playerMoves[index + 6]) {
                    gameStatus = 1;
                }
            }
            if (player.playerMoves[0] && player.playerMoves[4] && player.playerMoves[8] || (player.playerMoves[2] && player.playerMoves[4] && player.playerMoves[6])) {
                gameStatus = 1;
            }
        }
        return gameStatus
    };
    return { computeMove, checkGameOver, playerTurn, newRound, processWin };
})();

const playButton = document.querySelector(".playButton");

playButton.addEventListener("click", () => {
    const inputMove = document.querySelector(".enterMove").value;
    document.querySelector(".enterMove").value = "";
    game.computeMove(inputMove);
    const gameStatus = game.checkGameOver(game.playerTurn);
    if (gameStatus == 1 || gameStatus == 0) {
        game.processWin(game.playerTurn);
        game.newRound();
    };
});
