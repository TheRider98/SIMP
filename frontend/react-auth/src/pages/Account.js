
import React from "react";
import { Col, Row } from "react-bootstrap";
import Login from "./Login";
import '../css/login.css';


export default function Account() {
  return (
    <Row>
      <Col>
        <Login />
      </Col>
    </Row>
  );
}