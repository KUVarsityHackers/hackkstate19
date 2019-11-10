import React, { useEffect } from 'react';
import '../App.css';
import Stream from 'src/Stream';

let sessionInterval:any;
function LearnStream (props: any) {
    return(
        <div className="streamContainer">
            <div className="leftPanel">
                <button className="backButton" 
                        onClick={() => props.selectStream(-1)}>
                        <h3>Leave Stream</h3>
                </button>
            </div>
            <div className="stream">
                <Stream session={props.streamId}/>
            </div>
            <div className="rightPanel">
                <h4 style={{color:'gray'}}>Instructor Name:</h4>
                <h3> {props.session.instructor.name} </h3>
                <h4 style={{color:'gray'}}>Title:</h4>
                <h3> {props.session.title} </h3>
                <h4 style={{color:'gray'}}>Subject:</h4>
                <h3> {props.session. subject} </h3>
            </div>
        </div>
    );
}

export default LearnStream;