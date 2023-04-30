import React, { useState } from "react";
import SearchIcon from "../../images/SearchIcon.png";
import SearchIconD from "../../images/SearchIconD.png";
import BodyHomepage from "./BodyHomepage";

function HeaderHomepage() {
  const [searchText, setSearchText] = useState("");
  const [toSearch, setToSearch] = useState(false);

  const hours = 20;
  const search = () => {
    if (searchText.trim().length != 0) {
      setToSearch(true);
    }
  };

  return (
    <div>
      <div className="h-[100px] lg:h-[130px]  bg-gradient-to-r from-[#0E1C34] via-[#030C1C] to-[#444266] flex shadow-lg ">
        <div className=" shadow  p-4 max-w-sm w-[270px] lg:w-[330px] 2xl:w-full mx-auto">
          <div className="animate-pulse ">
            <div className="">
              <h1 className="text-3xl lg:text-5xl font-black pt-[10px] lg:pt-[20px] ml-[20px] lg:ml-[30px] w-full lg:w-[260px] flex  items-center text-[#fff]">
                VizeLOG
              </h1>
            </div>
          </div>
          <div className="flex justify-center -space-x-12 ml-[100px]">
            <div className="mix-blend-multiply bg-blue-400 w-[30px] h-[10px]"></div>
            <div className="mix-blend-multiply bg-pink-400 w-[30px] h-[10px]"></div>
          </div>
        </div>

        <div className="w-screen flex  lg:items-center pt-[30px]">
          <div className="">
            <form>
              <label>
                <input
                  className="h-[40px] px-[10px] w-[400px] lg:w-[450px] 2xl:w-[600px]  rounded-full bg-[#ffffff40] border-2 border-[#ffffff] "
                  type="text"
                  name="name"
                  id="values"
                  placeholder="    Enter some text"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </label>
            </form>
          </div>
          {hours < 18 ? (
            <img
              src={SearchIconD}
              onClick={() => search()}
              className="w-[43px]  h-[43px] text-center ml-[10px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
            />
          ) : null}

          {hours > 18 ? (
            <img
              src={SearchIcon}
              onClick={() => search()}
              className="w-[43px] h-[43px] text-center ml-[10px] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 "
            />
          ) : null}
        </div>
      </div>
      {!toSearch ? (
        <>
          <BodyHomepage cheackSearch={toSearch} />
        </>
      ) : null}
      {toSearch ? (
        <>
          <BodyHomepage searchTextShowInbody={searchText} />
        </>
      ) : null}
    </div>
  );
}

export default HeaderHomepage;
