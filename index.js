/**
 * Juego de Black Jack usando Javascript e interfaz por consola
 *
 * @author Justin alejandro diaz - jusadiazjim@unal.edu.co
 */

//Definicion de variables necesarias para el juego
const cards =["A","2","3","4","5","6","7","8","9","10","K","Q","J"];
//suit: heart, diamond, ace and clover

let selectedCards=[];
let sum =0;
let answer ="";
let prizes =0;


/**
 * Comienzo del Juego, saludo e instrucciones seguido del metodo areyouready
 * para preguntarle al usuario si desea comenzar
 */
console.log("===============================================================");
console.log("Welcome to Black Jack!!");
console.log("You are going to compete vs the pc, if you win the round you " +
    " will recive $1000, if you lose the round you gonna lose $1000.");
console.log("---------------------------------------------------------------");

areYouReady(); // Es la funcion justo debajo



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
 * Funcion para darle un proceso logico al juego, se vuelve a inicializar todas
 * las variables desde cero y comienza el juego con startGame
 * Se crean 3 posibilidades para que siempre evalue, si el puntaje del jugador
 * es menos igual o mayor a 21
 * - Si es menor a 21 le da la opcion de coger una nueva carta
 * -Si es igual a 21 o mayor el juego se dirige a la siguiente ronda
 */
function gameBucle(){
    let selectedCards=[];
    let sum =0;
    let answer ="";
    let prizes =0;
    startGame();
    while (sum<21){
        playingGame();
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

/**
 * Funcion para crear una nueva ronda preguntadole al usuario si desea jugar
 * Y - redirige al bucle del juego
 * N - le da el dinero al jugador
 */
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
 * Funcion para iniciar el juego, crea las dos cartas del jugador y la suma de
 * estas
 */

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
/**
 * Solo una funcion para revisar como va todo
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

/**
 * Funcion para sacar una nueva carta, pregunta al usuario si desea sacarla
 * Y - ejecuta la funcion de anotherCard
 * N - Evalua resultados entre el usuario y el pc para ver el ganador
 */

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

/**
 * Funcion para crear numero aleatorio para catas del pc
 * @param min
 * @param max
 * @returns numero aleatorio ente max y min
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


/**
 * Funcion para sacar una nueva carta su funcionamiento es igual a starGame
 */
function  anotherCard(){
    const i_newCard=Math.floor(Math.random() * cards.length);

    const newCard=cards[i_newCard];

    selectedCards.push(newCard);
    sumEachCard(newCard);
    console.log("Your cards are: "+selectedCards);
    console.log("The new accumulated is: "+ sum);
}

/**
 * Funcion encargada de preguntarle al usuario que valor desea que tome la carta
 * A que acaba de sacar, ya sea 11 o 1
 */
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

/**
 * Suma todas las cartas
 * @param selectedCards
 * @returns sum
 */
function sumCards(selectedCards){
    selectedCards.forEach(sumEachCard);
    return sum;
}

/**
 * Le asigna valores a cada uno de las cartas usando un
 * @param elem
 * que sea nuestra carta
 */
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


/**
 * Otra ronda?
 */

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




