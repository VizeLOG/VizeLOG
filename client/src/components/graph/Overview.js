import OverviewGraph from "./OverviewGraph";
import YoutubeLogo2 from "../../images/YoutubeLogo2.png";
import googleLogo from "../../images/googleLogo.png";
import OverviewWorddCloud from "./OverviewWordCloud";
import React from "react";

const Overview = (props) => {
  

  const dataToMakeOverview = props.dataOverview;
  
  return (
    <div className="ml-[17px]">
      {props.idG != "WC" ? (
        <div>
          
          <div className="flex justify-between w-[373px] ml-[5px] bg-[#ffffff50] h-[60px] px-[15px] my-[7px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
            <h1 className="mt-[15px] text-[#fff]">DAY</h1>
            <div className="flex">
              <h1 className="mt-[15px] text-[#FF3556]">YOUTUBE</h1>
              <img
                src={YoutubeLogo2}
                className="w-[40px] h-[26px] ml-[3px] mt-[15px]"
              />
            </div>

            <div className="flex">
              <h1 className="mt-[15px] text-[#567CFF]">GOOGLE</h1>
              <img
                src={googleLogo}
                className="w-[23px] h-[23px] mt-[15px] ml-[5px]"
              />
            </div>
          </div>
          {dataToMakeOverview.map((dataToMakeOverview) => {
            return (
              <OverviewGraph
                day={dataToMakeOverview.day}
                numY={dataToMakeOverview.numY}
                numG={dataToMakeOverview.numG}
              />
            );
          })}
        </div>
      ) : null}

      { props.idG == "WC" ? (<div>
        {dataToMakeOverview.map((dataToMakeOverview) => {
            return (
              <OverviewWorddCloud
                num = {dataToMakeOverview.num}
                text={dataToMakeOverview.text}
                value={dataToMakeOverview.value}
              />
            );
            
          })}
          
      </div>) : null}
    </div>
  );
};

export default Overview;
