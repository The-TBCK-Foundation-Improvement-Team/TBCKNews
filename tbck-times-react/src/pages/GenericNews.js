import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from '../components/SuggestedStories.js';

import "../css/GenericNews.css";

function GenericNews({title, about, author, date, images, contentOne, contentTwo, contentThree}) {

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
                                    <><img src={images[0].url} />
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
                        
                            {contentTwo !== "No Content Two" &&
                            <>
                            <div className='secondary-image-layout'>
                            {images.length > 0 &&
                                <><img src={images[0].url} />
                                <p className='image-caption'>
                                        {images[0].caption}
                                </p></>
                            }
                            </div>
                            <p className='news-page-content'>
                                {contentTwo}
                            </p></>
                            }
                        
                            {contentThree !== "No Content Two" &&

                            
                            <div>
                                <div className='image-layout'>
                                {images.length > 2 &&
                                    <><img src={images[0].url}/>
                                    <p className='image-caption'>
                                        {images[0].caption}
                                    </p></>
                                }
                                </div>
                            
                                <p className='news-page-content'>
                                    {contentThree}
                                </p>
                            </div>
                            } 
                        
                        </div>
            <div className='sidebar-layout'>
            <MuiSuggestedStories/>
            <MuiCommentBox/>
                {/* <div className="mt-4 bg-gray-50 rounded-lg p-4 suggested-stories comments">
                    <div className="flex flex-col items-center space-y-3">
                        <h2 className="text-gray-600">Sign in to leave a comment</h2>
                        <button
                        onClick={function(){ user = "me"}}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                        Sign In
                        </button>
                    </div>
                </div>  */}
            </div>
    </div>
    </div>
    );
}

export default GenericNews;