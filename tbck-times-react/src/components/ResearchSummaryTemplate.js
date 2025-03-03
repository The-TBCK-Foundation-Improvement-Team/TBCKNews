import React from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Paper, Typography, Link, Box } from '@mui/material';
import { MuiSuggestedStories } from '../components/SuggestedStories.js';
import { MuiCommentBox } from './news-components/MuiCommentBox.js';
import '../css/ResearchSummary.css';

export function ResearchSummaryTemplate({ title, category, contentOne, contentTwo, ContentThree, link, newsId, existingComments }) {
    return (
        <div className="container">
            <div className="news-format">
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: '64rem',
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        className="main-title"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#2C6460',
                            mb: 3,
                            opacity: 0.8,
                            fontSize: '0.95rem'
                        }}
                    >
                        Category: {category}
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            lineHeight: 1.7,
                            fontSize: '1.1rem',
                        }}
                    >
                        {contentOne}
                    </Typography>

                    <Box
                        component={Link}
                        target="_blank"
                        href={link}
                        sx={{

                            alignItems: 'center',
                            gap: 1,
                            color: '#FA1882 !important',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            textDecoration: 'none',
                            '&:hover': {
                                color: '#FA1882 !important',
                                '& .arrow': {
                                    transform: 'translate(4px, -4px)'
                                }
                            }
                        }}
                    >
                        Read full article
                        <ArrowOutwardIcon className="arrow" fontSize="small" />
                    </Box>
                </Paper>
            </div>
            <div className='sidebar-layout'>
                <MuiSuggestedStories category={"Research"} currentNewsId={newsId} />
                <MuiCommentBox existingComments={existingComments} newsId={newsId} />
            </div>
        </div>
    );
}


