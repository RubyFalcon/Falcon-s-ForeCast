import "./styles.css";

const countryInput = document.getElementById("country");
const locationButton = document.getElementById("search-button");

//convert temp
const convertTemp = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};
const getWeather = async (location) => {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=NJVNLA2GU3RGV646GKCNDHHYX`;
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

  const celcius = document.createElement("p");
  celcius.className = "temperature";

  event.preventDefault();
  const countryData = await getWeather(countryInput.value);
  console.log(countryData);

  const { address, country, description, currentConditions } = await getWeather(
    countryInput.value
  );
  console.log(
    `resolved address is : ${address},\n ${country}\n${description} , ,\n ${currentConditions.datetime}`
  );
  console.log(currentConditions);
  addressElement.textContent = address;
  const span = document.createElement("span");
  span.className = "Celicus";
  span.textContent = "°C";
  celcius.textContent = `${convertTemp(currentConditions.temp).toFixed(1)}`;
  celcius.appendChild(span);
  content.append(addressElement, celcius);
});
