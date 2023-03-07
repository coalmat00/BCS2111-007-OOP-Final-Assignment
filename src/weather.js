//weather
function getWeather() {
  const city = document.getElementById("citySelect").value;

  if (!city) {
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfoDiv = document.getElementById("weatherInfo");

      // Convert temperature from Kelvin to Celsius
      const temperature = Math.round(data.main.temp - 273.15);
      const feelsLike = Math.round(data.main.feels_like - 273.15);

      // Convert wind direction from degrees to cardinal direction
      const windDirection = degreesToCardinal(data.wind.deg);

      // Convert Unix timestamps to local time
      const sunriseTime = unixTimestampToLocalTime(
        data.sys.sunrise,
        data.timezone
      );
      const sunsetTime = unixTimestampToLocalTime(
        data.sys.sunset,
        data.timezone
      );

      const weatherIconClass = weatherCodeToIconClass(data.weather[0].id);

      // // Define the emojis for each information

      // const countryEmoji = twemoji.parse("🇯🇵", { size: "16x16" });
      // const weatherEmoji = twemoji.parse("🌤️", { size: "16x16" });
      // const temperatureEmoji = twemoji.parse("🌡️", { size: "16x16" });
      // const feelsLikeEmoji = twemoji.parse("🥶", { size: "16x16" });
      // const humidityEmoji = twemoji.parse("💦", { size: "16x16" });
      // const windEmoji = twemoji.parse("💨", { size: "16x16" });
      // const visibilityEmoji = twemoji.parse("👁️👃🏼👁️", { size: "16x16" });
      // const sunriseEmoji = twemoji.parse("🌅", { size: "16x16" });
      // const sunsetEmoji = twemoji.parse("🌇", { size: "16x16" });

      // Use the emojis in the weather card
      weatherInfoDiv.innerHTML = `
  <div class="weather-card">
    <h3>${city}, ${data.sys.country} 🇯🇵</h3>
    <i class="${weatherIconClass}"></i>
    <p id = "temperature">${temperature}°C</p>
  <p>Weather 🌦️: ${data.weather[0].main}</p>
  <p>Humidity 💦: ${data.main.humidity}%</p>
  <p>Wind 💨: ${data.wind.speed} m/s ${windDirection}</p>
  <p>Visibility 👀: ${data.visibility / 1000} km</p>
  <p>Sunrise 🌅: ${sunriseTime}</p>
  <p>Sunset 🌇: ${sunsetTime}</p>
</div>
`;
    })
    .catch((error) => {
      const weatherInfoDiv = document.getElementById("weatherInfo");
      weatherInfoDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function degreesToCardinal(degrees) {
  const cardinalDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45);
  return cardinalDirections[index];
}

function unixTimestampToLocalTime(unixTimestamp, timezoneOffsetSeconds) {
  const date = new Date((unixTimestamp + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString();
}
function weatherCodeToIconClass(weatherCode) {
  if (weatherCode >= 200 && weatherCode <= 232) {
    return "wi wi-thunderstorm";
  } else if (weatherCode >= 300 && weatherCode <= 321) {
    return "wi wi-sprinkle";
  } else if (weatherCode >= 500 && weatherCode <= 531) {
    return "wi wi-rain";
  } else if (weatherCode >= 600 && weatherCode <= 622) {
    return "wi wi-snow";
  } else if (weatherCode >= 701 && weatherCode <= 781) {
    return "wi wi-fog";
  } else if (weatherCode === 800) {
    return "wi wi-day-sunny";
  } else if (weatherCode === 801) {
    return "wi wi-day-cloudy";
  } else if (weatherCode === 802) {
    return "wi wi-cloudy";
  } else if (weatherCode === 803 || weatherCode === 804) {
    return "wi wi-day-cloudy-high";
  } else {
    return "wi wi-na";
  }
}
