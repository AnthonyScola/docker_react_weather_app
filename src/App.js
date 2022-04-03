import React, { useEffect, useState } from 'react';
import Luxon from 'luxon';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './App.css';
import WeatherCard from './WeatherCard';
import { DateTime } from 'luxon';

window.$ = $;

function App() {

  //Set location Defaults as fallback incase environment Variables fail.
  var locationName = `${process.env.REACT_APP_LOCATION_NAME}`;
  if (locationName === 'undefined'){
    locationName = 'Heidenheim';
  }

  //Setting clockState and weatherConds to be Reactive.
  const [clockState, getclockState] = useState();
  const [weatherConds, getWeatherConds] = useState("none");

  //Sets the current time and assigns value to getter.
  function SetTime() {
    var timeData = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Berlin'});

    getclockState(timeData);
  }


  function SetCondState() {  //Sets the current weather conditions and assigns value to getter.
    //Use this code when everything is completed.
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=`${process.env.REACT_APP_OW_API_KEY}`
    $.ajax({
      
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=48.679615&lon=10.153576&exclude=hourly&units=metric&appid=404f17d07ae83fb5978deb6548df50e4",
      headers: {
        "accept": "application/json"
      },
      type: "GET",
      success: function(data) {
        getWeatherConds(data.daily);
      },
      fail:function(e) { console.log(e); }
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


  const cardDeck = [];
  for (var i in weatherConds) {

    if (i == 0){ // Sets the Day of the week for the weather cards.
      var dateName = "Today";
    } else if (i == 1) {
      var dateName = "Tomorrow";
    } else {
      var dateName = DateTime.now().setZone('Europe/Berlin').plus({days:i}).startOf('day').toLocaleString({weekday: 'long'});
    }

    cardDeck.push(<WeatherCard key={"weatherCard_"+i} weatherConds={weatherConds[i]} cardDate={dateName}/>);
  }

  return (
    <div className="App container">
      <header className="App-header">
        <h1>Weather in {locationName}</h1>
        <h1>{clockState}</h1>
      </header>

      <div className='row d-flex justify-content-around'>
        {cardDeck}
      </div>
    </div>
  );
}

export default App;