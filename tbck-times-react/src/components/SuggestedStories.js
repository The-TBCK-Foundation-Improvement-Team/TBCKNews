import SuggestedStoriesboxs from './news-components/SuggestedStoriesBoxs.js';
import React, { useEffect, useState } from 'react';

import "../css/SideBar.css";
import { Link } from 'react-router-dom';

export const MuiSuggestedStories = ({category}) => {


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
                const response = await fetch(`http://localhost:8081/news/category/${category}`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch stories");
                }

                const data = await response.json();
                
                // Use the first 3 stories only
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
    }, [category]);



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
                            imgSrc={story.images[0].url}
                            imgAlt={story.imgAlt || "News Image"}
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

