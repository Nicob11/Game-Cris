var cards = [`&#127812`, `&#127765`, `&#127770`, `&#128586`, `&#128584`, `&#128585`, `&#128050`, `&#9996`, `&#127812`, `&#127765`, `&#127770`, `&#128586`, `&#128584`, `&#128585`, `&#128050`, `&#9996`];
var mixCards = cards.sort(function () {
    return Math.random() - 0.5;
});
//console.log(mixCards)
//HTML VARIABLES
//let containerCards = document.querySelector('#cards-container');
let startGame = document.querySelector('#start');
let startHints = document.getElementById('hints');
let timer = document.querySelector('#timer');
let finishGame = document.querySelector('#finish-game');
//cartas
let btnNumber = null;
let card1 = null;
let card2 = null;
let newHints = 0;
let imgCard = null;
let click = 0;
let time = 30;
let times = false;
let firstSeleccion = null;
let secondSeleccion = null;
let comprobando = false;

//TIMER START FUNCTION

setInterval(() => {
    if (times === true) countTime();
}, 1000);

//START GAME
startGame.addEventListener('click', () => {
    if (times == false) {
        countTime();
        times = true;
    }
})
//counting time
function countTime() {
    time--;
    timer.innerHTML = `${time}`;
    if (time === 0) {
        timer = false;
        //clearInterval(reverseTime);
        //blockCard()
    }
}
console.log(mixCards);
//BTN SELECCIONADO
document.getElementById('cards-container').addEventListener('click', selectBtn);

function selectBtn(event) {
    if(comprobando){return}
    click++;
    console.log(`click`, click)
    btnNumber = event.target.id;
    imgCard = mixCards[btnNumber];
    if(click == 1 ) showFirtsCard();
    if(click ==2) showSecondCard();
}
//SHOW CARD 1
function showFirtsCard() {
        card1 = document.getElementById(`${btnNumber}`);
        firstSeleccion = card1.innerHTML = `${imgCard}`;
        card1.disabled = true;
}
//SHOW CARD 2
function showSecondCard() {
    card2 = document.getElementById(`${btnNumber}`);
    secondSeleccion = card2.innerHTML = `${imgCard}`;
    card2.disabled = true;
    click = 0;
    cardCompare();
}
function cardCompare() {
    if (firstSeleccion == secondSeleccion) {
        console.log(`este es el if`);
        newHints++;
        startHints.innerHTML = `${newHints}`;
    } else { //if(firstSeleccion != secondSeleccion){
        console.log(`este es el else`);
        firstSeleccion = null;
        secondSeleccion = null;
        comprobando = true;
        setTimeout(() => {
            card1.innerHTML = '';
            card1.disabled = false;
            card2.innerHTML = '';
            card2.disabled = false;
            comprobando = false;
        }, 1500);
        newHints--;
        startHints.innerHTML = `${newHints}`;
    }
}

