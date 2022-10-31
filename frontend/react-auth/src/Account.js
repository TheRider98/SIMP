
import React from "react";
import { Col, Row } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import './css/login.scss';


export default function Account() {
  return (
    <Row>
      {/* Register */}
      {/* <Col xs={12} sm={12} md={6} lg={6}> */}
        {/* <Register /> */}
      {/* </Col> */}

      {/* Login */}
      <Col>
        <Login />
      </Col>
    </Row>
  );
}