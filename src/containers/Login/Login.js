import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import ProductDescription from "../../components/ProductDescription";
import Form from "../../components/Form";
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="wrapper">
        <Grid className="grid" container spacing={2}>
            <Grid item xs={6} sm={3}></Grid>
            <Grid className="gridItem" item xs={6} sm={3}>
                <ProductDescription />
            </Grid>
            <Grid item xs={6} sm={3}>
                <Form
                    type="login" 
                    title="Login"
                    description="Don't have an account?"
                    link="Sign up"
                    handleSubmit={handleSubmit} 
                    setUserName={setUserName} 
                    setPassword={setPassword}                        
                />
            </Grid>
            <Grid item xs={6} sm={3}></Grid>
        </Grid>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}