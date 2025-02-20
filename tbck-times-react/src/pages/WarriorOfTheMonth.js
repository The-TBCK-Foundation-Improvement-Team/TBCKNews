import React from 'react';
import '../css/WarriorOfTheMonth.css';
import '../css/GenericNews.css';

import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from "../components/SuggestedStories.js";

function WarriorOfTheMonth({title, contentOne, contentTwo, contentThree, images}) {
    return (
        // <p>Warrior of the Month</p>
        <div className='container'>      
            <div className="news-layout">
                
            </div>
            <div className='sidebar-layout'>
                <MuiSuggestedStories />
            </div>
            <MuiFooter/>
        </div>
    );
}

export default WarriorOfTheMonth;