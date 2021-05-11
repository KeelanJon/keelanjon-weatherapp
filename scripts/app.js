// app data stuff happens here

//Caching the DOOOM!
let searchBox = document.querySelector("#cityName");
let theForm = document.querySelector("#myForm");
const weatherImage = document.querySelector("#weatherImage");
const weatherDesc = document.querySelector("#weatherDesc");
const forecastArea = document.querySelector("#forecastArea");
let wind = document.querySelector("#windText");
let temp = document.querySelector("#tempText");
let humid = document.querySelector("#humidText");
const theCurDate = document.querySelector("#theDate");
const theCurCity = document.querySelector("#thecity");

let latitude = 51.56;
let longatude = -3.11;
let areaName = "Cardiff";

let sevenDayWeather = [];

//Overriding the default form sumbittion event to perform custom actions.
//In addition to prevent the default refresh behaviour.
theForm.addEventListener("submit", function (event) {
  theCurCity.innerHTML = searchBox.value;
  getData(searchBox.value);
  getGeoLocation(searchBox.value);

  event.preventDefault();
});

const url =
  "http://api.openweathermap.org/data/2.5/weather?q=Cardiff&units=metric&appid=fc7144b3becbb06c3f6b140ad87e055c";
let apiKey = "fc7144b3becbb06c3f6b140ad87e055c";

function getData(city) {
  console.log("Getting data");

  let query = city;

  let apiURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=metric&appid=" +
    apiKey;

  //Note to self, fetch is cool and straightforward!
  //As all things should be...
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => displayData(data));
}

function displayData(data) {
  console.log("This is the data");
  console.log(data);

  const iconID = data.weather[0].icon;
  const desc = data.weather[0].description;
  let iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
  const windSpeed = data.wind.speed;
  const curTemp = data.main.temp;
  const humidity = data.main.humidity;

  wind.innerHTML = windSpeed + " m/s";
  temp.innerHTML = curTemp + " ℃";
  humid.innerHTML = humidity;
  weatherImage.src = iconURL;
  weatherDesc.innerHTML = "Current conditions: " + desc;
}

//Google geocoding api used to convert user address input
//to longatude and latituded variables for open weather app
//weather forecast

function getGeoLocation(city) {
  const urlPrefix = "https://maps.googleapis.com/maps/api/geocode/json?";

  areaName = city;

  const googleApiUrl =
    urlPrefix +
    "key=AIzaSyDzZcQR4HANrbDs88-w-HB5GUQK-QCoE8s&address=" +
    areaName;

  fetch(googleApiUrl).then(function (response) {
    if (response.status !== 200) {
      console.log("Huston, we have a problem" + response.status);
      return;
    }

    response.json().then(function (data) {
      let locationInfo = data.results[0].geometry.location;
      // console.log(locationInfo);
      longatude = locationInfo.lng;
      latitude = locationInfo.lat;

      getForcast();
    });
  });
}

function getForcast() {
  console.log("Getting forcast for" + longatude + " " + latitude);

  const forecastURL =
    "https://api.openweathermap.org/data/2.5/onecall?units=metric&appid=fc7144b3becbb06c3f6b140ad87e055c&lat=" +
    latitude +
    "&lon=" +
    longatude;

  fetch(forecastURL).then(function (response) {
    if (response.status !== 200) {
      console.log("Huston, we have a problem" + response.status);
      return;
    }

    response.json().then(function (data) {
      // console.log(data);
      // console.log(data.daily);
      sevenDayWeather = data.daily;
      console.log(sevenDayWeather);
      updateForecast();
    });
  });
}

//updates the DOM to include the new 7 day forecast results
function updateForecast() {
  //Clear any existing content in the forecast area
  forecastArea.innerHTML = "";

  sevenDayWeather.map(function (item, index) {
    const cardIconID = item.weather[0].icon;
    let iconURL = "http://openweathermap.org/img/wn/" + cardIconID + "@2x.png";

    //Creating new card elements using DOM manipulation
    let newCard = document.createElement("div");
    const cardImage = document.createElement("img");
    const cardDay = document.createElement("p");
    const cardTemps = document.createElement("p");

    //Updating the contents and attributes of the cards
    cardDay.innerHTML = unixConverter(item.dt);
    cardTemps.innerHTML = item.temp.min + "/" + item.temp.max + " ℃";
    cardImage.setAttribute("src", iconURL);
    newCard.classList.add("day-card");
    newCard.append(cardDay);
    newCard.append(cardImage);
    newCard.append(cardTemps);

    return forecastArea.append(newCard);
  });
}

function unixConverter(timeStamp) {
  console.log("The date is: ");
  let date = new Date(timeStamp * 1000).getUTCDay();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDay = weekDays[date];

  return weekDay;
}

function startApp() {
  updateDate();

  theCurCity.innerHTML = areaName;
  getData(areaName);
  getGeoLocation(areaName);
}

function updateDate() {
  const date = new Date();
  const day = date.getUTCDay();
  const monthDay = date.getUTCDate();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDay = weekDays[day];

  theCurDate.innerHTML = weekDay + ", " + monthDay;

  console.log(weekDay + ", " + monthDay);
}

/* --------------------------------------------------------*/
//This area down here is for the current dark theme stuff!
//Dark theme experimentation
// let darkTheme = false;
// const darkModeBtn = document.querySelector("#darkModeBtn");

// darkModeBtn.addEventListener("click", function () {
//   // toggleTheme();
//   getGeoLocation();
// });

function toggleTheme() {
  if (darkTheme == false) {
    console.log("Dark theme activated");
    document.body.style.background = "black";
    darkTheme = true;
  } else {
    console.log("Dark theme DEactivated");
    document.body.style.background = "blue";
    darkTheme = false;
  }
}

startApp();
