<h1>Docker React Weather App</h1>
Docker app built for serving a react application for the OpenWeather APIs

<br><br>
<h2>Installation</h2>
Note: Before getting started, make sure you have Docker installed.
<br><br>
<ol>
  <li>Download and extract the source code.</li>
  <li>From the root directory, run the following command to build the docker image:</li>
  <code>docker build -t react_weather_app_image .</code>
  <li>Once Docker is finished creating the image, use the following command to run it in a container:</li>
  <code>docker run -d -p 3000:3000 --name react-weather-app react_weather_app_image</code>
</ol>

<br><br>
<h2>Development</h2>
<p>If you would like to run the Docker container and simultaneously make changes to the Node.js source code, consider using a Bind Mount Volume. This can be done with the following commands while located inside of the root directory.</p>
<ul>
  <li>Power Shell</li>
  <code>docker run -v ${PWD}\src:/app/src -d -p 3000:3000 --name react-weather-app react_weather_app_image</code>
  <li>Linux</li>
  <code>docker run -v $(PWD)/src:/app/src -d -p 3000:3000 --name react-weather-app react_weather_app_image</code>
</ul>
  
<br><br>
<h2>References</h2>
<h3>Stock Photos</h3>
<ul>
  <li>Unsplash https://unsplash.com/</li>
</ul>
