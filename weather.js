const date_el = document.querySelector(".date");
const country_input = document.querySelector(".country");
const btn = document.querySelector(".search-btn");
const temp_class = document.querySelector(".to_tem");
const country_display = document.querySelector(".county_name");
const api_key = "a99e14257065b3f3a60a353820f5959b";
let img = document.querySelector(".main_content");
const hum = document.querySelector(".Humidity");
const wind = document.querySelector(".wind");
const presser = document.querySelector(".presser");
const weth_icon = document.querySelector(".weatherImage");
const day_display = document.querySelector(".day");
const month_display = document.querySelector(".month");
const year_display = document.querySelector(".year");
const weather_description = document.querySelector(".weather_description");
const forecast = document.querySelector(".weather_forecast");
let country;

function getWeatherCondition(lat, lon) {
  let wether_api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=7&appid=${api_key}`;
  fetch(wether_api)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.main);
      console.log(data.wind);
      console.log(Math.round(data.main.temp_min - 273.15));
      console.log(data.weather[0].description);

      if (data.weather[0].description == "sunny") {
        img.style.backgroundImage = "url('image/weather_bg_sunny.jfif')";
      } else if (
        data.weather[0].description === "light rain" ||
        data.weather[0].description === " rain"
      ) {
        img.style.backgroundImage = "url('image/weather_bg_rain.jfif')";
      } else if (
        data.weather[0].description == "few cloud" ||
        data.weather[0].description == "cloud" ||
        data.weather[0].description == "overcast clouds" ||
        data.weather[0].description == "broken clouds"
      ) {
        img.style.backgroundImage = "url('image/cloud.jfif')";
      } else if (
        data.weather[0].description == "sky" ||
        data.weather[0].description == "clear sky"
      ) {
        img.style.backgroundImage = "url('image/sky.jfif')";
      } else {
        img.style.backgroundImage = "url('image/weather_bg.jfif')";
      }

      weth_icon.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
      weather_description.innerHTML = data.weather[0].description;
      wind.innerHTML = data.wind.speed + "Km/Hr";
      hum.innerHTML = data.main.humidity + "%";
      presser.innerHTML = data.main.pressure + "hpa";
      temp_class.innerHTML =
        Math.round(data.main.temp_min - 273.15) +
        "°C" +
        "/" +
        Math.round(data.main.temp_max - 273.15) +
        "°C";
    })
    .catch((error) => console.error(error));
}

function forecastWeather(lat, lon, day) {
  let forecast_api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
  fetch(forecast_api)
    .then((res) => res.json())
    .then((data) => {
      let uniqueForecast = [];
      let FiveDayForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecast.includes(forecastDate)) {
          return uniqueForecast.push(forecastDate);
        }
      });
      console.log(FiveDayForecast);
      forecast.innerHTML = "";
      let date1 = new Date(FiveDayForecast[1].dt_txt);
      let date2 = new Date(FiveDayForecast[2].dt_txt);
      let date3 = new Date(FiveDayForecast[3].dt_txt);
      let date4 = new Date(FiveDayForecast[4].dt_txt);
      forecast.innerHTML = `
              <div class="two">
                <img src="http://openweathermap.org/img/wn/${
                  FiveDayForecast[1].weather[0].icon
                }@2x.png" alt="Weather Icon">
                <h3>${
                  Math.round(FiveDayForecast[1].main.temp_min - 273.15) +
                  "°C" +
                  "/" +
                  Math.round(FiveDayForecast[1].main.temp_max - 273.15) +
                  "°C"
                }</h3>
                <p>${FiveDayForecast[1].weather[0].description}</p>
                <h2>${day[date1.getDay()]}</h2>
                <div>
                  <img src="image/humidity.png" alt="" width="50px" />
                  <p>${FiveDayForecast[1].main.humidity}"%"</p>
                </div>
                <div>
                  <img src="image/pressure.png" alt="" width="50px" />
                  <p>${FiveDayForecast[1].main.pressure}"hpa"</p>
                </div>
                <div>
                  <img src="image/wind.png" alt="" width="50px" />
                  <p>${FiveDayForecast[1].wind.speed}"Km/Hr"</p>
                </div>
              </div>
              <div class="three">
              <img src="http://openweathermap.org/img/wn/${
                FiveDayForecast[2].weather[0].icon
              }@2x.png" alt="Weather Icon">
              <h3>${
                Math.round(FiveDayForecast[2].main.temp_min - 273.15) +
                "°C" +
                "/" +
                Math.round(FiveDayForecast[2].main.temp_max - 273.15) +
                "°C"
              }</h3>
              <p>${FiveDayForecast[2].weather[0].description}</p>
                <h2>${day[date2.getDay()]}</h2>
                <div>
                  <img src="image/humidity.png" alt="" width="50px" />
                  <p>${FiveDayForecast[2].main.humidity}"%"</p>
                </div>
                <div>
                  <img src="image/pressure.png" alt="" width="50px" />
                  <p>${FiveDayForecast[2].main.pressure}"hpa"</p>
                </div>
                <div>
                  <img src="image/wind.png" alt="" width="50px" />
                  <p>${FiveDayForecast[2].wind.speed}"Km/Hr"</p>
                </div>
              </div>
              <div class="four">
                <img src="http://openweathermap.org/img/wn/${
                  FiveDayForecast[3].weather[0].icon
                }@2x.png" alt="Weather Icon">
                <h3>${
                  Math.round(FiveDayForecast[3].main.temp_min - 273.15) +
                  "°C" +
                  "/" +
                  Math.round(FiveDayForecast[3].main.temp_max - 273.15) +
                  "°C"
                }</h3>
                <p>${FiveDayForecast[3].weather[0].description}</p>
                <h2>${day[date3.getDay()]}</h2>
                <div>
                  <img src="image/humidity.png" alt="" width="50px" />
                  <p>${FiveDayForecast[3].main.humidity}"%"</p>
                </div>
                <div>
                  <img src="image/pressure.png" alt="" width="50px" />
                  <p>${FiveDayForecast[3].main.pressure}"hpa"</p>
                </div>
                <div>
                  <img src="image/wind.png" alt="" width="50px" />
                  <p>${FiveDayForecast[3].wind.speed}"Km/Hr"</p>
                </div>
              </div>
              <div class="five">
              <img src="http://openweathermap.org/img/wn/${
                FiveDayForecast[4].weather[0].icon
              }@2x.png" alt="Weather Icon">
              <h3>${
                Math.round(FiveDayForecast[4].main.temp_min - 273.15) +
                "°C" +
                "/" +
                Math.round(FiveDayForecast[4].main.temp_max - 273.15) +
                "°C"
              }</h3>
                <p>${FiveDayForecast[4].weather[0].description}</p>
                <h2>${day[date4.getDay()]}</h2>
                <div>
                  <img src="image/humidity.png" alt="" width="50px" />
                  <p>${FiveDayForecast[4].main.humidity}"%"</p>
                </div>
                <div>
                  <img src="image/pressure.png" alt="" width="50px" />
                  <p>${FiveDayForecast[4].main.pressure}"hpa"</p>
                </div>
                <div>
                  <img src="image/wind.png" alt="" width="50px" />
                  <p>${FiveDayForecast[4].wind.speed}"Km/Hr"</p>
                </div>
              </div>
              `;
    });
}

function bg_changer() {}

btn.addEventListener("click", () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (country_input.value === "") {
    country = "ethiopia";
  } else {
    country = country_input.value;
  }
  country_input.value = "";
  //console.log(country);
  let api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=${api_key}`;
  fetch(api_url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data[0].name);
      country_display.innerHTML = data[0].name;
      let date = new Date();
      console.log(day[date.getDay()]);
      console.log(date.getMonth());
      console.log(date.getFullYear());
      day_display.innerHTML = day[date.getDay()];
      month_display.innerHTML = months[date.getMonth()];
      year_display.innerHTML = date.getFullYear();
      // console.log(data);
      //console.log(data[0].lon);
      let lon = data[0].lon;
      //console.log(data[0].lat);
      const lat = data[0].lat;
      getWeatherCondition(lat, lon);
      forecastWeather(lat, lon, day);
      bg_changer();
    })
    .catch((error) => console.error(error));
});
