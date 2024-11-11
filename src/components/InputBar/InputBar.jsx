import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './InputBar.css';

const InputBar = ({city, setCity,LoadCityData}) => {

    const [similarCities,setSimilarCities] = useState([]);
    async function autoSuggestions(event)
    {
        setCity(event.target.value);
        if(event.target.value === '')
        {
            setSimilarCities([]);
            return;
        }
        const cityData = await axios.get(`https://api.weatherapi.com/v1/search.json?key=ef13fefba849482297764456242110&q=${event.target.value}`);
        setSimilarCities(cityData.data);
    }

    function ChangeCitydata(cityName){
        setCity(cityName);
        setSimilarCities([]);
        LoadCityData();
    };

    function ClearInputBox()
    {
        setCity('');
        setSimilarCities([]);
    }

  console.log();
    return (
    <div id='inputbar'>
        <div id='searchoption'>
            <input type="text" value={city} onChange={autoSuggestions} placeholder='Enter City'></input>
            
            <div id='suggestionBox'>
            {similarCities.length > 0 && ((
                    <div id='suggestions'>
                        {similarCities.map((city,index) => {
                        return (
                            <div className='city' key={index}>
                            <button id="suggestions" onClick={()=>ChangeCitydata(city.name)}>{city.name}, {city.region}, {city.country}</button>
                            </div>
                        )
                        })}
                    </div>
                )
            )}
            </div>
        </div>
        <button id="searchButton" onClick={ClearInputBox}>X</button>
    </div>
  )
}

export default InputBar
