import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/home-page-components/WotMSection.css';
import { SubStory } from './SubStory';

export function WotMSection() {
    const [warriorOfTheMonth, setWarriorOfTheMonth] = useState([]);
    
    useEffect(() => {
        axios.get('http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/category/WarriorOfTheMonth')
            .then((response) => setWarriorOfTheMonth(response.data));
    }, []);

    return (
        <div>
            {warriorOfTheMonth.length > 0 ? <div className="hp-wotm-section">
                <div className="hp-wotm-left-section">
                    <img src="/images/WotM.png" alt="Warrior of the Month" className="hp-wotm-title-img" />
                    <div className="hp-wotm-left-section-content">
                        <div className="hp-wotm-left-section-images">
                            <img className="hp-wotm-main-img" src={warriorOfTheMonth[0].images[0].url} alt={warriorOfTheMonth[0].images[0].altText} />
                            <div className="hp-wotm-sub-imgs">
                                <img className="hp-wotm-sub-img" src={warriorOfTheMonth[0].images[1].url} alt={warriorOfTheMonth[0].images[1].altText} />
                                <img className="hp-wotm-sub-img" src={warriorOfTheMonth[0].images[2].url} alt={warriorOfTheMonth[0].images[2].altText} />
                                <img className="hp-wotm-sub-img" src={warriorOfTheMonth[0].images[3].url} alt={warriorOfTheMonth[0].images[3].altText} />
                            </div>
                        </div>
                        <div className="hp-wotm-left-section-text">
                            <h1>{warriorOfTheMonth[0].title}</h1>
                            <p>{warriorOfTheMonth[0].contentOne}</p>
                            <p>{warriorOfTheMonth[0].contentTwo}</p>
                            <p>{warriorOfTheMonth[0].contentThree}</p>
                        </div>
                    </div>
                </div>
                <div className="hp-wotm-right-section">
                    <h2>Past Articles</h2>
                    <SubStory />
                    <SubStory />
                    <SubStory />
                    <SubStory />
                </div>
            </div>: <></>}
        </div>
    );
}