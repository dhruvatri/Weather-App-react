import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import InputBar from './components/InputBar/InputBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import './App.css';

const App = () => {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [lat,setLat] = useState(0);
  const [lon,setLon] = useState(0);

  useEffect(()=>
    {
      if (city==='')
      {
        console.log(lat, lon);
        fetchData();
      }
    }
  , [city]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }, [])

  

  const currentLocationData = useMemo( async() => {
      if (lat !== 0 && lon !== 0) {
      const curentWeather = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ef13fefba849482297764456242110&q=${lat},${lon}&days=5&aqi=yes`);
        console.log(curentWeather.data);
        setWeather(curentWeather.data);
      }
  },[lat,lon]);
  
  async function fetchData() {
    if (lat !== 0 && lon !== 0) {
    const curentWeather = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ef13fefba849482297764456242110&q=${lat},${lon}&days=5&aqi=yes`);
    console.log(curentWeather.data);
    setWeather(curentWeather.data);
    }
  }


  async function LoadCityData()
  {
    const cityData = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ef13fefba849482297764456242110&q=${city}&days=5&aqi=yes`);
    setWeather(cityData.data);
    console.log("City Updated");
  }

  return (
    <div id='container'>
      <div id='navbar'>
        <h1>Weather App</h1>
        <InputBar city={city} setCity={setCity} LoadCityData={LoadCityData}></InputBar>
      </div>
      {
        weather && (
          <div>
            <WeatherCard weather={weather}></WeatherCard>
            
          </div>
        )
      }
    </div>
  )
}

export default App
