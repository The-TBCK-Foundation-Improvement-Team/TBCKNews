import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from '../components/SuggestedStories.js';
import NewsImageSlideshow from '../components/news-components/NewsImageSlideshow.js';

import "../css/GenericNews.css";

function GenericNews({title, about, author, date, images, contentOne, contentTwo, contentThree, existingComments, newsId, category}) {

    if (images.length > 2) {
        var newImages = images.slice(2);
    }

    return (
        <div className="GenericNews">
                <div className="container">
                    
                    <div className="news-layout">

                        <h1 className='main-title'>
                            {title}
                        </h1>
                            {about}
                            <h5>
                                By: {author} | {date} | {images.length}
                            </h5>
                            <div>
                                <div className='image-layout'>
                                    <><img className="image-border" src={images[0].url} />
                                    <p className='image-caption'>
                                    {images[0].caption}
                                    </p></>
                                </div>
                            
                                <p className='news-page-content'>
                                        <strong>
                                        {contentOne}
                                        </strong>
                                    
                                </p>
                            </div>
                            
                            <br/>
                            {contentTwo !== "No Content Two" &&
                            <>
                            <div className='second-image-layout'>
                            {images.length > 1 &&
                                <><img className="image-border" src={images[1].url} />
                                <p className='image-caption'>
                                        {images[1].caption}
                                </p></>
                            }
                            </div>
                            <p className='news-page-content'>
                                {contentTwo}
                            </p></>
                            }
                            
                            <br/>
                            {contentThree !== "No Content Two" &&

                            
                            <div>
                                <br/>
                                
                                <div >
                                <p className='news-page-content'>
                                    {contentThree}
                                </p>
                                {images.length > 2 &&
                                    <>
                                    
                                    <p className="main-title">
                                        <strong>Additional Images:</strong>
                                    </p>
                                    <NewsImageSlideshow images={newImages} />
                                    </>
                                }
                                </div>
                            
                    
                            </div>
                            } 
                        
                        </div>
            <div className='sidebar-layout'>
                <MuiSuggestedStories category={category} currentNewsId={newsId} />
                <MuiCommentBox existingComments={existingComments} newsId={newsId} />
            </div>
        </div>
    </div>
    );
}

export default GenericNews;