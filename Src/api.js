document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const inputCity = document.getElementById('input-city');
    const cityElement = document.querySelector('.city');
    const countryElement = document.querySelector('.country');
    const temperatureElement = document.querySelector('.temperature-value');
    const temperatureMaxElement = document.querySelector('.temperature-max');
    const temperatureMinElement = document.querySelector('.temperature-min');
    const humidityElement = document.querySelector('.temperature-humidity');
    const windElement = document.querySelector('.temperature-wind');
    const tempIcon = document.querySelector('.tempIcon');
    const informations = document.querySelector('.informations');

    searchButton.addEventListener('click', () => {
        const city = inputCity.value;
        console.log('City entered:', city);

        const apiKey = 'c3a3efc2c1c10ae1df16e0a0474d501e';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        function updateWeather(data) {
            console.log('Weather data:', data);

            if (cityElement && countryElement && temperatureElement) {
                cityElement.textContent = `${data.name}, `;
                countryElement.textContent = data.sys.country;
                temperatureElement.textContent = `${data.main.temp.toFixed(1).toString().replace('.', ',')}°C`;
                temperatureMaxElement.textContent = `Max: ${data.main.temp_max.toFixed(1).toString().replace('.', ',')}°C`;
                temperatureMinElement.textContent = `Min: ${data.main.temp_min.toFixed(1).toString().replace('.', ',')}°C`;
                humidityElement.textContent = `Umidade: ${data.main.humidity}%`;
                windElement.textContent = `Vento: ${data.wind.speed.toFixed(1).toString().replace('.', ',')} km/h`;

                const iconCode = data.weather[0].icon;
                console.log('Icon code:', iconCode);

                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                console.log('Icon URL:', iconUrl);

                tempIcon.setAttribute('src', iconUrl);

                informations.style.display = 'block';
            }
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    });
});
