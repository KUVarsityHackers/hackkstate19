import React, { useState } from 'react';
import PageEnum from './PageEnum';
import HomeScreen from './HomeScreen/HomeScreen';
import LearnScreen from './LearnScreen/LearnScreen';
import EarnScreen from './EarnScreen/EarnScreen';

function ContentArea() {
    const [pageType, setPageType] = useState(PageEnum.HOME);
    const onPageChange = (pageType: PageEnum) => {
        setPageType(pageType);
    };

    switch(pageType){
        
        case PageEnum.LEARN:
            return(
                <LearnScreen onPageChange={onPageChange}/>
            );
        case PageEnum.EARN:
            return(
                <EarnScreen onPageChange={onPageChange}/>
            );
        default:
            return(
                <HomeScreen onPageChange={onPageChange}/>
            );
    }
}

export default ContentArea;