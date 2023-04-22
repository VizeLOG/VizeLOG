import GraphTest from "../graph/LineGraph";
import GraphTestTwo from "../graph/BarChart";
import WorldCloud from "../graph/worldCloud";
import React from "react";
import TapColorData from "./TapColorData";
import LineGraphOneDay from "../graph/LineGraphOneDay";


const GraphTap = (props) => {
  //select graph to show in body


  
  return (
    <div className="flex">
      <div className="h-full ">
        <div className=" ">
          {props.idG == "LG" && props.idG != "" ? (
            <div>
              { !(props.overviewClick) ? (
              <div>
              <TapColorData />
              <div className="">
                <div className="mt-[20px] ml-[10px] w-[600px] lg:w-[900px] 2xl:w-[1200px] mb-[20px]">
                {(props.checkDay=="1D" ? <LineGraphOneDay idGTD={props.idGTD} DMK={props.DMK}/> : null)}
                {(props.checkDay!="1D" ? <GraphTest idGTD={props.idGTD} DMK={props.DMK} DMKL={props.DMKL}/> : null)}
                </div>
              </div></div>) : null }
              </div>
            
          ) : null}

          {props.idG == "BC" && props.idG != "" ? (
            <div>
              <TapColorData />
              <div className="2xl:flex">
                <div className="mt-[20px] w-[600px] ml-[10px] lg:w-[900px] 2xl:w-[1200px] mb-[20px] ">
                  <GraphTestTwo DMK={props.DMK}/>
                </div>

              </div>
            </div>
          ) : null}

          {props.idG == "WC" && props.idG != "" ? (
            <div>
              <div className="mt-[20px] 2xl:flex">
                <div className="w-[600px]  lg:w-[800px] 2xl:w-[800px] ml-[10px]  bg-[#ffffff50] mb-[20px] rounded-2xl flex justify-center items-center">
                  <WorldCloud DMK={props.DMK}/>
                </div>
                
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GraphTap;
