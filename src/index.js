"use strict";

function setDisable(radioBtn) {
  const cityNameInput = document.getElementById("cityName");
  const cityIDInput = document.getElementById("cityID");

  const isCityName = radioBtn.id === "cityNameRadio";

  cityNameInput.disabled = !isCityName;
  cityIDInput.disabled = isCityName;

  (isCityName ? cityIDInput : cityNameInput).value = "";
}

const radioButtons = document.querySelectorAll('input[name="typeCity"]');

radioButtons.forEach((radio) => {
  radio.addEventListener("change", (e) => setDisable(e.target));
});

function getWeather(e) {
  e.preventDefault();
  const appId = "91f398fbbd506f5838b506bf75cbe99d";
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const units = "metric";
  const lang = "ua";

  const cityName = document.getElementById("cityName").value;
  const cityID = document.getElementById("cityID").value;
  let city;
  let searchKeyWord;
  if (cityName) {
    searchKeyWord = "q";
    city = cityName;
  } else if (cityID) {
    searchKeyWord = "id";
    city = cityID;
  } else {
    throw new Error("Not entered a city name or ID.");
  }
  fetch(
    `${url}?${searchKeyWord}=${city}&appid=${appId}&units=${units}&lang=${lang}`
  )
    .then((res) => res.json())
    .then((data) => {
      const temprature = document.getElementById("temprature");
      temprature.textContent = `${data.main.temp}°C`;
      const windSpeed = document.getElementById("windSpeed");
      windSpeed.textContent = `${data.wind.speed}m/s`;
      const humidity = document.getElementById("humidity");
      humidity.textContent = `${data.main.humidity}%`;
    })
    .catch((error) => {
      throw new Error(error, error.textMessage);
    });
}

const sumbitBtn = document.getElementById("sumbitBtn");
sumbitBtn.addEventListener("click", (e) => {
  getWeather(e);
});
