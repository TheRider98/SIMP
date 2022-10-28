import React from 'react';
   import {useState} from 'react';
import { Form, Button } from "react-bootstrap";


export default function Register() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [register, setRegister] = useState(false);

<Form onSubmit={(e)=>handleSubmit(e)}></Form>
{/* email */}
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        />
    </Form.Group>

{/* password */}
    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
    </Form.Group>

/***************
 * 
 * TESTING - REMOVE handleSubmit BEFORE FINAL PRODUCTION
 * 
 * ************* */
const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    alert("Submited");
}


    return (
        <>
        <h2>Login</h2>
        <Form>
            {/* email */}
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            {/* password */}
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            {/* submit button */}
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>           
        </>
    )
}
