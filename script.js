document.getElementById("btn").addEventListener("click", getWeather);

document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weatherInfo");
  const loader = document.getElementById("loader");

  if (!city) {
    weatherBox.innerHTML = `<p style="color: red;">Please enter a city name!</p>`;
    weatherBox.classList.remove("hidden");
    return;
  }

  const apiKey = "enter-your-api-key";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  loader.classList.remove("hidden");
  weatherBox.classList.add("hidden");

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found!");
      return response.json();
    })
    .then(data => {
      const info = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        <p><strong>Local Time:</strong> ${data.location.localtime}</p>
        <img src="https:${data.current.condition.icon}" alt="Weather Icon" />
      `;

      weatherBox.innerHTML = info;
      weatherBox.classList.remove("hidden");
    })
    .catch(error => {
      weatherBox.innerHTML = `<p style="color: red;">${error.message}</p>`;
      weatherBox.classList.remove("hidden");
    })
    .finally(() => {
      loader.classList.add("hidden");
    });
}
