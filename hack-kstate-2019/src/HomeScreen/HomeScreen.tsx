import React from 'react';
import '../App.css';
import PageEnum from '../PageEnum';

function HomeScreen (props: any) {
    return (
        <div className="Splash">
            <div className="App-Body">
                <button className="homePageButton" onClick={() => props.onPageChange(PageEnum.LEARN)}> Learn </button>
                <text id="or">or</text>
                <button className="homePageButton" onClick={() => props.onPageChange(PageEnum.EARN)}> Earn </button>               
            </div>
        </div>
    );
}

export default HomeScreen;