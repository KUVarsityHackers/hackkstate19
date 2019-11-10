import React, { useState, useEffect } from 'react';
import '../App.css';
import StreamSelect from './StreamSelect';
import EmptyBalance from './EmptyBalance';
import LearnStream from './LearnStream';
import { ISession } from 'src/types';

function LearnScreen () {
    const [streamId, setStreamId] = useState("invalid");
    const [session, setSession] = useState({});
    const selectStream = (stream: ISession) => {
        setSession(stream);
        setStreamId(stream.id ? stream.id : "invalid");
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
                <EmptyBalance address={address}/>
            </div>
        );
    }
    else {
        return (
            <div className="Splash">
                <LearnStream  selectStream={selectStream}
                              streamId={streamId}
                              session={session}
                              address={address}/>
            </div>
        );
    }
}

export default LearnScreen;