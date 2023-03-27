import React,{useState} from "react";

const Number = (props) => {
    const Application = "Facebook";
    const NumberSearchFacebook = 200000000;

  return (
    <div className="flex justify-between w-[373px] ml-[5px] bg-[#ffffff50] h-[60px] px-[15px] my-[7px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
      <h1 className="mt-[15px]">{props.name}</h1>
      <h1 className="mt-[15px]">{props.num}</h1>
    </div>
  );
};

export default Number ;