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


export default function WeatherCard({ weatherConds, cardDate }) {

  
  const dateMap = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  if ( !(("none").includes(weatherConds) || weatherConds === 'undefined') ) {
    return(
      <div className='col'>
          <div className="card">
              <div className="card-body">
                  <h2 className="card-title">{cardDate}</h2>
                  <img src={snow} alt={String(weatherConds.weather[0].main)}/>
                  <p>
                    High: {(weatherConds.main.temp_max - 273.15).toFixed(2)}° C <br/>
                    Low: {(weatherConds.main.temp_min - 273.15).toFixed(2)}° C
                  </p>
                  <hr/>
                  <p>
                    Currently: {(weatherConds.main.temp - 273.15).toFixed(2)}° C<br/>
                    Percip: {parseInt(weatherConds.pop*100)}% <br/>
                    humidity: {parseInt(weatherConds.main.humidity)}% <br/>
                    wind: {(weatherConds.wind.speed).toFixed(2)} k/hr
                  </p>
              </div>
          </div>
      </div>
    )
  }
}