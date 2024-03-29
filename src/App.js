import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './App.css';
import WeatherCard from './WeatherCard';
import ChartCard from './ChartCard';
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
    /*-- Use this when running in Docker ---------------------------------------------------------------------------------------------------------------------------------------\
    | api.openweathermap.org/data/2.5/forecast?lat=`${process.env.REACT_APP_LAT}`&lon=`${process.env.REACT_APP_LON}`&appid=`${process.env.REACT_APP_OW_API_KEY}`  |
    \--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    $.ajax({
      
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=48.679615&lon=10.153576&exclude=hourly&units=metric&appid=9700137cb136670ff26733ee23088067",
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
      if (seconds_passed >=15) {  //Checks the weather every 15 Minutes.
        seconds_passed = 0;
        SetCondState();
      }
    }, 60000);
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

    if (i < 8){
      cardDeck.push(<WeatherCard key={"weatherCard_"+i} weatherConds={weatherConds[i]} cardDate={dateName}/>);
    }

  }

  if ( !(("none").includes(weatherConds) || weatherConds === 'undefined') ) { //Wait for Weather Data to come back before Drawing.
    return (
      <div className="App container">
        <header className="App-header">
          <h1> <i class="bi bi-geo-alt-fill text-danger"></i> {locationName} {clockState}</h1>
        </header>

        <div className='row d-flex justify-content-around'>
          {cardDeck}
        </div>

        <div className='row d-flex justify-content-center'>
          <ChartCard weatherConds={weatherConds}/>
        </div>
      </div>
    );
  }
}

export default App;