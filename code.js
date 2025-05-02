
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
const gameController = function startGame(){
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

    return {handleTurn, getResult, reset, isPlayerOne: () => isPlayerOneTurn};
}();




// display array contents to website
const displayBoard = function(array){

    const board = document.querySelector("#board");

    function render(array){
        for (let i = 0; i < array.length; i++){
            const cell = board.children[i];
            let entry = array[i];
    
            if (entry == "player1"){
                cell.textContent = "X";
            }else if(entry == "player2"){
                cell.textContent = "O";
            }else{
                cell.textContent = "";
            }
        }
    }

    return{render};

}();

// function to add event listeners
let player1;
let player2;
let round = 1;


function setupEventListeners(){

    const board = document.querySelector("#board");
    const buttons = document.querySelector("#buttons");
    let gameStarted = false;



    board.addEventListener("click", e => {
        if (!gameStarted) return;
        let indexClicked = parseInt(e.target.id);
        gameController.handleTurn(indexClicked);
        displayBoard.render(gameBoard.array);
        const result = gameController.getResult();
        if (result !== "none"){
            if (result === "player1"){
                player1.incrementScore();
            }else if (result === "player2"){
                player2.incrementScore();
            }

            round++;
            gameController.reset();
            displayBoard.render(gameBoard.array);
        }
        updateDisplay();
    });


    buttons.addEventListener("click", e => {
        if (e.target.id === "start"){
        
            gameController.reset();
            round = 0;

            const playerOneName = prompt("Player 1 Name: ");
            const playerTwoName = prompt("Player 2 Name: ");

            player1 = createPlayer(playerOneName);
            player2 = createPlayer(playerTwoName);

            gameStarted = true;
            updateDisplay();

        }else if (e.target.id === "reset"){

            gameController.reset();
            displayBoard.render(gameBoard.array);
            round = 0;
            updateDisplay();  
        }
    });


    function updateDisplay() {

        const players = document.querySelector("#players");
        const roundRef = document.querySelector("#round");

        if(gameController.isPlayerOne()){
            players.textContent = "Player 1 Turn";
        }else{
            players.textContent = "Player 2 Turn";
        }

        roundRef.textContent = `Round: ${round} | ${player1.name} Score: ${player1.getScore()} | ${player2.name} Score: ${player2.getScore()}`;

    }


}



displayBoard.render(gameBoard.array);
setupEventListeners();












