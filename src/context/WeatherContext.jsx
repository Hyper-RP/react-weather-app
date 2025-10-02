import { createContext, useEffect, useState } from "react";

const WeatherContext = createContext();

export function Provider({ children }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const url1=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const url2=`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`;
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(() => ({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    }
  }, []);

  async function apiFetchHandler(url) {
    // if (!cityName) return;
    setLoading(true);
    try {
      const response = await fetch(
        url
      );
      const responseData = await response.json();
      if (responseData.cod === 200) {
        setData(responseData);
      } else {
        setData(null);
      }
    } catch (e) {
      console.log("something went wrong : " + e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  function onChangeHandler(name) {
    setCityName(name);
  }

  const value = {
    cityName,
    data,
    loading,
    setCityName,
    apiFetchHandler,
    onChangeHandler,
    location,
    url1,
    url2
  };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export default WeatherContext;
