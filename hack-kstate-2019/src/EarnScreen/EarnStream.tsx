import React, { useCallback } from 'react';
import '../App.css';
import '../Stream.css';
import Stream from 'src/Stream';
import {useState, useEffect} from 'react';
import PageEnum from 'src/PageEnum';

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
        <div className="streamContainer">
            <div className="leftPanel">
                <button className="backButton" 
                        onClick={() => props.onPageChange(PageEnum.HOME)}>
                        <h3>Leave Stream</h3>
                </button>
            </div>
            <div className="stream">
                <Stream session={props.streamId}/>
            </div>
            <div className="rightPanel">
                <h2>Session Net Gain:</h2>
                <h2>{balance}</h2>
            </div>
        </div>
    );
}

export default EarnStream;