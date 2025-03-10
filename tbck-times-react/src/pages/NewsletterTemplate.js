import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiNewsLetterTop } from '../components/MuiNewsLetterTop.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiSuggestedStories } from '../components/SuggestedStories.js';
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box } from '@mui/material';

import "../css/Newsletter.css";

function NewsletterTemplate( {category, existingComments, newsId} ) {

    return (
        <div>
            <MuiNavBar/>
            <MuiCategoryBar/>
            <div className="news-container">
            
                Read full article
                <ArrowOutwardIcon className="arrow" fontSize="small" />
                <div className="newsletter-section">
                    <MuiNewsLetterTop/>
                    <MuiLikeButton/>
                    <div className='newsletter-sidebar'>
                    <img className='image-layout' src="https://neumont-my.sharepoint.com/:i:/g/personal/jjanzig_student_neumont_edu/EcNGMYkCnjBNgVZL5cG6nnIBR9N8VhvcqdISyY_iaUMZuw?e=Hwqdy3"/>
                        <p>Subscribe to our newsletter Subscribe to our newsletter Subscribe to our newsletter</p>
                    </div>
                    <div className='newsletter-news'>
                        <p>News</p>
                    </div>
                </div>
                
                <div className='sidebar-section'>
                    <MuiSuggestedStories category={category} />
                    <MuiCommentBox existingComments={existingComments} newsId={newsId} />
                </div>
            </div>
            <MuiFooter/>
        </div>
    );

}

export default NewsletterTemplate;