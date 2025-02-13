import React, { useState, useEffect } from 'react';
import { MainNewsCard } from '../components/news-cards/MainNewsCard';
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
                <h1 id="latest-news-header">Latest News</h1>
                {news.length < 3 ? <p></p> : 
                    <div className="latest-news-grid">
                        <MainNewsCard
                            className='news-grid-item'
                            title={news[0].title}
                            imgSrc="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"
                            imgAlt={news[0].images[0].altText}
                            author={news[0].author}
                            date={news[0].date}
                            isAdmin={true}
                        />
                        <MainNewsCard
                            className='news-grid-item'
                            title={news[1].title}
                            imgSrc="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"
                            imgAlt={news[1].images[0].altText}
                            author={news[1].author}
                            date={news[1].date}
                            isAdmin={false}
                        />
                        <MainNewsCard
                            className='news-grid-item'
                            title={news[2].title}
                            imgSrc="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"
                            imgAlt={news[2].images[0].altText}
                            author={news[2].author}
                            date={news[2].date}
                            isAdmin={true}
                        />
                    </div>
                }
            </div>
            <div className="warrior-of-the-month-hp">
                <h1 id="warrior-of-the-month-header">Warrior of the Month</h1>
                {warriorOfTheMonth.length !== 1 ? <p></p> : 
                    <MainNewsCard
                        className='warrior-of-the-month-item'
                        title={warriorOfTheMonth[0].title}
                        imgSrc="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"
                        imgAlt={warriorOfTheMonth[0].images[0].altText}
                        author={warriorOfTheMonth[0].author}
                        date={warriorOfTheMonth[0].date}
                        isAdmin={false}
                    />
                }
            </div>
        </div>
    );
}