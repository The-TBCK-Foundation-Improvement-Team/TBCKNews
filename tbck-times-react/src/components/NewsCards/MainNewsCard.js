import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

export function MainNewsCard({ imgSrc, imgAlt, title, author, date }) {
    return (
        <Card className="main-news-card news-card">
            <CardMedia
                component="img"
                image={imgSrc}
                alt={imgAlt}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                        {author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(date).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        })}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}