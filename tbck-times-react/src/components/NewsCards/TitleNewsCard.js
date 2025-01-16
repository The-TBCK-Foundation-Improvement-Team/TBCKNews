import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export function TitleNewsCard({ title }) {
    return (
        <Card className="title-news-card news-card">
            <CardContent>
                <Typography variant="h5" component="h3">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}