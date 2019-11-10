import React, { useEffect } from 'react';
import '../App.css';
import Stream from 'src/Stream';

let sessionInterval:any;
function LearnStream (props: any) {
    return(
        <div className="stream">
            <Stream session={props.streamId}/>
        </div>
    );
}

export default LearnStream;