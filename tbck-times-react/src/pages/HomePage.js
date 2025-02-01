import React, { useState, useEffect } from 'react';
import { MainNewsCard } from '../components/news-cards/MainNewsCard';
import { SecondaryNewsCard } from '../components/news-cards/SecondaryNewsCard';
import { TitleNewsCard } from '../components/news-cards/TitleNewsCard';
import axios from 'axios';
import '../css/HomePage.css';

export function HomePage() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://tbck-newsapi-env.eba-ci6mgvkp.us-east-2.elasticbeanstalk.com/news')
            .then((response) => setNews(response.data));
    }, []);

    return (
        <div className='home-page'>
            {!news.length ? <p></p> : 
                <div className='news-grid'>
                    <div className='left-column-cards'>
                        <MainNewsCard 
                            className='news-grid-item'
                            imgSrc={news[0].images[0].url} 
                            imgAlt={news[0].title} 
                            title={news[0].title} 
                            author={news[0].author} 
                            date={news[0].date} 
                        />
                        <MainNewsCard
                            className='news-grid-item'
                            imgSrc={news[1].images[0].url}
                            imgAlt={news[1].title}
                            title={news[1].title}
                            author={news[1].author}
                            date={news[1].date}
                        />
                    </div>
                    <div className='center-column-cards'>
                        <MainNewsCard
                            className='news-grid-item'
                            imgSrc={news[2].images[0].url}
                            imgAlt={news[2].title}
                            title={news[2].title}
                            author={news[2].author}
                            date={news[2].date}
                        />
                        <TitleNewsCard className='news-grid-item' title={news[3].title} />
                        <TitleNewsCard className='news-grid-item' title={news[4].title} />
                    </div>
                    <div className='right-column-cards'>
                        <SecondaryNewsCard
                            className='news-grid-item'
                            imgSrc={news[5].images[0].url}
                            imgAlt={news[5].title}
                            title={news[5].title}
                        />
                        <SecondaryNewsCard
                            className='news-grid-item'
                            imgSrc={news[6].images[0].url}
                            imgAlt={news[6].title}
                            title={news[6].title}
                        />
                        <SecondaryNewsCard
                            className='news-grid-item'
                            imgSrc={news[7].images[0].url}
                            imgAlt={news[7].title}
                            title={news[7].title}
                        />
                    </div>
                </div>
            }
        </div>
    );
}