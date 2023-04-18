const refs = {
  starBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let changeBGColorIntervalId = null;

refs.starBtn.addEventListener('click', () => {
  changeBodyBGColor();
  changeBGColorIntervalId = setInterval(changeBodyBGColor, 1000);
  refs.starBtn.setAttribute('disabled', true);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(changeBGColorIntervalId);
  refs.starBtn.removeAttribute('disabled');
});

function changeBodyBGColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
