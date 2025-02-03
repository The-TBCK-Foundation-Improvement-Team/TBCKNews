import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';

export function MuiCommentBox() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'This is a great post! Thanks for sharing.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
      timestamp: new Date('2024-02-20T10:30:00'),
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Really interesting perspective. I learned a lot from this.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      timestamp: new Date('2024-02-20T11:15:00'),
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: 'Current User',
      content: newComment,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timestamp: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <Box className="comment-section" sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </form>
      </Paper>

      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={comment.avatar} alt={comment.author} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography 
                    component="span"
                    variant="subtitle2"
                    color="Whitesmoke"
                    opacity="50%"
                  >
                    {comment.author}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="white"
                      sx={{ display: 'block', my: 1 }}
                    >
                      {comment.content}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="Whitesmoke"
                    >
                      {comment.timestamp.toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}