const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let changeColorId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStartEl.addEventListener('click', () => {
  changeColorId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStartEl.setAttribute('disabled', '');
});

buttonStopEl.addEventListener('click', () => {
  clearInterval(changeColorId);
  buttonStartEl.removeAttribute('disabled');
});