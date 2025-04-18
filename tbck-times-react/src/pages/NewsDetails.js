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

    let url = 'https://api.tbcktimes.org/news/get/' + newsId;

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
    const params = useParams();
    const [story, setStory] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // Get the newsId from location.state, or null if not passed
    const newsIdFromState = location.state?.newsId ?? null;

    // Use this as your fallback when opening via direct link
    const [newsId, setNewsId] = useState(newsIdFromState);

    useEffect(() => {
        const fetchByTitleAndDate = async () => {
          const { title, date } = params;
      
          try {
            const res = await fetch(`https://api.tbcktimes.org/news/search?title=${title}&date=${date}`);
            const data = await res.json();
            if (data.newsId) {
              setNewsId(data.newsId);
            } else {
              console.error("No article found.");
            }
          } catch (err) {
            console.error("Failed to get story from title/date", err);
          }
        };
      
        if (!newsId) {
          fetchByTitleAndDate();
        }
      }, [newsId, params]);
      
    useEffect(() => {
        const checkAdmin = () => {
            const token = sessionStorage.getItem("jwt");
            console.log("Token on warrior page: " + token);
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
                <MuiNavBar />
                <MuiCategoryBar />
                <div style={isAdmin ? { marginTop: '-29px', } : {}}>
                    {isAdmin && < EditButton isAdmin={isAdmin} newsData={data} />}
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
                        externalLink={story.externalLink}
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
                    {story.category === "Advocacy" && <GenericNews
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

