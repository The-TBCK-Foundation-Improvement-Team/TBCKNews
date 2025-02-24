import React from 'react';
// import axios from 'axios';
import '../css/home-page-components/HomePage.css';

import { NewsStoryCover } from '../components/home-page-components/NewsStoryCover';
import { BasicNewsStoryLink } from '../components/home-page-components/BasicNewsStoryLink';
import { SubStory } from '../components/home-page-components/SubStory';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiCategoryBar } from '../components/MuiCategoryBar';
import { HomePageFooter } from '../components/home-page-components/HomePageFooter';

export function HomePage() {
    // const [news, setNews] = useState([]);
    // const [warriorOfTheMonth, setWarriorOfTheMonth] = useState([]);

    // useEffect(() => {
    //     axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/newest')
    //         .then((response) => setNews(response.data));
    // }, []);

    // useEffect(() => {
    //     axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/category/WarriorOfTheMonth')
    //         .then((response) => setWarriorOfTheMonth(response.data));
    // }, []);

    return (
        <div className='home-page'>
            <MuiNavBar />
            <MuiCategoryBar />
            
            <div className="latest-news">
                <h1>Latest News</h1>

                <div className="news-stories">
                    <NewsStoryCover />
                    <NewsStoryCover />
                    <NewsStoryCover />
                    <NewsStoryCover />
                    <NewsStoryCover />
                </div>
            </div>
        </div>
    );
}