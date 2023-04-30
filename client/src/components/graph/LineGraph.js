import React from "react";
import CanvasJSReact from "../../canvasjs.stock.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphTest = (props) => {

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
