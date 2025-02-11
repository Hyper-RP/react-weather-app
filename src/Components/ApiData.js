import React, { useEffect } from "react";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import clouds from "../assets/cloud.png";

function ApiData({ apiData, setLoading, valid }) {
  console.log(apiData);

  useEffect(() => {
    setLoading(false);
  }, [setLoading, valid]);

  return (
    <>
      <div>
        <div className=" flex flex-wrap flex-col items-center">
          <div className="text-[2rem] text-[white] font-[400]">{apiData.location?.name}</div>
          <div className="text-[1.4rem] text-[white] font-[500]">{apiData.current?.condition?.text}</div>
          <img src={apiData.current.condition?.icon} className="" style={{height:"100px"}} alt="icon"></img>
          <div className="text-[2rem] text-[white] mt-[-1rem] font-[700]">
             {apiData.current?.temp_c}°C
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="m-[1rem] px-[2rem] py-[0.5rem] bg-[#ffffff4b] flex flex-col items-center rounded-[0.5rem]" >
            <img src={wind} alt="windspeed" style={{height:"100px"}} ></img>
            <div className="text-[1.4rem] text-[white] font-[500] ">WINDSPEED</div>
            <div className="text-[1.8rem] text-[white] font-[500]">{apiData.current.wind_kph} Kph</div>
          </div>
          <div className="m-[1rem] px-[2.9rem] py-[0.5rem] bg-[#ffffff4b] flex flex-col items-center rounded-[0.5rem]">
            <img src={humidity} alt="Humidity" style={{height:"100px"}}></img>
            <div className="text-[1.4rem] text-[white] font-[500]">Humidity</div>
            <div className="text-[1.8rem] text-[white] font-[500]">{apiData.current.humidity}%</div>
          </div>
          <div className="m-[1rem] px-[2.8rem] py-[0.5rem] bg-[#ffffff4b] flex flex-col items-center rounded-[0.5rem]">
            <img src={clouds} alt="Clouds" style={{height:"100px"}}></img>
            <div className="text-[1.4rem] text-[white] font-[500]">Clouds</div>
            <div className="text-[1.8rem] text-[white] font-[500]">{apiData.current.cloud}%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApiData;
