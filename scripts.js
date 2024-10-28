// Game board function, initialize only once
// Immediately Invoked Function Expression (IIFE)

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
    Init Board
    Start Game 
    select first player
    Tant que Game not win
        change player
        ask move
        playmove
    update scores
    create new board
*/
const gameBoard = (function () {
    // Game variables 
    const symbols = ["X", "O"];
    const winningComb = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]];
    // Players, initalize at least twice
    // Factory function

    function createPlayer(name) {
        const getName = () => name;
        let symbol;
        const addScore = () => playerScore++;
        const getScore = () => playerScore;
        return { name, getName }
    }

    const initGame = () => {
        const player0 = createPlayer("Pierre");
        const player1 = createPlayer("Sarah");
        const assignSymbol = (function () {
            const firstValue = Math.floor(Math.random() * 2);
            player0.symbol = symbols[firstValue];
            player1.symbol = symbols[(firstValue + 1) % 2];
        })();
        const players = [player0, player1];
        let playerTurn = 0;
        gameGrid = Array(9);
        return { gameGrid, players, playerTurn }
    };

    const playMove = (move, player) => {
        if (gameGrid[move] == null) {
            gameGrid[move] = player.symbol;
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

    const checkWin = (player) => {
        function getAllIndexes(arr, val) {
            var indexes = [], i = -1;
            while ((i = arr.indexOf(val, i + 1)) != -1) {
                indexes.push(i);
            }
            return indexes;
        }

        var indexes = getAllIndexes(gameGrid, player.symbol);
        console.log(indexes);


        return false
    };


    const playGame = () => {

        while (!checkWin(players[playerTurn % 2])) {
            const isMoveValid = playMove(parseInt(chooseMove(), 10), players[playerTurn % 2]);
            if (isMoveValid) {
                playerTurn += 1;
                console.log(gameGrid);
            }
        }
        players[playerTurn % 2].addScore();

    }
    return { initGame, computeMove, checkWin };
})();

gameBoard.initGame();
const playButton = document.querySelector(".playButton");
playButton.addEventListener("click", () => {
    const inputMove = document.querySelector(".enterMove").value;
    document.querySelector(".enterMove").value = "";
    gameBoard.computeMove(inputMove);
    gameBoard.checkWin();
})

