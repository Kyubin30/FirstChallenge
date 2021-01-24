const board = document.querySelector(".weatherboard");
const where = board.querySelector(".location");
const currTemp = board.querySelector(".currTemp");
const highTemp = board.querySelector(".highTemp");
const lowTemp = board.querySelector(".lowTemp");
const description = board.querySelector(".description");
const API_KEY = "449e8e3ae3ff6e88ac719f34ca9abafd";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const whatweather = json.weather[0].icon;
      const weatherIcon = new Image();

      currTemp.innerText = json.main.temp + "°";
      highTemp.innerText = json.main.temp_max + "°";
      lowTemp.innerText = json.main.temp_min + "°";
      where.innerText = json.name;
      description.innerText = json.weather[0].description;

      weatherIcon.classList.add("weatherIcon");

      weatherIcon.src = `http://openweathermap.org/img/wn/${whatweather}@2x.png`;
      board.appendChild(weatherIcon);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(positon) {
  const latitude = positon.coords.latitude;
  const longitude = positon.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Oh shit");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
