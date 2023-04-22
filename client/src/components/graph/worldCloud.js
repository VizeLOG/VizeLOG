import React from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const WorldCloud = (props) => {
  const data = [
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "Hello world", value: 10 },
    { text: "Kitty", value: 20000000 },
    { text: "UFO", value: 7000 },
    { text: "Youtube", value: 500 },
    { text: "Facebook", value: 3000 },
    { text: "IG", value: 23456 },
    { text: "Tiktok", value: 789 },
    { text: "T", value: 5678 },
    { text: "Flowet", value: 5678 },
    { text: "Heyc", value: 1000 },
    { text: "lolc", value: 200 },
    { text: "first impressionc", value: 800 },
    { text: "very coolc", value: 1000000 },
    { text: "Hello worldc", value: 10 },
    { text: "Kittyc", value: 20000000 },
    { text: "UFOc", value: 7000 },
    { text: "Youtubec", value: 500 },
    { text: "Facebookc", value: 3000 },
    { text: "IGc", value: 23456 },
    { text: "Tiktokc", value: 789 },
    { text: "Tc", value: 5678 },
    { text: "Flowetc", value: 5678 },
    { text: "Hello worldc2", value: 10 },
    { text: "Kittyc2", value: 20000000 },
    { text: "UFOc", value: 7000 },
    { text: "Youtubec2", value: 500 },
    { text: "Facebookc2", value: 3000 },
    { text: "IGc2", value: 23456 },
    { text: "Tiktokc2", value: 789 },
    { text: "Tc2", value: 5678 },
    { text: "Flowetc2", value: 5678 },
  ];

  const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

  return (
    <div className="w-[600px] lg:w-[600px] 2xl:w-[650px]  bg-[ffffff]">
      <WordCloud
        data={data}
        background-color='#ffffff50'
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 5}
        spiral="rectangular"
        rotate={(word) => word.value % 360}
        padding={5}
        random={Math.random}
        fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text}`);
        }}
        onWordMouseOver={(event, d) => {
          console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={(event, d) => {
          console.log(`onWordMouseOut: ${d.text}`);
        }}
      />
    </div>
  );
};

export default WorldCloud;
