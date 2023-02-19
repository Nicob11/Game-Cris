import { restart } from "./restartFunction.js";
var cards = [
  `&#127812`,
  `&#127765`,
  `&#127770`,
  `&#128586`,
  `&#128584`,
  `&#128585`,
  `&#128050`,
  `&#9996`,
  `&#127812`,
  `&#127765`,
  `&#127770`,
  `&#128586`,
  `&#128584`,
  `&#128585`,
  `&#128050`,
  `&#9996`,
];
// let cards = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
var mixCards = cards.sort(function () {
  return Math.random() - 0.5;
});
let startGame = document.querySelector("#start");
let startHints = document.getElementById("hints");
let timer = document.querySelector("#timer");
let finishGame = document.querySelector("#finish-game");
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
let time = 40;

//TIMER START FUNCTION
var regresiveTime = setInterval(() => {
  if (times) countTime();
}, 1000);

//START GAME
startGame.addEventListener("click", () => {
  if (times == false) {
    times = true;
    time = 40;
  }
  document
    .getElementById("cards-container")
    .addEventListener("click", selectBtn);
});
//counting time
function countTime() {
  if (time === 0) {
    timer.innerHTML = `Time: 0`;
    times = false;
    comprobando = true;
    showResult();
    finishGame.innerHTML = `<div class="alert grow"><p id="gOver">Game<br>Over</p></div>`;
    startGame.addEventListener("click", restart);
    return;
  }
  time--;
  timer.innerHTML = `Time: ${time}`;
}
//muestra todas las cartas cuando time == 0
function showResult() {
  for (let i = 0; i < 16; i++) {
    let blockCard = document.getElementById(i);
    blockCard.innerHTML = `${mixCards[i]}`;
    blockCard.disabled = true;
  }
}
//BTN SELECCIONADO
function selectBtn(event) {
  if (document.getElementById(event.target.id).tagName !== "BUTTON") {
    return;
  }
  if (comprobando) {
    return;
  }
  click++;
  btnNumber = event.target.id;
  imgCard = mixCards[btnNumber];
  if (click == 1) showFirtsCard();
  if (click == 2) showSecondCard();
}
//SHOW CARD 1
function showFirtsCard() {
  card1 = document.getElementById(`${btnNumber}`);
  card1.classList.add("seeCard");
  card1.classList.remove("blockCard");
  firstSeleccion = card1.innerHTML = `${imgCard}`;
  card1.disabled = true;
}
//SHOW CARD 2
function showSecondCard() {
  card2 = document.getElementById(`${btnNumber}`);
  card2.classList.add("seeCard");
  card2.classList.remove("blockCard");
  secondSeleccion = card2.innerHTML = `${imgCard}`;
  card2.disabled = true;
  click = 0;
  cardCompare();
}
function cardCompare() {
  if (firstSeleccion == secondSeleccion) {
    newHints++;
    hints();
    startHints.innerHTML = `Hints: ${newHints}`;
    timer.innerHTML = `Time:  ${time + 3}`;
    time += 3;
  } else {
    //if(firstSeleccion != secondSeleccion){
    firstSeleccion = null;
    secondSeleccion = null;
    comprobando = true;
    setTimeout(() => {
      card1.innerHTML = "";
      card1.disabled = false;
      card1.classList.remove("girarCarta");
      card2.classList.remove("girarCarta");
      card1.classList.add("blockCard");
      card2.classList.add("blockCard");
      card2.innerHTML = "";
      card2.disabled = false;
      comprobando = false;
    }, 1500);
    //newHints--;
    startHints.innerHTML = `Hints: ${newHints}`;
  }
}
function hints() {
  if (newHints == 8) {
    finishGame.innerHTML = `<div class="alert grow"><p id="gOver">
    You're<br>The<br>Best
    </p></div>`;
    times = false;
    startGame.addEventListener("click", restart);
    return;
  }
}
