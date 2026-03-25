import "./styles.css";

const countryInput = document.getElementById("country");
const locationButton = document.getElementById("search-button");

//convert temp
const convertTemp = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
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
  const content = document.querySelector(".content");

  content.innerHTML = "";
  const addressElement = document.createElement("h1");
  addressElement.className = "address";

  const date = document.createElement("h2");
  date.className = "date";

  const celcius = document.createElement("p");
  celcius.className = "temperature";

  const feelsLike = document.createElement("p");
  feelsLike.className = "temperature";
  event.preventDefault();
  const { address, country, description, currentConditions, days } =
    await getWeather(countryInput.value);
  console.log(
    `resolved address is : ${address},\n ${country}\n${description} , ,\n ${currentConditions.datetime}`
  );
  console.log(currentConditions);
  addressElement.textContent = address;
  const celciusSpan = document.createElement("span");
  celciusSpan.className = "Celicus";
  celciusSpan.textContent = "°C";
  celcius.textContent = `${convertTemp(currentConditions.temp).toFixed(1)}`;
  celcius.appendChild(celciusSpan);

  const feelsLikeSpan = document.createElement("span");
  feelsLikeSpan.className = "Celicus";
  feelsLikeSpan.textContent = "°C";
  feelsLike.textContent = `Feels like : ${convertTemp(
    currentConditions.feelslike
  ).toFixed(1)}`;
  feelsLike.appendChild(feelsLikeSpan);
  date.textContent = days[0].datetime;
  content.append(addressElement, date, celcius, feelsLike);
});
