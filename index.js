const cards =["A","2","3","4","5","6","7","8","9","10","K","Q","J"];
//suit: heart, diamond, ace and clover

//First time: A = 11
//Other times: A = 1
let selectedCards=[]; //First and second card -randomly. And then add with a draw function
let sum =0;
let answer ="";
let prizes =0;

//To get inputs
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});



function startGame(){
    //TO DO: Add the first 2 cards randomly to the user
    //Math.random() - 0 - cards.length
    const i_firstCard=Math.floor(Math.random() * cards.length);
    const i_secondCard=Math.floor(Math.random() * cards.length);

    const firstCard=cards[i_firstCard];
    const secondCard=cards[i_secondCard];

    selectedCards.push(firstCard);
    selectedCards.push(secondCard);

    console.log("Cards: "+selectedCards);
    console.log("Sum: "+sumCards(selectedCards));


}
/*
< 21 - Drawing a card, you are still playing
= 21 - Blackjack!
> 21 - Y
*/

function playingGame(){
    if(sum<21){
        drawCard();
    }else if(sum===21){
        console.log("Blackjack!");
    }
    if (sum>21){
        console.log("perdedor!");

    }
}


function drawCard(){

        var prompt = require('prompt-sync')();
//
// get input from the user.
//
        var answer = prompt('Do you want to draw a card? (Y/N): ');

        switch(answer){
            case "Y":
                anotherCard();
                break;
            case "N":

                let pc = getRndInteger(16,21);
                if (pc>sum) {
                    prizes-=1000;
                    console.log("Sorry you lose, your accumulated is " + sum +
                    " and the PC accumulated is " + pc + " that is more closer" +
                        "to 21, you lose $1000 " );
                    anotherRound();
                }
                if (pc<sum) {
                    prizes+=1000;
                    console.log("You win!!!! with " + sum +
                        "vs PC accumulated that is " + pc + "you win $1000 " );
                    anotherRound();
                }
                break;
            default:
                console.log("Invalid input. ");
                break;
        }
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function  anotherCard(){
    const i_newCard=Math.floor(Math.random() * cards.length);

    const newCard=cards[i_newCard];

    selectedCards.push(newCard);
    sumEachCard(newCard);
    console.log("Your cards are: "+selectedCards);
    console.log("The new accumulated is: "+ sum);
}

function aCardSelection(){
    var prompt = require('prompt-sync')();
//
// get input from the user.
//
    var n = prompt('You got a A card. Do you want it to be 11 or 1? (11/1): ');

        switch(n){
            case "11":
                console.log("11 was aded to your accumulated");
                sum+=11;
                break;
            case "1":
                console.log("1 was aded to your accumulated");
                sum+=1;
                break;
            default:
                console.log("Invalid input. ");
                break;
        }


}

function sumCards(selectedCards){
    selectedCards.forEach(sumEachCard);
    return sum;
}

function sumEachCard(elem){

    switch (elem){
        case "K":
            sum+=10;
            break;
        case "J":
            sum+=10;
            break;
        case "Q":
            sum+=10;
            break;
        case "A":
            aCardSelection();
            break;
        default:
            sum+=Number(elem);
            break;
    }
}


function gameBucle(){
    let selectedCards=[];
    let sum =0;
    let answer ="";
    let prizes =0;
    startGame();
    while (sum<21){
        drawCard();
    }
    if (sum === 21) {
        console.log("black jackk")
        prizes+=1000;
        anotherRound();
    }
    if (sum > 21) {
        console.log("perdedor")
        prizes-=1000;
        anotherRound();
    }
}

function anotherRound(){
    var prompt = require('prompt-sync')();
//
// get input from the user.
//
    var n = prompt('Another round? Could be an extra' +
        ' $1000 on your pocket (Y/N): ');

    switch(n){
        case "Y":

            gameBucle();
            break;
        case "N":
            console.log("Ok, the accumulated for your prizes is a total" +
                "of $" + prizes);


            break;
        default:
            console.log("Invalid input. ");
            break;
    }
}

/**
 * Funcion que pregunta al usuario si esta listo para iniciar
 * Y- redirige a gameBucle para entrar al juego
 * N- Regaña al usuario por hacerle perder el tiempo a la maquina
 */
function areYouReady(){
    var prompt = require('prompt-sync')();
//
// get input from the user.
//
    var n = prompt('Are you ready to start with your first game (Y/N): ');

    switch(n){
        case "Y":
            console.log("================================================" +
                "===============");
            console.log("Let's go!");
            console.log("================================================" +
                "===============");
            gameBucle();
            break;
        case "N":
            console.log("Come back when you have the courage to change your " +
                "life");

            break;
        default:
            console.log("Invalid input. ");
            break;
    }
}


/**
 * Comienzo del Juego, saludo e instrucciones seguido del metodo areyouready
 * para preguntarle al usuario si desea comenzar
 */
console.log("===============================================================");
console.log("Welcome to Black Jack!!");
console.log("You are going to compete vs the pc, if you win the round you " +
    " will recive $1000, if you lose the round you gonna lose $1000.");
console.log("---------------------------------------------------------------");
areYouReady();



