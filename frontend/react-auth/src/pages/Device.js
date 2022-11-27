import React, { useEffect, useState } from "react";
import { Link, redirect } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import '../css/dashboard.css';
import '../css/device.css';
import $ from "jquery";
import Chart from './Chart';


export default function Device() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [measArr, setMeasArr] = useState([]);
  const [kwArr, setkwArr] = useState([]);
  const [time, setTime] = useState({});

  let measurements = [];
  let a = 0, cost = 0, wattage = 0, count = 0;

  $(function () {
    $(".toggle").on("click", function (event) {
      event.preventDefault();
      $(this).toggleClass("active");
    });
  });


  //API Call for 1Day of Measurements
  //Assign Value to "measurements" Array and add parameter 
  const res = axios.get('https://simplug.herokuapp.com/measurements/getB/:17280')
    .then((result) => { 
      measurements = result.data.exportMeas;
      count = measurements.length - 1;
      while (count > 0) {
        //Average electricity rate in Florida of 14.51 ¢/kWh
        // Cost = Power * (NationalAverage / kWh)
        a = parseFloat(measurements[count].power);
        cost += (a / 1000) * (.1451 / 720);
        wattage += (a / 1000) / (720);
        count--;
      }
      setMeasArr(cost.toFixed(2));
      setkwArr(wattage.toFixed(3));
      console.log(cost);
    }).catch(err => {
      console.log(err);
  });

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://simplug.herokuapp.com/device",
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
    });
  });

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "https://simplug.herokuapp.com/dashboard",
      data: {
        email,
        username,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
    });

  };

  return (
    <>
    <p className = "H1">SIMP</p>
    <p className = "H2">Today: ${measArr} / {kwArr} kW</p><br></br>
    <p className = "H3">Devices:</p>
    

    {/*Toggle Switch to Turn Device On or Off*/}
    <div className="toggle" onClick={() => {
      $(".toggle").on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("active");
      });
    }}>
      <div className="toggle-label toggle-label-off">OFF</div>
      <div className="toggle-switch"></div>
      <div className="toggle-label toggle-label-on">ON</div>
    </div>

  
    <div className="charts">
      <Chart height={'600px'} width={'1000px'} filter={time} chartId={'62cb876f-ebb5-4cd8-8b90-32e9b590945c'}/>
    </div>
    </>
  );
}
