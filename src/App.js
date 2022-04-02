import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherCard from './WeatherCard';


function App() {
  const [clockState, setClockState] = useState();

  // Dynamically Updating Time for clock.
  useEffect(() => {
    var timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Berlin'});
    setClockState(timeString)
    setInterval(() => {
    var timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Berlin'});
    setClockState(timeString)
    }, 1000);
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