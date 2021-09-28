const API_key = '732dfe14457be78432c34ec7094069df';
const proxy = 'https://cors-anywhere.herokuapp.com';
const API = `https://api.openweathermap.org/data/2.5/weather?`;
let full_api;

const tempEle = document.querySelector('.temperature-degree');
const tempDescriptionEle = document.querySelector('.temperature-description');
const locationTimeZoneEle = document.querySelector('.location-timezone');

// function updateDOM() {
    
// }


async function getWeatherDetails() {
    try {
        let response = await fetch(full_api);
        let data = await response.json();
        const { temp } = data.main;
        const { description } = data.weather[0];
        const { name } = data;
        //update the DOM
        // updateDOM();
        tempEle.textContent = Math.floor(temp / 10);
        tempDescriptionEle.textContent = description;
        locationTimeZoneEle.textContent = name;
        console.log(data);
        console.log(name);
    } catch (error) {
        console.log(error.data);
    }
    
}

window.addEventListener('load', () => {
    
    //check for the current location lat and lang
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success => {
            // console.log(position);
            // object destructure
            let { latitude, longitude } = success.coords;
            full_api = API.concat(`lat=${latitude}&lon=${longitude}&appid=${API_key}`);
            // console.log(full_api);
            getWeatherDetails();
        });
    } else {
        window.alert("Please enable the location");
    }
});