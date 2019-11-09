import React from 'react';
import '../App.css';

function EmptyBalance (props: any) {
    return(
        <div>
            <h1> Oops, your balance is less than $1 :( </h1>
            <h3> You need to send XRP to address {props.wallet.public_key} </h3>
            
            <button onClick={props.updateBalance}>Update balance</button>
            <h3> Don't have an XRP wallet? <a href="https://atomicwallet.io/"> Set one up here! </a></h3>
        </div>
    );
}

export default EmptyBalance;