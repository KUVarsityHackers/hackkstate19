import React, { useCallback } from 'react';
import '../App.css';
import Stream from 'src/Stream';
import {useState, useEffect} from 'react';

let origBalance = 0;
function EarnStream (props: any) {
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
            const url = `/balance/${props.address}`;
            fetch(url,{method: 'GET'}).then(resp => resp.text()).then((balance) => {
            origBalance = parseFloat(balance);
        })
        setInterval(useBalance, 2000);
      }, [])


    const useBalance =  async () => {
        const url = `/session/${props.streamId}/address/${props.address}`;

        fetch(url,{method: 'GET'})
        .then(resp => resp.text())
        .then((balance) => {
            setBalance(parseFloat(balance) - origBalance);
        }); 

        }

    return(
        
        <div className="stream">
            <p>{balance}</p>
            <Stream session={props.streamId}/>
        </div>
    );
}

export default EarnStream;