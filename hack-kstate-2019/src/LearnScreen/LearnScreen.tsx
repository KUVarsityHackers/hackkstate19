import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';
import StreamSelect from './StreamSelect';
import EmptyBalance from './EmptyBalance';
import LearnStream from './LearnStream';
import { ISession } from 'src/types';

function LearnScreen () {
    const [streamId, setStreamId] = useState("invalid");
    const streamIdRef = useRef(streamId);
    streamIdRef.current = streamId;   
    const [session, setSession] = useState({});
    const selectStream = (stream: ISession) => {
        setSession(stream);
        setStreamId(stream.id ? stream.id : "invalid") };

    const [balance, setBalance] = useState(-1);
    const [address, setAddress] = useState("invalid");
    const addressRef = useRef(address);
    addressRef.current = address;

    const [sessions, setSessions] = useState([]);

    const sessionUpdate = () => {
        fetch(`/session/` + streamIdRef.current + `/address/` + addressRef.current, {
            credentials: 'include'
        }).then(res => res.text())
          .then(result => {
            setBalance(parseFloat(result))
        })
    };

    useEffect(() => {
        fetch(`/session`).then(res => res.json())
                         .then(result => setSessions(result))
                         .then( () => { fetch(`/wallet`)
                                .then(res => res.text())
                                .then(result => setAddress(result)
                            )});
        setInterval(sessionUpdate, 5000);
    }, []);

    if (streamIdRef.current == "invalid") {
        return (
            <div className="Splash">
                <StreamSelect selectStream={selectStream}
                              sessions={sessions}
                              address={address}
                              balance={balance}/>
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