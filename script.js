const buttonValidate = document.querySelector('button');
const gps = document.querySelector('#gps');
const city = document.querySelector('#city');
const temperature = document.querySelector('#temperature');
const details = document.querySelector('#details');
const precipitation = document.querySelector('#precipitation');
const humidity = document.querySelector('#humidity');

let coordinates = [];

/*****PRINCIPALE FUNCTION***
***************************/
async function fetchCoordinates(cityChoice) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityChoice}&format=json&addressdetails=1&limit=1`);
        const dataCoordinates = await response.json();

        city.innerText = dataCoordinates[0].name;
        gps.innerText = `Coordonnées GPS: ${dataCoordinates[0].lat}, ${dataCoordinates[0].lon}`;
        coordinates.push(dataCoordinates[0].lat);
        coordinates.push(dataCoordinates[0].lon);

        fetchWeather(coordinates[0], coordinates[1]);

    } catch (error) {
        console.error("Failed to catch data :", error);
        city.innerText = "Ville non-trouvée";
        gps.innerText = "-";
        temperature.innerText = "-";
        details.innerText = "Vérifiez le nom de la ville";
        precipitation.innerText = "-";
        humidity.innerText = "-";
    }
}

async function fetchWeather(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`);
        const dataWeather = await response.json();

        let AlldataWeather = dataWeather.current;
        let temp = AlldataWeather.temperature_2m;
        let precipitations = AlldataWeather.precipitation;
        let humid = AlldataWeather.relative_humidity_2m;
        
        temperature.innerText = `${temp}°C`;
        details.innerText = "Informations actuelles";
        precipitation.innerText = `${precipitations} mm`;
        humidity.innerText = `${humid} %`;

    } catch (error) {
        console.error("Failed to catch data :", error);
    }
}


/****START*****
**************/
buttonValidate.addEventListener('click', () => {
    coordinates = [];
    const cityInput = document.querySelector('#cityInput').value;
    fetchCoordinates(cityInput);
})