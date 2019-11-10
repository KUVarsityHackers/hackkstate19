import React, { useEffect } from 'react';
import '../App.css';

function EmptyBalance (props: any) {
    let url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ripple:" + props.address;

    return(
        <div>
            <h1> Oops, your balance is less than $1 :( </h1>
            <h3> You need to send XRP to address {props.address} </h3>
            <img src={url}></img>
            <h3> Don't have an XRP wallet? <a href="https://atomicwallet.io/"> Set one up here! </a></h3>
        </div>
    );
}

export default EmptyBalance;