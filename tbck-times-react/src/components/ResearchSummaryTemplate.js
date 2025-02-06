import React from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Paper, Typography, Link, Box } from '@mui/material';

export function ResearchSummaryTemplate({title, category, summary, link}) {
    return(
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
            {summary}
            </Typography>
            
            <Box
            component={Link}
            href={link}
            sx={{
                display: 'inline-flex',
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
        );
    }


