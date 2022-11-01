import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import '../css/login.css';

const cookies = new Cookies();



export default function Login() {
    // initial state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
  
    const handleSubmit = (e) => {
      // prevent the form from refreshing the whole page
      e.preventDefault();
  
      // set configurations
      const configuration = {
        method: "post",
        url: "https://simplug.herokuapp.com/login",
        data: {
          email,
          password,
        },
      };
  
      // make the API call
      axios(configuration)
        .then((result) => {
          // set the cookie
          cookies.set("TOKEN", result.data.token, {
            path: "/",
          });
          // redirect user to the auth page
          window.location.href = "/dashboard";
  
          setLogin(true);
        })
        .catch((error) => {
          error = new Error();
        });
    };
  
    return (
      <>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <h1>SIMP</h1>
            {/* email */}
            <Form.Group controlId="formBasicEmail">
              <div class="textBoxdiv">
                <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
              </div>

            </Form.Group>
    
            {/* password */}
            <Form.Group controlId="formBasicPassword">
            <div class="textBoxdiv">
                <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            </Form.Group>
    
            {/* submit button */}
            <div class="loginBtn">
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </div>

            <div class="signup">
              Don't have an account?
              <br></br>
              <a href="/reg">Register Here</a>
            </div>


        </Form>
      </>
    );
  }