import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

import ResearchSummary from './ResearchSummary.js';
import GenericNews from './GenericNews.js';
import NewsLetter from './NewsletterTemplate.js';
import WarriorOfTheMonthTemplate from '../pages/WarriorOfTheMonth.js';
import { MuiNavBar } from '../components/MuiNavBar.js';
import { MuiFooter } from '../components/MuiFooter.js';
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiCommentBox } from '../components/news-components/MuiCommentBox.js'
import { MuiLikeButton } from '../components/news-components/MuiLikeButton.js'
import { MuiSuggestedStories } from '../components/SuggestedStories.js';
import { ResearchSummaryTemplate } from "../components/ResearchSummaryTemplate.js";
import { HomePageFooter } from '../components/home-page-components/HomePageFooter.js'
import EditButton from '../components/EditButton.js';


const fetchStory = async (newsId) => {

    let url = 'http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/get/' + newsId;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default function NewsDetails() {
    const location = useLocation();
    const { newsId } = location.state;
    const [story, setStory] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = () => {
            const token = sessionStorage.getItem("jwt");
            console.log("Token on warrior page: " +  token);
            if (!token) return false;
            const decoded = JSON.parse(atob(token.split('.')[1]));
            console.log("decoded: ", decoded);
            return decoded.role === "ROLE_ADMIN";
        };

        setIsAdmin(checkAdmin()); // Set the admin status
    }, []);

    var data = {
        newsId: story.newsId,
        title: story.title,
        contentOne: story.contentOne,
        contentTwo: story.contentTwo,
        contentThree: story.contentThree,
        author: story.author,
        date: story.date,
        category: story.category,
        images: story.images,
        template: story.template,
        externalLink: story.externalLink
    }

    useEffect(() => {
        const fetchAndGetStory = async () => {
            let story = await fetchStory(newsId);
            //.log("story" + JSON.stringify(story.comments));
            setStory(story);
        };

        if (newsId !== undefined) {
            fetchAndGetStory();
        }
    }, [newsId]);

return (
    <div className="NewsDetails-column">
    <div class name='NewsPageLayout'>
        <MuiNavBar/>
        <MuiCategoryBar/>
        <div style={isAdmin ? { marginTop: '-29px', } : {}}>
        {isAdmin && < EditButton isAdmin={isAdmin} newsData={data} /> }
        {story.category === "News" && <GenericNews
            title={story.title}
            contentOne={story.contentOne}
            contentTwo={story.contentTwo}
            contentThree={story.contentThree}
            author={story.author}
            date={story.date}
            images={story.images}
            existingComments={story.comments}
            category={story.category}
            newsId={newsId}
        />}
        {story.category === "Newsletter" && <GenericNews
            title={story.title}
            contentOne={story.contentOne}
            contentTwo={story.contentTwo}
            contentThree={story.contentThree}
            author={story.author}
            date={story.date}
            images={story.images}
            existingComments={story.comments}
            category={story.category}
            newsId={newsId}
        />}
        {story.category === "Events" && <GenericNews
            title={story.title}
            contentOne={story.contentOne}
            contentTwo={story.contentTwo}
            contentThree={story.contentThree}
            author={story.author}
            date={story.date}
            images={story.images}
            existingComments={story.comments}
            category={story.category}
            newsId={newsId}
        />}
        {story.category === "Sports" && <GenericNews
            title={story.title}
            contentOne={story.contentOne}
            contentTwo={story.contentTwo}
            contentThree={story.contentThree}
            author={story.author}
            date={story.date}
            images={story.images}
            existingComments={story.comments}
            category={story.category}
            newsId={newsId}
        />}
        {story.category === "WarriorOfTheMonth" && <WarriorOfTheMonthTemplate
            title={story.title}
            contentOne={story.contentOne}
            contentTwo={story.contentTwo}
            contentThree={story.contentThree}
            images={story.images}
            existingComments={story.comments}
            category={story.category}
            newsId={newsId}
            author={story.author}
            date={story.date}
        />}
        {/* {story.category === "Newsletter" && <NewsLetter
            title={story.title}
            contentOne={story.contentOne}
            contentTwo={story.contentTwo}
            contentThree={story.contentThree}
            author={story.author}
            date={story.date}
            images={story.images}
            existingComments={story.comments}
            category={story.category}
            newsId={newsId}
        />} */}
        {story.category === "Research" && <ResearchSummaryTemplate
            title={story.title}
            contentOne={story.contentOne}
            contentTwo={story.contentTwo}
            contentThree={story.contentThree}
            author={story.author}
            date={story.date}
            images={story.images}
            existingComments={story.comments}
            category={story.category}
            newsId={newsId}
            externalLink={story.externalLink}
        />}
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

            </div>
            <HomePageFooter />
        </div>
    );
}

