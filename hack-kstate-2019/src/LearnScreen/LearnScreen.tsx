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

    const [balance, setBalance] = useState(0);
    const updateBalance = () => {
        fetch(`CheckBalance`, {
            method: 'POST',
            body: JSON.stringify(wallet),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(res => res.json())
          .then(result => {setBalance(result.balance)})
    };

    const [wallet, setWallet] = useState({"public_key": "no key set"});

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        fetch(`GetSessions`).then(res => res.json())
                            .then(result => {setSessions(result.sessions)});
        fetch(`GenerateWallet`, {
            credentials: 'include'
        }).then(res => res.json())
          .then(result => {setWallet(result.wallet)});
    })

    if (streamId < 0){
        return (
            <div className="Splash">
                <StreamSelect selectStream={selectStream}
                              sessions={sessions}/>
            </div>
        );
    }
    else if (!balance) {
        return (
            <div className="Splash">
                <EmptyBalance updateBalance={updateBalance}
                              wallet={wallet}/>
            </div>
        );
    }
    else {
        return (
            <div className="Splash">
                <LearnStream streamId={streamId}/>
            </div>
        );
    }
}

export default LearnScreen;