//FuSJTCoAfn0u2RKR9gC73brDkFNw4bHb
//key for finding latLong
var city = "";
var state = "";
var long = "";
var lat = "";


var request = new XMLHttpRequest();

//supposedly a callback hook?
request.onreadystatechange = function () {
    if (this.readyState === 4) {
        var myLocationData = JSON.parse(request.response);
        city = myLocationData.results[0].locations[0].adminArea5;
        state = myLocationData.results[0].locations[0].adminArea3;
        long = myLocationData.results[0].locations[0].latLng.lng;
        lat = myLocationData.results[0].locations[0].latLng.lat;
        console.log("City: " + city);
        console.log("State: " + state);
        console.log("long: " + long);
        console.log("lat: " + lat);
        next();
    }

}
request.open('GET', 'http://www.mapquestapi.com/geocoding/v1/address?key=FuSJTCoAfn0u2RKR9gC73brDkFNw4bHb&location=75007'); //full address
request.send();


function next(){
    console.log('lol')
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            var weatherData = JSON.parse(request.response);
            console.log('Current Temperature: ' + weatherData.list[0].main.temp);
            console.log('Temperature Low: ' + weatherData.list[0].main.temp_min);
            console.log('Pressure: ' + weatherData.list[0].main.pressure)
            console.log('Wind Speed: ' + weatherData.list[0].wind.speed)
        }

    }

    request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=6c3ffa046b7bec1655bb67b2e7f768fa&lat='+lat+'&long='+long+'&units=imperial'); //full address
    request.send();
}

//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=6c3ffa046b7bec1655bb67b2e7f768fa&lat=33.005521&long=-96.894142&units=imperial