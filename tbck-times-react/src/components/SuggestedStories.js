import { SecondaryNewsCard } from './news-cards/SecondaryNewsCard.js';

import "../css/Newsletter.css";

export const MuiSuggestedStories = () => {
    return (
        <div >
            <h2>
                Suggested Stories:
            </h2>
            <div >
                <SecondaryNewsCard
                    className="additional-pad" 
                    imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"} 
                    imgAlt={"Image for news"} title={"This is an example of what it would look like when a story is posted"} 
                 />
                <br />
                <SecondaryNewsCard 
                    imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"} 
                    imgAlt={"Image for news"} 
                    title={"This is an example of what it would look like when a story is posted"} />
                <br />
                <SecondaryNewsCard 
                    imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"} 
                    imgAlt={"Image for news"} title={"This is an example of what it would look like when a story is posted"} 
                />
            </div>
        </div>
    )
}

