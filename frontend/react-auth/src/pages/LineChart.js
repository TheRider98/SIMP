import React, {  useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";



export default function LineChart () {

    function PromisesPage() {
        const [register, setRegister] = useState(false);
        const [obj, setOBJ] = useState([]);
        const [payload, setPayload] = useState([]);

        let measurements = [];
        let a = 0, cost = 0, wattage = 0, count = 0;

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
        count = 0;

        for(let i=14; i>0; i--) {
            labels[count] = (payload[i * 50].timestamp.substr(0,10) + " " + payload[i * 50].timestamp.substr(11,8))
            count++;
        }


        const data = {
            labels: labels,
            datasets: [
            {
            label: "Power (W) ",
            backgroundColor: "rgb(0, 0, 0)",
            borderColor: "rgb(255, 255, 255)",
            data: [
                    payload[14* 50].power, 
                    payload[13* 50].power, 
                    payload[12* 50].power, 
                    payload[11* 50].power, 
                    payload[10* 50].power, 
                    payload[9* 50].power,
                    payload[8* 50].power,
                    payload[7* 50].power,
                    payload[6* 50].power,
                    payload[5* 50].power,
                    payload[4* 50].power,
                    payload[3* 50].power,
                    payload[2* 50].power,
                    payload[1* 50].power,
                    payload[0* 50].power],
                },
            ],
            options: {
                scales: {
                    y: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
    
        return (
            <div>
            <Line data={data}/>
            </div>
        );
        }
    }



    return (
        PromisesPage()
    );
}