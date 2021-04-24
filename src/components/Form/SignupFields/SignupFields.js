import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function SignupFields() {
    return(
        <div>
            <TextField 
                id="standard-required" 
                label="Username" 
                className="textField"
            />
            <TextField 
                id="standard-required" 
                label="Email" 
                className="textField"
            />
            <TextField
                id="standard-password-input"
                type="password"
                label="Password" 
                className="textField"
            />
            <TextField
                id="standard-password-input"
                type="password"
                label="Confirm password" 
                className="textField"
            />
        </div>
    )
}