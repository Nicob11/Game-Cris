var cards = [`&#127812`, `&#127765`, `&#127770`, `&#128586`, `&#128584`, `&#128585`, `&#128050`, `&#9996`, `&#127812`, `&#127765`, `&#127770`, `&#128586`, `&#128584`, `&#128585`, `&#128050`, `&#9996`];
var mixCards = cards.sort(function () {
    return Math.random() - 0.5;
});
let startGame = document.querySelector('#start');
let startHints = document.getElementById('hints');
let timer = document.querySelector('#timer');
let finishGame = document.querySelector('#finish-game');
//cartas
let btnNumber = null;
let card1 = null;
let card2 = null;
let secondSeleccion = null;
let firstSeleccion = null;
let imgCard = null;
let times = false;
let comprobando = false;
let newHints = 0;
let click = 0;
let time = 30;

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
    document.getElementById('cards-container').addEventListener('click', selectBtn);
})
//counting time
function countTime() {
    if (time === 0) {
        timer.innerHTML = `0`;
        times = false;
        comprobando = true;
        console.log(comprobando)
        return
    }
    time--;
    timer.innerHTML = `${time}`;
}
//BTN SELECCIONADO
// document.getElementById('cards-container').addEventListener('click', selectBtn);

function selectBtn(event) {
    if(document.getElementById(event.target.id).tagName !== 'BUTTON'){return}
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
        card1.classList.add('girarCarta');
        card1.classList.remove('blockCard');
        firstSeleccion = card1.innerHTML = `${imgCard}`;
        card1.disabled = true;
}
//SHOW CARD 2
function showSecondCard() {
    card2 = document.getElementById(`${btnNumber}`);
    card2.classList.add('girarCarta');
    card2.classList.remove('blockCard');
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
        timer.innerHTML = time + 3;
        time+=3;
    } else { //if(firstSeleccion != secondSeleccion){
        console.log(`este es el else`);
        firstSeleccion = null;
        secondSeleccion = null;
        comprobando = true;
        setTimeout(() => {
            card1.innerHTML = '';
            card1.disabled = false;
            card1.classList.remove('girarCarta');
            card2.classList.remove('girarCarta');
            card1.classList.add('blockCard');
            card2.classList.add('blockCard');
            card2.innerHTML = '';
            card2.disabled = false;
            comprobando = false;
        }, 1500);
        newHints--;
        startHints.innerHTML = `${newHints}`;
    }
}

