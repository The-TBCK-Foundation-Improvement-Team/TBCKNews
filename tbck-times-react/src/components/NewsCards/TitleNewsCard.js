import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export function TitleNewsCard({ title }) {
    return (
        <Box className="title-news-box">
            <Link to="/placeholder" style={{ textDecoration: 'none' }}>
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