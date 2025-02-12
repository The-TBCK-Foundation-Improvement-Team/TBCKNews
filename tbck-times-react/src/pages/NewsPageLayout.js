import React from 'react';
import ResearchSummary from '../pages/ResearchSummary.js';
import GenericNews from '../pages/GenericNews.js';
import NewsLetter from '../pages/NewsletterTemplate.js';
import WarriorOfTheMonth from '../pages/WarriorOfTheMonth.js';

import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from '../components/SuggestedStories.js';

function NewsPageLayout({category}) {
return (
    <div class name='NewsPageLayout'>
        <MuiNavBar/>
        <MuiCategoryBar/>
        <div className="news-layout">
        if(category === 'research'){
            <ResearchSummary/>
        } else if(category === 'genericNews'){
            <GenericNews/>
        } else if(category === 'newsletter'){
            <NewsLetter/>
        } else if(category === 'warrior'){
            <WarriorOfTheMonth/>
        }
        </div>
        <div className='sidebar-layout'>
        <MuiLikeButton/>
            <MuiSuggestedStories/>
            if(category !== 'research'){
                <MuiCommentBox/>
            }
        </div>
        <MuiFooter/>
    </div>
    );
}