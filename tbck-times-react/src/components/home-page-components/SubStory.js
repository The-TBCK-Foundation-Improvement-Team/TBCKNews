import React from 'react';
import '../../css/home-page-components/SubStory.css';
import { Link } from 'react-router-dom';

export function SubStory() {
    return (
        <div className="sub-story">
            <Link to="/GenericNews" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="sub-story-content">
                    <img className="sub-story-image" src="https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg" alt="News Story Cover" />
                    <p className="sub-story-title">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                </div>
            </Link>
        </div>
    );
}