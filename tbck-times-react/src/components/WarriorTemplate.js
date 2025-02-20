import React from 'react';
import '../css/WarriorOfTheMonth.css';

export function WarriorTemplate({title, contentOne, contentTwo, contentThree, images}) {
    return (
    <div>
        <div className="content-wrapper">
        <div className="header-section">
            <div className="header-content">
            <h1 className="main-title">
                {title}
            </h1>
            <div className="name-title"></div>
            </div>
        </div>
        
        <div className="content-layout">
            <div className="profile-info">
            <div className="info-card">
                <h2 className="about-title">About {title}</h2>
                <p className="about-text">
                {contentOne}
                </p>
            </div>
            </div>

            {/* Profile Image and Secondary Image */}
            <div className="image-container">
            <div className="profile-image-wrapper">
                <div className="profile-image-inner">
                <img 
                    src={images[0].url}
                    alt="Profile"
                    className="profile-image"
                />
                </div>
            </div>
            </div>
        </div>
        <div className="logo-container">
            <img 
            src="https://images.squarespace-cdn.com/content/v1/656e3cea0a5a33186ce5329b/98f95128-6810-469f-a5df-d8614ed3a1dc/TBCK+Logo_Full+Color%40300x.png"
            alt="TBCK Logo"
            className="logo"
            />
        </div>
        </div>
    </div>
    );
}

export default WarriorTemplate;