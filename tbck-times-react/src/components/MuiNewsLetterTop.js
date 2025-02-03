import React from 'react';
import { Box, Typography, Container } from '@mui/material';

import "../css/Newsletter.css";

export const MuiNewsLetterTop = () => {
    return (
        <Box className="newsletter-container">
    <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        maxWidth: '4xl', 
        mx: 'auto', 
        width: '100%' 
        }}>
        <Typography 
            variant="h6" 
            sx={{ 
            color: '#f97316', 
            fontWeight: 'bold',
            fontFamily: 'Gill Sans, sans-serif'
            }}
        >
            The TBCK Foundation Presents:
        </Typography>
        <Typography 
            variant="h6" 
            sx={{ 
            fontWeight: 'bold',
            fontFamily: 'Gill Sans, sans-serif'
            }}
        >
            February 2025
        </Typography>
        </Box>
    </Container>
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        my: 1
    }}>
        <Typography 
        variant="h1" 
        className="main-title"
        sx={{ 
            fontSize: '6rem',
            fontWeight: 'bold',
            mb: 2
        }}
        >
        THE TBCK TIMES
        </Typography>
        <Typography 
        variant="h5"
        sx={{ 
            fontWeight: 'bold',
            fontFamily: 'Gill Sans, sans-serif',
            textAlign: 'center',
            maxWidth: '1200px',
            fontSize: '1.4rem',
            whiteSpace: 'nowrap'
        }}
        >
        a quarterly newsletter to share information, updates, & stories in the TBCK Syndrome Community
        </Typography>
    </Box>
    </Box>
    )
}