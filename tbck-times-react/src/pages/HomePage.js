import React, { useState, useEffect } from 'react';
import { MainNewsCard } from '../components/news-cards/MainNewsCard';
import axios from 'axios';
import '../css/HomePage.css';

export function HomePage() {
    const [news, setNews] = useState([]);
    const [warriorOfTheMonth, setWarriorOfTheMonth] = useState([]);

    useEffect(() => {
        axios.get('http://tbck-newsapi-env.eba-ci6mgvkp.us-east-2.elasticbeanstalk.com/news')
            .then((response) => setNews(response.data));
    }, []);

    return (
        <div className='home-page'>
            <div className="latest-news">
                <h1 id="latest-news-header">Latest News</h1>
                {!news.length ? <p></p> : 
                    <div className="latest-news-grid">
                        <MainNewsCard
                            className='news-grid-item'
                            title={news[0].title}
                            imgSrc={news[0].images[0].url}
                            imgAlt={news[0].images[0].altText}
                            author={news[0].author}
                            date={news[0].date}
                        />
                        <MainNewsCard
                            className='news-grid-item'
                            title={news[1].title}
                            imgSrc={news[1].images[0].url}
                            imgAlt={news[1].images[0].altText}
                            author={news[1].author}
                            date={news[1].date}
                        />
                        <MainNewsCard
                            className='news-grid-item'
                            title={news[2].title}
                            imgSrc={news[2].images[0].url}
                            imgAlt={news[2].images[0].altText}
                            author={news[2].author}
                            date={news[2].date}
                        />
                    </div>
                }
            </div>
            <div className="warrior-of-the-month-hp">
                <h1 id="warrior-of-the-month-header">Warrior of the Month</h1>
                {!news[3] ? <p></p> : 
                    <MainNewsCard
                        className='warrior-of-the-month-item'
                        title={news[3].title}
                        imgSrc={news[3].images[0].url}
                        imgAlt={news[3].images[0].altText}
                        author={news[3].author}
                        date={news[3].date}
                    />
                }
            </div>
        </div>
    );
}