import React, { useState } from 'react';

import { IconButton, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export function MuiLikeButton() {
let initialLikes = 1;
    
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);
  
    const handleClick = () => {
      setIsLiked(!isLiked);
      setLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    
    let user = null;

<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={handleClick}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        sx={{
          transition: 'all 0.3s',
          '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.04)' },
          '&:active': { transform: 'scale(0.95)' }
        }}
      >
        {isLiked ? (
          <FavoriteIcon sx={{ color: 'error.main' }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: 'action.active' }} />
        )}
      </IconButton>
      <Typography
        variant="body1"
        sx={{
          color: isLiked ? 'error.main' : 'text.secondary',
          fontWeight: 500,
          transition: 'color 0.3s'
        }}
      >
        {likes}
      </Typography>
    </Box>
}