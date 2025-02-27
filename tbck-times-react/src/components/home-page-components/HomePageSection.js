import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NewsStoryCover } from './NewsStoryCover';
import { SubStory } from './SubStory';
import '../../css/home-page-components/HomePageSection.css';

export function HomePageSection({ title, id }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/category/'+ title)
            .then((response) => setNews(response.data));
    }, [title]);

    return (
        <>
            {news.length > 0 ? <div className='home-page-section' id={id}>
                <h1>{title}</h1>
                <NewsStoryCover
                    title={news[0].title ?? ""}
                    author={news[0].author ?? ""}
                    date={news[0].date ?? ""}
                    blurb={news[0].contentOne.split(".")[0] + "." ?? ""}
                    imgSrc={news[0].images[0] ? news[0].images[0].url : "https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"}
                    imgAlt={news[0].images[0] ? news[0].images[0].altText : ""}
                    newsId={news[0].newsId ?? ""}
                />
                {news[1] ? 
                <SubStory 
                    title={news[1].title}
                    date={news[1].date}
                    imgSrc={news[1].images[0] ? news[0].images[0].url : "https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"}
                    imgAlt={news[1].images[0] ? news[1].images[0].altText : ""}
                    newsId={news[1].newsId ?? ""}
                /> : <></>}
                {news[2] ? 
                <SubStory 
                    title={news[2].title}
                    date={news[2].date}
                    imgSrc={news[2].images[0] ? news[0].images[0].url : "https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"}
                    imgAlt={news[2].images[0] ? news[2].images[0].altText : ""}
                    newsId={news[2].newsId ?? ""}
                /> : <></>}
            </div> : <></>}
        </>
    );
}