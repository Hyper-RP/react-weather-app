import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import cloud from "../assets/cloud.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import notFound from "../assets/not-found.png";
import loading from "../assets/loading.gif";

function WeatherDisplay() {
  const { data, loading: isLoading } = useContext(WeatherContext);

  if (isLoading) {
    return <img src={loading} alt="loading" className="w-20 h-20 mx-auto" />;
  }

  if (!data || !data.name) {
    return (
      <div className="text-center">
        <img src={notFound} alt="not found" className="w-32 h-32 mx-auto" />
        <p className="text-gray-500">City not found</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <img
        src={
          data.weather[0].icon
            ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            : cloud
        }
        alt="weather icon"
        className="w-32 h-32 mx-auto"
      />
      <p className="text-4xl font-bold">{Math.round(data.main.temp>=100?data.main.temp/10:data.main.temp)}°c</p>
      <p className="text-xl">{data.weather[0].main}</p>
      <div className="flex justify-around mt-4">
        <div className="flex items-center">
          <img
            src={humidityIcon}
            alt="humidity icon"
            className="w-8 h-8 mr-2"
          />
          <div>
            <p className="font-bold">{data.main.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={windIcon} alt="wind icon" className="w-12 h-12" />
          <div>
            <p className="font-bold">{data.wind.speed} km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
