import React, { useState }  from 'react';
import { Form, Button } from "react-bootstrap";
import '../css/login.scss';
import axios from "axios";


export default function Register() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);


    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
    
        // set configurations
        const configuration = {
          method: "post",
          url: "https://simplug.herokuapp.com/register",
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
        <Form onSubmit={(e)=>handleSubmit(e)}>
        <h2>Register</h2>

        {/* email */}
        <div class="textBoxdiv">
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Group>
        </div>
        
        {/* username */}
        <div class="textBoxdiv">
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              type="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Form.Group>
        </div>

        {/* password */}
        <div class="textBoxdiv">
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        </div>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>

                  
        {/*display success message*/}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
        
        </Form>
        </>
    )
}