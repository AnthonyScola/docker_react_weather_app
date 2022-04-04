import $ from'jquery';
import Popper from 'popper.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);    // Create a root.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();