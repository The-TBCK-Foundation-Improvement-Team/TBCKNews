import React from 'react';
import '../../css/home-page-slide-show/SlideShowCard.css';

export function SlideShowCard(props) {
    return (
        <div className="slide-show-card">
            <img src={props.imgSrc} alt={props.imgAlt} />
            <h2>{props.title + ": " + props.author}</h2>
        </div>
    );
}