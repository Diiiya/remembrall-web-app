import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function LoginFields(props) {
    const { setUserName, setPassword } = props;
    return(
        <div>
            <TextField 
                    id="standard-required" 
                    label="Username/Email" 
                    className="textField"
                    onChange={e => setUserName(e.target.value)}
            />
            <TextField
                id="standard-password-input"
                type="password"
                label="Password" 
                className="textField"
                onChange={e => setPassword(e.target.value)}
            />
        </div>
    )
}