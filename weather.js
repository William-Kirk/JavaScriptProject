//TOP
//INSTANCE VARIABLES

var zip = "75007";
var currentCity = "";
var currentState = "";
var long = "";
var lat = "";
var weatherInformation = [];
var currentWeather = null;
var morningWeather = 0;
var afternoonWeather = 0;
var eveningWeather = 0;
var nightWeather = 0;
var rainChance = 0;
var currentUV = 0;

var nextNowImg
var nextHourOne;
var nextHourOneImg;
var nextHourTwo;
var nextHourTwoImg;
var nextHourThree;
var nextHourThreeImg;

var futureDay0;
var futureDay0Clouds;
var futureDay1;
var futureDay1Clouds;
var futureDay2;
var futureDay2Clouds;
var futureDay3;
var futureDay3Clouds;

var partlyCloudy='https://cdn.weatherapi.com/weather/64x64/day/116.png';
var sunny = 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
var rainy = 'https://cdn.weatherapi.com/weather/64x64/day/302.png';
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
    start();
}

function start(){
    document.getElementById('zip-code').value = 75082
    activate();
    document.addEventListener('keyup', function(event){
        if(event.code === 'Enter')
            if (document.getElementById('zip-code').value.length == 5) {
                zip = document.getElementById('zip-code').value;
                getInformation();
                console.log(weatherInformation);
            }
    });
    document.getElementById('zip-search-bar').addEventListener('click', activate);
}

function activate() {
    if (document.getElementById('zip-code').value.length == 5) {
        zip = document.getElementById('zip-code').value;
        getInformation();
        console.log(weatherInformation);
    }
}



function setMainPageInfo() {
    setLeftMainPageInfo();
    setRightMainPageInfo();
    setBottomMainPageInfo();
    setTopSidePageInfo();
    setBottomSidePageInfo();
}

function setBottomSidePageInfo(){
    var dt = new Date();
    document.getElementById('day-1').innerHTML = Math.round(futureDay0) + '??';
    document.getElementById('day-2').innerHTML = Math.round(futureDay1) + '??';
    document.getElementById('day-1-img').src = futureDay0Clouds;
    document.getElementById('day-2-img').src = futureDay1Clouds;

    document.getElementById('day-3').innerHTML = Math.round(futureDay2) + '??';
    document.getElementById('day-4').innerHTML = Math.round(futureDay3) + '??';

    document.getElementById('day-2-week').innerHTML = quickWeek(2);
    document.getElementById('day-3-week').innerHTML = quickWeek(3);
    document.getElementById('day-4-week').innerHTML = quickWeek(4);

    document.getElementById('day-1-date').innerHTML = quickDate(1);
    document.getElementById('day-2-date').innerHTML = quickDate(2);
    document.getElementById('day-3-date').innerHTML = quickDate(3);
    document.getElementById('day-4-date').innerHTML = quickDate(4);

    day2Img = sunny;
    day3Img = sunny;


    if(futureDay3Clouds == "Clouds")
        day3Img = partlyCloudy;
    else if(futureDay3Clouds == 'Clear')
        console.log('its clear');
    else if(futureDay3Clouds == 'Rain')
        day3Img = rainy;

    if(futureDay2Clouds == "Clouds")
        day2Img = partlyCloudy;
    else if(futureDay2Clouds == 'Clear')
        day2Img = sunny;
    else if(futureDay2Clouds == 'Rain')
        console.log('its rainy');
        day2Img = rainy;

    document.getElementById('day-3-img').src = day2Img;
    document.getElementById('day-4-img').src = day3Img;


}
function quickWeek(addDays){
    currentDay = new Date().getDay();
    currentDay += addDays;
    if(currentDay > 6){
        currentDay-=7;
    }

    if(currentDay == 0)
        return 'Sunday';
    if(currentDay == 1)
        return 'Monday';
    if(currentDay == 2)
        return 'Tuesday';
    if(currentDay == 3)
        return 'Wednesday';
    if(currentDay == 4)
        return 'Thursday';
    if(currentDay == 5)
        return 'Friday'
    if(currentDay == 6)
        return 'Saturday';
}


function quickDate(addDays){
    var dt = new Date();
    if(addDays + dt.getDate() <= 30){
        return dt.getFullYear() + '-0' + (dt.getMonth() + 1) + '-' + (dt.getDate() + addDays);
    }
    return dt.getFullYear() + '-0' + (dt.getMonth() + 2) + (30 - (dt.getDate() + addDays));
}

function setLeftMainPageInfo() {
    cityState = document.getElementById('city-state');
    timeDate = document.getElementById('time-date');
    bigTemp = document.getElementById('big-temp');
    cloudInfo = document.getElementById('cloud-information');
    visualPressure = document.getElementById('pressure');
    humidity = document.getElementById('rain-chance');
    windSpeed = document.getElementById('wind-speed');

    console.log(currentWeather);
    cityState.innerHTML = currentCity + "," + currentState;
    timeDate.innerHTML = "Today: " + new Date().toLocaleTimeString().substring(0, 4) + (new Date().toLocaleTimeString()).substring(8);
    bigTemp.innerHTML = Math.round(currentWeather.temp) + '??';
    cloudInfo.innerHTML = currentWeather.clouds;
    visualPressure.innerHTML = currentWeather.pressure + 'hpa';
    humidity.innerHTML = currentWeather.humidity + '%';
    windSpeed.innerHTML = Math.round(currentWeather.windSpeed) + 'km/h';
}

function setRightMainPageInfo() {
    console.log("UGH")
    morning = document.getElementById('morning');
    afternoon = document.getElementById('afternoon');
    evening = document.getElementById('evening');
    night = document.getElementById('night');

    morningCol = document.getElementById('morning-col');
    afternoonCol = document.getElementById('afternoon-col');
    eveningCol = document.getElementById('evening-col');
    nightCol = document.getElementById('night-col');

    morning.innerHTML = morningWeather;
    afternoon.innerHTML = afternoonWeather;
    evening.innerHTML = eveningWeather;
    night.innerHTML = nightWeather;

    morningCol.style.height = morningWeather + 'px';
    afternoonCol.style.height = afternoonWeather + 'px';
    eveningCol.style.height = eveningWeather + 'px';
    nightCol.style.height = nightWeather + 'px';
    morningCol.style.marginTop = (100 - morningWeather) + 'px';
    afternoonCol.style.marginTop = (100 - afternoonWeather) + 'px';
    eveningCol.style.marginTop = (100 - eveningWeather) + 'px';
    nightCol.style.marginTop = (100 - nightWeather) + 'px';

}

function setBottomMainPageInfo(){
    var wind = document.getElementById('big-wind-speed');
    var humid = document.getElementById('big-humidity');
    var rain = document.getElementById('big-rain-chance');
    var uv = document.getElementById('big-uv');

    wind.innerHTML = currentWeather.windSpeed + 'km/h';
    humid.innerHTML = currentWeather.humidity + '%';
    rain.innerHTML = rainChance + '%';
    uv.innerHTML = currentUV;
}

function setTopSidePageInfo(){
    hourOne = document.getElementById('one-hour');
    hourTwo = document.getElementById('two-hour');
    hourThree = document.getElementById('three-hour');

    nowImg = document.getElementById('now-img');
    hourOneImg = document.getElementById('one-hour-img');
    hourTwoImg = document.getElementById('two-hour-img');
    hourThreeImg = document.getElementById('three-hour-img');

    nowContent = document.getElementById('now-content');
    hourOneContent = document.getElementById('one-hour-content');
    hourTwoContent = document.getElementById('two-hour-content');
    hourThreeContent = document.getElementById('three-hour-content');

    nowContent.innerHTML = Math.round(currentWeather.temp) + '??';
    hourOne.innerHTML = quickTime(1);
    hourTwo.innerHTML = quickTime(2);
    hourThree.innerHTML = quickTime(3);


    hourOneContent.innerHTML = Math.round(nextHourOne) + '??';
    hourTwoContent.innerHTML = Math.round(nextHourTwo) + '??';
    hourThreeContent.innerHTML = Math.round(nextHourThree) + '??';

    nowImg.src = 'https:' + nextNowImg;
    hourOneImg.src = 'https:' + nextHourOneImg;
    hourTwoImg.src = 'https:' + nextHourTwoImg;
    hourThreeImg.src = 'https:' + nextHourThreeImg;

    //nowImg =
    //hourOneImg
}

function quickTime(addNum){
    var time = new Date().toLocaleTimeString('en-US', { hour24: false, hour: "numeric"})
    if((Number(time.substring(0,time.length-3))+addNum) <= 12)
        return (Number(time.substring(0,time.length-3))+addNum) + (time.substring(time.length-3));
    else
        return ((Number(time.substring(0,time.length-3))+addNum) - 12) + (time.substring(time.length-3));
}


async function getInformation() {
    document.getElementById('loading-img').style.display = 'block';
    await getLatLong();
    await getWeatherInfo();
    await getCurrentWeather();
    await getWeatherHistory();
    await currentWeatherUV();
    await getWeatherForecast();
    await cmonFuture();
    document.getElementById('loading-img').style.display = 'none';
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

function getWeatherInfo() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                myWeatherData = JSON.parse(request.response);
                for (let i = 0; i < 40; i++) {
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
                    futureDay2Clouds = myWeatherData.list[24].weather[0].main;
                    futureDay3Clouds = myWeatherData.list[32].weather[0].main;
                    

                    futureDay2 = myWeatherData.list[24].main.temp;
                    futureDay3 = myWeatherData.list[32].main.temp;
                    weatherInformation.push(stuff);
                }
                resolve();
            }
        }
        var link = '';
        if (lat != "")
            link = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=f9365e105ac4d399424f1b7351a3c941&units=imperial";
            console.log('lol: '+ link);
        request.open("GET", link);
        request.send();
    });
}

function getCurrentWeather() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                myWeatherData = JSON.parse(request.response);
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
        if (lat != "")
            link = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=f9365e105ac4d399424f1b7351a3c941&units=imperial";
        console.log(link);
        request.open("GET", link);
        request.send();
    });
}

function getWeatherHistory() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                var myData = JSON.parse(request.response);
                
                resolve();
            }
        }
        var link = '';
        var dt = new Date();
        var date = dt.getFullYear() + '-0' + (dt.getMonth() + 1) + '-' + dt.getDate();
        console.log(date);
        if (lat != "")
            link = "https://api.weatherapi.com/v1/history.json?key=1ccd5ca6ef0646bf9ab05148222906&q="+lat+','+long+"&dt=" + date;
        console.log(link);
        request.open("GET", link);
        request.send();
    });
}

function getWeatherForecast() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                var myData = JSON.parse(request.response);
                console.log('made it');
                var num=0;
                morningWeather = Math.round(myData.forecast.forecastday[0].hour[8].temp_f);
                afternoonWeather = Math.round(myData.forecast.forecastday[0].hour[15].temp_f);
                eveningWeather = Math.round(myData.forecast.forecastday[0].hour[20].temp_f);
                nightWeather = Math.round(myData.forecast.forecastday[0].hour[23].temp_f);
                num =((myData.current.last_updated).substring(11,13));
                rainChance = Math.round(myData.forecast.forecastday[0].hour[Number(num)].chance_of_rain)
                num = num = Number((myData.current.last_updated).substring(11,13));
                nextNowImg = myData.forecast.forecastday[0].hour[num].condition.icon;
                num = Number((myData.current.last_updated).substring(11,13)) + 1;
                if(num >23)
                    num-=24;
                nextHourOne = myData.forecast.forecastday[0].hour[num].temp_f;
                nextHourOneImg = myData.forecast.forecastday[0].hour[num].condition.icon;
                num = Number((myData.current.last_updated).substring(11,13)) + 2;
                if(num >23)
                    num-=24;
                nextHourTwo = myData.forecast.forecastday[0].hour[num].temp_f;
                nextHourTwoImg = myData.forecast.forecastday[0].hour[num].condition.icon;
                num = Number((myData.current.last_updated).substring(11,13)) + 3;
                if(num >23)
                    num-=24;
                nextHourThree = myData.forecast.forecastday[0].hour[num].temp_f;
                nextHourThreeImg = myData.forecast.forecastday[0].hour[num].condition.icon;
                resolve();
                console.log(nextHourOneImg + '\n' + nextHourTwoImg + '\n' + nextHourThreeImg + num);
            }
        }
        var link = '';
        var dt = new Date();
        var date = dt.getFullYear() + '-0' + (dt.getMonth() + 1) + '-' + dt.getDate();
        console.log(date);
        if (lat != "")
            link = "https://api.weatherapi.com/v1/forecast.json?key=1ccd5ca6ef0646bf9ab05148222906&q="+lat+','+long+"&dt=" + date;
        console.log('---- ' +link);
        request.open("GET", link);
        request.send();
    });
}





function currentWeatherUV() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                var myData = JSON.parse(request.response);
                currentUV = myData.current.uv;
                resolve();
            }
        }
        var link = '';
        if (lat != "")
            link = "https://api.weatherapi.com/v1/current.json?key=1ccd5ca6ef0646bf9ab05148222906&q="+lat+','+long+"&aqi=no";
        console.log(link);
        request.open("GET", link);
        request.send();
    });
}

function cmonFuture() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            var average = 0;

            if (this.readyState == 4) {
                var myData = JSON.parse(request.response);
                futureDay0 = myData.forecast.forecastday[1].day.avgtemp_f;
                futureDay0Clouds = 'https:' + myData.forecast.forecastday[1].day.condition.icon;
                futureDay1 = myData.forecast.forecastday[2].day.avgtemp_f;
                futureDay1Clouds = 'https:' + myData.forecast.forecastday[2].day.condition.icon;

                resolve();
            }
        }
        var link = '';
        if (lat != "")
            link = "https://api.weatherapi.com/v1/forecast.json?key=1ccd5ca6ef0646bf9ab05148222906&q="+lat+','+long+"&days=8&aqi=no&alerts=no";
        console.log(link);
        request.open("GET", link);
        request.send();
    });
}

