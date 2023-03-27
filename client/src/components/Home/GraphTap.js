import GraphTest from "../graph/LineGraph";
import GraphTestTwo from "../graph/BarChart";
import WorldCloud from "../graph/worldCloud";
import React, { useState,useEffect } from "react";
import Table from "./Table";
import TapColorData from "./TapColorData";
import Number from "./Number";
import LineGraphOneDay from "../graph/LineGraphOneDay";


const GraphTap = (props) => {
  const [SearchText, setSearchText] = useState("Hello world");
  const dataTest = [
    { name: "Facebook", num: 32 },
    { name: "Twitter", num: 29 },
    { name: "Instagram", num: 41 },
    { name: "Youtube", num: 26 },
  ];


  
  return (
    <div className="flex">
      <div className="h-screen ">
        <div className=" ">
          {props.idG == "LG" && props.idG != "" ? (
            <div>
              <TapColorData />
              <div className="2xl:flex">
                <div className="mt-[10px] w-[600px] lg:w-[900px] 2xl:w-[1200px] mb-[20px]">
                {(props.checkDay=="1D" ? <LineGraphOneDay idGTD={props.idGTD} DMK={props.DMK}/> : null)}
                {(props.checkDay!="1D" ? <GraphTest idGTD={props.idGTD} DMK={props.DMK} DMKL={props.DMKL}/> : null)}
                
                  
                </div>
                {/* <div className="2xl:block hidden">
                  {dataTest.map((dataTest) => {
                    return <Number name={dataTest.name} num={dataTest.num} />;
                  })}
                </div> */}
                {/* <Table /> */}
              </div>
              <div className="lg:flex">
                {/* <div className="2xl:hidden block">
                  {dataTest.map((dataTest) => {
                    return <Number name={dataTest.name} num={dataTest.num} />;
                  })}
                </div> */}
                {/* <Table /> */}
              </div>
            </div>
          ) : null}

          {props.idG == "BC" && props.idG != "" ? (
            <div>
              <TapColorData />
              <div className="2xl:flex">
                <div className="mt-[20px] w-[600px] lg:w-[900px] 2xl:w-[1200px] mb-[20px] ">
                  <GraphTestTwo DMK={props.DMK}/>
                </div>
                {/* <div className="2xl:block hidden">
                  {dataTest.map((dataTest) => {
                    return <Number name={dataTest.name} num={dataTest.num} />;
                  })}
                </div> */}
                {/* <Table /> */}
              </div>
              <div className="lg:flex">
                {/* <div className="2xl:hidden block">
                  {dataTest.map((dataTest) => {
                    return <Number name={dataTest.name} num={dataTest.num} />;
                  })}
                </div> */}
                {/* <Table /> */}
              </div>
            </div>
          ) : null}

          {props.idG == "WC" && props.idG != "" ? (
            <div>
              <div className="mt-[20px] 2xl:flex">
                <div className="w-[600px]  lg:w-[800px] 2xl:w-[800px]  bg-[#ffffff50] mb-[20px] rounded-2xl flex justify-center items-center">
                  <WorldCloud />
                </div>
                {/* <div className="2xl:block hidden">
                  {dataTest.map((dataTest) => {
                    return <Number name={dataTest.name} num={dataTest.num} />;
                  })}
                </div> */}
                {/* <Table /> */}
              </div>
              <div className="lg:flex">
                {/* <div className="2xl:hidden block">
                  {dataTest.map((dataTest) => {
                    return <Number name={dataTest.name} num={dataTest.num} />;
                  })}
                </div> */}
                {/* <Table /> */}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GraphTap;
