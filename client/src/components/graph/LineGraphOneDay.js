// import CanvasJSReact from "../../canvasjs.stock.react";
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// window.onload = function  () {

// var chart = new CanvasJS.Chart("chartContainer", {
// 	animationEnabled: true,
// 	zoomEnabled: true,
// 	title:{
// 		text: "Try Zooming and Panning" 
// 	},
// 	data: data  // random generator below
// });
// chart.render();

// }

// var limit = 1000;

// var y = 0;
// var data = [];
// var dataSeries = { type: "line" };
// var dataPoints = [];
// for (var i = 0; i < limit; i += 1) {
// 	y += (Math.random() * 10 - 5);
// 	dataPoints.push({
// 		x: i - limit / 2,
// 		y: y                
// 	});
// }
// dataSeries.dataPoints = dataPoints;
// data.push(dataSeries);               


import React, { Component, useEffect, useState } from "react";
import CanvasJSReact from "../../canvasjs.stock.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineGraphOneDay = (props) => {
  const options = {
    theme: "light",
    animationEnabled: true,
    exportEnabled: false,
    backgroundColor: "#ffffff30",
    title: {
      text: "",
    },
    axisY: {
      title: "",
    },
    axisX: {
      labelFormatter: function (e) {
        return CanvasJS.formatDate(e.value, "hh:mm TT");
      },
    },
    data: [
      {
        type: "line",
        lineColor: "#000",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## Million",
        dataPoints:  props.DMK,
      },

    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default LineGraphOneDay;