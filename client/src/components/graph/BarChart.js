import React from 'react';
import CanvasJSReact from '../../canvasjs.stock.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphTestTwo=(props)=> {

    CanvasJS.addColorSet("greenShades",
    [//colorSet Array
    "#FF3556",
    "#567CFF",        
    ]);
	const options = {
        animationEnabled: true,
        theme: "light",
        colorSet: "greenShades",
        exportEnabled: false,
        axisYType: "secondary",
        backgroundColor: "#ffffff20",
        title:{
            text: ""
        },
        axisX: {
            title: "",
            interval: 1
            
        },
        axisY: {
            title: "",
            includeZero: true,
            
            
        },
        data: [
            {
            type: "column",
            fontColor: "#d6d6d6",
            dataPoints: props.DMK
        },
    ]}


        return (
            <div>
                <CanvasJSChart options = {options}
                    
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
            );
            

        }

export default GraphTestTwo;
        