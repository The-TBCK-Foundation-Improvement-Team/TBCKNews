import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/home-page-components/HomePage.css';
import { NewsStoryCover } from '../components/home-page-components/NewsStoryCover';

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
            <div className="latest-news">
                <h1 id="latest-news-header">Latest News</h1>
                <NewsStoryCover />
                {news.length < 3 ? <p className="home-page-placeholder"></p> : 
                    <div></div>
                }
            </div>
            <div className="home-page-vertical-white-space"></div>
            <div className="warrior-of-the-month-hp">
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
            </div>
        </div>
    );
}