//TOP
//INSTANCE VARIABLES

var zip = "75007";
var currentCity = "";
var currentState = "";
var long = "";
var lat = "";
var weatherInformation = [];
var currentWeather = null;
/*
    temp: 
    feels: 
    min: 
    max: 
    pressure: 
    humidity: 
    clouds: 
    windDir: 
    windSpeed: 
    time: //not available for current weather
*/


main();

function main() {
    getInformation();
    console.log(weatherInformation);
    
    
}

function setMainPageInfo(){
    setLeftMainPageInfo();
    setRightMainPageInfo();
}

function setLeftMainPageInfo(){
    cityState = document.getElementById('city-state');
    timeDate = document.getElementById('time-date');
    bigTemp = document.getElementById('big-temp');
    cloudInfo = document.getElementById('cloud-information');
    visualPressure = document.getElementById('pressure');
    humidity = document.getElementById('rain-chance');
    windSpeed = document.getElementById('wind-speed');

    console.log(currentWeather);
    cityState.innerHTML = currentCity + "," + currentState;
    timeDate.innerHTML = "Today: " + new Date().toLocaleTimeString().substring(0,4) +(new Date().toLocaleTimeString()).substring(8);
    bigTemp.innerHTML = Math.round(currentWeather.temp) + '°';
    cloudInfo.innerHTML = currentWeather.clouds;
    visualPressure.innerHTML = currentWeather.pressure + 'hpa';
    humidity.innerHTML = currentWeather.humidity + '%';
    windSpeed.innerHTML = Math.round(currentWeather.windSpeed) + 'km/h';
}

function setRightMainPageInfo(){
    console.log("UGH")
    morning = document.getElementById('morning');
    afternoon = document.getElementById('afternoon');
    evening = document.getElementById('evening');
    night = document.getElementById('night');

    morningCol = document.getElementById('morning-col');
    afternoonCol = document.getElementById('afternoon-col');
    eveningCol = document.getElementById('evening-col');
    nightCol = document.getElementById('night-col');

    morningNum = 73;
    afternoonNum = 91;
    eveningNum = 87;
    nightNum = 73;

    morning.innerHTML = morningNum;
    afternoon.innerHTML = afternoonNum;
    evening.innerHTML = eveningNum;
    night.innerHTML = nightNum;

    morningCol.style.height = morningNum + 'px';
    afternoonCol.style.height = afternoonNum + 'px';
    eveningCol.style.height = eveningNum + 'px';
    nightCol.style.height = nightNum + 'px';
    
}

async function getInformation() {
  await getLatLong();
  await getWeatherInfo();
  await getCurrentWeather();
  setMainPageInfo();
}

function getLatLong() {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        var myLocationData = JSON.parse(request.response);
        currentCity = myLocationData.results[0].locations[0].adminArea5;
        currentState = myLocationData.results[0].locations[0].adminArea3;
        long = myLocationData.results[0].locations[0].latLng.lng;
        lat = myLocationData.results[0].locations[0].latLng.lat;
        console.log("Geocode Complete: " + lat + " , " + long);
        resolve();
      }
    };

    var link =
      "https://www.mapquestapi.com/geocoding/v1/address?key=FuSJTCoAfn0u2RKR9gC73brDkFNw4bHb&location=" +
      zip;
    request.open("GET", link);
    request.send();
  });
}

function getWeatherInfo(){
    return new Promise((resolve, reject) =>{
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(this.readyState == 4){
                myWeatherData=JSON.parse(request.response);
                for(let i = 0; i < 40; i++){
                    let main = myWeatherData.list[i].main;
                    let stuff = {
                        temp: main.temp,
                        feels: main.feels_like,
                        min: main.temp_min,
                        max: main.temp_max,
                        pressure: main.pressure,
                        humidity: main.humidity,
                        clouds: myWeatherData.list[i].weather[0].description,
                        windDir: myWeatherData.list[i].wind.deg,
                        windSpeed: myWeatherData.list[i].wind.speed,
                        time: myWeatherData.list[i].dt_txt
                    }
                    weatherInformation.push(stuff);
                }
                resolve();
            }
        }
        var link = '';
        if(lat != "")
            link = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=f9365e105ac4d399424f1b7351a3c941&units=imperial";
        console.log(link);
        request.open("GET", link);
        request.send();
    });
}

function getCurrentWeather(){
    return new Promise((resolve, reject) =>{
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(this.readyState == 4){
                myWeatherData=JSON.parse(request.response);
                var main = myWeatherData.main;
                currentWeather = {
                    temp: main.temp,
                    feels: main.feels_like,
                    min: main.temp_min,
                    max: main.temp_max,
                    pressure: main.pressure,
                    humidity: main.humidity,
                    clouds: myWeatherData.weather[0].description,
                    windDir: myWeatherData.wind.deg,
                    windSpeed: myWeatherData.wind.speed
                }
                resolve();
            }
        }
        var link = '';
        if(lat != "")
            link = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=f9365e105ac4d399424f1b7351a3c941&units=imperial";
        console.log(link);
        request.open("GET", link);
        request.send();
    });
}
