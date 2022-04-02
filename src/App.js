import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './App.css';
import WeatherCard from './WeatherCard';

window.$ = $;


function App() {
  const [clockState, setClockState] = useState();

  function SetTime() {
    var timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Berlin'});
    setClockState(timeString)
  }

  // Dynamically Updating Time and weather.
  useEffect(() => {

    SetTime()
    setInterval(() => {
      SetTime()

      //Use this code when everything is completed.
      //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=`${process.env.REACT_APP_OW_API_KEY}`
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=48.679615&lon=10.153576&appid=a4755513bba8c114dcc6a4a09072a541",
        headers: {
          "accept": "application/json"
        },
        type: "GET",
        success: function(data) {
          console.log("Success!");
          var my_data = data;
          console.log(my_data.list[0].main);
        },
        fail:function(data) { console.log("No Dice!"); }
      });


    }, 5000); //Remember to change this back to a minute after testing...
  }, [])

  //Sets Default location to Heidenheim, Germany if not stated by docker variable.
  var locationName = `${process.env.REACT_APP_LOCATION_NAME}`;
  if (locationName === 'undefined'){
    locationName = 'Heidenheim';
  }

  return (
    <div className="App container">
      <header className="App-header">
      <h1>
        {clockState}
      </h1>
        <h1>Weather in {locationName}</h1>
      </header>

      <div className='row'>
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </div>

    </div>
  );
}

export default App;