import React, { useState } from 'react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

import { DateTime } from 'luxon';


export default function ChartCard({ weatherConds, cardDate }) {

  //Creates Date Matrix.
  var dateMatrix = [];
  for (var i in weatherConds) {
    var dateName = DateTime.now().setZone('Europe/Berlin').plus({days:i}).startOf('day').toLocaleString({weekday: 'long'});

    dateMatrix.push({dateName});
  }

  const [formattedTempData, setFormattedTempData] = useState({
    labels: dateMatrix.map((data) => data.dateName),
    grid: {
      color: "black"
    },
    datasets: [
      {
        label: "Daily High",
        data: weatherConds.map((data) => data.temp.max),
        backgroundColor: "#DD0000",
        borderColor: "#C20000",
        borderWidth: 1.2,
      },
      {
        label: "Daily Low",
        data: weatherConds.map((data) => data.temp.min),
        backgroundColor: "#FFCC00",
        borderColor: "#EFAE2D",
        borderWidth: 1.2,
      }
    ]
  });

  const [formattedPrecipData, setFormattedPrecipData] = useState({
    labels: dateMatrix.map((data) => data.dateName),
    grid: {
      color: "black"
    },
    datasets: [
      {
        label: "Snowfall (mm)",
        data: weatherConds.map((data) => data.snow),
        backgroundColor: "#CFF7FF",
        borderColor: "#B6F3FF",
        borderWidth: 1.2,
        type: 'bar',
      },
      {
        label: "Rainfall (mm)",
        data: weatherConds.map((data) => data.rain),
        backgroundColor: "#00A3D1",
        borderColor: "#006FB8",
        borderWidth: 1.2,
        type: 'bar'
      },
    ]
  });

  const [chartOptions, setChartOptions] = useState({
    color: "#212529",
    scales: {
      y: {ticks: {color: '#212529'}, grid: {color: '#212529', borderColor: '#212529'}},
      x: {ticks: {color: '#212529'}, grid: {color: '#00000000',borderColor: '#212529'}}
    }
  });

  return(

    <>
      <div className='col-xxl-6'>
        <div className="card">
          <div className="card-body">
            <h3>Temperature</h3>
            <LineChart key={'chart1'} chartData={formattedTempData} chartOptions={chartOptions}/>
          </div>
        </div>
      </div>
      <div className="col-xxl-6">
        <div className="card">
          <div className="card-body">
            <h3>Precipitation</h3>
            <BarChart key={'chart2'} chartData={formattedPrecipData} chartOptions={chartOptions}/>
          </div>
        </div>
      </div>
    </>
  )
}