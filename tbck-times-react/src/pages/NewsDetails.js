import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ResearchSummary from './ResearchSummary.js';
import GenericNews from './GenericNews.js';
import NewsLetter from './NewsletterTemplate.js';
import WarriorOfTheMonthTemplate from '../components/WarriorTemplate.js';

import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from '../components/SuggestedStories.js';


const fetchStory = async (newsId) => {

    let url = 'http://localhost:8081/news/get/' + newsId;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }else{
            return await response.json();
        }
    }catch(error){
        console.log(error);
        return [];
    }
}

export default function NewsDetails() {
    const { newsId } = useParams();
    const [story, setStory] = useState([]);

    useEffect(() => {
        const fetchAndGetStory = async () => {
            let story = await fetchStory(newsId);
            console.log(story);
            setStory(story);
        };

        if (newsId !== undefined) {
            fetchAndGetStory();
        }
    }, [newsId]);

return (
    <div class name='NewsPageLayout'>
        <MuiNavBar/>
        <MuiCategoryBar/>
        <div>
        {story.category === "News" && <GenericNews/>}
        {story.category === "WarriorOfTheMonth" && <WarriorOfTheMonthTemplate/>}
        {story.category === "Newsletter" && <NewsLetter/>}
        {story.category === "Research" && <ResearchSummary/>}
        {/* {story.category === 'research'}(
            <ResearchSummary/>
        ){story.category === 'genericNews'}(
            <GenericNews/>
        ){story.category === 'newsletter'}(
            <NewsLetter/>
        ){story.category === 'warrior'}(
            <WarriorOfTheMonth/>
        ){story.category === 'News'}(
            <GenericNews/>
        ) */}
        </div>
        
        <MuiFooter/>
    </div>
    );
}

