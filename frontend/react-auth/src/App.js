import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import React, { Component }  from 'react';
import './App.css';
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";



function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>SIMP</h1>
          <h2>Smart Interior Monitoring Plug</h2>

          <section id="navigation">
            {/* <a href="/">Home</a> */}
            {/* <a href="/free">Free Component</a> */}
            {/* <a href="/auth">Auth Component</a> */}
          </section>
        </Col>
      </Row>

      <Routes>
        <Route exact path="/" element={<Account />} />
        <Route exact path="/free" element={<FreeComponent />} />
        <Route exact path="/auth" element={<AuthComponent />} />
  
      </Routes>
    </Container>
  );
}


export default App;
