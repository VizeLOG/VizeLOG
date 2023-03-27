import React, { Component, useEffect, useState } from "react";
import CanvasJSReact from "../../canvasjs.stock.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphTest = (props) => {

  const [SelectDataTypeGraph, setSelectDataTypeGraph] = useState();

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
        return CanvasJS.formatDate(e.value, "DD MMMM YYYY");
      },
    },
    data: [
      {
        type: "line",
        lineColor: "#FF3556",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## Percent",
        dataPoints: props.DMK,
      },
      {
      	type: "line",
      	lineColor:"#567CFF",
      	xValueFormatString: "YYYY",
      	yValueFormatString: "#,##0.## Percent",
      	dataPoints: props.DMKL
      }
      ,
      // {
      // 	type: "line",
      // 	lineColor:"#f64cff",
      // 	xValueFormatString: "YYYY",
      // 	yValueFormatString: "#,##0.## Million",
      // 	dataPoints: [
      //         { x: new Date(2020, 0), y: 0.6},
      //         { x: new Date(2019, 0), y: 15},
      //         { x: new Date(2018, 0), y: 9.6},
      // 		{ x: new Date(2017, 0), y: 4.6},
      // 		{ x: new Date(2016, 0), y: 3.3},
      // 		{ x: new Date(2015, 0), y: 12.4},
      // 		{ x: new Date(2014, 0), y: 15.3},
      // 		{ x: new Date(2013, 0), y: 14.5},
      // 		{ x: new Date(2012, 0), y: 5.8},
      // 		{ x: new Date(2011, 0), y: 6.2}
      // 	]
      // }
      // ,
      // {
      // 	type: "line",
      // 	lineColor:"#7821D0",
      // 	xValueFormatString: "YYYY",
      // 	yValueFormatString: "#,##0.## Million",
      // 	dataPoints: [
      //         { x: new Date(2020, 0), y: 4},
      //         { x: new Date(2019, 0), y: 11},
      //         { x: new Date(2018, 0), y: 19.6},
      // 		{ x: new Date(2017, 0), y: 4.6},
      // 		{ x: new Date(2016, 0), y: 3.3},
      // 		{ x: new Date(2015, 0), y: 9.4},
      // 		{ x: new Date(2014, 0), y: 12.3},
      // 		{ x: new Date(2013, 0), y: 13.5},
      // 		{ x: new Date(2012, 0), y: 8.8},
      // 		{ x: new Date(2011, 0), y: 7.2}
      // 	]
      // }
      // ,
      // {
      // 	type: "line",
      // 	lineColor:"#80D4F1",
      // 	xValueFormatString: "YYYY",
      // 	yValueFormatString: "#,##0.## Million",
      // 	dataPoints: [
      //         { x: new Date(2020, 0), y: 4},
      //         { x: new Date(2019, 0), y: 21},
      //         { x: new Date(2018, 0), y: 13.6},
      // 		{ x: new Date(2017, 0), y: 14.6},
      // 		{ x: new Date(2016, 0), y: 13.3},
      // 		{ x: new Date(2015, 0), y: 3.4},
      // 		{ x: new Date(2014, 0), y: 12.3},
      // 		{ x: new Date(2013, 0), y: 14.5},
      // 		{ x: new Date(2012, 0), y: 18.8},
      // 		{ x: new Date(2011, 0), y: 4.2}
      // 	]
      // }
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

export default GraphTest;
