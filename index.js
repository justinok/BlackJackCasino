const cards =["A","2","3","4","5","6","7","8","9","10","K","Q","J"];
//suit: heart, diamond, ace and clover

//First time: A = 11
//Other times: A = 1
let selectedCards=[]; //First and second card -randomly. And then add with a draw function
let sum =0;
let answer ="";

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
    }else{
        console.log("Sorry, you lose.")
    }
}

function bucleOfGaming(){

    startGame();
    playingGame();
    if(sum<21){

    }
}
function catchInput(){
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
                console.log("Ok, game finished.");
                break;
            default:
                console.log("Invalid input. ");
                break;
        }
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




console.log("Blackjack");
console.log("Feeling with luck? - Give it a try~~");
startGame();
playingGame();
