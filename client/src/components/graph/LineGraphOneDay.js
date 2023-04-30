import React from "react";
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