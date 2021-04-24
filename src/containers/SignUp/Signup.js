import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import ProductDescription from "../../components/ProductDescription";
import Form from "../../components/Form";
import './Signup.css';

export default function Signup() {
  return(
    <div className="wrapper">
        <Grid className="grid" container spacing={2}>
            <Grid item xs={6} sm={3}></Grid>
            <Grid className="gridItem" item xs={6} sm={3}>
                <ProductDescription />
            </Grid>
            <Grid item xs={6} sm={3}>
                <Form
                    type="signup" 
                    title="Sign up"
                    description="Already have an account?"
                    link="Login"
                    handleSubmit="" 
                    setUserName=""
                    setPassword=""                     
                />
            </Grid>
            <Grid item xs={6} sm={3}></Grid>
        </Grid>
    </div>
  )
}

Signup.propTypes = {
}