const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

const greetingForm = document.querySelector(".greeting-form"),
  greetingInput = greetingForm.querySelector("input"),
  greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function paintGreeting(text) {
  const hour = getTime();
  greetingForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  if (hour < 12 && hour > 0) {
    greeting.innerText = `good Morning ${text}`;
  } else {
    greeting.innerText = `good evening ${text}`;
  }
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  return hours;
}

function init() {
  getTime();
  loadName();
  setInterval(getTime, 1);
}

init();
