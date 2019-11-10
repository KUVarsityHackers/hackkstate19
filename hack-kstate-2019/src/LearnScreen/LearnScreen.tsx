import React, { useState, useEffect } from 'react';
import '../App.css';
import StreamSelect from './StreamSelect';
import EmptyBalance from './EmptyBalance';
import LearnStream from './LearnStream';

function LearnScreen () {
    const [streamId, setStreamId] = useState(-1);
    const selectStream = (streamId: number) => {
        setStreamId(streamId);
    };

    const [balance, setBalance] = useState(-1);
    const updateBalance = () => {
        fetch(`/balance/` + address, {
            credentials: 'include'
        }).then(res => res.json())
          .then(result => {setBalance(result)})
    };
    const onBalanceChange = (result: number) => {
        setBalance(result)
    }

    const [address, setAddress] = useState("");

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetch(`/session`).then(res => res.json())
                            .then(result => {
                                setSessions(result);
                            });
        fetch(`/wallet`, {
            credentials: 'include'
        }).then(res => res.text())
            .then(result => {
                setAddress(result); 
            });
    }, [])

    if (streamId < 0){
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
                <EmptyBalance  updateBalance={onBalanceChange}
                              streamId={streamId}
                              address={address}/>
            </div>
        );
    }
    else {
        return (
            <div className="Splash">
                <LearnStream  updateBalance={onBalanceChange}
                              streamId={streamId}
                              address={address}/>
            </div>
        );
    }
}

export default LearnScreen;