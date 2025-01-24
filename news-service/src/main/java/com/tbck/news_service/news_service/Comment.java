package com.tbck.news_service.news_service;

import java.util.UUID;

public class Comment {

    private UUID commentId;
    private UUID userId;
    private String newsId;
    private String content;
    private String date;

    
    public UUID getCommentId() {
        return commentId;
    }
    public void setCommentId(UUID commentId) {
        this.commentId = commentId;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    public String getNewsId() {
        return newsId;
    }
    public void setNewsId(String newsId) {
        this.newsId = newsId;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }


    

}

    