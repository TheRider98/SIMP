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
            const res = axios.get('https://simplug.herokuapp.com/measurements/getB/:100')
            .then((result) => { 
            measurements = result.data.exportMeas;
            setPayload(measurements);
            }).catch(err => {
            console.log(err);
            });
        }, []);


    if (payload[1] != undefined){
        const labels = [payload[0].timestamp, 
        payload[1].timestamp, 
        payload[2].timestamp, 
        payload[3].timestamp, 
        payload[4].timestamp, 
        payload[5].timestamp,
        payload[6].timestamp,
        payload[7].timestamp,
        payload[8].timestamp,
        payload[9].timestamp,
        payload[10].timestamp,
        payload[11].timestamp,
        payload[12].timestamp,
        payload[13].timestamp,
        payload[14].timestamp];

        const data = {
            labels: labels,
            datasets: [
            {
            label: "Power (W) ",
            backgroundColor: "rgb(0, 0, 0)",
            borderColor: "rgb(255, 255, 255)",
            data: [payload[0].power, 
                    payload[1].power, 
                    payload[2].power, 
                    payload[3].power, 
                    payload[4].power, 
                    payload[5].power,
                    payload[6].power,
                    payload[7].power,
                    payload[8].power,
                    payload[9].power,
                    payload[10].power,
                    payload[11].power,
                    payload[12].power,
                    payload[13].power,
                    payload[14].power],
                },
            ],
            options: {
                scales: {
                    y: {
                        ticks: {
                        }
                    }
                }
            }
        };
    
        return (
            <div>
            <Line data={data} />
            </div>
        );
        }
    }



    return (
        PromisesPage()
    );
}