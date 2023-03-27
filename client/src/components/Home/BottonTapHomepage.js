import Vector from "../../images/Vector.png";
import blogger from "../../images/blogger.png";
import React, { useState } from "react";
import {GraphTap} from "../Home/GraphTap";

function BottonTapHomepage() {
  const [lineCheckClick, setLineCheckClick] = useState(true);
  const [BarChartCheckClick, setBarChartCheckClick] = useState(false);
  const [WordCloudCheckClick, setWordCloudCheckClick] = useState(false);
  const [SearchCheckClick, setSearchCheckClick] = useState(true);
  const [hashtagCheckClick, sethashtagCheckClick] = useState(false);

  return (
    <div className="h-full w-full flex-row bg-[#FA66FF]">
      <div className="flex mt-[40px]">
        <img src={Vector} className="w-[35px] h-[35px] text-center ml-[10px]" />
        <h1 className="text-2xl font-bold ml-[10px]">Dashboards</h1>
      </div>
      <div>
        <div className="flex">
          {!lineCheckClick ? (
            <span className="block ">
              <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
            </span>
          ) : null}

          {lineCheckClick ? (
            <div>
              <div className="w-[10px] bg-[#57d8ff] h-[55px] mt-[17px] rounded-md"></div>
              <span className="hidden">
                <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
              </span>
            </div>
          ) : null}

          <button
            onClick={() => {
              setLineCheckClick(true);
              setBarChartCheckClick(false);
              setWordCloudCheckClick(false);
            }}
            className="bg-[#E6E0DE] py-[17px] w-[200px] mx-4 mt-4 rounded-lg text-[#454545]"
          >
            Line
          </button>
        </div>

        <h1></h1>

        <div className="flex">
          {!BarChartCheckClick ? (
            <span className="block ">
              <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
            </span>
          ) : null}

          {BarChartCheckClick ? (
            <div>
              <div className="w-[10px] bg-[#57d8ff] h-[55px] mt-[17px] rounded-md"></div>
              <span className="hidden">
                <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
              </span>
            </div>
          ) : null}
          <button
            onClick={() => {
              setBarChartCheckClick(true);
              setLineCheckClick(false);
              setWordCloudCheckClick(false);
            }}
            className="bg-[#B0B8C2] py-[17px] w-[200px] mx-4 my-3 rounded-lg text-[#103E55]"
          >
            Bar Chart
          </button>
        </div>

        <h1></h1>

        <div className="flex">
          <div className="flex">
            {!WordCloudCheckClick ? (
              <span className="block ">
                <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
              </span>
            ) : null}

            {WordCloudCheckClick ? (
              <div>
                <div className="w-[10px] bg-[#57d8ff] h-[55px] mt-[17px] rounded-md"></div>
                <span className="hidden">
                  <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
                </span>
              </div>
            ) : null}
            <button
              onClick={() => {
                setBarChartCheckClick(false);
                setLineCheckClick(false);
                setWordCloudCheckClick(true);
              }}
              className="bg-[#92AFBF] py-[17px] w-[200px] mx-4 my-3 rounded-lg text-[#ffffff]"
            >
              Word Cloud
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-[40px]">
        <img src={blogger} className="w-[42x] h-[42px] text-center ml-[10px]" />
        <h1 className="text-2xl font-bold ml-[10px]">Logs</h1>
      </div>

      <div>
        <div className="flex">
          {!SearchCheckClick ? (
            <span className="block ">
              <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
            </span>
          ) : null}

          {SearchCheckClick ? (
            <div>
              <div className="w-[10px] bg-[#57d8ff] h-[55px] mt-[17px] rounded-md"></div>
              <span className="hidden">
                <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
              </span>
            </div>
          ) : null}
          <button
            onClick={() => {
              setSearchCheckClick(true);
              sethashtagCheckClick(false);
            }}
            className="bg-[#4F8BA6] py-[17px] w-[200px] mx-4 my-3 rounded-lg text-[#FFFFFF] "
          >
            search
          </button>
        </div>

        <h1></h1>
        <div className="flex">
        {!hashtagCheckClick ? (
            <span className="block ">
              <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
            </span>
          ) : null}

          {hashtagCheckClick ? (
            <div>
              <div className="w-[10px] bg-[#57d8ff] h-[55px] mt-[17px] rounded-md"></div>
              <span className="hidden">
                <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
              </span>
            </div>
          ) : null}
          <button
            onClick={() => {
              setSearchCheckClick(false);
              sethashtagCheckClick(true);
            }}
            className="bg-[#103E55] py-[17px] w-[200px] mx-4 my-3 rounded-lg text-[#ffffff]"
          >
            hashtag
          </button>
        </div>
      </div>

      <div className="grid justify-items-center ">
        <div className=" fixed bottom-4">
          <button
            onClick="myFunction()"
            className="bg-[#69FF66] py-[17px] w-[50px]  mr-2 rounded-lg"
          >
            30D
          </button>
          <button
            onClick="myFunction()"
            className="bg-[#69FF66] py-[17px] w-[50px]  mr-2 rounded-lg"
          >
            1W
          </button>
          <button
            onClick="myFunction()"
            className="bg-[#69FF66] py-[17px] w-[50px]   rounded-lg"
          >
            1D
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottonTapHomepage;
