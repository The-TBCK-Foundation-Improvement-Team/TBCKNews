import React from 'react';
import '../../css/NewsCards.css';

export function SecondaryNewsCard({ imgSrc, imgAlt, title }) {
    return (
        <div className="secondary-news-card">
            <img src={imgSrc} alt={imgAlt} />
            <p>{title}</p>
        </div>
    );
}