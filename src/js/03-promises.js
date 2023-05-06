const formEl = document.querySelector('.form');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl.addEventListener('submit', ev => {
  ev.preventDefault();

  const firstDelay = +formEl.elements.delay.value;
  const step = +formEl.elements.step.value;
  const amount = +formEl.elements.amount.value;

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, firstDelay + i * step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}