import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const HTMLElements = {
  formElement: document.querySelector('.form'),
  firstDelayElement: document.querySelector('[name="delay"]'),
  delayStepElement: document.querySelector('[name="step"]'),
  promisesAmountElement: document.querySelector('[name="amount"]'),
};

// Вспомогательный функционал для сохранения в локальном хранилище данных полей, а также их обнуления
getFromLocalStorage();

const resetBtn = document.querySelector('[name="reset"]');

resetBtn.addEventListener('click', () => {
  HTMLElements.firstDelayElement.value = '';
  HTMLElements.delayStepElement.value = '';
  HTMLElements.promisesAmountElement.value = '';

  localStorage.removeItem('formData');
});

function saveToLocalStorage(firstDelay, delayStep, promisesAmount) {
  const storageObj = {
    firstDelay,
    delayStep,
    promisesAmount,
  };
  localStorage.setItem('formData', JSON.stringify(storageObj));
}

function getFromLocalStorage() {
  if (localStorage.getItem('formData') === null) {
    return;
  }
  const { firstDelay, delayStep, promisesAmount } = JSON.parse(
    localStorage.getItem('formData')
  );

  HTMLElements.firstDelayElement.value = firstDelay;
  HTMLElements.delayStepElement.value = delayStep;
  HTMLElements.promisesAmountElement.value = promisesAmount;
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

HTMLElements.formElement.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let firstDelay = Number(HTMLElements.firstDelayElement.value);
  let delayStep = Number(HTMLElements.delayStepElement.value);
  let promisesAmount = Number(HTMLElements.promisesAmountElement.value);

  saveToLocalStorage(firstDelay, delayStep, promisesAmount);

  for (let i = 1; i <= promisesAmount; i += 1) {
    if (i > 1) {
      firstDelay += delayStep;
    }
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.init({
          position: 'center-top',
          timeout: firstDelay - delayStep + delayStep * promisesAmount,
        });
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.init({
          position: 'center-top',
          timeout: firstDelay - delayStep + delayStep * promisesAmount,
        });
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
