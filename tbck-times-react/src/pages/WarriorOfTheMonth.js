import React, {useState} from 'react';
import '../css/WarriorOfTheMonth.css';
import '../css/GenericNews.css';

import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiSuggestedStories } from "../components/SuggestedStories.js";
import ImageSlideShow from '../components/ImageSlideshow.js';

function WarriorOfTheMonth({title, contentOne, contentTwo, contentThree, images, existingComments, newsId, category}) {
    const contents = [contentOne, contentTwo, contentThree];
    
    const splitTitle = title.split(' '); // Split title into words
    const lastWord = splitTitle.pop(); // Get the last word
    const remainingTitle = splitTitle.join(' '); // Join the rest of the title back into a string

    return (
        <div className='warrior-layout'>      
        <div className="warrior-container">
            <div className="content-layout">
            <h1 className='warrior-title'>{remainingTitle} <span className='pink-name'>{lastWord}</span></h1>
            {contents.map((content, index) => (
                        <div key={index} className="content-item">
                            {/* Conditionally alternating the image and content side */}
                            {index % 2 === 0 ? (
                                <>
                                    {/* If it's the 1st, 2nd or 3rd content and there are enough images, display slideshow */}
                                    {index === contents.length - 1 && contents.length > 1 && (
                                        <ImageSlideShow images={images.map((image, index) => {
                                            if (index > 1) {
                                                return image;
                                            }
                                            return null;
                                        }).filter(image => image != null)} />
                                    )}
                                    {images[index].url && index !== contents.length - 1 && (
                                        <img src={images[index].url} alt={`image-${index}`} className="content-image" />
                                    )}
                                    {content && <div className="content-text content-one">{content}</div>}
                                </>
                            ) : (
                                <>
                                    {content && <div className="content-text content-two">{content}</div>}
                                    {images[index].url && index !== contents.length - 1 && (
                                        <img src={images[index].url} alt={`image-${index}`} className="content-image" />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        <div className='sidebar-layout'>
            <MuiSuggestedStories category={category} currentNewsId={newsId} />
            <MuiCommentBox existingComments={existingComments} newsId={newsId} />
        </div>
        
    </div>
    );
}

export default WarriorOfTheMonth;