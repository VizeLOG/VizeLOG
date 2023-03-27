import BottonTapHomepage from "./BottonTapHomepage";
import GraphTap from "./GraphTap";
import Vector from "../../images/Vector.png";
import blogger from "../../images/blogger.png";
import React, { useState, useEffect } from "react";
import ShowSearchText from "./ShowSeachText";
import axios from "axios";

//ต้องกดปุ่ม line สองรอบ
const BodyHomepage = (props) => {
  const d = new Date();
  const hours = 2;

  const [lineCheckClick, setLineCheckClick] = useState(true);
  const [BarChartCheckClick, setBarChartCheckClick] = useState(false);
  const [WordCloudCheckClick, setWordCloudCheckClick] = useState(false);
  const [SearchCheckClick, setSearchCheckClick] = useState(true);
  const [hashtagCheckClick, sethashtagCheckClick] = useState(false);

  const [sendCreateGraphText, setsendCreateGraphText] = useState("LG");
  const [sendCreateGraphDataType, setsendCreateGraphTextDataType] =
    useState("SD");
  const [sendCreatePeriod, setsendsendCreatePeriod] = useState("30D");

  // Line Graph Data Fetching
  // 30D
  const [youtubeDataSearch30D, setYoutubeDataSearch30D] = useState([]);
  const [googleDataSearchLine30D, setGoogleDataSearchLine30D] = useState([]);
  const [youtubeDataHashtag30D, setYoutubeDataHashtag30D] = useState([]);
  const [googleDataHashtagLine30D, setGoogleDataHashtagLine30D] = useState([]);
  // 7D
  const [youtubeDataSearch1W, setYoutubeDataSearch1W] = useState([]);
  const [googleDataSearchLine1W, setGoogleDataSearchLine1W] = useState([]);
  const [youtubeDataHashtag1W, setYoutubeDataHashtag1W] = useState([]);
  const [googleDataHashtagLine1W, setGoogleDataHashtagLine1W] = useState([]);

  // Bar Chart Data Fetching
  // 30D
  const [BarChartHashtag30D, setBarChartHashtag30D] = useState([]);
  const [BarChartHashtag1W, setBarChartHashtag1W] = useState([]);
  const [BarChartSearch30D, setBarChartSearch30D] = useState([]);
  const [BarChartSearch1W, setBarChartSearch1W] = useState([]);

  const SelectGraph = () => {
    if (sendCreateGraphText != "") {
      console.log({ sendCreateGraphText });
    }
  };

  const fetchHandler = async () => {
    // YouTube Response
    const youtubeResponse = await axios.get(
      `/api/youtube/search/trend/${props.searchTextShowInbody}`
    );
    console.log(youtubeResponse.data);

    // Bar Chart Generate

    // loop of 30 Days Youtube keyword
    if (youtubeResponse.data.youtubekeyword30d.dataPoints != undefined) {
      for (
        let index = 0;
        index < youtubeResponse.data.youtubekeyword30d.dataPoints.length;
        index++
      ) {
        const element =
          youtubeResponse.data.youtubekeyword30d.dataPoints[index];

        // Line Graph
        setYoutubeDataSearch30D((youtubeDataSearch30D) => [
          ...youtubeDataSearch30D,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setYoutubeDataSearch30D([]);
    }

    // loop of 30 Days Youtube Hashtag
    if (youtubeResponse.data.youtubehashtag30d.dataPoints != undefined) {
      for (
        let index = 0;
        index < youtubeResponse.data.youtubehashtag30d.dataPoints.length;
        index++
      ) {
        const element =
          youtubeResponse.data.youtubehashtag30d.dataPoints[index];
        // Line Graph
        setYoutubeDataHashtag30D((youtubeDataHashtag30D) => [
          ...youtubeDataHashtag30D,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setYoutubeDataHashtag30D([]);
    }

    // loop of 7 Days Youtube keyword
    if (youtubeResponse.data.youtubekeyword7d.dataPoints != undefined) {
      for (
        let index = 0;
        index < youtubeResponse.data.youtubekeyword7d.dataPoints.length;
        index++
      ) {
        const element = youtubeResponse.data.youtubekeyword7d.dataPoints[index];

        // Line Graph
        setYoutubeDataSearch1W((youtubeDataSearch1W) => [
          ...youtubeDataSearch1W,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setYoutubeDataSearch1W([]);
    }

    // loop of 7 Days Youtube Hashtag
    if (youtubeResponse.data.youtubehashtag7d.dataPoints != undefined) {
      for (
        let index = 0;
        index < youtubeResponse.data.youtubehashtag7d.dataPoints.length;
        index++
      ) {
        const element = youtubeResponse.data.youtubehashtag7d.dataPoints[index];

        // Line Graph
        setYoutubeDataHashtag1W((youtubeDataHashtag1W) => [
          ...youtubeDataHashtag1W,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setYoutubeDataHashtag1W([]);
    }

    // Google Response
    const googleResponse = await axios.get(
      `/api/google/search/trend/${props.searchTextShowInbody}`
    );
    console.log(googleResponse.data);

    // loop of 30 Days Google keyword
    if (googleResponse.data.googlekeyword30d.dataPoints != undefined) {
      for (
        let index = 0;
        index < googleResponse.data.googlekeyword30d.dataPoints.length;
        index++
      ) {
        const element = googleResponse.data.googlekeyword30d.dataPoints[index];

        // Line Graph
        setGoogleDataSearchLine30D((googleDataSearchLine30D) => [
          ...googleDataSearchLine30D,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setGoogleDataSearchLine30D([]);
    }

    // loop of 30 Days Google Hashtag
    if (googleResponse.data.googlehashtag30d.dataPoints != undefined) {
      for (
        let index = 0;
        index < googleResponse.data.googlehashtag30d.dataPoints.length;
        index++
      ) {
        const element = googleResponse.data.googlehashtag30d.dataPoints[index];

        // Line Graph
        setGoogleDataHashtagLine30D((googleDataHashtagLine30D) => [
          ...googleDataHashtagLine30D,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setGoogleDataHashtagLine30D([]);
    }

    // loop of 7 Days Google keyword
    if (googleResponse.data.googlekeyword7d.dataPoints != undefined) {
      for (
        let index = 0;
        index < googleResponse.data.googlekeyword7d.dataPoints.length;
        index++
      ) {
        const element = googleResponse.data.googlekeyword7d.dataPoints[index];

        // Line Graph
        setGoogleDataSearchLine1W((googleDataSearchLine1W) => [
          ...googleDataSearchLine1W,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setGoogleDataSearchLine1W([]);
    }

    // loop of 7 Days Google Hashtag
    if (googleResponse.data.googlehashtag7d.dataPoints != undefined) {
      for (
        let index = 0;
        index < googleResponse.data.googlehashtag7d.dataPoints.length;
        index++
      ) {
        const element = googleResponse.data.googlehashtag7d.dataPoints[index];

        // Line Graph
        setGoogleDataHashtagLine1W((googleDataHashtagLine1W) => [
          ...googleDataHashtagLine1W,
          {
            x: new Date(element.x.year, element.x.month, element.x.day),
            y: element.y,
          },
        ]);
      }
    } else {
      console.log("pass");
      setGoogleDataHashtagLine1W([]);
    }

    // End Of Line Graph Generate

    // Bar Chart Generate

    if (
      googleResponse.data.googlekeyword30d.dataPoints != undefined ||
      youtubeResponse.data.youtubekeyword30d.dataPoints != undefined
    ) {
      const googleResponseLength =
        googleResponse.data.googlekeyword30d.dataPoints.length || 0;
      const youtubeResponseLength =
        youtubeResponse.data.youtubekeyword30d.dataPoints.length || 0;

      var checkValues = 0;
      var hadValues = false;
      if (googleResponseLength > 0) {
        hadValues = true;
        checkValues = googleResponseLength;
      }

      if (youtubeResponseLength) {
        hadValues = true;
        checkValues = youtubeResponseLength;
      }

      if (hadValues) {
        for (let index = 0; index < checkValues; index++) {
          if (youtubeResponse.data.youtubekeyword30d.dataPoints != undefined) {
            const elementYoutube =
              youtubeResponse.data.youtubekeyword30d.dataPoints[index];
            // Bar Chart
            setBarChartSearch30D((BarChartSearch30D) => [
              ...BarChartSearch30D,
              {
                x: new Date(
                  elementYoutube.x.year,
                  elementYoutube.x.month,
                  elementYoutube.x.day | undefined,
                  1
                ),
                y: elementYoutube.y,
                label: "YouTube",
              },
            ]);
          }

          if (googleResponse.data.googlekeyword30d.dataPoints != undefined) {
            const elementGoogle =
              googleResponse.data.googlekeyword30d.dataPoints[index];
            // Bar Chart
            setBarChartSearch30D((BarChartSearch30D) => [
              ...BarChartSearch30D,
              {
                x: new Date(
                  elementGoogle.x.year,
                  elementGoogle.x.month,
                  elementGoogle.x.day | undefined,
                  12
                ),
                y: elementGoogle.y,
                label: "Google",
              },
            ]);
          }
        }
      }
    }

    if (
      googleResponse.data.googlekeyword7d.dataPoints != undefined ||
      youtubeResponse.data.youtubekeyword7d.dataPoints != undefined
    ) {
      const googleResponseLength =
        googleResponse.data.googlekeyword7d.dataPoints.length || 0;
      const youtubeResponseLength =
        youtubeResponse.data.youtubekeyword7d.dataPoints.length || 0;

      var checkValues = 0;
      var hadValues = false;
      if (googleResponseLength > 0) {
        hadValues = true;
        checkValues = googleResponseLength;
      }

      if (youtubeResponseLength) {
        hadValues = true;
        checkValues = youtubeResponseLength;
      }

      if (hadValues) {
        for (let index = 0; index < checkValues; index++) {
          if (youtubeResponse.data.youtubekeyword7d.dataPoints != undefined) {
            const elementYoutube =
              youtubeResponse.data.youtubekeyword7d.dataPoints[index];

            // Bar Chart
            setBarChartSearch1W((BarChartSearch1W) => [
              ...BarChartSearch1W,
              {
                x: new Date(
                  elementYoutube.x.year,
                  elementYoutube.x.month,
                  elementYoutube.x.day | undefined,
                  1
                ),
                y: elementYoutube.y,
                label: "YouTube",
              },
            ]);
          }

          if (googleResponse.data.googlekeyword7d.dataPoints != undefined) {
            const elementGoogle =
              googleResponse.data.googlekeyword7d.dataPoints[index];
            // Bar Chart
            setBarChartSearch1W((BarChartSearch1W) => [
              ...BarChartSearch1W,
              {
                x: new Date(
                  elementGoogle.x.year,
                  elementGoogle.x.month,
                  elementGoogle.x.day | undefined,
                  12
                ),
                y: elementGoogle.y,
                label: "Google",
              },
            ]);
          }
        }
      }
    }

    if (
      googleResponse.data.googlehashtag30d.dataPoints != {} ||
      youtubeResponse.data.yotubehashtag30d.dataPoints != {}
    ) {
      const googleResponseLength =
        googleResponse.data.googlehashtag30d.dataPoints != {} ? googleResponse.data.googlehashtag30d.dataPoints.length : 0;
      const youtubeResponseLength =
        youtubeResponse.data.yotubehashtag30d.dataPoints != {} ? youtubeResponse.data.yotubehashtag30d.dataPoints.length :  0;

      var checkValues = 0;
      var hadValues = false;
      if (googleResponseLength > 0) {
        hadValues = true;
        checkValues = googleResponseLength;
      }

      if (youtubeResponseLength) {
        hadValues = true;
        checkValues = youtubeResponseLength;
      }

      if (hadValues) {
        for (let index = 0; index < checkValues; index++) {
          if (youtubeResponse.data.yotubehashtag30d.dataPoints != {}) {
            const elementYoutube =
              youtubeResponse.data.yotubehashtag30d.dataPoints[index];

            // Bar Chart
            setBarChartHashtag30D((BarChartHashtag30D) => [
              ...BarChartHashtag30D,
              {
                x: new Date(
                  elementYoutube.x.year,
                  elementYoutube.x.month,
                  elementYoutube.x.day | undefined,
                  1
                ),
                y: elementYoutube.y,
                label: "YouTube",
              },
            ]);
          }

          if (googleResponse.data.googlehashtag30d.dataPoints != undefined) {
            const elementGoogle =
              googleResponse.data.googlehashtag30d.dataPoints[index];

            // Bar Chart
            setBarChartHashtag30D((BarChartHashtag30D) => [
              ...BarChartHashtag30D,
              {
                x: new Date(
                  elementGoogle.x.year,
                  elementGoogle.x.month,
                  elementGoogle.x.day | undefined,
                  12
                ),
                y: elementGoogle.y,
                label: "Google",
              },
            ]);
          }
        }
      }
    }

    if (
      googleResponse.data.googlehashtag7d.dataPoints != undefined ||
      youtubeResponse.data.youtubehashtag7d.dataPoints != undefined
    ) {
      const googleResponseLength =
        googleResponse.data.googlehashtag7d.dataPoints.length || 0;
      const youtubeResponseLength =
        youtubeResponse.data.youtubehashtag7d.dataPoints.length || 0;

      var checkValues = 0;
      var hadValues = false;
      if (googleResponseLength > 0) {
        hadValues = true;
        checkValues = googleResponseLength;
      }

      if (youtubeResponseLength) {
        hadValues = true;
        checkValues = youtubeResponseLength;
      }

      if (hadValues) {
        for (
          let index = 0;
          index < checkValues;
          index++
        ) {
          if (youtubeResponse.data.youtubehashtag7d.dataPoints != undefined) {
            const elementYoutube =
              youtubeResponse.data.youtubehashtag7d.dataPoints[index];
            // Bar Chart
            setBarChartSearch1W((BarChartSearch1W) => [
              ...BarChartSearch1W,
              {
                x: new Date(
                  elementYoutube.x.year,
                  elementYoutube.x.month,
                  elementYoutube.x.day | undefined,
                  1
                ),
                y: elementYoutube.y,
                label: "YouTube",
              },
            ]);
          }

          if (googleResponse.data.googlehashtag7d.dataPoints != undefined) {
            const elementGoogle =
              googleResponse.data.googlehashtag7d.dataPoints[index];
            // Bar Chart
            setBarChartSearch1W((BarChartSearch1W) => [
              ...BarChartSearch1W,
              {
                x: new Date(
                  elementGoogle.x.year,
                  elementGoogle.x.month,
                  elementGoogle.x.day | undefined,
                  12
                ),
                y: elementGoogle.y,
                label: "Google",
              },
            ]);
          }
        }
      }
    }

    // End Of Bar Chart Generate
  };

  // Graph Generate
  const [dataTypeMakeGraph, setdataTypeMakeGraph] =
    useState(youtubeDataSearch30D);

  const [dataTypeMakeGraphLine, setdataTypeMakeGraphLine] = useState(
    googleDataSearchLine30D
  );
  const dataSearch1D = [
    { x: new Date(0, 0, 0, 9, 10, 0, 0), y: 10.6 },
    { x: new Date(0, 0, 0, 19, 10, 0, 0), y: 12 },
    { x: new Date(0, 0, 0, 20, 10, 0, 0), y: 4.6 },
  ];
  const SelectDataTypeMakeGraph = () => {
    if (sendCreateGraphText == "LG") {
      if (sendCreateGraphDataType == "SD") {
        if (sendCreatePeriod == "30D") {
          setdataTypeMakeGraph(youtubeDataSearch30D);
          setdataTypeMakeGraphLine(googleDataSearchLine30D);
        } else if (sendCreatePeriod == "1W") {
          setdataTypeMakeGraph(youtubeDataSearch1W);
          setdataTypeMakeGraphLine(googleDataSearchLine1W);
        } else if (sendCreatePeriod == "1D") {
          // jsljscp
          // for (var i = 0; i < 5; i++) {
          //   dataSearch1D[i] = new Date(
          //     0,
          //     0,
          //     0,
          //     Math.floor(Math.random() * 10),
          //     Math.floor(Math.random() * 10),
          //     0,
          //     0
          //   );
          // }
          setdataTypeMakeGraph(dataSearch1D);
        }
      } else if (sendCreateGraphDataType == "HD") {
        if (sendCreatePeriod == "30D") {
          setdataTypeMakeGraph(youtubeDataHashtag30D);
          setdataTypeMakeGraphLine(googleDataHashtagLine30D);
        } else if (sendCreatePeriod == "1W") {
          setdataTypeMakeGraph(youtubeDataHashtag1W);
          setdataTypeMakeGraphLine(googleDataHashtagLine1W);
        }
      }
    } else if (sendCreateGraphText == "BC") {
      if (sendCreateGraphDataType == "SD") {
        if (sendCreatePeriod == "30D") {
          setdataTypeMakeGraph(BarChartSearch30D);
        } else if (sendCreatePeriod == "1W") {
          setdataTypeMakeGraph(BarChartSearch1W);
        } else {
          setdataTypeMakeGraph(BarChartSearch30D);
        }
      } else if (sendCreateGraphDataType == "HD") {
        if (sendCreatePeriod == "30D") {
          setdataTypeMakeGraph(BarChartHashtag30D);
        } else if (sendCreatePeriod == "1W") {
          setdataTypeMakeGraph(BarChartHashtag1W);
        } else {
          setdataTypeMakeGraph(BarChartHashtag30D);
        }
      } else {
        setdataTypeMakeGraph(BarChartSearch30D);
      }
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    SelectDataTypeMakeGraph();
  }, [sendCreateGraphText]);

  useEffect(() => {
    SelectDataTypeMakeGraph();
  }, [sendCreateGraphDataType]);

  useEffect(() => {
    SelectDataTypeMakeGraph();
  }, [sendCreatePeriod]);

  return (
    <div>
      {/* #================================================================================================================================================ */}
      <div className="w-screen h-[10px] bg-gradient-to-r from-[#0e273f] via-red-700 to-pink-700"></div>
      {hours < 18 ? (
        <div className="flex bg-gradient-to-r from-[#122a41] via-red-300 to-pink-300">
          <div className="h-full w-full flex-row ">
            <div className="2xl:flex mt-[40px] ">
              <img
                src={Vector}
                className="2xl:w-[35px] 2xl:h-[35px] text-center ml-[10px] w-[25px] h-[25px] "
              />
              <h1 className="text-2xl font-bold ml-[10px] text-[#fff] ">
                Dashboards
              </h1>
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
                    setsendCreateGraphText("LG");
                    SelectGraph();
                    //SelectDataTypeMakeGraph();
                  }}
                  className="bg-[#E6E0DE] py-[12px] w-[120px] lg:w-[150px] 2xl:w-[200px] mx-4 mt-4 rounded-lg text-lg lg:text-xl 2xl:text-2xl text-[#454545] border-4 border-[#45454550] hover:bg-[#E6E0DE50]"
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
                    setsendCreateGraphText("BC");
                    SelectGraph();
                    //SelectDataTypeMakeGraph();
                  }}
                  className="bg-[#B0B8C2] py-[12px] w-[120px] lg:w-[150px]  2xl:w-[200px] text-lg lg:text-xl 2xl:text-2xl mx-4 my-3 rounded-lg text-[#103E55] border-4 border-[#103E5550] hover:bg-[#B0B8C250]"
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
                  {/* <button
                    onClick={() => {
                      setBarChartCheckClick(false);
                      setLineCheckClick(false);
                      setWordCloudCheckClick(true);
                      setsendCreateGraphText("WC");
                      SelectGraph();
                    }}
                    className="bg-[#92AFBF] py-[12px] text-lg lg:text-xl 2xl:text-2xl w-[120px] lg:w-[150px]  2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff] border-4 border-[#ffffff50] hover:bg-[#92AFBF50]"
                  >
                    Word Cloud
                  </button> */}
                </div>
              </div>
            </div>

            <div className="2xl:flex mt-[40px]">
              <img
                src={blogger}
                className="2xl:w-[42x] 2xl:h-[42px] text-center ml-[10px] w-[32px] h-[32px]"
              />
              <h1 className="text-2xl font-bold ml-[10px] text-[#fff]">Logs</h1>
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
                    setsendCreateGraphTextDataType("SD");
                    //SelectDataTypeMakeGraph();
                  }}
                  className="bg-[#92AFBF] py-[12px] text-lg lg:text-xl 2xl:text-2xl w-[120px] lg:w-[150px]  2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff] border-4 border-[#ffffff50] hover:bg-[#92AFBF50]"
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
                    setsendCreateGraphTextDataType("HD");
                    //SelectDataTypeMakeGraph();
                  }}
                  className="bg-[#103E55] py-[12px] text-lg lg:text-xl 2xl:text-2xl w-[120px] lg:w-[150px]  2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff] border-4 border-[#ffffff50] hover:bg-[#103E5550] "
                >
                  hashtag
                </button>
              </div>
            </div>

            <div className="grid justify-items-center mt-[50px]">
              <div className=" fixed ">
                <button
                  onClick={() => {
                    setsendsendCreatePeriod("30D");
                    //SelectDataTypeMakeGraph();
                  }}
                  className="bg-[#7F7C77] py-[10px] 2xl:py-[17px] w-[35px]  2xl:w-[50px] border-2 border-[#ffffff60] hover:bg-[#7F7C7750] mr-2 rounded-lg text-[#ffffff] hover:border-2"
                >
                  30D
                </button>
                <button
                  onClick={() => {
                    setsendsendCreatePeriod("1W");
                    //SelectDataTypeMakeGraph();
                  }}
                  className="bg-[#7F7C77] py-[10px] 2xl:py-[17px] border-2 border-[#ffffff60] w-[35px] 2xl:w-[50px] hover:bg-[#7F7C7750] mr-2 rounded-lg text-[#ffffff] hover:border-2"
                >
                  1W
                </button>
                {/* <button
                  onClick={() => {
                    setsendsendCreatePeriod("1D");
                    //SelectDataTypeMakeGraph();
                  }}
                  className="bg-[#7F7C77] py-[10px] 2xl:py-[17px] border-2 border-[#ffffff60] w-[35px] 2xl:w-[50px] hover:bg-[#7F7C7750]  rounded-lg text-[#ffffff] hover:border-2"
                >
                  1D
                </button> */}
              </div>
            </div>
          </div>

          <div className="flex-row pt-[10px] ">
            <div className="w-screen bg-[#c2effb50]  h-screen rounded-xl pt-[10px]">
              {/* {sendCreateGraphText != "" ? (
                <div className="mt-[20px]">
                  {props.searchTextShowInbody != null ? (
                    <h1>{props.searchTextShowInbody}</h1>
                  ) : null}
                  <GraphTap
                    idG={sendCreateGraphText}
                    TopicSearch={props.searchTextShowInbody}
                  />
                </div>
              ) : null} */}

              {props.cheackSearch == false ? (
                <div>
                  <h1>Not Search</h1>
                </div>
              ) : null}

              {props.searchTextShowInbody != null &&
              props.searchTextShowInbody != "" ? (
                <div className="mt-[20px] ml-[20px]">
                  <div className="border-2 w-max bg-[#00000070] rounded-2xl">
                    <h1 className="text-3xl  font-bold ml-[20px] mr-[20px] my-[10px] text-[#c1f2ff]">
                      : {props.searchTextShowInbody}
                    </h1>
                  </div>
                  <div className="flex">
                    <div className="border-2 w-max bg-[#ffffff70] rounded-2xl mt-[10px]">
                      {sendCreateGraphDataType == "SD" ? (
                        <div>
                          <h1 className="text-lg  font-bold ml-[20px] mr-[20px] my-[10px] text-[#34297f]">
                            SEARCH
                          </h1>
                        </div>
                      ) : null}
                      {sendCreateGraphDataType == "HD" ? (
                        <div>
                          <h1 className="text-lg  font-bold ml-[20px] mr-[20px] my-[10px] text-[#34297f]">
                            HASHTAG
                          </h1>
                        </div>
                      ) : null}
                    </div>

                    <div className="border-2 w-max bg-[#ffffff70] rounded-2xl mt-[10px] ml-[10px]">
                      {sendCreateGraphText == "LG" ? (
                        <div>
                          <h1 className="text-lg  font-bold ml-[20px] mr-[20px] my-[10px] text-[#e64f77]">
                            LINE GRAPH
                          </h1>
                        </div>
                      ) : null}

                      {sendCreateGraphText == "BC" ? (
                        <div>
                          <h1 className="text-lg  font-bold ml-[20px] mr-[20px] my-[10px] text-[#e64f77]">
                            BAR CHART
                          </h1>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {sendCreateGraphText != "" ? (
                    <div>
                      <GraphTap
                        idG={sendCreateGraphText}
                        TopicSearch={props.searchTextShowInbody}
                        idGTD={sendCreateGraphDataType}
                        DMK={dataTypeMakeGraph}
                        DMKL={dataTypeMakeGraphLine}
                        checkDay={sendCreatePeriod}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {props.searchTextShowInbody != null &&
              sendCreateGraphText == "" ? (
                <div>
                  {/* <h1>{props.searchTextShowInbody}</h1> */}
                  <GraphTap
                    idG="LG"
                    idGTD="SD"
                    DMK={dataTypeMakeGraph}
                    DMKL={dataTypeMakeGraphLine}
                    TopicSearch={props.searchTextShowInbody}
                    checkDay={sendCreatePeriod}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      {hours < 18 ? (
        <div className="w-screen h-[20px] bg-gradient-to-r from-[#091D31] via-red-700 to-pink-700"></div>
      ) : null}
      {hours > 18 ? (
        <div className="w-screen h-[20px]  bg-gradient-to-r from-[#091D31] via-[#5d727d] to-[#4b463d]"></div>
      ) : null}
    </div>
  );
};

export default BodyHomepage;
