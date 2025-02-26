import React, { useEffect, useState } from 'react';
import '../../css/home-page-components/NewsStoryCover.css';
import { Link } from 'react-router-dom';

export function NewsStoryCover({ title, author, date, blurb, imgSrc, imgAlt, newsId }) {
    const [link, setLink] = useState('');

    useEffect(() => {
        if (title === undefined || date === undefined) return;
        let titleWords = title.split(" ");
        let link = "/details/";
        for (let i = 0; i < titleWords.length; i++) {
            if (i == 0) {
                link += titleWords[i];
                continue;
            }
            link += "-" + titleWords[i];
        }
        link += "/" + date;
        setLink(link);
    }, [])

    return (
        <div className="news-story-cover">
            <Link key={newsId} to={link} state={{ newsId: newsId }} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="news-story-cover-image-container">
                    <img className="news-story-cover-image" src={imgSrc} alt={imgAlt} />
                    <p className="news-story-cover-blurb">{blurb}</p>
                </div>
                <div className="news-story-cover-content">
                    <h2 className="news-story-cover-title">{title}</h2>
                    <div className="news-story-cover-author-date">
                        <p>{author}</p>
                        <p>|</p>
                        <p>{date}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}