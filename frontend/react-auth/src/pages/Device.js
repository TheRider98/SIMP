import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/dashboard.css';
import '../css/device.css';
import $ from "jquery";
import LineChart from "./LineChart";
import { Col } from "react-bootstrap";

export default function Device() {

  const [register, setRegister] = useState(false);
  const [measArr, setMeasArr] = useState([]);
  const [kwArr, setkwArr] = useState([]);
  const [nano, setNano] = useState([]);
  
  let measurements = [];
  let a = 0, cost = 0, wattage = 0, count = 0;

  //Fetch Current MicroController Status (ON/OFF)
  const headers = new Headers();
  headers.append('X-AIO-Key', '1d10fcb338944f46b55cb04d795bfba8');
  
  const init = {
    method: 'GET',
    headers
  };

  
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

          
  //API Call for 1Day of Measurements
  //Assign Value to "measurements" Array and add parameter 
  const res =axios.get('https://simplug.herokuapp.com/measurements/getB/:720')
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
  }).catch(err => {
    console.log(err);
  });

  //Toggles Relay 1 on the SIMP Device
  async function toggleSwitch1 () {
    console.log("BEFORE TOGGLE " + nano.last_value)
      if (nano.last_value === "OFF"){
        axios.get('https://maker.ifttt.com/trigger/relay1_on/with/key/b3rOHuJV01lDYh4u1l90xmZXSON1sdDFzVghuddgVrY')
          .then((result) => { 
          }).catch(err => {
            console.log(err);
          });
        console.log("Switch was turned ON")
      }
      else if (nano.last_value === "ON"){
        axios.get('https://maker.ifttt.com/trigger/relay1_off/with/key/b3rOHuJV01lDYh4u1l90xmZXSON1sdDFzVghuddgVrY')
        .then((result) => { 
        }).catch(err => {
          console.log(err);
        });
        console.log("Switch was turned OFF")
    }

    await sleep(1000);
    const handleChange = async () => {
      await fetch('https://io.adafruit.com/api/v2/TheRider98/feeds/on-off', init)
      .then((response) => {
      return response.json(); // or .text() or .blob() ...
      })
      .then((text) => {
        // text is the response body
        setNano(text);
      })
      .catch((e) => {
        // error in e.message
      });
    }
    
    await sleep(1000);
    await handleChange();

  }

  //Toggles Relay 2 on the SIMP Device
  async function toggleSwitch2 () {
    console.log("BEFORE TOGGLE " + nano.last_value)
      if (nano.last_value === "OFF"){
        axios.get('https://maker.ifttt.com/trigger/relay2_on/with/key/b3rOHuJV01lDYh4u1l90xmZXSON1sdDFzVghuddgVrY')
          .then((result) => { 
          }).catch(err => {
            console.log(err);
          });
        console.log("Switch was turned ON")
      }
      else if (nano.last_value === "ON"){
        axios.get('https://maker.ifttt.com/trigger/relay2_off/with/key/b3rOHuJV01lDYh4u1l90xmZXSON1sdDFzVghuddgVrY')
        .then((result) => { 
        }).catch(err => {
          console.log(err);
        });
        console.log("Switch was turned OFF")
    }

    await sleep(1000);
    const handleChange = async () => {
      await fetch('https://io.adafruit.com/api/v2/TheRider98/feeds/on-off2', init)
      .then((response) => {
      return response.json(); // or .text() or .blob() ...
      })
      .then((text) => {
        // text is the response body
        setNano(text);
      })
      .catch((e) => {
        // error in e.message
      });
    }
    
    await sleep(1000);
    await handleChange();

  }


  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {

    const handleChange = async () => {
      fetch('https://io.adafruit.com/api/v2/TheRider98/feeds/on-off', init)
      .then((response) => {
        return response.json(); // or .text() or .blob() ...
      })
      .then((text) => {
        // text is the response body
        setNano(text);
      })
      .catch((e) => {
        // error in e.message
      });
    }

    handleChange();

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
    
  }, [])


  return (
    <>
    <p className = "H1">SIMP</p>
    <p className = "H2">Today: ${measArr} / {kwArr} kW</p><br></br>
    <p className = "H3">Devices:</p>
    
      <Col>
          {/*Toggle Switch to Turn Device On or Off*/}
    <div className="toggle" onClick={() => {
      toggleSwitch1();
      $(".toggle").on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("active");
      });
    }}>
      <div className="toggle-label toggle-label-off">OFF</div>
      <div className="toggle-switch"></div>
      <div className="toggle-label toggle-label-on">ON</div>
    </div>
    <br />
    {/*Toggle Switch to Turn Device On or Off*/}
    <div className="toggle" onClick={() => {
      toggleSwitch2();
      $(".toggle").on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("active");
      });
    }}>
      <div className="toggle-label toggle-label-off">OFF</div>
      <div className="toggle-switch"></div>
      <div className="toggle-label toggle-label-on">ON</div>
    </div>
    </Col>
    
    <p className = "Graph">
      <LineChart></LineChart>    
    </p>

    </>
  );
}
