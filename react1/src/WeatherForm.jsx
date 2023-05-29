import React, { useState } from "react";

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city) {
      onSearch(city);
    }
  };

  return (
    <div className="search-container">
      <input type="text" value={city} onChange={handleCityChange} id="search" placeholder="Enter city" />
      <button onClick={handleSearch}>Search</button>
      
    </div>
  );
};

export default WeatherForm;
