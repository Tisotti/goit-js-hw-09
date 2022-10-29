const buttonStart = document.querySelector('[data-start]');
const buttonEnd = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

buttonEnd.disabled = true;

buttonStart.addEventListener('click', onButtonStart)
buttonEnd.addEventListener('click', onButtonStop)

const changeBackColor = () => bodyColor.style.backgroundColor = getRandomHexColor();


let intarvalId;
function onButtonStart(){

    intarvalId = setInterval(changeBackColor,1000)

    buttonStart.disabled = true;
    buttonEnd.disabled = false;
}

function onButtonStop(){
    clearInterval(intarvalId);
    buttonStart.disabled = false;
    buttonEnd.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
