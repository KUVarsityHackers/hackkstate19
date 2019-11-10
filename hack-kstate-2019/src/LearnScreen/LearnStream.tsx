import React from 'react';
import '../App.css';
import Stream from 'src/Stream';

function LearnStream (props: any) {
    return(
        <div className="stream">
            <Stream session={props.streamId}/>
        </div>
    );
}

export default LearnStream;