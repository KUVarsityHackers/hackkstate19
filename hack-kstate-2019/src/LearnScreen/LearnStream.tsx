import React, { useEffect } from 'react';
import '../App.css';
import Stream from 'src/Stream';

let sessionInterval:any;
function LearnStream (props: any) {
    useEffect(() => {
        sessionInterval = setInterval(sessionUpdate, 5000)
    }, [])

    const sessionUpdate = () => {
        fetch(`/session/` + props.streamId + `/address/` + props.address, {
            credentials: 'include'
        }).then(res => res.text())
          .then(result => {
            if(parseFloat(result) < 0) {
                clearInterval(sessionInterval)
                api.dispose();
            }
            console.log(result); 
            props.updateBalance(parseFloat(result))
        })
    };

    return(
        <div className="stream">
            <Stream session={props.streamId}/>
        </div>
    );
}

export default LearnStream;