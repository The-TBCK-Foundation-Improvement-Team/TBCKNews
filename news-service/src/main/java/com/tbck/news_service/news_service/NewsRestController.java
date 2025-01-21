package com.tbck.news_service.news_service;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

//NEED TO SET UP DATABSE CONNECTION FOR THESE ROUTES TO FUNCTION
@RestController
@RequestMapping("/news")
public class NewsRestController {

    @GetMapping(path = "/{NewsId}")
    @ResponseStatus(code = HttpStatus.OK)
    public News getNews(@PathVariable("NewsId") UUID NewsId) {

         return null;
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public Iterable<News> getNews() {

        return null;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public News createNews(@RequestBody News News) {

        News.setNewsId(UUID.randomUUID());
        

        return null;
    }

    @PatchMapping(path = "/{NewsId}")
    @ResponseStatus(code = HttpStatus.OK)
    public News updateNews(@PathVariable(required = true) UUID NewsId, @RequestBody News News) {

        //get the News to update
        News existingNews = null;
    

        if (News.getTitle() != null) {
            existingNews.setTitle(News.getTitle());
        }
        if (News.getContent() != null) {
            existingNews.setContent(News.getContent());
        }
        if (News.getAuthor() != null) {
            existingNews.setAuthor(News.getAuthor());
        }
        if (News.getDate() != null) {
            existingNews.setDate(News.getDate());
        }
        if (News.getCategory() != null) {
            existingNews.setCategory(News.getCategory());
        }
        if (News.getImage() != null) {
            existingNews.setImage(News.getImage());
        }
        if (News.getTemplate() != null) {
            existingNews.setTemplate(News.getTemplate());
        }
        


        //save the existing News to the DB
        return null;
    }
    
    @DeleteMapping(path = "/{NewsId}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteNews(@PathVariable(required = true) UUID NewsId) {

        
        //delete the News from the DB
    }
    
}
