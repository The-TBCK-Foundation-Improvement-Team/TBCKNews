import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export function TitleNewsCard({ className, title }) {
    return (
        <Box className={className + " title-news-box"}>
            <Link to="/GenericNews" style={{ textDecoration: 'none' }}>
                <Card className="title-news-card news-card">
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            {title}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Box>
    );
}