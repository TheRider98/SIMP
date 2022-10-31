import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import React, { Component }  from 'react';
import Account from "./pages/Account";
import FreeComponent from "./pages/FreeComponent";
import AuthComponent from "./pages/AuthComponent";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";



function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<Account />} /><Route exact path="/login" element={<Account />} />
        <Route exact path="/free" element={<FreeComponent />} />
        <Route exact path="/auth" element={<AuthComponent />} />
        <Route exact path="/reg" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Container>
  );
}


export default App;
