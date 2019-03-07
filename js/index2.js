(function() {

  var Weather = {
    init: function() {
      this.getLocation();
      this.showTime();
      $('#unit-switch').on('click', this.changeUnit);
      $('#refresh').on('click', this.refresh);
    },

    cache: {
      showFahrenheit: true,
    },

    getLocation: function() {
      var c = Weather.cache;

      if (window.chrome) {
        $.getJSON('http://ip-api.com/json', function(json) {
          c.lat = json.lat;
          c.long = json.lon;
          Weather.getInformation();
        });
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(data) {
            c.lat = data.coords.latitude;
            c.long = data.coords.longitude;
            Weather.getInformation();
          });
        }
      }

    },

    getInformation: function() {
      var c = Weather.cache;

      $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + c.lat + '&lon=' + c.long + '&units=imperial&appid=3acc16ffae9e45df92a064e41646355f', function(json) {
        var weather= new XMLHttpRequest();
        weather.open("GET", "https://api.thingspeak.com/channels/720956/feeds.json?api_key=VGNV2X7F580VMLDK", false);
        weather.send(null);
        var r =JSON.parse(weather.response);
        console.log(r)
        c.location = json.name;
        c.country = json.sys.country;
        c.celcius = Math.round(r.feeds[r.channel.last_entry_id-1].field1);
        c.fahrenheit = Math.round((c.celcius * 9 / 5)+32);
        c.coverage = r.feeds[r.channel.last_entry_id-1].field2;
        c.sunrise = json.sys.sunrise;
        c.sunset = json.sys.sunset;

        Weather.showMainInformation();
        Weather.showCurrentCoverage();
      });
    },

    showMainInformation: function() {
      var c = Weather.cache;

      // Show Location
      $('#location').html(c.location + ', ' + c.country);
      // Show Temp
      $('#temp').html(c.showFahrenheit === false ? c.celcius : c.fahrenheit);
    },

    showCurrentCoverage: function() {
      var c = Weather.cache;
      var currentTime = new Date().getTime() / 1000;

      // Show Day/Night Icon based on current time
      // Show coverage text
      $('#coverage').html(Weather.cache.coverage);
    },

    showTime: function() {
      var time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();

      // Display a zero before hours/minutes if below 10
      if (hours < 10) {
        $('#time').html(minutes < 10 ? '0' + hours + ':0' + minutes : '0' + hours + ':' + minutes);
      } else {
        $('#time').html(minutes < 10 ? hours + ':0' + minutes : hours + ':' + minutes);
      }
    },

    changeUnit: function() {
      var c = Weather.cache;

      // Toggle temp unit type on click
      if (c.showFahrenheit === false) {
        $('#temp').html(c.fahrenheit);
        c.showFahrenheit = true;
      } else {
        $('#temp').html(c.celcius);
        c.showFahrenheit = false;
      }

      // Toggles the button knob
      $('#unit-toggle').toggleClass('toggle');
      // Creates the fade in effect on the temp text
      $('#temp').toggleClass('toggle');
    },

    refresh: function() {
      Weather.showTime();
      Weather.getLocation();
    }
  };

  Weather.init();

})();