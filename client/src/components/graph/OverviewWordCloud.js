import React from "react";

const OverviewWorddCloud= (props) => {

  return (
    <div className="flex justify-between w-[403px] ml-[5px] bg-[#ffffff50] h-[60px] px-[15px] my-[7px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-md hover:shadow-[#6E558E90]  ">
      <h1 className="mt-[15px] text-[#D5DFFB]">{props.num}</h1>
      <h1 className="mt-[15px] text-[#484D9D]">{props.text}</h1>
      <h1 className="mt-[15px] text-[#fff]">{props.value}</h1>
    </div>
  );
};

export default OverviewWorddCloud ;