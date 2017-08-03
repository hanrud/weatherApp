$(document).ready(function () {
    var pCity = $('p#city'),
        pTemp = $('p#temperature'),
        lat,
        long;


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                console.log(lat, long, position);
                getWeather();

            });

        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }


    function getWeather() {
        $.ajax({
            type: 'GET',
            url: 'https://api.darksky.net/forecast/5c2e09b661c3018b08bd8ac173f93c4f/' + lat + ',' + long,
            dataType: 'JSONP',
            success: function (obj) {
                console.log(obj);
                console.log(obj.timezone);
                console.log(toCelsius(obj.currently.temperature));
            }
        })
    }
    
    function toCelsius(temp) {
        return result = Math.round(5/9 * (temp - 32));
    }
    
    getLocation();

});
