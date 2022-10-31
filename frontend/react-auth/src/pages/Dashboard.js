import React, { useState }  from 'react';
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import '../css/dashboard.css';


export default function Dashboard() {

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
        <h1_d>SIMP</h1_d>
    )
}