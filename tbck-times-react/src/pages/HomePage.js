import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/home-page-components/HomePage.css';

import { NewsStoryCover } from '../components/home-page-components/NewsStoryCover';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiCategoryBar } from '../components/MuiCategoryBar';
import { HomePageFooter } from '../components/home-page-components/HomePageFooter';
import { WotMSection } from '../components/home-page-components/WotMSection';
import { HomePageSection } from '../components/home-page-components/HomePageSection';

export function HomePage() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('https://api.tbcktimes.org/news/category/News')
            .then((response) => setNews(response.data));
    }, []);

    return (
        <div className='home-page'>
            <MuiNavBar />
            <MuiCategoryBar />
            
            <div className="latest-news">
                <h1>Latest News</h1>

                <div className="news-stories">
                    {news.length > 0 ? news.map((newsStory, index) => {
                        if (index >= 5) {
                            return <></>
                        } else {
                            return <NewsStoryCover
                                title={newsStory.title}
                                author={newsStory.author}
                                date={newsStory.date}
                                blurb={newsStory.contentOne.split(".")[0] + "."}
                                imgSrc={newsStory.images[0].url}
                                imgAlt={newsStory.images[0].altText}
                                newsId={newsStory.newsId}
                            />
                        }
                    }) : <></>}
                </div>
            </div>
            <div className="home-page-horizontal-spacer" />
            <WotMSection />
            <div className="home-page-horizontal-spacer" />
            <div className="home-page-sections">
                <HomePageSection title="Events" />
                <HomePageSection title="Research" id="hp-middle-section" />
                <HomePageSection title="Advocacy" />
            </div>
            <div className="home-page-horizontal-spacer" />
            <HomePageFooter />
        </div>
    );
}