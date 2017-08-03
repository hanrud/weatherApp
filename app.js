$(document).ready(function () {
    var pCity = $('p#city'),
        pTemp = $('p#temperature'),
        pSummary = $('p#summary'),
        wind = $('p#other-info span#wind'),
        pressure = $("p#other-info span#pressure"),
        Cel = $('a#C'),
        Fahr = $('a#F'),
        lat,
        long;


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                getWeather();
                getCityName();

            });

        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }


    function getWeather() {
        $.ajax({
            type: 'GET',
            url: 'https://api.darksky.net/forecast//' + lat + ',' + long,
            dataType: 'JSONP',
            success: function (obj) {
                var objRes = obj.currently;
                
                pSummary.append(objRes.summary);
                pTemp.append(toCelsius(objRes.temperature));
                wind.append(Math.round(objRes.windSpeed));
                pressure.append(Math.round(objRes.pressure));
         
                
                console.log(obj.currently.icon, obj.currently.summary, obj.currently.windSpeed, obj.currently.pressure)
            }
        })
    }

    function toCelsius(temp) {
        return result = Math.round(5 / 9 * (temp - 32));
    }

    function getCityName() {
        $.ajax({
            type: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=',
            success: function (res) {
                var resultAddress = res.results[0].address_components;
                pCity.append(resultAddress[3].long_name + ' , ' + 
                             resultAddress[4].long_name + ' , ' + 
                             resultAddress[5].long_name);
            }, 
            error: function(res) {
                console.log(res);
            }      
        })
    }

    getLocation();

});
