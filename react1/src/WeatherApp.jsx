import React, { useState } from "react";
import WeatherForm from "./WeatherForm";
import Forecast from "./Forecast";
import "./styles/WeatherApp.css";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchWeatherData = async (city) => {
    try {
      const apiKey = "2c817747b3a929c811c6322ceeda9f53";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setNotFound(false);
      } else {
        setNotFound(true);
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return "images/sun.gif";

      case "Rain":
        return "images/rain.gif";

      case "Snow":
        return "images/snow(2).png";

      case "Clouds":
        return "images/cloudy.gif";

      case "Haze":
        return "images/wind.phg";

      default:
        return "";
    }
  };

  const getWeatherCloth = (temperature) => {
    if (temperature > 20) {
      return <i> <img src="./images/Clothing/t-shirt.png" alt="img"/></i>; 

    } else if (temperature >= 15 && temperature <= 20) {

      return <i> <img src="./images/Clothing/hoodie.png" alt="img"/></i>; 

    } else if (temperature >= 5 && temperature < 15) {

      return <i> <img src="./images/Clothing/coat.png"alt="img" /></i>; 

    } else if (temperature >= 0 && temperature < 5) {
      return <i> <img src="./images/Clothing/jacket.png"alt="img"/></i>; 

    } else {
      return<i> <img src="./images/Clothing/warm-coat.png"alt="img"/></i>; 

    } 
  
      };
    
  

  

  function getUniqueDates() {
        if (weatherData) {
            const dates = weatherData.list
                .map((item) => item.dt_txt.split(" ")[0])
                .filter((date, index, array) => array.indexOf(date) === index);

            return dates.slice(1, 4);
        }
        return [];
    }

  return (
    <div className="weather-app">
         <h1>Weather App</h1>
      <WeatherForm onSearch={fetchWeatherData} />
      {notFound ? (
        <>
        <p>City not found!!!</p>
        <img src="./images/error.png" alt="not found"/>
        </>        
      ) : (
        weatherData && (
          <Forecast
            weatherData={weatherData}
            getWeatherIcon={getWeatherIcon}
            getWeatherCloth={getWeatherCloth}
            getUniqueDates={getUniqueDates}
          />
        )
      )}
    </div>
  );

};
export default WeatherApp;