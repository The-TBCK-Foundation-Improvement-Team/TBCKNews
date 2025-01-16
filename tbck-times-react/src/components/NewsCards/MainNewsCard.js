import React from 'react';

export function MainNewsCard({ imgSrc, imgAlt, title, author, date }) {
    return (
        <div>
            <img src={imgSrc} alt={imgAlt} />
            <h2>{title}</h2>
            <p>{author} | {date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })}</p>
        </div>
    );
}