import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import '../../css/NewsCards.css';
import { Link } from 'react-router-dom';

export function SecondaryNewsCard({ className, imgSrc, imgAlt, title }) {
    return (
        <Box className={className + " secondary-news-box"}>
            <Link to="/GenericNews" style={{ textDecoration: 'none' }}>
                <Card className="secondary-news-card news-card">
                    <Box display="flex" alignItems="center">
                        <CardMedia
                            component="img"
                            image={imgSrc}
                            alt={imgAlt}
                            style={{ width: '100px', height: '100px', marginRight: '10px' }} // Adjust size as needed
                        />
                        <CardContent>
                            <Typography variant="body1">
                                {title}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Link>
        </Box>
    );
}