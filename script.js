document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const apiKey = "a18816a753560f6947e13c15a7a3059c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weather-info").innerHTML =
        "<p>City not found!</p>";
      return;
    }

    const description = data.weather[0].description.toLowerCase();
    let backgroundImage = "";

    if (description.includes("rain")) {
      backgroundImage = "url('R.jpg')";
    } else if (description.includes("clear") || description.includes("sun")) {
      backgroundImage = "url('C.jpg')";
    } else if (description.includes("haze") || description.includes("mist")) {
      backgroundImage = "url('M.jpg')";
    } else if (description.includes("cloud") || description.includes("haze")) {
      backgroundImage = "url('Cloud.jpg')";
    } else {
      backgroundImage = "url('B.jpg')";
    }

    document.body.style.backgroundImage = backgroundImage;

    document.getElementById("weather-info").innerHTML = `
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
        `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("weather-info").innerHTML =
      "<p>Failed to fetch weather data.</p>";
  }
}