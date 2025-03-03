import React, { useEffect, useState } from 'react';
import '../../css/home-page-components/SubStory.css';
import { Link } from 'react-router-dom';

export function SubStory({ imgSrc, imgAlt, title, date, newsId }) {
    const [link, setLink] = useState('');

    useEffect(() => {
        if (title === undefined || date === undefined) return;
        let titleWords = title.split(" ");
        let link = "/details/";
        for (let i = 0; i < titleWords.length; i++) {
            if (i === 0) {
                link += titleWords[i];
                continue;
            }
            link += "-" + titleWords[i];
        }
        link += "/" + date;
        setLink(link);
    }, [title, date]);

    return (
        <div className="sub-story">
            <Link key={newsId} to={link} state={{ newsId: newsId }} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="sub-story-content">
                    <img 
                        className="sub-story-image" 
                        src={imgSrc ?? "https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"} 
                        alt={imgAlt ?? "News Story Cover"}
                    />
                    <h3 className="sub-story-title">{title ?? ""}</h3>
                </div>
            </Link>
        </div>
    );
}