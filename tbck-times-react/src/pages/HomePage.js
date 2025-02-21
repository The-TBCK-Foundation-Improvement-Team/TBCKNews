import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/home-page-components/HomePage.css';

import { NewsStoryCover } from '../components/home-page-components/NewsStoryCover';
import { BasicNewsStoryLink } from '../components/home-page-components/BasicNewsStoryLink';
import { SubStory } from '../components/home-page-components/SubStory';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiCategoryBar } from '../components/MuiCategoryBar';
import { HomePageFooter } from '../components/home-page-components/HomePageFooter';

export function HomePage() {
    const [news, setNews] = useState([]);
    const [warriorOfTheMonth, setWarriorOfTheMonth] = useState([]);

    // useEffect(() => {
    //     axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/newest')
    //         .then((response) => setNews(response.data));
    // }, []);

    // useEffect(() => {
    //     axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/category/WarriorOfTheMonth')
    //         .then((response) => setWarriorOfTheMonth(response.data));
    // }, []);

    return (
        <div className='home-page'>
            <MuiNavBar />
            <MuiCategoryBar />
            
            <div className="latest-news">

                <div className="home-page-horizontal-spacer" />

                <div className="home-page-news-stories-section-one">

                    <div className='home-page-left-row'>
                        <div className="home-page-left-news-column">
                            <NewsStoryCover />
                            <BasicNewsStoryLink />
                            <BasicNewsStoryLink />
                        </div>
                        <div className="home-page-vertical-spacer" />
                    </div>

                    <div className="home-page-vertical-spacer" />

                    <div className="home-page-middle-news-column">
                        <NewsStoryCover />
                        <BasicNewsStoryLink />
                        <BasicNewsStoryLink />
                    </div>

                    <div className="home-page-vertical-spacer" />

                    <div className="home-page-right-row">
                        <div className="home-page-vertical-spacer" />
                        <div className="home-page-right-news-column">
                            <SubStory />
                            <SubStory />
                            <SubStory />
                            <SubStory />
                            <SubStory />
                        </div>
                    </div>

                </div>

                <div className="home-page-horizontal-spacer" /><div className="home-page-horizontal-spacer" /><div className="home-page-horizontal-spacer" />

                <div className="home-page-news-stories-section-two">

                    <div className='home-page-left-row'>
                        <div className="home-page-left-news-column">
                            <NewsStoryCover />
                            <SubStory />
                            <NewsStoryCover />
                        </div>
                        <div className="home-page-vertical-spacer" />
                    </div>

                    <div className="home-page-vertical-spacer" />

                    <div className="home-page-middle-news-column">
                        <div className="home-page-horizontal-spacer" />
                        <div className="home-page-horizontal-spacer" />
                        <NewsStoryCover />
                        <BasicNewsStoryLink />
                        <BasicNewsStoryLink />
                        <BasicNewsStoryLink />
                        <BasicNewsStoryLink />
                    </div>

                    <div className="home-page-vertical-spacer" />

                    <div className="home-page-right-row">
                        <div className="home-page-vertical-spacer" />
                        <div className="home-page-right-news-column">
                            <div className="home-page-horizontal-spacer" />
                            <div className="home-page-horizontal-spacer" />
                            <div className="home-page-horizontal-spacer" />
                            <SubStory />
                            <NewsStoryCover />
                            <SubStory />
                            <SubStory />
                        </div>
                    </div>

                </div>

                {news.length < 3 ? <p className="home-page-placeholder"></p> : 
                    <div></div>
                }

            </div>

            <div className="home-page-horizontal-spacer" />

            <HomePageFooter />
            {/* <div className="warrior-of-the-month-hp">
                <h1 id="warrior-of-the-month-header">Warrior of the Month</h1>
                <div className="home-page-wotm-body">
                    {warriorOfTheMonth.length !== 1 ? <p></p> : 
                        <div>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg" alt={warriorOfTheMonth[0].images[0].altText} />
                            <h2>{warriorOfTheMonth[0].title}</h2>
                            <p>{warriorOfTheMonth[0].content}</p>
                        </div>
                    }
                </div>
            </div> */}
        </div>
    );
}