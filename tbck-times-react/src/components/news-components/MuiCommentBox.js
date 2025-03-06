import React, { useState, useEffect } from 'react';
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


// private UUID commentId;
//     private UUID userId;
//     private UUID newsId;
//     private String content;
//     private String date;

function fetchUserData() {
  //use jwt token in session to get user data
  try{

    const storedUserJWT = sessionStorage.getItem("jwt");

    if (storedUserJWT) {
      const user = JSON.parse(atob(storedUserJWT.split('.')[1]));

      return user;
    }else{
      return null;
    }

  }catch(error){
    console.log("Error decoding JWT:", error);
    return null;
  }
}

async function fetchCommentAuthor(userId) {
  try {
    const response = await fetch(`http://tbckuserservice-env.eba-y8qwbxqf.us-east-2.elasticbeanstalk.com/user/name/${userId}`);
    //console.log("response" + response);
    if (!response.ok) throw new Error("Failed to fetch user data");
    
    const userData = await response.text();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return "Unknown User";
  }
}

async function patchComment(userId, newsId, content, date){

  try{

    const response = await fetch(`http://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/comment/${newsId}` , {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        userId: userId,
        newsId: newsId,
        content: content,
        date: date
      })

    });

    if(!response.ok){
      throw new Error('Network response was not ok');
    }else{
      return await response.json();
    }

  }catch(error){
    console.error("Error patching comment:", error);
    return null;
  }
}


export function MuiCommentBox({existingComments, newsId}) {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    //console.log("Existing comments:", existingComments);
    if (!existingComments || existingComments.length === 0) return;

    const fetchCommentAuthors = async () => {
      const updatedComments = await Promise.all(
        existingComments.map(async (comment) => {
          const author = await fetchCommentAuthor(comment.userId);
          return { ...comment, author }
        })
      );
      setComments(updatedComments);
    };

    fetchCommentAuthors();
    //console.log("fetch comment authors in use effect" + fetchCommentAuthors());
  }, [existingComments]);

  // useEffect(() => {
  //   console.log("Comments updated:", comments);
  // }, [comments]);

  useEffect(() => {
    let user = fetchUserData();
    if (user) {
      setUser(user);
    }
  }, [])

  const handleSubmit = async (e) => {
    console.log("user" + user);

    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      userId: user.userId, // Ensure userId is correctly retrieved
      newsId: newsId,
      content: newComment,
      date: new Date().toISOString(), // Convert to proper date format
    };

    try{
      setComments([...comments,{
        author: `${user.firstName} ${user.lastName}`,
        content: newComment,
        date: new Date().toISOString(),
      }]);

      setNewComment('');
      
      // Send PATCH request to API
      const updatedComment = await patchComment(
        commentData.userId,
        commentData.newsId,
        commentData.content,
        commentData.date
      );

      if (!updatedComment) {
        console.error("Failed to patch comment.");
      }

    }catch(error){
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box sx = {{ width: '100%', paddingTop: '20px'}}>
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
            disabled={!newComment.trim() || !user}
          >
            Post Comment
          </Button>
        </form>
      </Paper>
      <Box sx={{ maxHeight: 300, overflow: 'auto', paddingBottom: 8 }}>
      <List>
        {comments.map((comment, index) => (
          //console.log("comment in list" + JSON.stringify(comment)),
          <React.Fragment key={index}>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
              <Avatar>{comment.author ? comment.author.charAt(0) : '?'}</Avatar>
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
                      {new Date(comment.date).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      </Box>
    </Box>
  );
}