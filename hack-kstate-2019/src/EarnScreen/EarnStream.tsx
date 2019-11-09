import React, { useCallback } from 'react';
import '../App.css';
import Stream from 'src/Stream';
import {useState, useEffect} from 'react';

let origBalance = 0;
function EarnStream (props: any) {
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
            const url = `/balance/${props.address}`;
            fetch(url,{method: 'GET'}).then(resp => resp.json()).then((balance) => {
            console.log(balance)
            origBalance = balance;
        })
        setInterval(useBalance, 2000);
      }, [])


    const useBalance =  async () => {
        const url = `/sessionId/${props.streamId}/address/${props.address}`;

        fetch(url,{method: 'GET'}).then(resp => resp.json()).then((balance) => {
            console.log(balance, origBalance)
            setBalance(balance - origBalance);
        });

        }

    return(
        
        <div>
            <p>{balance}</p>
            <Stream session={props.streamId}/>
        </div>
    );
}

export default EarnStream;