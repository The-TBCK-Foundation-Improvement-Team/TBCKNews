import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

export function MainNewsCard({ className, imgSrc, imgAlt, title, author, date, isAdmin }) {
    return (
        <Box className={className + " main-news-box"}>
            <Link to="/GenericNews" style={{ textDecoration: 'none', display: 'block' }}>
                <Card className="news-card" style={{ backgroundColor: 'inherit', position: 'relative' }}>
                    {isAdmin && (
                        <IconButton
                            style={{ position: 'absolute', top: 8, right: 8 }}
                            aria-label="edit"
                            onClick={() => alert('edit clicked')}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
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
            </Link>
        </Box>
    );
}