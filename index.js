let player = {
    name: "Justin",
    Accumulated: 250
}

let cards = []
const SUITS = ["♠", "♣", "♥", "♦"]
let sum = 0
let hasBlackJack = false
let isAlive = false
let isInGame = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let extraMoney = 0


window.onload = function() {
    buildDeck();
    shuffleDeck();
}

playerEl.textContent = player.name + ": $" + player.Accumulated

var deck;


window.onload = function() {
    buildDeck();
    shuffleDeck();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}


function hit() {
    if (!isAlive) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    sum += getValue(card);
    document.getElementById("your-cards").append(cardImg);
    renderGame()
}



function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            extraMoney += 500
            return 11;
        }
        extraMoney += 500
        return 10;
    }
    extraMoney += 100
    return parseInt(value);
}



/**
 * -----------------------------------
 * @returns {number}
 */

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}


function startGame() {

    if ( isInGame == false) {
        player.Accumulated -= 250
        isAlive = true
        isInGame = true
        for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            sum += getValue(card);
            document.getElementById("your-cards").append(cardImg);
        }

        renderGame()
    }
}

function renderGame() {

    cardsEl.textContent = "Cards: "


    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        player.Accumulated += 1000
        player.Accumulated += extraMoney
        hasBlackJack = true
        isAlive = false
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
    playerEl.textContent = player.name + ": $" + player.Accumulated
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function newRound() {

    isInGame = false
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + "BACK" + ".png";
    document.getElementById("your-cards").append(cardImg);
    sum = 0
    extraMoney = 0

    buildDeck();
    shuffleDeck();
    startGame()


}
