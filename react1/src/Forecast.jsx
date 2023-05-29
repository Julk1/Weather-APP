import React from "react";

const Forecast = ({ weatherData, getWeatherIcon, getWeatherCloth, getUniqueDates }) => {
  return (
    <div className="weather-container">
      <div className="current-weather">
        <p>Current Weather</p>
        <div className="weather-icon-cur">
          <img src={getWeatherIcon(weatherData.list[0].weather[0].main)} alt="Weather Icon" />
        </div>

        <div className="temperature">{Math.round(weatherData.list[0].main.temp - 273.15)}°C</div>
        
        <div className="description">{weatherData.list[0].weather[0].main}</div>
        <div className="clothing-icon-cur">{getWeatherCloth(Math.round(weatherData.list[0].main.temp - 273.15))}</div>
      </div>
      <div className="forecast">
      <p>Next Days Weather</p>
        {getUniqueDates().map((date) => (
          <div className="forecast-item" key={date}>
            <div className="date">{date}</div>
            <div className="weather-icon">
              <img
                src={getWeatherIcon(
                  weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).weather[0].main
                )}
                alt="Weather Icon"
              />
            </div>
            <div className="temperature">
              {Math.round(
                weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).main.temp - 273.15
              )}
              °C
            </div>
            <div className="description">
              {weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).weather[0].main}
            </div>
            <div className="clothing-icon">
              {getWeatherCloth(
                Math.round(weatherData.list.find((item) => item.dt_txt.includes(`${date} 12:00`)).main.temp - 273.15)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
