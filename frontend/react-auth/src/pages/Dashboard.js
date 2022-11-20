import React, { useState }  from 'react';
import { Form, Button, Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import '../css/dashboard.css';
import Chart from './Chart';


export default function Dashboard() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [time, setTime] = useState({});

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
  <h1_d>SIMP</h1_d>
  <h2_d>YTD: $_____ /_____ kW</h2_d><br/>

  <h3_d>Devices:</h3_d>
  <h3_d>_____________</h3_d>
  <Row>
    <Col>
      {/* submit button */}
      <div class="buttonD">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Kitchen
        </Button>
      </div>

      {/* submit button */}
      <div class="buttonD">
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
      <div class="buttonD">
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Living Room 2
        </Button>
      </div>

      {/* submit button */}
      <div class="buttonD">
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
  <div class="buttonD">
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