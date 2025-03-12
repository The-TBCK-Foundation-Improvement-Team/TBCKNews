import SuggestedStoriesboxs from './news-components/SuggestedStoriesBoxs.js';
import React, { useEffect, useState } from 'react';

import "../css/SideBar.css";
import { Link } from 'react-router-dom';

export const MuiSuggestedStories = ({category, currentNewsId}) => {


    //fetch suggested stories from the database when the page loads
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuggestedStories = async () => {
            try {
                setLoading(true);
                setError(null);

                // Replace with your actual API endpoint
                const response = await fetch(`https://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/category/${category}`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch stories");
                }

                let data = await response.json();
                
                // Use the first 3 non-current stories only
                data = data.map((story) => {
                    if (story.newsId === currentNewsId) {
                        return null;
                    }
                    return story;
                }).filter(story => story != null);
                setStories(data.slice(0, 3));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchSuggestedStories();
        }
    }, [category, currentNewsId]);



    return (
        <div style={{ minWidth: '100%' }}>
            <h2>Suggested Stories:</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div >
                {stories.map((story) => (
                    <Link to={`/details/${story.title.replace(/\s+/g, "-")}/${story.date.replace(/\s+/g, "-")}`} 
                    style={{ textDecoration: 'none' }}
                    key={story.newsId}
                    state={{ newsId: story.newsId }}>
                        <SuggestedStoriesboxs
                            key={story.newsId}
                            imgSrc={story.images[0] ? story.images[0].url : ""}
                            imgAlt={story.images[0] ? story.images[0].imgAlt : "News Image"}
                            title={story.title}
                            newsId={story.newsId}
                            date={story.date}
                            author={story.author}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

