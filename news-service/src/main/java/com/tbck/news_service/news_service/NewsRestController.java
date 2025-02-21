package com.tbck.news_service.news_service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemResponse;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanResponse;

//NEED TO SET UP DATABSE CONNECTION FOR THESE ROUTES TO FUNCTION
@RestController
@RequestMapping("/news")
public class NewsRestController {

    private final DynamoDbClient dynamoDbClient;

    @Autowired
    public NewsRestController(DynamoDbClient dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }

    @GetMapping(path = "/get/{newsId}")
    @ResponseStatus(code = HttpStatus.OK)
    public News getNews(@PathVariable("newsId") UUID newsId) {

        GetItemRequest getItemRequest = GetItemRequest.builder()
            .tableName("TBCKStories")
            .key(Map.of("newsId", AttributeValue.builder().s(newsId.toString()).build()))
            .build();

        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);

        if (getItemResponse.hasItem()) {
            return News.fromMap(getItemResponse.item());
        } else {
            return null;
        }
    }

    //get all the news by the newest date
    @GetMapping(path = "/newest")
    @ResponseStatus(code = HttpStatus.OK)
    public Iterable<News> getNewestNews() {

        ScanRequest scanRequest = ScanRequest.builder()
            .tableName("TBCKStories")
            .build();

        ScanResponse response = dynamoDbClient.scan(scanRequest);

        return response.items().stream()
            .map(News::fromMap)
            .sorted(Comparator.comparing(News::getDate).reversed()) // Sort by date, newest first
            .toList();
    }

    //get all the news by the category and return in order of newest to oldest
    @GetMapping(path = "/category/{category}")
    @ResponseStatus(code = HttpStatus.OK)
    public Iterable<News> getNewsByCategory(@PathVariable("category") String category) {

        ScanRequest scanRequest = ScanRequest.builder()
            .tableName("TBCKStories")
            .build();

        ScanResponse response = dynamoDbClient.scan(scanRequest);

        return response.items().stream()
            .map(News::fromMap)
            .filter(news -> news.getCategory().equals(category))
            .sorted(Comparator.comparing(News::getDate).reversed()) // Sort by date, newest first
            .toList();
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public Iterable<News> getNews() {

        ScanRequest scanRequest = ScanRequest.builder()
            .tableName("TBCKStories")
            .build();

        ScanResponse response = dynamoDbClient.scan(scanRequest);

        return response.items().stream().map(News::fromMap).toList();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(code = HttpStatus.CREATED)
    public News createNews(@RequestBody News news) {

        try{
            news.setNewsId(UUID.randomUUID());

            for (Image image : news.getImages()) {
                image.setImageId(UUID.randomUUID());
                image.setNewsId(news.getNewsId());
            }

            for (Comment comment : news.getComments()) {
                comment.setCommentId(UUID.randomUUID());
                comment.setNewsId(news.getNewsId());
            }

            return saveNews(news);

        }catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PatchMapping(path = "/{newsId}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(code = HttpStatus.OK)
    public News updateNews(@PathVariable(required = true) UUID newsId, @RequestBody News news) {

        News existingNews = getNewsFromDB(newsId);

        if (existingNews == null) { return null; }

        if (news.getTitle() != null) {
            existingNews.setTitle(news.getTitle());
        }
        if (news.getContentOne() != null) {
            existingNews.setContentOne(news.getContentOne());
        }
        if (news.getContentTwo() != null) {
            existingNews.setContentTwo(news.getContentTwo());
        }
        if (news.getContentThree() != null) {
            existingNews.setContentThree(news.getContentThree());
        }
        if (news.getAuthor() != null) {
            existingNews.setAuthor(news.getAuthor());
        }
        if (news.getDate() != null) {
            existingNews.setDate(news.getDate());
        }
        if (news.getCategory() != null) {
            existingNews.setCategory(news.getCategory());
        }
        if (news.getImages() != null) {
            existingNews.setImages(news.getImages());
        }
        if (news.getTemplate() != null) {
            existingNews.setTemplate(news.getTemplate());
        }
        if (news.getExternalLink() != null) {
            existingNews.setExternalLink(news.getExternalLink());
        }
        
        return saveNews(existingNews);
    }
    
    @DeleteMapping(path = "/{newsId}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteNews(@PathVariable(required = true) UUID newsId) {

        DeleteItemRequest deleteItemRequest = DeleteItemRequest.builder()
                .tableName("TBCKStories")
                .key(Map.of("newsId", AttributeValue.builder().s(newsId.toString()).build()))
                .build();

        DeleteItemResponse response = dynamoDbClient.deleteItem(deleteItemRequest);

        if (!response.sdkHttpResponse().isSuccessful()) {
            throw new RuntimeException("Failed to delete item");
        }
    }

    @PatchMapping(path = "/comment/{newsId}")
    @PreAuthorize("hasRole('ADMIN' or 'GUEST')")
    @ResponseStatus(code = HttpStatus.OK)
    public News addComment(@PathVariable(required = true) UUID newsId, @RequestBody Comment comment) {

        News existingNews = getNews(newsId);

        if (existingNews == null) { return null; }

        comment.setNewsId(existingNews.getNewsId());
        comment.setCommentId(UUID.randomUUID());

        List<Comment> comments = new ArrayList<>(existingNews.getComments());
        comments.add(comment);
        existingNews.setComments(comments);

        return saveNews(existingNews);
    }

    private News getNewsFromDB(UUID newsId) {
        GetItemRequest getItemRequest = GetItemRequest.builder()
                .tableName("TBCKStories")
                .key(Map.of("newsId", AttributeValue.builder().s(newsId.toString()).build()))
                .build();

        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);

        if (!getItemResponse.hasItem()) { return null; }

        return News.fromMap(getItemResponse.item());
    }

    private News saveNews(News news) {
        Map<String, AttributeValue> item = news.toMap();

        PutItemRequest request = PutItemRequest.builder()
                .tableName("TBCKStories")
                .item(item)
                .build();

        PutItemResponse response = dynamoDbClient.putItem(request);

        if (response.sdkHttpResponse().isSuccessful()) {
            return news;
        } else {
            return null;
        }
    }
}
