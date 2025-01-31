import { MuiNavBar } from './components/MuiNavBar.js';
import { MuiFooter } from './components/MuiFooter.js';
import { MuiCategoryBar } from './components/MuiCategoryBar.js';
import { SecondaryNewsCard } from './components/news-cards/SecondaryNewsCard.js';
import { MuiCommentBox } from './components/MuiCommentBox.js'
import {MuiLikeButton } from './components/MuiLikeButton.js'

import "./css/GenericNews.css";

function GenericNews() {

    return (
        <div className="GenericNews">
            <MuiNavBar/>
            <MuiCategoryBar/>
                <div className="content">
                    
                    <div className="news-layout">

                    <h1 className='title'>
                        Page Title:
                    </h1>
                        <h3>
                            Short description of story. Story is about whatever you wanna write it about
                        </h3>
                        <h5>
                            By: Writer Name | Jan. 22 2025 
                        </h5>
                        <img className='image-layout' src="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"/>
                        <MuiLikeButton/>
                        <p >
                        TBCK Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultricies nisi sapien, ut sollicitudin ipsum ullamcorper malesuada. Aliquam tincidunt eleifend viverra. Phasellus sagittis bibendum euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce ac lectus ut libero maximus iaculis. Sed ultricies maximus eleifend. Aenean consectetur mauris non consequat ultricies. Nunc ac magna ex. Fusce sapien libero, aliquet scelerisque ultricies in, bibendum id neque. Duis sit amet lacus nec elit venenatis placerat. Ut et ex facilisis, dignissim enim lobortis, mollis mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent malesuada a metus sit amet sagittis. Sed dapibus pharetra ligula eget efficitur.

            Ut tincidunt dolor non velit tincidunt ullamcorper. Vestibulum commodo mauris et bibendum congue. Suspendisse eget mauris vitae tellus auctor facilisis varius eget urna. Etiam faucibus luctus mattis. Sed varius felis sit amet felis convallis aliquam. Sed arcu purus, lobortis non lorem non, tincidunt porttitor metus.
            <br/>
            <br/>
            Duis in sem vel quam volutpat mattis in at elit. Ut efficitur, mauris non tempor mollis, nisl tellus ultricies est, id facilisis sem ante egestas ligula.

            Praesent tellus nunc, finibus nec consequat sed, malesuada id sapien. Curabitur lobortis, nisi in lobortis facilisis, ante odio pharetra magna, et mattis elit sapien ac nibh. Maecenas hendrerit nunc vel sapien gravida, eu vulputate lacus vehicula. Etiam risus magna, placerat nec urna at, tristique malesuada metus. Quisque aliquam egestas leo quis dapibus. Mauris a nisi ac lorem auctor venenatis. Cras pretium metus eu leo sollicitudin imperdiet. Sed laoreet posuere felis vitae ornare. Nulla semper consequat lorem, et dignissim dolor aliquam porta. In at mi leo.
            <br/>
            <br/>
            Donec non dapibus leo. Maecenas egestas varius nisi non laoreet. Vestibulum id dapibus ante. Sed non lorem commodo, commodo dolor in, pretium metus. Proin a augue vel massa semper auctor et sed lectus. Cras finibus et enim in ultrices. In non dui vehicula, faucibus dui non, bibendum erat. Sed aliquam dui vel ipsum maximus, eget vestibulum est dapibus. Maecenas aliquam tincidunt vehicula. Ut eu varius purus, a semper urna. Curabitur facilisis ex vitae nunc rutrum, vel tempor eros dictum. Donec luctus ultricies massa sed sollicitudin. Aliquam fringilla risus id libero fermentum consectetur. Nam tempor suscipit nisl, eget varius enim vehicula blandit. Vivamus ac dapibus elit, et laoreet magna. Donec rutrum urna sed tristique rutrum.

            Suspendisse tincidunt justo mollis hendrerit ornare. Nulla facilisi. Phasellus quis ipsum a tellus imperdiet bibendum. Nulla facilisi. Nulla eget mi sapien. Suspendisse orci enim, convallis non aliquam non, aliquet ut dui. Fusce ac lorem quis nibh lacinia accumsan. Nam maximus arcu velit, a tempor metus bibendum ut. Suspendisse vestibulum tortor et consequat finibus.
                                    </p>
            </div>
            <div className='sidebar-layout'>
            <div className="suggested-stories">
                <h2>
                    Suggested Stories:
                </h2>
                <div className='story-reccomend'>
                <SecondaryNewsCard   className="additional-pad"        imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"}           imgAlt={"Image for news"}           title={"This is an example of what it would look like when a story is posted"}         />
                <br/>
                <SecondaryNewsCard           imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"}           imgAlt={"Image for news"}           title={"This is an example of what it would look like when a story is posted"}         />
                <br/>
                <SecondaryNewsCard           imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"}           imgAlt={"Image for news"}           title={"This is an example of what it would look like when a story is posted"}         />
                </div>
            </div>

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
            <MuiFooter/>
        </div>
            
        </div>
      );
}

export default GenericNews;