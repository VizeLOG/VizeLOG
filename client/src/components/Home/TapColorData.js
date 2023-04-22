import YoutubeLogo2 from "../../images/YoutubeLogo2.png";
import googleLogo from "../../images/googleLogo.png";

const TapColorData = () => {
  return (
    <div className="">
      <div className="flex mt-[20px] bg-[#1B0A1670] w-min lg:mx-[20px] border-2 border-[#ffffff87]">
        <div className="flex hover:bg-[#ffffff50] w-max py-[5px] px-[5px]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <img src={YoutubeLogo2} className="w-[40px] h-[26px]" />
          <h3 className="text-[#fff] hover:text-[#33241a]">&nbsp;Youtube</h3>
          <div className="w-[10px] h-[10px] bg-[#FF3556] rounded-full mt-[8px] ml-[4px] border-2 border-[#ff1047] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-115 hover:w-[20px] hover:h-[20px]"></div>
        </div>

        <div className="ml-[5px] lg:ml-[10px] flex hover:bg-[#ffffff50] w-max py-[5px] px-[5px]  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <div className="bg-[#fff] w-[23px] h-[23px]">
            {" "}
            <img src={googleLogo} className="w-[23px] h-[23px] " />
          </div>

          <h3 className="text-[#fff] hover:text-[#1b2378]">&nbsp;Google</h3>
          <div className="w-[10px] h-[10px] bg-[#567CFF] rounded-full mt-[8px] ml-[4px] border-2 border-[#4c11ff] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-115 hover:w-[20px] hover:h-[20px]"></div>
        </div>
      </div>
    </div>
  );
};

export default TapColorData;
