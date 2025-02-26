import React, { useEffect } from 'react';
import { NewsStoryCover } from './NewsStoryCover';
import { SubStory } from './SubStory';
import '../../css/home-page-components/HomePageSection.css';

export function HomePageSection({ title, id }) {

    

    return (
        <div className='home-page-section' id={id}>
            <h1>{title}</h1>
            <NewsStoryCover />
            <SubStory />
            <SubStory />
        </div>
    );
}