import React from 'react';
import '../css/WarriorOfTheMonth.css';
import '../css/GenericNews.css';

import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from '../components/SuggestedStories.js';
import { WarriorTemplate } from '../components/WarriorTemplate.js';

function WarriorOfTheMonth() {
    return (
        // <p>Warrior of the Month</p>
        <div className="GenericNews">
            <MuiNavBar/>
            <MuiCategoryBar/>
                <div className="container">
                    
                    <div className="news-layout">
                        <WarriorTemplate/>
                    </div>
                    <div className='sidebar-layout'>
                        <MuiSuggestedStories/>
                        <MuiCommentBox/>
                    </div>
                        
                </div>
            <MuiFooter/>
        </div>
    );
}

export default WarriorOfTheMonth;