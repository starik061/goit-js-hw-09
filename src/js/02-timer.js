import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_green.css';

let timerId = null;
let countdownTime_obj = {};
let countdownTime_ms = null;
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const datePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', 'true');
      return;
    }
    countdownTime_ms = selectedDates[0].getTime() - Date.now();

    startBtn.removeAttribute('disabled');

    countdownTime_obj = convertMs(countdownTime_ms);
  },
};
const datePicker = flatpickr('#datetime-picker', datePickerOptions);
const startBtn = document.querySelector('[data-start]');

startBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', onStartBtnClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function decreaseTimePerSecond() {
  countdownTime_ms -= 1000;
  countdownTime_obj = convertMs(countdownTime_ms);
}

function refreshTimerFields() {
  timerFields.days.textContent = addLeadingZero(countdownTime_obj.days);
  timerFields.hours.textContent = addLeadingZero(countdownTime_obj.hours);
  timerFields.minutes.textContent = addLeadingZero(countdownTime_obj.minutes);
  timerFields.seconds.textContent = addLeadingZero(countdownTime_obj.seconds);

  if (
    timerFields.days.textContent === '00' &&
    timerFields.hours.textContent === '00' &&
    timerFields.minutes.textContent === '00' &&
    timerFields.seconds.textContent === '00'
  ) {
    clearInterval(timerId);
    for (let each in timerFields) {
      timerFields[each].style.color = 'lime';
    }
    console.log('end');
    return;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function mainTimerFunc() {
  decreaseTimePerSecond();
  refreshTimerFields();
}

function onStartBtnClick(event) {
  mainTimerFunc();
  timerId = setInterval(mainTimerFunc, 1000);
  console.log('start');
  startBtn.setAttribute('disabled', 'true');
}
