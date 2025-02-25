import React from 'react';
import { NewsStoryCover } from './NewsStoryCover';
import { SubStory } from './SubStory';
import '../../css/home-page-components/HomePageSection.css';

export function HomePageSection(props) {
    return (
        <div className='home-page-section' id={props.id}>
            <h1>Title</h1>
            <NewsStoryCover />
            <SubStory />
            <SubStory />
        </div>
    );
}