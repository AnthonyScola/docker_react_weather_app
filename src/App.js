import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './App.css';
import WeatherCard from './WeatherCard';

window.$ = $;

function App() {
  //Setting clockState and weatherConds to be Reactive.
  const [clockState, getClockState] = useState();
  const [weatherConds, getWeatherConds] = useState("none");   //EX: weatherConds.list[0].main Main Weather. Will return weather conditions of curent day.


  function SetTime() {  //Sets the current time and assigns value to getter.
    var timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Berlin'});
    getClockState(timeString);
  }

  function SetCondState() {  //Sets the current weather conditions and assigns value to getter.
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
        getWeatherConds(data.list);
      },
      fail:function(data) { console.log("No Dice!"); }
    });
  }

  // Dynamically Updating Time and weather.
  useEffect(() => {
    var seconds_passed = 0;

    SetTime();
    SetCondState();

    setInterval(() => {
      SetTime();

      seconds_passed++;
      if (seconds_passed >=60) {  //Checks the weather every Minute.
        seconds_passed = 0;
        SetCondState();
      }
    }, 1000);
  }, []);

  //Sets Default location to Heidenheim, Germany if not stated by docker env variable.
  var locationName = `${process.env.REACT_APP_LOCATION_NAME}`;
  if (locationName === 'undefined'){
    locationName = 'Heidenheim';
  }

  return (
    <div className="App container-fluid">
      <header className="App-header">
        <h1>Weather in {locationName}</h1>
        <h1>{clockState}</h1>
      </header>

      <div className='row d-flex justify-content-around'>
        <WeatherCard weatherConds={weatherConds[0]} cardDate={'Today'}/>
        <WeatherCard weatherConds={weatherConds[1]} cardDate={'Tomorrow'}/>
        <WeatherCard weatherConds={weatherConds[2]} cardDate={new Date().getDay()+2}/>
        <WeatherCard weatherConds={weatherConds[3]} cardDate={new Date().getDay()+3}/> {/* THESE NEED TO BE SET TO BEING REACTIVE BEFORE PUBLISHING */}
      </div>

    </div>
  );
}

export default App;