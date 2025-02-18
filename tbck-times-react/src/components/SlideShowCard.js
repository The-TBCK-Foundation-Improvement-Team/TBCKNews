import React from 'react';
import '../css/SlideShowCard.css';

export function SlideShowCard(props) {
    return (
        <div className="slide-show-card">
            <img src={props.imgSrc} alt={props.imgAlt} />
            <h2>{props.title}</h2>
            <p>{props.author}</p>
        </div>
    );
}