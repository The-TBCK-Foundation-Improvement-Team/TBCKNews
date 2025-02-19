package com.tbck.news_service.news_service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

public class News {

    private UUID newsId;
    private String title;
    private String contentOne;
    private String contentTwo;
    private String contentThree;
    private String author;
    private String date;
    private String category;
    private List<Image> images;
    private List<Comment> comments;
    private String template;
    private String externalLink;

    public String getContentOne() {
        return contentOne;
    }

    public void setContentOne(String contentOne) {
        this.contentOne = contentOne;
    }

    public String getContentTwo() {
        return contentTwo;
    }

    public void setContentTwo(String contentTwo) {
        this.contentTwo = contentTwo;
    }

    public String getContentThree() {
        return contentThree;
    }

    public void setContentThree(String contentThree) {
        this.contentThree = contentThree;
    }

    public String getExternalLink() {
        return externalLink;
    }
    public void setExternalLink(String externalLink) {
        this.externalLink = externalLink;
    }

    public UUID getNewsId() {
        return newsId;
    }
    public void setNewsId(UUID newsId) {
        this.newsId = newsId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getTemplate() {
        return template;
    }
    public void setTemplate(String template) {
        this.template = template;
    }
    public List<Image> getImages() {
        return images;
    }
    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Comment> getComments() {
        return comments;
    }
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    
    public Map<String, AttributeValue> toMap() {
        Map<String, AttributeValue> itemMap = new HashMap<>();

        itemMap.put("newsId", AttributeValue.builder().s(newsId.toString()).build());
        itemMap.put("title", AttributeValue.builder().s(title).build());
        itemMap.put("contentOne", AttributeValue.builder().s(contentOne).build());
        itemMap.put("contentTwo", AttributeValue.builder().s(contentTwo).build());
        itemMap.put("contentThree", AttributeValue.builder().s(contentThree).build());
        itemMap.put("author", AttributeValue.builder().s(author).build());
        itemMap.put("date", AttributeValue.builder().s(date).build());
        itemMap.put("category", AttributeValue.builder().s(category).build());
        itemMap.put("template", AttributeValue.builder().s(template).build());
        itemMap.put("externalLink", AttributeValue.builder().s(externalLink).build());
        itemMap.put("images", AttributeValue.builder().l(images.stream().map(img -> AttributeValue.builder().m(img.toMap()).build()).toList()).build());
        itemMap.put("comments", AttributeValue.builder().l(comments.stream().map(cmt -> AttributeValue.builder().m(cmt.toMap()).build()).toList()).build());

        return itemMap;
    }
    
    public static News fromMap(Map<String, AttributeValue> map) {
        News news = new News();
        news.setNewsId(UUID.fromString(map.get("newsId").s()));
        news.setTitle(map.get("title").s());
        news.setContentOne(map.get("contentOne").s() != null ? map.get("contentOne").s() : "No Content One");
        news.setContentTwo(map.get("contentTwo").s() != null ? map.get("contentTwo").s() : "No Content Two");
        news.setContentThree(map.get("contentThree").s() != null ? map.get("contentThree").s() : "No Content Two");
        news.setAuthor(map.get("author").s());
        news.setDate(map.get("date").s());
        news.setCategory(map.get("category").s());
        news.setTemplate(map.get("template").s());
        news.setExternalLink(map.get("externalLink") != null ? map.get("externalLink").s() : "No External Link");
        news.setImages(map.get("images").l().stream().map(img -> Image.fromMap(img.m())).toList());
        news.setComments(map.get("comments").l().stream().map(cmt -> Comment.fromMap(cmt.m())).toList());
        return news;
    }
}
