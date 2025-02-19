import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from '../components/SuggestedStories.js';

import "../css/GenericNews.css";

function GenericNews({title, about, author, date, image, content}) {

    return (
        <div className="GenericNews">
                <div className="container">
                    
                    <div className="news-layout">

                    <h1 className='title'>
                        {title}
                    </h1>
                    
                        <h5>
                            By: {author} | {date}
                        </h5>
                        <img className='image-layout' src={image}/>
                        <MuiLikeButton/>
                        <p >
                            {content}
                        </p>
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