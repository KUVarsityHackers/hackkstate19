import React, { useEffect } from 'react';
import '../App.css';
import Stream from 'src/Stream';

function LearnStream (props: any) {
    useEffect(() => {
        setInterval(sessionUpdate, 5000)
    }, [])

    const sessionUpdate = () => {
        fetch(`/session/` + props.streamId + `/address/` + props.address, {
            credentials: 'include'
        }).then(res => res.text())
          .then(result => {console.log(result); props.updateBalance(result)})
    };

    return(
        <div>
            <Stream session={props.streamId}/>
        </div>
    );
}

export default LearnStream;