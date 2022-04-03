import React, { useEffect, useState } from 'react';
import {Chart as ChartJS, BarElement} from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import $ from 'jquery';
import './App.css';
import WeatherCard from './WeatherCard';

window.$ = $;

function App() {
  //Setting clockState and weatherConds to be Reactive.
  const [clockState, getclockState] = useState();
  const [weatherConds, getWeatherConds] = useState("none");   //EX: weatherConds.list[0].main Main Weather. Will return weather conditions of curent day.


  function SetTime() {  //Sets the current time and assigns value to getter.
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

  //Sets Default location to Heidenheim, Germany if not stated by docker env variable.
  var locationName = `${process.env.REACT_APP_LOCATION_NAME}`;
  if (locationName === 'undefined'){
    locationName = 'Heidenheim';
  }

  const cardDeck = [];

  for (var i in weatherConds) {

    if (i == 0){
      var dateName = "Today";
    } else if (i == 1) {
      var dateName = "Tomorrow";
    } else {
      var dateName = new Date(moment().add(i,'d')).toLocaleString([],{weekday: 'long', timeZone: 'Europe/Berlin'});
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

      <div className='row'>
        <div className='col-12 card'>
          <p>...</p>
        </div>
      </div>

    </div>
  );
}

export default App;