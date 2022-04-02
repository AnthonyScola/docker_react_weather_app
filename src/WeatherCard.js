import React, { useState } from 'react';
import day_clear from './res/weather_icons/PNG/day_clear.png';
import cloudy from './res/weather_icons/PNG/cloudy.png';

export default function WeatherCard() {
  const [weatherConds, setWeather] = useState([day_clear,77,45,5]);
  return (
    <div className='col'>
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Today</h2>
                <img src={weatherConds[0]} alt="Weather Icon" width="100%"/>
                <p>
                  High: {weatherConds[1]}° F <br/>
                  Low: {weatherConds[2]}° F
                </p>
                <hr/>
                <p className="card-text">Some quick example text.</p>
                <a href="#" className="card-link">Card link</a>
            </div>
        </div>
    </div>
  )
}