import React, { useState }  from 'react';
import ReactDOM from 'react-dom'
import { Form, Button, Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import '../css/dashboard.css';
import Chart from './Chart';
//import {  } from '../../../routes/measurements'




export default function Dashboard() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [measArr, setMeasArr] = useState([]);
  const [kwArr, setkwArr] = useState([]);
  const [time, setTime] = useState({});

  let measurements = [];
  let a = 0, cost = 0, wattage = 0, count = 0;

  //API Call for 1Day of Measurements
  //Assign Value to "measurements" Array and add parameter 
  const res = axios.get('https://simplug.herokuapp.com/measurements/getA/:17280')
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
  <p className = "H3">_____________</p>
  <Row>
    <Col>
      {/* submit button */}
      <div className="buttonD">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Kitchen
        </Button>
      </div>

      {/* submit button */}
      <div className="buttonD">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Living Room 1
        </Button>
      </div>
    </Col>

    <Col>
      {/* submit button */}
      <div className="buttonD">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Living Room 2
        </Button>
      </div>

      {/* submit button */}
      <div className="buttonD">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Master Bedroom
        </Button>
      </div>
    </Col>
  </Row>


  {/* submit button */}
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <div className="buttonD">
    <Button
      variant="primary"
      type="submit"
      onClick={(e) => handleSubmit(e)}
    >
      Add a New SIMP (+)
    </Button>
  </div>


  <div className="charts">
    <Chart height={'600px'} width={'1000px'} filter={time} chartId={'62cb876f-ebb5-4cd8-8b90-32e9b590945c'}/>
  </div>
  </>

)}