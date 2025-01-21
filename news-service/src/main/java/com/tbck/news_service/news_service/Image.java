package com.tbck.news_service.news_service;

import java.util.UUID;

public class Image {

    private UUID imageId;
    private UUID newsId;
    private String url;
    private String altText;
    private String caption;
    
    public UUID getImageId() {
        return imageId;
    }
    public void setImageId(UUID imageId) {
        this.imageId = imageId;
    }
    public UUID getNewsId() {
        return newsId;
    }
    public void setNewsId(UUID newsId) {
        this.newsId = newsId;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public String getAltText() {
        return altText;
    }
    public void setAltText(String altText) {
        this.altText = altText;
    }
    public String getCaption() {
        return caption;
    }
    public void setCaption(String caption) {
        this.caption = caption;
    }

   

    
    
}
