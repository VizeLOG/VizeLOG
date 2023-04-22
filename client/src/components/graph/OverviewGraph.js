import React,{useState} from "react";

const OverviewGraph = (props) => {

  return (
    <div className="flex justify-between w-[373px] ml-[5px] bg-[#ffffff50] h-[60px] px-[15px] my-[7px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#6E558E90]  ">
      <h1 className="mt-[15px] text-[#fff]">{props.day}</h1>
      <h1 className="mt-[15px] text-[#DE1616]">{props.numY}%</h1>
      <h1 className="mt-[15px] text-[#2462E6]">{props.numG}%</h1>
    </div>
  );
};

export default OverviewGraph ;