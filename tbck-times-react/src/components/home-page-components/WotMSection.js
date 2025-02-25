import React from 'react';
import '../../css/home-page-components/WotMSection.css';
import { SubStory } from './SubStory';

export function WotMSection() {

    return (
        <div className="hp-wotm-section">
            <div className="hp-wotm-left-section">
                <img src="/images/WotM.png" alt="Warrior of the Month" className="hp-wotm-title-img" />
                <div className="hp-wotm-left-section-content">
                    <div className="hp-wotm-left-section-images">
                        <img className="hp-wotm-main-img" src="https://tbck-news-images.s3.us-east-2.amazonaws.com/tbck-news-image/Annie1.png" alt="Warrior of the Month" />
                        <div className="hp-wotm-sub-imgs">
                            <img className="hp-wotm-sub-img" src="https://tbck-news-images.s3.us-east-2.amazonaws.com/tbck-news-image/Annie2.png" alt="Warrior of the Month" />
                            <img className="hp-wotm-sub-img" src="https://tbck-news-images.s3.us-east-2.amazonaws.com/tbck-news-image/Annie3.png" alt="Warrior of the Month" />
                            <img className="hp-wotm-sub-img" src="https://tbck-news-images.s3.us-east-2.amazonaws.com/tbck-news-image/Annie4.png" alt="Warrior of the Month" />
                        </div>
                    </div>
                    <div className="hp-wotm-left-section-text">
                        <h1>Name/Family</h1>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <br/>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <br/>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <br/>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                    </div>
                </div>
            </div>
            <div className="hp-wotm-right-section">
                <h2>Past Articles</h2>
                <SubStory />
                <SubStory />
                <SubStory />
                <SubStory />
            </div>
        </div>
    );
}