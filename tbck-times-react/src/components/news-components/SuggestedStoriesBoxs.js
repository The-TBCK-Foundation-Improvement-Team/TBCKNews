import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import '../../css/SideBar.css';

function SuggestedStoriesBoxs({ imgSrc, imgAlt, newsId, title, date }) {
    return (
        <Box className="suggested-story-container">
            <Link className="suggested-story-link"
            to={`/details/${title.replace(/\s+/g, "-")}/${date.replace(/\s+/g, "-")}`} // Navigates to a detail page for the result
            state={{ newsId: newsId }} >
                <Card className="suggested-story-card">
                <CardMedia image={imgSrc} alt={imgAlt} className="suggested-story-image" />
                <CardContent className="suggested-story-content">
                    <Typography variant="body1" className="suggested-story-title">
                    {title}
                    </Typography>
                    <Typography variant="body2" className="suggested-story-subtext">
                    Recommended for you
                    </Typography>
                </CardContent>
                </Card>
            </Link>
        </Box>
    );
}

export default SuggestedStoriesBoxs;

