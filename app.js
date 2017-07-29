$(document).ready(function () {
    var pCity = $('p#city'),
        pTemp = $('p#temperature'),
        latitude,
        longitude;


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            });
        } else {
            pCity.append('Geolocation not supported');
        }
    }


    getLocation();

});
