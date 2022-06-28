fetch("https://ipinfo.io/json")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson.latLng);
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });