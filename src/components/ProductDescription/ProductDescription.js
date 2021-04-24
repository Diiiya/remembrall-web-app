import React from 'react';
import image from './Girl.png';

export default function ProductDescription() {
    return (
        <>
            <img src={image} alt="login-illustration" width="300" height="300"></img>
            <div className="productName">Remembrall</div>
            <div className="descriptionText">Juggle skillfully with all your tasks without ever letting one turn red!</div>
        </>
    )
}