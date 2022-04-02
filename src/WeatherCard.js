import React, { useState } from 'react';
import day_clear from './res/weather_icons/PNG/day_clear.png';
import cloudy from './res/weather_icons/PNG/cloudy.png';

export default function WeatherCard() {
  const [weatherConds, setWeather] = useState([day_clear,77,45,5]);
  return (
    <div class='col'>
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Today</h2>
                <img src={weatherConds[0]} alt="Weather Icon" width="100%"/>
                <p>
                  High: {weatherConds[1]}° F <br/>
                  Low: {weatherConds[2]}° F
                </p>
                <hr/>
                <p class="card-text">Some quick example text.</p>
                <a href="#" class="card-link">Card link</a>
            </div>
        </div>
    </div>
  )
}