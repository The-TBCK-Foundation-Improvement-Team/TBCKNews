import SuggestedStoriesboxs from './news-components/SuggestedStoriesBoxs.js';

import "../css/SideBar.css";

export const MuiSuggestedStories = () => {
    return (
        <div >
            <h2>
                Suggested Stories:
            </h2>
            <div >
                <SuggestedStoriesboxs
                    imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"} 
                    imgAlt={"Image for news"} 
                    title={"This is an example of what it would look like when a story is posted"} 
                    newsId={1}
                    date={"2024-02-20"}
                 />
                <br />
                <SuggestedStoriesboxs 
                    imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"} 
                    imgAlt={"Image for news"} 
                    title={"This is an example of what it would look like when a story is posted"}
                    newsId={2}
                    date={"2024-02-20"}
                />
                <br />
                <SuggestedStoriesboxs
                    imgSrc={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Spider-Firework-Omiya-Japan.jpg/220px-Spider-Firework-Omiya-Japan.jpg"} 
                    imgAlt={"Image for news"} 
                    title={"This is an example of what it would look like when a story is posted"} 
                    newsId={3}
                    date={"2024-02-20"}
                />
            </div>
        </div>
    )
}

