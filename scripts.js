
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
    const player2 = createPlayer("Player 2", "O");
    const players = [player1, player2];
    let playerTurn = 0;
    gameGrid = Array(9).fill(null);

    const updateScore = () => {
        document.querySelector("#playerScore1").innerHTML = player1.getScore();
        document.querySelector("#playerScore2").innerHTML = player2.getScore();
    };

    updateScore();

    const playMove = (move, player) => {
        console.log(move);
        console.log(gameGrid);
        if (gameGrid[move] == null && !isNaN(move)) {
            gameGrid[move] = player.symbol;
            player.playerMoves[move] = 1;
            const grid = document.querySelector("#gridCell".concat(move.toString()));
            console.log("#gridCell".concat(move.toString()));
            console.log(player.symbol);
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
        const gridCells = document.querySelectorAll(".gridCells")
        for (i = 0; i < gridCells.length; i++) {
            gridCells[i].style.backgroundColor = "white";
            gridCells[i].innerHTML = "";
        };
    }

    const processWin = (playerTurn) => {
        players[playerTurn % 2].addScore();
        document.querySelector(".lastGameIssue").innerHTML = players[playerTurn % 2].name.concat(" wins !");
        updateScore();
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

const gridCells = document.querySelectorAll(".gridCells");

for (i = 0; i < gridCells.length; i++) {
    const gridCell = gridCells[i];
    gridCell.addEventListener("click", (e) => {
        const inputMove = e.target.id.slice(-1);
        game.computeMove(inputMove);
        const gameStatus = game.checkGameOver(game.playerTurn);
        if (gameStatus == 1) {
            game.processWin(game.playerTurn);
            game.newRound();
        };
        if (gameStatus == 0) {
            game.newRound();
        };
    });
};

const playAgainButton = document.querySelector(".playAgainButton");

playAgainButton.addEventListener("click", () => {
    game.newRound();
})

/*


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

*/