import React, { useState } from 'react';

import cloudy from './res/weather_icons/PNG/cloudy.png';                  //Clouds  @ Generic
import fog from './res/weather_icons/PNG/fog.png';                        //Fog     @ Generic
import snow from './res/weather_icons/PNG/snow.png';
import tornado from './res/weather_icons/PNG/tornado.png';                //Tornado @ Generic

import day_clear from './res/weather_icons/PNG/day_clear.png';            //Clear   @ Day time
import day_cloudy from './res/weather_icons/PNG/day_partial_cloud.png';   //Clear   @ Day time
import day_rain from './res/weather_icons/PNG/day_rain.png';              //Rain    @ Day time
import day_snow from './res/weather_icons/PNG/day_snow.png';              //Snow    @ Day time

import night_snow from './res/weather_icons/PNG/night_snow.png';          //Snow    @ Night time


var conditionIconMap = {  'Clouds':     day_cloudy,
                          'Fog':        fog,
                          'Snow':       day_snow,
                          'Tornado':    tornado,
                          'Clear':      day_clear,
                          'Rain':       day_rain
}

export default function WeatherCard({ weatherConds, cardDate }) {

  if ( !(("none").includes(weatherConds) || weatherConds === 'undefined') ) {
    return(
      <div className='col'>
          <div className="card weather-cards">
              <div className="card-body">
                  <h2 className="card-title">{cardDate}</h2>
                  <span>{weatherConds.weather[0].main} | {Math.round(weatherConds.temp.day)}° C</span>
                  <img src={conditionIconMap[weatherConds.weather[0].main]} title={weatherConds.weather[0].description}/>
                  <p>
                    High: {Math.round(weatherConds.temp.max)}° C <br/>
                    Low: {Math.round(weatherConds.temp.min)}° C
                  </p>
                  <hr/>
                  <p>
                    Percipitation: {parseInt(weatherConds.pop*100)}% <br/>
                    humidity: {parseInt(weatherConds.humidity)}% <br/>
                    wind: {(weatherConds.wind_speed).toFixed(2)} m/s
                  </p>
              </div>
          </div>
      </div>
    )
  }
}