import React, { useEffect, useState } from "react";
import ApiData from "./ApiData";
import { FaSearch } from "react-icons/fa";
import Loader from "../assets/loading.gif";
import { BiColor, BiFontColor } from "react-icons/bi";
// import NotFoundImg from "../assets/not-found.png"
function Wrapper() {
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [show,setShow]=useState(true);

  function inputHandler(e) {
    setInput(e.target.value);
  }

  async function fetchApi(city) {
    try {
      setLoading(true);
      let res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=6e9b2be4114347c1abc185117252201&q=${city}&aqi=no`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      let data = await res.json();
      setApiData(data);
      setValid(true);
    } catch (error) {
      setValid(false);
      alert("Invalid city name. Please enter a valid city.");
    } finally {
      setLoading(false);
    }
  }

  function Search() {
    fetchApi(input);
    setInput("");
  }

  function yourWeather() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=6e9b2be4114347c1abc185117252201&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`
      );
      let data = await res.json();
      setApiData(data);
      setInput(data.location.name);
    });
  }

  function showHandler(){
    setShow(!show);
  }

  useEffect(()=>{
    yourWeather()
    setLoading(true);
  },[])

  return (
    <>
      <div className="w-8/12  h-[100%] mx-auto  flex flex-col items-center">
        <div className=" justify-center">
          <div className="text-[2rem] text-center text-[white] font-[700] mb-[3.5rem]">
            Weather App
          </div>
          <div className="flex content-between justify-between mb-[3rem] mt-[1rem]">
            <button
              className="text-[1.2rem] bg-[#ffffff4b] p-[0.5rem] rounded-[0.5rem] leading-[1] text-center text-[white] font-[500]"
              onClick={yourWeather}
            >
              Your Weather
            </button>
            <button className="text-[1.2rem]  text-center text-[white] font-[500]" onClick={showHandler}>
              Search Weather
            </button>
          </div>
          {show ?(""):(<div className="flex items-center mt-[4rem] mb-[3rem] w-[full]" >
            <input
              placeholder="Search for city..."
              className="py-[0.8rem] px-[1rem] w-[40rem] border-none outline-none rounded-[1rem] text-[1.2rem]  text-[white] font-[500] bg-[#0000001a]"
              value={input}
              onInput={inputHandler}

            ></input>
            <FaSearch color="white" className="w-[3.7rem] p-[0.7rem]  ml-[0.5rem] rounded-full h-[3.5rem] bg-[#0000002d]" onClick={Search} />
          </div>)
          }
          {loading ? (
            <div className="flex justify-center mt-[-2rem]">
            <img
              src={Loader}
              style={{ height: "250px" }}
              alt="Loading..."
            ></img></div>
          ) : (
            ""
          )}

          {apiData ? (
            <ApiData apiData={apiData} valid={valid} setLoading={setLoading} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Wrapper;
