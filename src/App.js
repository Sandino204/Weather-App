import React, { useState } from 'react';
import './App.css';
import {Input} from 'reactstrap'


const api = {
  key: "baef4934a61c15e4776310e282c73536", 
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')  
          console.log(result)
        })
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <>
      <div className={(typeof weather.main != 'undefined') ? 
        ((weather.main.temp > 16) ? 
          'warm' : 'app')
        : 'app'}>
        <main>
          <div className="container-fluid">
            <div className="search-box row justify-content-center">
              <Input type="text" className="search-bar col-8 shadow" placeholder="Search...." onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              ></Input>
            </div>
            {(typeof weather.main !== "undefined") ? 
              <>
                <div className="row mt-5">
                  <div className="location text-center col-12">{weather.name}, {weather.sys.country}</div>
                  <div className="date text-center col-12 mt-2">{dateBuilder(new Date())}</div>
                </div>
                <div className="row justify-content-center">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°C
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </> : (<></>) }
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
