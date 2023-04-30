import React from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const WorldCloud = (props) => {

  const data = props.DMK;

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
      />
    </div>
  );
};

export default WorldCloud;
