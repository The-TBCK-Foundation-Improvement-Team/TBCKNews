import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../css/home-page-components/HomePageFooter.css';

export function HomePageFooter() {
    return (
        <div className="home-page-footer">
            <div className="home-page-footer-nav-bar">
                <Button color="inherit" component={Link} to={'/Search/News'}>News</Button>
                <Button color="inherit" component={Link} to={'/Search/Advocacy'}>Advocacy</Button>
                <Button color="inherit" component={Link} to={'/Search/WarriorOfTheMonth'}>Warrior Of The Month</Button>
                <Button color="inherit" component={Link} to={'/Search/Events'}>Events</Button>
                <Button color="inherit" component={Link} to={'/Search/Newsletter'}>Newsletter</Button>
                <Button color="inherit" component={Link} to={'/Search/Research'}>Research</Button>
                <Button color="inherit" target="_blank" component={Link} to={'https://linktr.ee/tbckfoundation'}>Connect</Button>
                <Button color="inherit" target="_blank" component={Link} to={'https://www.bonfire.com/store/the-tbck-foundation-store/'}>Shop Support Gear</Button>
            </div>
            
            <p className="home-page-footer-note">The TBCK Foundation is a registered 501(c)(3) charity organization. Please note that we provide this information for the benefit of TBCK syndrome community. We are not a medical provider or health care facility and thus can neither diagnose any disease or disorder nor endorse or recommend any specific medical treatments. Patients must rely on individualized medical advising from qualified health care professionals before seeking any information related to their particular diagnosis, cure, or treatment of a condition or disorder. The TBCK Foundation is recognized as a 501(c)3 non-profit corporation. EIN 83-3095299.</p>
            <p className="home-page-footer-note">The TBCK Foundation Privacy Policy: The trademarks, logos, and service marks displayed on this website, including the TBCK Foundation logo, are the property of The TBCK Foundation.</p>
            
            <p className="home-page-footer-copyright">© 2025 The TBCK Foundation. All Rights Reserved.</p>

        </div>
    );
}