const tile = document.querySelectorAll(".tile");
const playerX = "X";
const playerO = "O";
let turn = playerX;

const boardState = Array(tile.length);
boardState.fill(null);

const strike = document.getElementById("strike");
const gameOver = document.getElementById("game-over");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener('click', startNewGame);

tile.forEach(tile=>tile.addEventListener('click', tileClick))

function tileClick(event) {
    if(gameOver.classList.contains('visible')){
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText !=""){
        return;
    }
    if(turn === playerX){
        tile.innerText = playerX;
        boardState[tileNumber-1] = playerX;
        turn = playerO;
    }
    else{
        tile.innerText = playerO;
        boardState[tileNumber - 1] = playerO;
        turn = playerX; 
    }
    
    winningCombos();
}

function winningCombos(){
    for(const winningCombination of winningCombinations) {
        const combo = winningCombination.combo;
        const strikeClass = winningCombination.strikeClass;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if(
            tileValue1 != null &&
            tileValue1 === tileValue2 &&
            tileValue1 === tileValue3
        ){
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }

    const allTileFilled = boardState.every((tile)=> tile !== null);
    if(allTileFilled){
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText){
    let text = "Draw!";
    if( winnerText != null){
        text = `Winner is ${winnerText}!`;
    }
    gameOver.className = "visible";
    gameOverText.innerText = text;
}

function startNewGame(){
    strike.className = "strike";
    gameOver.className = "hidden";
    boardState.fill(null);
    tile.forEach((tile)=> (tile.innerText = ""));
    turn = playerX;
}

const winningCombinations = [
    {combo: [1, 2, 3], strikeClass: "strike-row-1"},
    {combo: [4, 5, 6], strikeClass: "strike-row-2"},
    {combo: [7, 8, 9], strikeClass: "strike-row-3"},
    {combo: [1, 4, 7], strikeClass: "strike-column-1"},
    {combo: [2, 5, 8], strikeClass: "strike-column-2"},
    {combo: [3, 6, 9], strikeClass: "strike-column-3"},
    {combo: [1, 5, 9], strikeClass: "strike-diagonal-1"},
    {combo: [3, 5, 7], strikeClass: "strike-diagonal-2"},
];