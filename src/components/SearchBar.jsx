import React, { useContext, useEffect } from "react";
import WeatherContext from "../context/WeatherContext";
import locationIcon from "../assets/location.png";

function SearchBar() {
  const { cityName, onChangeHandler, apiFetchHandler, data, location,url1,url2 } =
    useContext(WeatherContext);

  useEffect(() => {
    if (!cityName) return;
    const timer = setTimeout(() => {
      apiFetchHandler(url1);
      console.log("data : " + data);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cityName]);

  function locationHandler() {
    apiFetchHandler(url2);
    console.log("location lat : " + location.latitude);
    console.log("location long: " + location.longitude);
  }

  return (
    <div className="flex justify-between items-center w-full mb-4">
      <input
        type="text"
        name="cityName"
        onChange={(e) => onChangeHandler(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter city name"
      />
      <img
        src={locationIcon}
        alt="location icon"
        className="w-6 h-6 ml-2"
        onClick={() => locationHandler()}
      />
    </div>
  );
}

export default SearchBar;
