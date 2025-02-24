import React from 'react';
import '../../css/home-page-components/BasicNewsStoryLink.css';
import { Link } from 'react-router-dom';

export function BasicNewsStoryLink() {
    return (
        <div className="basic-news-story-link">
            <Link to="/GenericNews" style={{ textDecoration: 'none', display: 'block' }}>
                <h2 className="basic-news-story-link-title">News Story Title</h2>
                <div className="basic-news-story-link-author-date">
                    <p>Author</p>
                    <p>|</p>
                    <p>Date</p>
                </div>
            </Link>
        </div>
    );
}