import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysCounterEl = document.querySelector('span[data-days]');
const hoursCounterEl = document.querySelector('span[data-hours]');
const minutesCounterEl = document.querySelector('span[data-minutes]');
const secondsCounterEl = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', '');

const today = new Date();
let counter;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  counter = { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const convertedValue = String(value);

  if (convertedValue.length === 1) {
    return convertedValue.padStart(2, '0');
  }
  return convertedValue;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < today) {
      Notify.warning('Please choose a date in the future!');
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', () => {
        startBtn.setAttribute('disabled', '');
        let timeDifference = selectedDates[0] - today;
        const counterID = setInterval(() => {
          convertMs(timeDifference);
          timeDifference -= 1000;

          daysCounterEl.textContent = addLeadingZero(counter.days);
          hoursCounterEl.textContent = addLeadingZero(counter.hours);
          minutesCounterEl.textContent = addLeadingZero(counter.minutes);
          secondsCounterEl.textContent = addLeadingZero(counter.seconds);

          if (timeDifference <= 0) {
            clearInterval(counterID);
            Notify.success('The countdown is over. Thank you and try again!');
          }
        }, 1000);
      });
    }
  },
};

const datetimePicker = flatpickr('#datetime-picker', options);