import React from 'react';
import '../App.css';
import PageEnum from '../PageEnum';
import { useState } from 'react';
import { useEffect } from 'react';

function EmptyBalance (props: any) {
    return(
        <div>
            <h1> Oops, your balance is $0 :( </h1>
            <h3> You need to send XRP to address {props.wallet.public_key} </h3>
            
            <h3> Don't have an XRP wallet? <a> Set one up here! </a></h3>
        </div>
    );
}

export default EmptyBalance;