let apiKey = '1da5f6260387bd59361e307b0611fdf3';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
let searchBox = document.querySelector('.search input');
let searchBtn = document.querySelector('.search .searchIcon');
let weatherIcon = document.querySelector('.weatherIcon');

// &appid={API key} to insert API key
// &units=metric to get temp in celcius

async function checkWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) { //404 means not found, isliye agar response nahi milega to if wala statement chalega.
        console.log('city not found, please enter a valid city name')
        document.querySelector('.errorMsg').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        document.querySelector('.details').style.display = 'none';
    } else { //response milne par else wala statement chalega aur updatation ka kaam hoga
        let data = await response.json()

        console.log(data); //to see response in console

        document.querySelector('.cityName').textContent = data.name
        document.querySelector('.temp').textContent = Math.round(data.main.temp) + '°C'
        document.querySelector('.humidity').textContent = data.main.humidity + '%'
        document.querySelector('.wind').textContent = data.wind.speed + 'Km/h'

        if (data.weather[0].main == 'Haze') {
            weatherIcon.src = 'haze.png';
        } else if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'clouds.png';
        } else if (data.weather[0].main == 'Smoke') {
            weatherIcon.src = 'smoke.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'clear.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'rain.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'mist.png';
        }

        document.querySelector('.weather').style.display = 'flex';
        document.querySelector('.details').style.display = 'flex';
        document.querySelector('.errorMsg').style.display = 'none';
    }
}

searchBtn.addEventListener('click', function () {
    checkWeather(searchBox.value)
})