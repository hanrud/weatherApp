$(document).ready(function () {
    var pCity = $('p#city'),
        pTemp = $('p#temperature'),
        pSummary = $('p#summary'),
        body = $('body'),
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
                        body.css('background-image', "url('http://images.all-free-download.com/images/graphiclarge/cloudy_night_moon_238791.jpg')");
                        $('div.main').css('background-color', 'rgba(14, 43, 60, 0.61)');
                        break;
                    case ('clear-day'):
                        skycons.add(icon, Skycons.CLEAR_DAY);
                        body.css('background-image', "url('https://image.freepik.com/free-photo/starfish-on-summer-sunny-beach-at-ocean-background-image-travel-vacation-concepts_1423-276.jpg')");
                        $('div.main').css('background-color', 'rgba(197, 120, 96, 0.6)');
                        break;
                    case ('clear-night'):
                        skycons.add(icon, Skycons.CLEAR_NIGHT);
                        body.css('background-image', "url('https://image.freepik.com/free-photo/modern-city-at-night_1112-856.jpg')");
                        $('div.main').css('background-color', 'rgba(14, 43, 60, 0.61)');
                        break;
                    case ('partly-cloudy-day'):
                        skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
                        body.css('background-image', 'url("http://images.freeimages.com/images/large-previews/294/partly-cloudy-1173077.jpg")');
                        $('div.main').css('background-color', 'rgba(14, 43, 60, 0.61)');
                        break;
                    case ('cloudy'):
                        skycons.add(icon, Skycons.CLOUDY);
                        body.css('background-image', "url('https://image.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg')");
                        $('div.main').css('background-color', 'rgba(14, 43, 60, 0.61)');
                        break;
                    case ('rain'):
                        skycons.add(icon, Skycons.RAIN);
                        body.css('background-image', "url('https://cdn.pixabay.com/photo/2017/06/13/20/42/weather-2400074_960_720.jpg')");
                        $('div.main').css('background-color', 'rgba(30,48,36, 0.61)');
                        break;
                    case ('sleet'):
                        skycons.add(icon, Skycons.SLEET);
                        body.css('background-image', "url('https://cdn.pixabay.com/photo/2015/01/07/05/26/ice-591137_960_720.jpg')");
                        $('div.main').css('background-color', 'rgba(124,115,108, 0.7)');
                        break;
                    case ('snow'):
                        skycons.add(icon, Skycons.SNOW);
                        body.css('background-image', "url('https://image.freepik.com/free-photo/christmas-snowy-landscape_1048-2833.jpg')");
                        $('div.main').css('background-color', 'rgba(73, 104, 130, 0.7)');
                        break;
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
