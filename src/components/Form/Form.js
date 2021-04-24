import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LoginFields from './LoginFields/index';
import SignupFields from './SignupFields/index';
import './Form.css';

const useStyles = makeStyles(() => ({
    primaryButton: {
        background: '#28606A',
        '&:hover': {
            background: 'rgba(40, 96, 106, 0.5)',
         },
        color: 'white',
        borderRadius: '15px',
        width: '150px',
    }
}));

export default function Form(props) {
    const { type, title, description, link, handleSubmit, setUserName, setPassword } = props;
    const classes = useStyles();

    let fields;
    let hrefLink;
    if (type === "login") {
        fields = <LoginFields setUserName={setUserName} setPassword={setPassword} />
        hrefLink = "sign-up";
    } else {
        fields = <SignupFields />
        hrefLink = "login";
    }

    return (
        <div className="formBox">
            <form onSubmit={handleSubmit}>
                <div className="titleText">{title}</div>
                <div className="descriptionText">
                    <div>{description}</div>
                    <div><a href={hrefLink} className="link">{link}</a></div>
                </div>
                {fields}      
                <div className="button">                
                    <Button variant="contained" className={classes.primaryButton} type="submit">{title}</Button>
                </div>  
            </form>
        </div>
    )    
}