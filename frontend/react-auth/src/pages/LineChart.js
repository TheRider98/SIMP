import React, {  useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";



export default function LineChart () {

    function PromisesPage() {

        const [payload, setPayload] = useState([]);

        let measurements = [];
        let count = 0;

        // useEffect automatically executes once the page is fully loaded
        useEffect(() => {
            const res = axios.get('https://simplug.herokuapp.com/measurements/getB/:720')
            .then((result) => { 
            measurements = result.data.exportMeas;
            setPayload(measurements);
            }).catch(err => {
            console.log(err);
            });
        }, []);


    if (payload[1] != undefined){
        const labels=[];
        const dataArr1 = [];
        const dataArr2 = [];
        const dataArr3 = [];

        
        count = 0;
        for(let i=14; i>0; i--) {
            labels[count] = (payload[i * 50].timestamp.substr(0,10) + " " + payload[i * 50].timestamp.substr(11,8))
            count++;
        }
        count = 0;
        for(let i=14; i>0; i--) {
            dataArr1[count] = payload[i * 50].power;
            count++;
        }
        count = 0;
        for(let i=14; i>0; i--) {
            dataArr2[count] = payload[i * 50].current;
            count++;
        }
        count = 0;
        for(let i=14; i>0; i--) {
            dataArr3[count] = payload[i * 50].voltage;
            count++;
        }

        const data = {
            labels: labels,
            datasets: [
            {
                label: "Power (W) ",
                backgroundColor: "rgb(0, 0, 0)",
                borderColor: "rgb(255, 103, 0)",
                data: dataArr1,
            },
            {
                label: "Current (A) ",
                backgroundColor: "rgb(0, 0, 0)",
                borderColor: "rgb(250, 237, 39)",
                data: dataArr2,
            },
            {
                label: "Voltage (V) ",
                backgroundColor: "rgb(0, 0, 0)",
                borderColor: "rgb(57, 255, 20)",
                data: dataArr3,
            }
            ]
        }
        ;
    
        return (
            <div>
                <Line data={data}
                
                options= {{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes:{
                            grid: {
                                drawBorder: true,
                                color: '#FFFFFF',
                            },
                            ticks:{
                                beginAtZero: true,
                                color: 'white',
                                fontSize: 12,
                            }
                        },
                        xAxes: {
                            grid: {
                                drawBorder: true,
                                color: '#FFFFFF',
                            },
                            ticks:{
                                beginAtZero: true,
                                color: 'white',
                                fontSize: 12,
                            }
                        },
                    }
                }}
                />
            </div>
        );
        }
    }



    return (
        PromisesPage()
    );
}