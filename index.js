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

playerEl.textContent = player.name + ": $" + player.Accumulated

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
        let firstCard = 10 //getRandomCard()
        let secondCard = 11 //getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        isInGame = true
        renderGame()
    }
}

function renderGame() {

    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + SUITS[i]+ " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        player.Accumulated += 1000
        hasBlackJack = true
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
    startGame()

}