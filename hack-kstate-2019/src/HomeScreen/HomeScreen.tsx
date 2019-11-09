import React from 'react';
import '../App.css';
import PageEnum from '../PageEnum';
import homePageButton from '../Style/buttonStyle';

function HomeScreen (props: any) {
    return (
        <div className="Splash">

            <header className="App-header">

                <p>Name</p>
            </header>
            <body className="App-Body">
                <button style={homePageButton} onClick={() => props.onPageChange(PageEnum.LEARN)}> Learn </button>
                <button style={homePageButton} onClick={() => props.onPageChange(PageEnum.EARN)}> Earn </button>               
            </body>

        </div>
    );
}

export default HomeScreen;