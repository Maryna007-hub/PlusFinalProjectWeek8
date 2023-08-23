function formatDate(timestamp) {
    // calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    if (hours < 10) {
        hours = `0${hours}`;
      }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [ "Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector('#forecast');

  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
      
    forecastHTML = forecastHTML +  
    `<div class="col-2"> 
      <div class="weather-fofecast-date">
      ${formatDay(forecastDay.dt)}
      </div>
  
     <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="clear" width="42" id="icon"/>
     <div class="weather-fofecast-tematurepers">
        <span class="weather-fofecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="weather-fofecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
     </div>
    </div>`; }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {

 let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

 axios.get(apiUrl).then(displayForecast); 

}
function displayTemperature(response) {

    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description1');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute('src', `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute('alt', response.data.weather[0].description);

    getForecast(response.data.coord);
   
}
function search(city) {
    let apiKey = "ed7bf7f5cf99619f0aa2717501c76f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);    
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector('#city-input');
   search(cityInputElement.value);
}
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector('#temperature');
  
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
 function displayCelsiusTemperature(event) {
    event.preventDefault();
     let temperatureElement = document.querySelector('#temperature');
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
 }

let celsiusTemperature = null;

  let form = document.querySelector('#search-form');
  form.addEventListener('submit', handleSubmit);

  let fahrenheitLink = document.querySelector('#fahrenheit-link');
  fahrenheitLink.addEventListener('click', displayFahrenheitTemperature);

   let celsiusLink = document.querySelector('#celsius-link');
   celsiusLink.addEventListener('click', displayCelsiusTemperature);

  search('Lisbon');
 

