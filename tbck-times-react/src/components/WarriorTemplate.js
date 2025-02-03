import React from 'react';
import '../css/WarriorOfTheMonth.css';

export function WarriorTemplate() {
    return (
    <div>
        <div className="content-wrapper">
        <div className="header-section">
            <div className="header-content">
            <h1 className="main-warrior-title">
                TBCK WARRIOR OF THE MONTH
            </h1>
            <div className="name-title">SARAH</div>
            </div>
        </div>
        
        <div className="content-layout">
            {/* Profile Info */}
            <div className="profile-info">
            <div className="info-card">
                <h2 className="about-title">About Sarah</h2>
                <p className="about-text">
                Sarah is a bright and cheerful 8-year-old from Portland who radiates positivity wherever she goes. 
                She loves spending time with her family, playing with her dog Max, and creating colorful artwork. 
                Her infectious laugh and kind spirit bring joy to everyone around her. Sarah's determination and 
                resilience inspire us all, as she tackles each day with unwavering enthusiasm and a beautiful smile. 
                Despite facing challenges, she continues to show remarkable strength and brings light to those around her.
                </p>
            </div>
            </div>

            {/* Profile Image and Secondary Image */}
            <div className="image-container">
            <div className="profile-image-wrapper">
                <div className="profile-image-inner">
                <img 
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=500"
                    alt="Profile"
                    className="profile-image"
                />
                </div>
            </div>
            <div className="secondary-image-wrapper">
                <img 
                src="https://images.squarespace-cdn.com/content/v1/656e3cea0a5a33186ce5329b/c0dc2e21-f9a3-42e9-a3b3-5eb09e146fcb/Asset+36%402x.png?format=750w"
                alt="Secondary Image"
                className="secondary-image"
                />
            </div>
            </div>
        </div>

        {/* TBCK Logo */}
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