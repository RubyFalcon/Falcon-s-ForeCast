import "./styles.css";
import "weather-icons/css/weather-icons.css";

const countryInput = document.getElementById("country");
const locationButton = document.getElementById("search-button");

const convertTemp = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

const getWeatherIcon = (condition) => {
  const c = condition.toLowerCase();
  if (c.includes("snow")) return "wi-snow";
  if (c.includes("sleet")) return "wi-sleet";
  if (c.includes("thunder") || c.includes("storm")) return "wi-thunderstorm";
  if (c.includes("freezing drizzle") || c.includes("freezing rain")) return "wi-rain-mix";
  if (c.includes("heavy rain") || c.includes("rain")) return "wi-rain";
  if (c.includes("drizzle")) return "wi-sprinkle";
  if (c.includes("fog") || c.includes("mist")) return "wi-fog";
  if (c.includes("overcast")) return "wi-cloudy";
  if (c.includes("partially cloudy") || c.includes("partly cloudy")) return "wi-day-cloudy";
  if (c.includes("cloudy")) return "wi-cloudy";
  if (c.includes("clear") || c.includes("sunny")) return "wi-day-sunny";
  return "wi-day-sunny";
};

const getWeather = async (location) => {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.WEATHER_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

locationButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const content = document.querySelector(".content");
  content.innerHTML = "";

  const { address, currentConditions, days } = await getWeather(countryInput.value);

  const card = document.createElement("div");
  card.className = "weather-card";

  card.innerHTML = `
    <div class="card-top">
      <span class="city-name">${address}</span>
      <span class="card-temp">${convertTemp(currentConditions.temp).toFixed(1)}°C</span>
    </div>
    <i class="wi ${getWeatherIcon(currentConditions.conditions)} card-icon"></i>
    <div class="card-condition">${currentConditions.conditions}</div>
    <div class="card-details">
      <span>wind speed : ${currentConditions.windspeed} km/h</span>
      <span>${days[0].datetime} · ${currentConditions.datetime}</span>
      <span>feels like : ${convertTemp(currentConditions.feelslike).toFixed(1)}°C</span>
    </div>
  `;

  content.appendChild(card);
});
