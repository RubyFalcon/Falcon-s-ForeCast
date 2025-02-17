import "./styles.css";

const countryInput = document.getElementById("country");
const locationButton = document.getElementById("search-button");
const getWeather = async (location) => {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=NJVNLA2GU3RGV646GKCNDHHYX`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getWeather("london");

locationButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(countryInput.value);

  getWeather(countryInput.value);
});
