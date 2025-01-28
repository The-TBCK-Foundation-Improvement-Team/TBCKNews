package com.tbck.news_service.news_service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

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

    public Map<String, AttributeValue> toMap() {
        Map<String, AttributeValue> itemMap = new HashMap<>();

        itemMap.put("commentId", AttributeValue.builder().s(commentId.toString()).build());
        itemMap.put("userId", AttributeValue.builder().s(userId.toString()).build());
        itemMap.put("newsId", AttributeValue.builder().s(newsId).build());
        itemMap.put("content", AttributeValue.builder().s(content).build());
        itemMap.put("date", AttributeValue.builder().s(date).build());

        return itemMap;
    }
}

    