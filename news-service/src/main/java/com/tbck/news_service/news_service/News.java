package com.tbck.news_service.news_service;

import java.util.List;
import java.util.UUID;

public class News {

    private UUID newsId;
    private String title;
    private String content;
    private String author;
    private String date;
    private String category;
    private List<Image> image;
    private String template;

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
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
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
    public List<Image> getImage() {
        return image;
    }
    public void setImage(List<Image> image) {
        this.image = image;
    }
    

    
}
