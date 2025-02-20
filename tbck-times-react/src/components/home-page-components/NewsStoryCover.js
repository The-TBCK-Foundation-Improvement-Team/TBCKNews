import React from 'react';
import '../../css/home-page-components/NewsStoryCover.css';
import { Link } from 'react-router-dom';

export function NewsStoryCover() {
    return (
        <div className="news-story-cover">
            <Link to="/GenericNews" style={{ textDecoration: 'none', display: 'block' }}>
                <img className="news-story-cover-image" src="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg" alt="News Story Cover" />
                <h2 className="news-story-cover-title">News Story Title</h2>
                <p className="news-story-cover-blurb">Small blurb</p>
                <div className="news-story-cover-author-date">
                    <p>Author</p>
                    <p>|</p>
                    <p>Date</p>
                </div>
            </Link>
        </div>
    );
}