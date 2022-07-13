let firstCard = 19;
let secondCard = 9;
let hasBlackJack = false;
let isAlive = true;

let sum = firstCard + secondCard;

let messageEL = document.getElementById("message-el")
console.log(messageEL)
function startGame(){
    if (sum < 21){
        console.log("Do you want to draw a new card?")
    }
    if (sum === 21){
        console.log("Congrats!! You've got BlackJack")
        hasBlackJack = true
    }
    if (sum > 21){
        console.log("You lose")
        isAlive = false
    }
}

