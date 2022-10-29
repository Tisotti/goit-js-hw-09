// Ипортирт библиотеки flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('#datetime-picker');
const timeElAll = document.querySelectorAll('.value');
const buttonStart = document.querySelector("[data-start]");
// Стучусь к форме и датах

buttonStart.addEventListener('click', onButton);
buttonStart.disabled = true;
// параметр flatpickr`a

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose, 
};

flatpickr(form, options);
// отсчет времени

let selectedTime = 0;

function onClose(selectedDates){
  const currentDate = options.defaultDate;
  if (selectedDates[0]<currentDate) {
    Notify.failure(`Please choose Date`,{
      timeout: 2000,});
  }else{
    buttonStart.disabled=false;
    selectedTime=selectedDates[0];
  }
}

function timerInterval(selectedDate){
  let intervalId = null;
  intervalId = setInterval(() => {
    const currentTime=Date.now();
    const countDownTime = selectedDate -currentTime;
    const time = convertMs(countDownTime);
    updateTime(time);
    if(countDownTime<1000){
    form.disabled = false;
      clearInterval(intervalId);

    }
  },1000)
}

function onButton(){
  buttonStart.disabled = true;
  form.disabled = true;
  timerInterval(selectedTime)
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0')};

  function convertMs(ms) {
    const days = addLeadingZero(Math.floor((ms / (1000 * 60 * 60 * 24))));
    const hours = addLeadingZero(Math.floor((ms / (1000 * 60 * 60)) % 24));
    const minutes = addLeadingZero(Math.floor((ms / (1000 * 60)) % 60));
    const seconds = addLeadingZero(Math.floor((ms / 1000) % 60));

    return { days, hours, minutes, seconds};
};

  function updateTime({ days, hours, minutes, seconds })
  { timeElAll[0].textContent = days;
    timeElAll[1].textContent = hours;
    timeElAll[2].textContent = minutes;
    timeElAll[3].textContent = seconds;
  }