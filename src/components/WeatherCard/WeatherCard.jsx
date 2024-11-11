import React from 'react'
import './WeatherCard.css';

const WeatherCard = ({weather}) => {
  return (
    <div id='Card'>
        <div id='weatherCard'>
            <div id="current">
                <div id="left">
                    <h2>{weather.location.name}</h2>
                    <img src={weather.current.condition.icon} alt="weather icon"></img>
                    <h3>{weather.current.condition.text}</h3>
                </div>
                <div id="right">
                    <h3> Wind : {weather.current.wind_kph} km/h</h3>
                    <h3>Precipitation : {weather.current.precip_in} in</h3>
                    <h3>Humidity : {weather.current.humidity}%</h3>
                    <h2>{weather.current.temp_c}°C</h2>
                </div>
            </div>

            <div id="forecast">
                {weather.forecast.forecastday.map((day, index) => {
                return (
                    <div className="day" key={index}>
                    <h3>{day.date}</h3>
                    <img src={day.day.condition.icon} alt="weather icon"></img>
                    <h4>{day.day.avgtemp_c}°C</h4>
                    </div>
                )})
                }   
            </div>
        </div>
        <div id="weatherDetails">
            <div id="WeatherDetailsHeading">
                <h3>
                    Information
                </h3>
                <p>Country : {weather.location.country}</p>
                <p>Region : {weather.location.region}</p>
                <p>Lat/Lon : {weather.location.lat} / {weather.location.lon}</p>
                <p>Time Zone : {weather.location.tz_id}</p>
                <h4>Last Updated On : {weather.location.localtime}</h4>
            </div>
        </div>
    </div>
  )
}

export default WeatherCard
