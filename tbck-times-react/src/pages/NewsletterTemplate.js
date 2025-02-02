import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiNewsLetterTop } from '../components/MuiNewsLetterTop.js';
import { MuiCommentBox } from '../components/MuiCommentBox.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiSuggestedStories } from '../components/MuiSuggestedStories.js';
import { MuiLikeButton } from '../components/MuiLikeButton.js'

import "../css/Newsletter.css";

function NewsletterTemplate() {

    return (
        <div>
            <MuiNavBar/>
            <MuiCategoryBar/>
            <div className="news-container">
                <div className="newsletter-section">
                    <MuiNewsLetterTop/>
                    <MuiLikeButton/>
                    <h1>
                        
                    </h1>
                </div>
                <div className='sidebar-section'>
                    <MuiSuggestedStories/>
                    <MuiCommentBox/>
                </div>
            </div>
            <MuiFooter/>
        </div>
    );

}

export default NewsletterTemplate;