import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import React, { Component }  from 'react';
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Register from "./Register";



function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">

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
        <Route exact path="/reg" element={<Register />} />
      </Routes>
    </Container>
  );
}


export default App;
