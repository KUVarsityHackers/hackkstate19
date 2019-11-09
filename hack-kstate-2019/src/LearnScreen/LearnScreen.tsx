import React, { useState } from 'react';
import '../App.css';
import PageEnum from '../PageEnum';
import StreamSelect from './StreamSelect';
import EmptyBalance from './EmptyBalance';
import LearnStream from './LearnStream';

function LearnScreen (props: any) {
    const [streamId, setStreamId] = useState(0);
    const selectStream = (streamId: number) => {
        setStreamId(streamId);
    };

    const [balance, setBalance] = useState(0);
    const updateBalance = (balance: number) => {
        setBalance(balance);
    };

    let wallet = {"public_key": "no key set"};

    if (!streamId){
        return (
            <div className="Splash">
                <StreamSelect selectStream={selectStream}/>
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