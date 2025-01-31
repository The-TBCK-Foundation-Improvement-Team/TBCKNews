import { MuiNavBar } from './components/MuiNavBar.js';
import { MuiFooter } from './components/MuiFooter.js';
import { MuiCategoryBar } from './components/MuiCategoryBar.js';

import "./css/Newsletter.css";

function NewsletterTemplate() {

    return (
        <div>
            <MuiNavBar/>
            <MuiCategoryBar/>
                <div className='container'>
                    <div className='newsletter-section'>
                    <img className='header-image' src="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"/>
                        
                    <image className="header-image" src="https://static.vecteezy.com/system/resources/thumbnails/022/803/876/small/light-blue-brush-isolated-on-transparent-background-light-blue-watercolor-png.jpg"/>
                        
                    </div>
                    <div className='sidebar-section'>

                    </div>
                </div>
            <MuiFooter/>
        </div>
    );

}

export default NewsletterTemplate;