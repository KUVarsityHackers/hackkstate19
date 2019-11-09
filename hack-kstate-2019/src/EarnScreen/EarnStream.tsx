import React, { useCallback } from 'react';
import '../App.css';
import Stream from 'src/Stream';
import {useState, useEffect} from 'react';

function EarnStream (props: any) {
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
        const url = `/balance/${props.address}`
        fetch(url)
        .then(resp => resp.json())
        .then((balance) => {
            setBalance(balance);
        })
        setInterval(useBalance, 2000);
      }, [])


    const useBalance =  () => {
        const url = `/sessionId/${props.streamId}/address/${props.address}`;

        fetch(url)
        .then(resp => resp.json())
        .then((balance) => {
            setBalance(balance);
        })
    }
    return(
        
        <div>
            <p>{balance}</p>
            <Stream session={props.streamId}/>
        </div>
    );
}

export default EarnStream;