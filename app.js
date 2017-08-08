$(document).ready(function () {
    var pCity = $('p#city'),
        pTemp = $('p#temperature'),
        pSummary = $('p#summary'),
        wind = $('p#wind'),
        pressure = $("p#pressure"),
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
                wind.append(Math.round(objRes.windSpeed) + ' km/h');
                pressure.append(Math.round(objRes.pressure) + ' hPa');

                console.log(obj.currently.icon, obj.currently.summary, obj.currently.windSpeed, obj.currently.pressure);

                //add icons
                var skycons = new Skycons({
                    "color": "#fff"
                });
                var icon = document.querySelector('#icon');
                var objIcon = objRes.icon;
                
                switch (objIcon) {
                    case ('partly-cloudy-night'):
                        skycons.add(icon, Skycons.PARTLY_CLOUDY_NIGHT);
                        break;
                    case ('clear-day'):
                        skycons.add(icon, Skycons.CLEAR_DAY);
                        break;
                    case ('clear-night'):
                        skycons.add(icon, Skycons.CLEAR_NIGHT);
                        break;
                    case ('partly-cloudy-day'):
                        skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
                        break;
                    case ('cloudy'):
                        skycons.add(icon, Skycons.CLOUDLY);
                        break;
                    case ('rain'):
                        skycons.add(icon, Skycons.RAIN);
                        break;
                    case ('sleet'):
                        skycons.add(icon, Skycons.SLEET);
                        break;
                    case ('snow'):
                        
                }
                skycons.play();
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
            error: function (res) {
                console.log(res);
            }
        })
    }

    getLocation();

});
