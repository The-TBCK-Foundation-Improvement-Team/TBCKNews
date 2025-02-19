import React, { useState, useEffect } from 'react';
import { MainNewsCard } from '../components/news-cards/MainNewsCard';
import { SlideShow } from '../components/home-page-slide-show/SlideShow';
import axios from 'axios';
import '../css/HomePage.css';

export function HomePage() {
    const [news, setNews] = useState([]);
    const [warriorOfTheMonth, setWarriorOfTheMonth] = useState([]);

    useEffect(() => {
        axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/newest')
            .then((response) => setNews(response.data));
    }, []);

    useEffect(() => {
        axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/category/WarriorOfTheMonth')
            .then((response) => setWarriorOfTheMonth(response.data));
    }, []);

    return (
        <div className='home-page'>
            <div className="latest-news">
                {news.length < 3 ? <p></p> : 
                    <SlideShow news={news} />
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