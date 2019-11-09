import React, { useState, useEffect } from 'react';
import '../App.css';
import StreamSelect from './StreamSelect';
import EmptyBalance from './EmptyBalance';
import LearnStream from './LearnStream';

function LearnScreen () {
    const [streamId, setStreamId] = useState(0);
    const selectStream = (streamId: number) => {
        setStreamId(streamId);
    };

    const [balance, setBalance] = useState(0);
    const updateBalance = (balance: number) => {
        setBalance(balance);
    };

    let wallet = {"public_key": "no key set"};
    let sessions = [];

    useEffect(() => {
        fetch(`GetSessions`)
            .then(res => res.json())
            .then(result => {sessions = result.sessions});
        fetch(`GenerateWallet`)
            .then(res => res.json())
            .then(result => {wallet = result.wallet});
    })

    if (!streamId){
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