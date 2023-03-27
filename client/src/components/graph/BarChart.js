
import React, { Component } from 'react';
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
            // reversed: true,
        },
        axisY: {
            title: "",
            includeZero: true,
            
            // labelFormatter: this.addSymbols
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
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
            );

            // addSymbols(e){
            //     var suffixes = ["", "K", "M", "B"];
            //     var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
            //     if(order > suffixes.length - 1)
            //         order = suffixes.length - 1;
            //     var suffix = suffixes[order];
            //     return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
            // }
            

        }

export default GraphTestTwo;
        