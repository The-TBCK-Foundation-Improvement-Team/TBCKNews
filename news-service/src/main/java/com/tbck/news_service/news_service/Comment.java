package com.tbck.news_service.news_service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

public class Comment {

    private UUID commentId;
    private UUID userId;
    private UUID newsId;
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
    public UUID getNewsId() {
        return newsId;
    }
    public void setNewsId(UUID newsId) {
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
        itemMap.put("newsId", AttributeValue.builder().s(newsId.toString()).build());
        itemMap.put("content", AttributeValue.builder().s(content).build());
        itemMap.put("date", AttributeValue.builder().s(date).build());

        return itemMap;
    }

    public static Comment fromMap(Map<String, AttributeValue> item) {
        Comment comment = new Comment();

        comment.setCommentId(UUID.fromString(item.get("commentId").s()));
        comment.setUserId(UUID.fromString(item.get("userId").s()));
        comment.setNewsId(UUID.fromString(item.get("newsId").s()));
        comment.setContent(item.get("content").s());
        comment.setDate(item.get("date").s());

        return comment;
    }
}

    