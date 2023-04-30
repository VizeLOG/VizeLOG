import GraphTap from "./GraphTap";
import Vector from "../../images/Vector.png";
import blogger from "../../images/blogger.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Overview from "../graph/Overview";

const BodyHomepage = (props) => {

  const hours = 2;

  const [lineCheckClick, setLineCheckClick] = useState(true);
  const [BarChartCheckClick, setBarChartCheckClick] = useState(false);
  const [WordCloudCheckClick, setWordCloudCheckClick] = useState(false);
  const [SearchCheckClick, setSearchCheckClick] = useState(true);
  const [hashtagCheckClick, sethashtagCheckClick] = useState(false);

  const [sendCreateGraphText, setsendCreateGraphText] = useState("LG");
  const [sendCreateGraphDataType, setsendCreateGraphTextDataType] = useState("SD");
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

  // Word Cloud Data Fetching
  // 30D
  const [dataToMakeGraphWordCloud30D, setDataToMakeGraphWordCloud30D] = useState([]);
  const [dataToMakeOverviewWordCloud30D, setDataToMakeOverviewWordCloud30D] = useState([]);
  const [dataToMakeGraphWordCloud1W, setDataToMakeGraphWordCloud1W] = useState([]);
  const [dataToMakeOverviewWordCloud1W, setDataToMakeOverviewWordCloud1W] = useState([]);
  const [dataToMakeOverviewGraphHashtag30D, setDataToMakeOverviewGraphHashtag30D] = useState([]);
  const [dataToMakeOverviewGraphHashtag1W, setDataToMakeOverviewGraphHashtag1W] = useState([]);

  // Overview data
  const [dataToMakeOverviewGraphSearch30D, setDataToMakeOverviewGraphSearch30D] = useState([]);
  const [dataToMakeOverviewGraphSearch1W, setDataToMakeOverviewGraphSearch1W] = useState([]);

  const SelectGraph = () => {
    if (sendCreateGraphText != "") {
      console.log({ sendCreateGraphText });
    }
  };

  const fetchHandler = async () => {
    // YouTube Response
    const youtubeResponse = await axios.get(
      `http://www.ticketing-app-thecoding-prod.store/api/youtube/search/trend/${props.searchTextShowInbody}`
    );

    // Google Response
    const googleResponse = await axios.get(
      `http://www.ticketing-app-thecoding-prod.store/api/google/search/trend/${props.searchTextShowInbody}`
    );

    // Line Graph Generate

    // loop of 30 Days Youtube keyword
    if (JSON.stringify(youtubeResponse.data.youtubekeyword30d) !== '{}') {
      
      var haveGoogleData = false;
      setDataToMakeOverviewGraphSearch30D([]);

      if (JSON.stringify(googleResponse.data.googlekeyword30d) !== '{}' ) {
        if (googleResponse.data.googlekeyword30d.dataPoints.length === youtubeResponse.data.youtubekeyword30d.dataPoints.length) {
          haveGoogleData = true;
        }
      }

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
        
        // Overview Line Graph
        if (haveGoogleData) {
          setDataToMakeOverviewGraphSearch30D((youtubeDataSearch30D) => [
            ...youtubeDataSearch30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: googleResponse.data.googlekeyword30d.dataPoints[index].y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphSearch30D((youtubeDataSearch30D) => [
            ...youtubeDataSearch30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: `No Data`,
            },
          ]);
        }
        
      }
    } else {
      setYoutubeDataSearch30D([]);
    }

    // loop of 30 Days Youtube Hashtag
    if (JSON.stringify(youtubeResponse.data.youtubehashtag30d) !== '{}') {
           
      var haveGoogleData = false;
      setDataToMakeOverviewGraphHashtag30D([]);

      if (JSON.stringify(googleResponse.data.googlehashtag30d) !== '{}' ) {
        if (googleResponse.data.googlehashtag30d.dataPoints.length === youtubeResponse.data.youtubehashtag30d.dataPoints.length) {
          haveGoogleData = true;
        }
      }

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

        // Overview Line Graph                
        if (haveGoogleData) {
          setDataToMakeOverviewGraphHashtag30D((youtubeDataHashtag30D) => [
            ...youtubeDataHashtag30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: googleResponse.data.googlehashtag30d.dataPoints[index].y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphHashtag30D((youtubeDataHashtag30D) => [
            ...youtubeDataHashtag30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: `No Data`,
            },
          ]);
        }

      }
    } else {
      setYoutubeDataHashtag30D([]);
    }

    // loop of 7 Days Youtube keyword
    if (JSON.stringify(youtubeResponse.data.youtubekeyword7d) !== '{}') {
            
      var haveGoogleData = false;
      setDataToMakeOverviewGraphSearch1W([]);

      if (JSON.stringify(googleResponse.data.googlekeyword7d) !== '{}' ) {
        if (googleResponse.data.googlekeyword7d.dataPoints.length === youtubeResponse.data.youtubekeyword7d.dataPoints.length) {
          haveGoogleData = true;
        }
      }

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

        // Overview Line Graph
        if (haveGoogleData) {
          setDataToMakeOverviewGraphSearch1W((youtubeDataSearch7D) => [
            ...youtubeDataSearch7D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: googleResponse.data.googlekeyword7d.dataPoints[index].y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphSearch1W((youtubeDataSearch7D) => [
            ...youtubeDataSearch7D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: `No Data`,
            },
          ]);
        }
       
      }
    } else {
      setYoutubeDataSearch1W([]);
    }

    // loop of 7 Days Youtube Hashtag
    if (JSON.stringify(youtubeResponse.data.youtubehashtag7d) !== '{}') {
                  
      var haveGoogleData = false;
      setDataToMakeOverviewGraphHashtag1W([]);

      if (JSON.stringify(googleResponse.data.googlehashtag7d) !== '{}' ) {
        if (googleResponse.data.googlehashtag7d.dataPoints.length === youtubeResponse.data.youtubehashtag7d.dataPoints.length) {
          haveGoogleData = true;
        }
      }

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

        // Overview Line Graph
        if (haveGoogleData) {
          setDataToMakeOverviewGraphHashtag1W((youtubeDataHashtag7D) => [
            ...youtubeDataHashtag7D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: googleResponse.data.googlehashtag7d.dataPoints[index].y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphHashtag1W((youtubeDataHashtag7D) => [
            ...youtubeDataHashtag7D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: element.y,
              numG: `No Data`,
            },
          ]);
        }
 
      }
    } else {
      setYoutubeDataHashtag1W([]);
    }


    ///////// Google Line Graph ////////
    // loop of 30 Days Google keyword
    if (JSON.stringify(googleResponse.data.googlekeyword30d) !== '{}') {
            
      var haveYouTubeData = false;
      setDataToMakeOverviewGraphSearch30D([]);

      if (JSON.stringify(youtubeResponse.data.youtubekeyword30d) !== '{}' ) {
        if (googleResponse.data.googlekeyword30d.dataPoints.length === youtubeResponse.data.youtubekeyword30d.dataPoints.length) {
          haveYouTubeData = true;
        }
      }

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
         
        // Overview Line Graph
        if (haveYouTubeData) {
          setDataToMakeOverviewGraphSearch30D((googleDataSearch30D) => [
            ...googleDataSearch30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: youtubeResponse.data.youtubekeyword30d.dataPoints[index].y,
              numG: element.y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphSearch30D((googleDataSearch30D) => [
            ...googleDataSearch30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: `No Data`,
              numG: youtubeResponse.data.youtubekeyword30d.dataPoints[index].y,
            },
          ]);
        }
 
      }
    } else {
      setGoogleDataSearchLine30D([]);
    }

    // loop of 30 Days Google Hashtag
    if (JSON.stringify(googleResponse.data.googlehashtag30d) !== '{}') {
                  
      var haveYouTubeData = false;
      setDataToMakeOverviewGraphHashtag30D([]);

      if (JSON.stringify(youtubeResponse.data.youtubehashtag30d) !== '{}' ) {
        if (googleResponse.data.googlehashtag30d.dataPoints.length === youtubeResponse.data.youtubehashtag30d.dataPoints.length) {
          haveYouTubeData = true;
        }
      }

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
            
        // Overview Line Graph
        if (haveYouTubeData) {
          setDataToMakeOverviewGraphHashtag30D((googleDataHashtag30D) => [
            ...googleDataHashtag30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: youtubeResponse.data.youtubehashtag30d.dataPoints[index].y,
              numG: element.y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphHashtag30D((googleDataHashtag30D) => [
            ...googleDataHashtag30D,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: `No Data`,
              numG: element.y,
            },
          ]);
        }
 
      }
    } else {
      setGoogleDataHashtagLine30D([]);
    }

    // loop of 7 Days Google keyword
    if (JSON.stringify(googleResponse.data.googlekeyword7d) !== '{}') {
                        
      var haveYouTubeData = false;
      setDataToMakeOverviewGraphSearch1W([]);

      if (JSON.stringify(youtubeResponse.data.youtubekeyword7d) !== '{}' ) {
        if (googleResponse.data.googlekeyword7d.dataPoints.length === youtubeResponse.data.youtubekeyword7d.dataPoints.length) {
          haveYouTubeData = true;
        }
      }

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
         
        // Overview Line Graph
        if (haveYouTubeData) {
          setDataToMakeOverviewGraphSearch1W((googleDataSearch1W) => [
            ...googleDataSearch1W,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: youtubeResponse.data.youtubekeyword7d.dataPoints[index].y,
              numG: element.y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphSearch1W((googleDataSearch1W) => [
            ...googleDataSearch1W,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: `No Data`,
              numG: element.y,
            },
          ]);
        }

      }
    } else {
      setGoogleDataSearchLine1W([]);
    }

    // loop of 7 Days Google Hashtag
    if (JSON.stringify(googleResponse.data.googlehashtag7d) !== '{}') {
                              
      var haveYouTubeData = false;
      setDataToMakeOverviewGraphHashtag1W([]);

      if (JSON.stringify(youtubeResponse.data.youtubehashtag7d) !== '{}' ) {
        if (googleResponse.data.googlehashtag7d.dataPoints.length === youtubeResponse.data.youtubehashtag7d.dataPoints.length) {
          haveYouTubeData = true;
        }
      }

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
        
        // Overview Line Graph
        if (haveYouTubeData) {
          setDataToMakeOverviewGraphHashtag1W((googleDataHashtag1W) => [
            ...googleDataHashtag1W,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: youtubeResponse.data.youtubehashtag7d.dataPoints[index].y,
              numG: element.y,
            },
          ]);
        } else {
          setDataToMakeOverviewGraphHashtag1W((googleDataHashtag1W) => [
            ...googleDataHashtag1W,
            {
              day: `${element.x.day}/${element.x.month + 1}`,
              numY: `No Data`,
              numG: element.y,
            },
          ]);
        }

      }
    } else {
      setGoogleDataHashtagLine1W([]);
    }

    // End Of Line Graph Generate

    // Bar Chart Generate

    // Keyword 30 days
    if (
      JSON.stringify(googleResponse.data.googlekeyword30d) !== '{}' ||
      JSON.stringify(youtubeResponse.data.youtubekeyword30d) !== '{}'
    ) {
      
      var googleResponseLength = 0;
      var youtubeResponseLength = 0;

      if (JSON.stringify(googleResponse.data.googlekeyword30d) === "{}") {
        googleResponseLength = 0;
      } else {
        googleResponseLength =
          googleResponse.data.googlekeyword30d.dataPoints.length;
      }

      if (JSON.stringify(youtubeResponse.data.youtubekeyword30d) === "{}") {
        youtubeResponseLength = 0;
      } else {
        youtubeResponseLength =
          youtubeResponse.data.youtubekeyword30d.dataPoints.length;
      }

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

    // Keyword 7 days
    if (
      JSON.stringify(googleResponse.data.googlekeyword7d) !== "{}" ||
      JSON.stringify(youtubeResponse.data.youtubekeyword7d) !== "{}"
    ) {
      
      var googleResponseLength = 0;
      var youtubeResponseLength = 0;

      if (JSON.stringify(googleResponse.data.googlekeyword7d) === "{}") {
        googleResponseLength = 0;
      } else {
        googleResponseLength =
          googleResponse.data.googlekeyword7d.dataPoints.length;
      }

      if (JSON.stringify(youtubeResponse.data.youtubekeyword7d) === "{}") {
        youtubeResponseLength = 0;
      } else {
        youtubeResponseLength =
          youtubeResponse.data.youtubekeyword7d.dataPoints.length;
      }

      let checkValues = 0;
      var hadValues = false;

      if (googleResponseLength > 0) {
        hadValues = true;
        checkValues = googleResponseLength;
      }

      if (youtubeResponseLength > 0) {
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

    // Hashtag 30 days
    if (
      JSON.stringify(googleResponse.data.googlehashtag30d) !== "{}" ||
      JSON.stringify(youtubeResponse.data.youtubehashtag30d) !== "{}"
    ) {
      var googleResponseLength = 0;
      var youtubeResponseLength = 0;

      if (JSON.stringify(googleResponse.data.googlehashtag30d) === "{}") {
        googleResponseLength = 0;
      } else {
        googleResponseLength =
          googleResponse.data.googlehashtag30d.dataPoints.length;
      }

      if (JSON.stringify(youtubeResponse.data.youtubehashtag30d) === "{}") {
        youtubeResponseLength = 0;
      } else {
        youtubeResponseLength =
          youtubeResponse.data.youtubehashtag30d.dataPoints.length;
      }

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
          if (youtubeResponse.data.youtubehashtag30d.dataPoints != {}) {
            const elementYoutube =
              youtubeResponse.data.youtubehashtag30d.dataPoints[index];

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

    // Hashtag 7 days
    if (
      JSON.stringify(googleResponse.data.googlehashtag7d) !== "{}" ||
      JSON.stringify(youtubeResponse.data.youtubehashtag7d) !== "{}"
    ) {
      var googleResponseLength = 0;
      var youtubeResponseLength = 0;

      if (JSON.stringify(googleResponse.data.googlehashtag7d) === "{}") {
        googleResponseLength = 0;
      } else {
        googleResponseLength =
          googleResponse.data.googlehashtag7d.dataPoints.length;
      }

      if (JSON.stringify(youtubeResponse.data.youtubehashtag7d) === "{}") {
        youtubeResponseLength = 0;
      } else {
        youtubeResponseLength =
          youtubeResponse.data.youtubehashtag7d.dataPoints.length;
      }

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
          if (youtubeResponse.data.youtubehashtag7d.dataPoints != undefined) {
            const elementYoutube =
              youtubeResponse.data.youtubehashtag7d.dataPoints[index];
            // Bar Chart
            setBarChartHashtag1W((BarChartHashtag1W) => [
              ...BarChartHashtag1W,
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
            setBarChartHashtag1W((BarChartHashtag1W) => [
              ...BarChartHashtag1W,
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

    // Word Cloud Generate
    // loop of 30 Days Google queries
    if (JSON.stringify(googleResponse.data.googlerelatedqueries30d) !== "{}") {
      
      setDataToMakeOverviewWordCloud30D([]);

      for (
        let index = 0;
        index < googleResponse.data.googlerelatedqueries30d.metaData.length;
        index++
      ) {
        const element =
          googleResponse.data.googlerelatedqueries30d.metaData[index];

        //  Word Cloud text
        setDataToMakeGraphWordCloud30D((googleDataWordCloud30D) => [
          ...googleDataWordCloud30D,
          {
            text: element.query,
            value: element.value,
          },
        ]);

        // Word Cloud Overview
        setDataToMakeOverviewWordCloud30D((dataElement) => [
          ...dataElement,
          {
            text: element.query,
            value: element.value,
          },
        ]);
      }
    } else {
      setDataToMakeGraphWordCloud30D([]);
    }

    // loop of 7 Days Google queries
    if (JSON.stringify(googleResponse.data.googlerelatedqueries7d) !== "{}") {

      setDataToMakeOverviewWordCloud1W([]);

      for (
        let index = 0;
        index < googleResponse.data.googlerelatedqueries7d.metaData.length;
        index++
      ) {
        const element =
          googleResponse.data.googlerelatedqueries7d.metaData[index];

        //  Word Cloud text
        setDataToMakeGraphWordCloud1W((googleDataWordCloud1W) => [
          ...googleDataWordCloud1W,
          {
            text: element.query,
            value: element.value,
          },
        ]);
        
        // Word Cloud Overview
        setDataToMakeOverviewWordCloud1W((dataElement) => [
          ...dataElement,
          {
            text: element.query,
            value: element.value,
          },
        ]);
      }
    } else {
      setDataToMakeGraphWordCloud1W([]);
    }
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


  //===============================================
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
    } else if (sendCreateGraphText == "WC") {
      if (sendCreatePeriod == "30D") {
        setdataTypeMakeGraph(dataToMakeGraphWordCloud30D);
      } else if (sendCreatePeriod == "1W") {
        setdataTypeMakeGraph(dataToMakeGraphWordCloud1W);
      } else {
        setdataTypeMakeGraph(dataToMakeGraphWordCloud30D);
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

  // ====================================================================================================================================
  // Overview
  const [overviewClick, setoverviewClick] = useState(false);

  const [dataToMakeOverview, setDataToMakeOverview] = useState(
    dataToMakeOverviewGraphSearch30D
  );

  const sortDataWorldCloud = (data) => {
    var arr1 = data;
    let arr2 = [];
    var min = data[0];
    var pos;
    var max = data[0];
    for (i = 0; i < arr1.length; i++) {
      if (max.value < arr1[i].value) max = arr1[i];
    }

    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr1.length; j++) {
        if (arr1[j].value != "x") {
          if (min.value > arr1[j].value) {
            min = arr1[j];
            pos = j;
          }
        }
      }
      arr2[i] = min;
      arr1[pos] = "x";
      min = max;
    }
    arr2 = arr2.reverse();
    var arr3 = [];
    for (var k = 0; k < arr2.length; k++) {
      var text = arr2[k].text;
      var value = arr2[k].value;
      var n = k + 1;
      arr3.push({ num: n, text: text, value: value });
    }
    return arr3;
  };

  const CreateOverviewText = sendCreateGraphText;
  const CreateOverviewDataType = sendCreateGraphDataType;
  const CreatePeriod = sendCreatePeriod;
  const selectDataToMakeOverview = () => {
    // select and set data to sent to overview

    if (CreateOverviewText == "LG" || CreateOverviewText == "BC") {
      if (CreateOverviewDataType == "SD") {
        if (CreatePeriod == "30D") {
          setDataToMakeOverview(dataToMakeOverviewGraphSearch30D);
        } else if (CreatePeriod == "1W") {
          setDataToMakeOverview(dataToMakeOverviewGraphSearch1W);
        }
      } else if (CreateOverviewDataType == "HD") {
        if (CreatePeriod == "30D") {
          setDataToMakeOverview(dataToMakeOverviewGraphHashtag30D);
        } else if (CreatePeriod == "1W") {
          setDataToMakeOverview(dataToMakeOverviewGraphHashtag1W);
        }
      }
    } else if (CreateOverviewText == "WC") {
      if (CreatePeriod == "30D") {
        var data = sortDataWorldCloud(dataToMakeOverviewWordCloud30D);
        setDataToMakeOverview(data);
      } else if (CreatePeriod == "1W") {
        var data = sortDataWorldCloud(dataToMakeOverviewWordCloud1W);
        setDataToMakeOverview(data);
      } else {
        var data = sortDataWorldCloud(dataToMakeOverviewWordCloud30D);
        setDataToMakeOverview(data);
      }
    }
  };
  useEffect(() => {
    selectDataToMakeOverview();
  }, [CreateOverviewText]);

  useEffect(() => {
    selectDataToMakeOverview();
  }, [CreateOverviewDataType]);

  useEffect(() => {
    selectDataToMakeOverview();
  }, [CreatePeriod]);

  return (
    <div>
      {/* #================================================================================================================================================ */}
      <div className="w-screen h-[10px] bg-gradient-to-r from-[#0e273f] via-red-700 to-pink-700"></div>
      {hours < 18 ? (
        <div className="grid  grid-cols-8 h-max gap-2 bg-gradient-to-r from-[#122a41] via-red-300 to-pink-300">
          <div className="col-start-1 col-end-2 ">
            <div className="h-full flex-row  bg-[#D2F0FA10]">
              {/* //button zone */}
              <div className="2xl:flex pt-[40px] ">
                <div className="flex justify-center -space-x-10 float-left ml-[10px] w-[60px]">
                  <div className="">
                    <div className="mix-blend-multiply bg-[#E94F4A50] rounded-md w-[25px] h-[25px]"></div>
                  </div>
                  <img
                    src={Vector}
                    className="2xl:w-[35px] 2xl:h-[35px] text-center ml-[10px] w-[25px] h-[25px] "
                  />
                </div>
                <h1 className="text-md xl:text-lg 2xl:text-2xl font-bold ml-[10px] text-[#fff] ">
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
                      <div className="w-[10px] bg-[#90DAFF70] h-[55px] mt-[17px] rounded-md"></div>
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
                    }}
                    className="hover:shadow-[inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_7px_7px_20px_0px_rgba(0,0,0,.3),inset_4px_4px_5px_0px_rgba(0,0,0,.4)] hover:border-[#A83232] hover:text-[#842D2D] bg-[#E6E0DE60] py-[12px] w-[120px] lg:w-[150px] 2xl:w-[200px] mx-4 mt-4 rounded-lg text-lg lg:text-xl 2xl:text-2xl text-[#ffffff] border-2 border-[#ffffff50] hover:bg-[#ffffff97]"
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
                      <div className="w-[10px] bg-[#90DAFF70] h-[55px] mt-[17px] rounded-md"></div>
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
                    }}
                    className="hover:shadow-[inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_7px_7px_20px_0px_rgba(0,0,0,.3),inset_4px_4px_5px_0px_rgba(0,0,0,.4)] hover:border-[#FF6464] hover:text-[#B64848] bg-[#B0B8C260] py-[12px] w-[120px] lg:w-[150px]  2xl:w-[200px] text-lg lg:text-xl 2xl:text-2xl mx-4 my-3 rounded-lg text-[#ffffff] border-2 border-[#ffffff30] hover:bg-[#ffffff97]"
                  >
                    Bar Chart
                  </button>
                </div>

                <h1></h1>

                <div className="flex">
                  {!WordCloudCheckClick ? (
                    <span className="block ">
                      <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
                    </span>
                  ) : null}

                  {WordCloudCheckClick ? (
                    <div>
                      <div className="w-[10px] bg-[#90DAFF70] h-[55px] mt-[17px] rounded-md"></div>
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
                      setsendCreateGraphText("WC");
                      SelectGraph();
                    }}
                    className="hover:shadow-[inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_7px_7px_20px_0px_rgba(0,0,0,.3),inset_4px_4px_5px_0px_rgba(0,0,0,.4)] hover:border-[#FF6464] hover:text-[#B64848] bg-[#92AFBF60] py-[12px] text-lg lg:text-xl 2xl:text-xl w-[120px] lg:w-[150px]  2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff] border-2 border-[#ffffff50] hover:bg-[#ffffff97]"
                  >
                    Word Cloud
                  </button>
                </div>
              </div>

              <div className="2xl:flex mt-[40px]">
                <div className="flex justify-center -space-x-11  ml-[10px] w-[60px]">
                  <div className="mix-blend-multiply bg-[#E94F4A50] rounded-md w-[30px] mt-[2px] h-[30px]"></div>

                  <img
                    src={blogger}
                    className="2xl:w-[42x] 2xl:h-[42px] text-center ml-[10px] w-[32px] h-[32px]"
                  />
                </div>
                <h1 className="text-lg 2xl:text-2xl font-bold ml-[10px] text-[#fff]">
                  Logs
                </h1>
              </div>

              <div>
                <h1></h1>
                <div className="flex">
                  {!SearchCheckClick ? (
                    <span className="block ">
                      <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
                    </span>
                  ) : null}

                  {SearchCheckClick && !(sendCreateGraphText == "WC") ? (
                    <div>
                      <div className="w-[10px] bg-[#90DAFF70] h-[55px] mt-[17px] rounded-md"></div>
                      <span className="hidden">
                        <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
                      </span>
                    </div>
                  ) : null}
                  {!(sendCreateGraphText == "WC") ? (
                    <button
                      onClick={() => {
                        setSearchCheckClick(true);
                        sethashtagCheckClick(false);
                        setsendCreateGraphTextDataType("SD");
                      }}
                      className="hover:shadow-[inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_7px_7px_20px_0px_rgba(0,0,0,.3),inset_4px_4px_5px_0px_rgba(0,0,0,.4)] bg-[#92AFBF60] py-[12px] text-md lg:text-xl 2xl:text-2xl w-[120px] lg:w-[150px] hover:text-[#AFF8FF]  2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff] border-2 border-[#ffffff50] hover:border-[#A0F2FF] hover:bg-[#ffffff97]"
                    >
                      search
                    </button>
                  ) : null}

                  {sendCreateGraphText == "WC" ? (
                    <button
                      onClick={() => {}}
                      className="bg-[#92AFBF20]  py-[12px] text-md lg:text-xl 2xl:text-2xl w-[120px] lg:w-[150px]   2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff20] border-2 border-[#ffffff10] "
                    >
                      search
                    </button>
                  ) : null}
                </div>

                <h1></h1>
                <div className="flex">
                  {!hashtagCheckClick ? (
                    <span className="block ">
                      <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
                    </span>
                  ) : null}

                  {hashtagCheckClick && !(sendCreateGraphText == "WC") ? (
                    <div>
                      <div className="w-[10px] bg-[#90DAFF70] h-[55px] mt-[17px] rounded-md"></div>
                      <span className="hidden">
                        <div className="w-[10px] bg-[#0000000] h-[55px] mt-[17px] rounded-md"></div>
                      </span>
                    </div>
                  ) : null}

                  {!(sendCreateGraphText == "WC") ? (
                    <button
                      onClick={() => {
                        setSearchCheckClick(false);
                        sethashtagCheckClick(true);
                        setsendCreateGraphTextDataType("HD");
                      }}
                      className="hover:shadow-[inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_1px_1px_20px_0px_rgba(255,255,255,1),inset_7px_7px_20px_0px_rgba(0,0,0,.3),inset_4px_4px_5px_0px_rgba(0,0,0,.4)] hover:border-[#A0F2FF] hover:text-[#AFF8FF] bg-[#103E5560] py-[12px] text-md lg:text-xl 2xl:text-2xl w-[120px] lg:w-[150px]  2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff] border-2 border-[#ffffff50] hover:bg-[#ffffff97] "
                    >
                      hashtag
                    </button>
                  ) : null}

                  {sendCreateGraphText == "WC" ? (
                    <button
                      onClick={() => {}}
                      className="bg-[#103E5520] py-[12px] text-md lg:text-xl 2xl:text-2xl w-[120px] lg:w-[150px]  2xl:w-[200px] mx-4 my-3 rounded-lg text-[#ffffff29] border-2 border-[#ffffff10]  "
                    >
                      hashtag
                    </button>
                  ) : null}
                </div>
              </div>

              <div className=" ">
                <div className="ml-[20px]">
                  {!(sendCreatePeriod == "30D") && sendCreatePeriod == "1W" ? (
                    <button
                      onClick={() => {
                        setsendsendCreatePeriod("30D");
                      }}
                      className="bg-[#7F7C77] py-[3px] mt-[5px]  w-[35px]  2xl:w-[50px] border-2 border-[#ffffff60] hover:bg-[#7F7C7750] mr-2 rounded-lg text-[#ffffff] hover:border-2"
                    >
                      30D
                    </button>
                  ) : null}

                  {sendCreatePeriod == "30D" ? (
                    <button
                      onClick={() => {
                        setsendsendCreatePeriod("30D");
                      }}
                      className="bg-[#F1B4D570] py-[3px] mt-[5px] w-[35px]  2xl:w-[50px] border-2 border-[#ffffff60]  mr-2 rounded-lg text-[#ffffff] hover:border-2"
                    >
                      30D
                    </button>
                  ) : null}

                  {!(sendCreatePeriod == "1W") && sendCreatePeriod == "30D" ? (
                    <button
                      onClick={() => {
                        setsendsendCreatePeriod("1W");
                      }}
                      className="bg-[#7F7C77] py-[3px] mt-[5px] border-2 border-[#ffffff60] w-[35px] 2xl:w-[50px] hover:bg-[#7F7C7750] hover:border-2  mr-2 rounded-lg text-[#ffffff]"
                    >
                      1W
                    </button>
                  ) : null}

                  {sendCreatePeriod == "1W" ? (
                    <button
                      onClick={() => {
                        setsendsendCreatePeriod("1W");
                      }}
                      className="bg-[#F1B4D570] py-[3px] mt-[5px] border-2 border-[#ffffff60] w-[35px] 2xl:w-[50px]  mr-2 rounded-lg text-[#ffffff]"
                    >
                      1W
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* body to show graph ===================================================================================*/}
          <div className="flex-row flex pt-[10px] col-start-2 col-end-9 mr-[20px] ">
            <div className="w-full mr-[10px] ml-[10px] mb-[50px] bg-[#c2effb50] h-full rounded-xl pt-[10px]">
              {props.cheackSearch == false ? (
                <div className="h-screen">
                  <h1>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Not Search
                  </h1>
                  <div className=""></div>
                </div>
              ) : null}

              {props.searchTextShowInbody != null &&
              props.searchTextShowInbody != "" ? (
                <div className=" ">
                  <div className=" bg-[#ffffff10] mb-[10px]">
                    <div className="mt-[20px]   flex w-max bg-[#FF93D920] mb-[20px]">
                      <div className="flex">
                        <h1 className="text-[37px]  font-bold ml-[20px] mr-[10px] my-[10px]  text-[#ffffff97]">
                          your search term :
                        </h1>
                        <h1 className="text-[37px]  font-bold  mr-[20px] my-[10px]  text-[#ffffff]">
                          {props.searchTextShowInbody}
                        </h1>
                      </div>
                      <div className="mix-blend-multiply bg-[#D8A6F120] w-[17px]"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 ">
                    <div className="w-max col-start-1 h-max col-end-3 ">
                      <div className="flex ">
                        {!(sendCreateGraphText == "WC") ? (
                          <div className="w-max">
                            {sendCreateGraphDataType == "SD" ? (
                              <div>
                                <h1 className="text-md  font-bold ml-[20px] mr-[7px]  text-[#C5DBE7]">
                                  SEARCH
                                </h1>
                              </div>
                            ) : null}
                            {sendCreateGraphDataType == "HD" ? (
                              <div>
                                <h1 className="text-md  font-bold ml-[20px] mr-[7px]  text-[#C5DBE7]">
                                  HASHTAG
                                </h1>
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {!(sendCreateGraphText == "WC") ? (
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffffff] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E2F7FF]"></span>
                          </span>
                        ) : null}

                        <div className="w-max ml-[10px]">
                          {sendCreateGraphText == "LG" ? (
                            <div>
                              <h1 className="text-md  font-bold ml-[20px] mr-[7px]  text-[#F8F0FE]">
                                LINE GRAPH
                              </h1>
                            </div>
                          ) : null}

                          {sendCreateGraphText == "BC" ? (
                            <div>
                              <h1 className="text-md  font-bold ml-[20px] mr-[7px]  text-[#F8F0FE]">
                                BAR CHART
                              </h1>
                            </div>
                          ) : null}

                          {sendCreateGraphText == "WC" ? (
                            <div>
                              <h1 className="text-md  font-bold ml-[20px] mr-[7px]  text-[#F8F0FE]">
                                World Cloud
                              </h1>
                            </div>
                          ) : null}
                        </div>
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffffff] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6D3FF]"></span>
                        </span>

                        <div className=" w-max   ml-[10px]">
                          {sendCreatePeriod == "30D" ? (
                            <div>
                              <h1 className="text-md  font-bold ml-[20px] mr-[7px] text-[#F6E8F1]">
                                30 Day
                              </h1>
                            </div>
                          ) : null}

                          {sendCreatePeriod == "1W" ? (
                            <div>
                              <h1 className="text-md  font-bold ml-[20px] mr-[7px]  text-[#F6E8F1]">
                                1 Week
                              </h1>
                            </div>
                          ) : null}
                        </div>
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffffff] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F7D0D0]"></span>
                        </span>
                      </div>
                      <div className="w-full h-[2px] bg-[#ffffff70]"></div>
                    </div>

                    <div className=" col-end-7 col-span-2">
                      {/* Overview Button */}
                      {!overviewClick ? (
                        <button
                          onClick={() => {
                            setoverviewClick(true);
                          }}
                          className=" bg-[#ffffff50] py-[12px] text-lg w-[120px] hover:text-[#AFF8FF]  mx-4  rounded-full text-[#F74686] border-2 border-[#CC1A89] hover:border-[#A0F2FF] hover:bg-[#324D6877]"
                        >
                          Overview
                        </button>
                      ) : null}

                      {overviewClick ? (
                        <button
                          onClick={() => {
                            setoverviewClick(false);
                          }}
                          className="  bg-[#ffffff50] py-[12px] text-lg w-[120px] hover:text-[#AFF8FF]  mx-4  rounded-full text-[#F74686] border-2 border-[#CC1A89] hover:border-[#A0F2FF] hover:bg-[#324D6877]"
                        >
                          Graph
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {sendCreateGraphText != "" && !overviewClick ? (
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

                  {sendCreateGraphText != "" && overviewClick ? (
                    <div className="mt-[30px]">
                      <Overview
                        idG={sendCreateGraphText}
                        idGTD={sendCreateGraphDataType}
                        checkDay={sendCreatePeriod}
                        dataOverview={dataToMakeOverview}
                      />
                    </div>
                  ) : null}

                  {sendCreateGraphText == "" && overviewClick ? (
                    <div className="mt-[30px]">
                      <Overview
                        idG="LG"
                        idGTD="SD"
                        checkDay={sendCreatePeriod}
                        dataOverview={dataToMakeOverview}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {props.searchTextShowInbody != null &&
              sendCreateGraphText == "" &&
              !overviewClick ? (
                <div>
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
            <div className="w-[1px] h-screen"></div>
          </div>
        </div>
      ) : null}
      {hours < 18 ? (
        <div className="w-full h-[20px] bg-gradient-to-r from-[#091D31] via-red-700 to-pink-700"></div>
      ) : null}
    </div>
  );
};

export default BodyHomepage;
