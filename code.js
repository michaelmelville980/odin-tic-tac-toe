
// Creates 9 entry array for (3x3 board) 
const gameBoard = function createGameboard() {

    // Creates array
    const entries = 9;
    const array = [];
    for (let i = 0; i < entries; i++){
        array.push("none");
    }

    // Resets array
    function reset() {
        for(let i = 0; i < entries; i++){
            array[i] = "none";
        }   
    }

    return {
        array,
        reset
    }
}();





// Factory function to create player (with access to name property and score methods)
function createPlayer(name){
    let score = 0;
    return {
        name,
        getScore() {return score; },
        incrementScore() {score++;}
    }
}





// Factor function to control gameplay using gameBoard and player objects
function startGame(p1, p2){
    let isPlayerOneTurn = true;

    // updates gameBoard.array for each move
    function handleTurn(indexClicked){
        if (gameBoard.array[indexClicked] === "none"){
            if(isPlayerOneTurn){
                gameBoard.array[indexClicked] = "player1";
            }else{
                gameBoard.array[indexClicked] = "player2";
            }
            isPlayerOneTurn = !isPlayerOneTurn;
        }
    }

    // checks for winner
    function getResult(){
        let result = "none";

        const winner = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
        if(gameBoard.array.indexOf("none") === -1){
            result = "tie";
        }else{
            for (let i = 0; i < winner.length; i++){
                if (
                    gameBoard.array[winner[i][0]] !== "none" &&
                    gameBoard.array[winner[i][0]] === gameBoard.array[winner[i][1]] &&
                    gameBoard.array[winner[i][0]] === gameBoard.array[winner[i][2]]
                ){
                    result = gameBoard.array[winner[i][0]];
                }
            }
        }
        return result;      
    }

    // resets board 
    function reset() {
        gameBoard.reset();
        isPlayerOneTurn = true;
    }

    return { handleTurn, getResult, reset};
}




// display array contents to board











