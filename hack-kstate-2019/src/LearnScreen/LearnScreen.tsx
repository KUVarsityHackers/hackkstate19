import React, { useState, useEffect } from 'react';
import '../App.css';
import StreamSelect from './StreamSelect';
import EmptyBalance from './EmptyBalance';
import LearnStream from './LearnStream';

function LearnScreen () {
    const [streamId, setStreamId] = useState("invalid");
    const selectStream = (streamId: string) => {
        setStreamId(streamId);
    };

    const [balance, setBalance] = useState(-1);
    const [address, setAddress] = useState("invalid");

    const [sessions, setSessions] = useState([]);

    const sessionUpdate = () => {
        fetch(`/session/` + streamId + `/address/` + address, {
            credentials: 'include'
        }).then(res => res.text())
          .then(result => {
            setBalance(parseFloat(result))
        })
    };

    useEffect(() => {
        fetch(`/session`).then(res => res.json())
                            .then(result => {
                                setSessions(result);
                            });
        fetch(`/wallet`).then(res => res.text())
            .then(result => {
                setAddress(result); 
            });
        setInterval(sessionUpdate, 5000);

    }, [])

    if (streamId == "invalid") {
        return (
            <div className="Splash">
                <StreamSelect selectStream={selectStream}
                              sessions={sessions}/>
            </div>
        );
    }
    else if (balance < 0) {
        
        return (
            <div className="Splash">
                <EmptyBalance  />
            </div>
        );
    }
    else {
        return (
            <div className="Splash">
                <LearnStream />
            </div>
        );
    }
}

export default LearnScreen;