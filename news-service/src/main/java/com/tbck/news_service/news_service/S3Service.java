package com.tbck.news_service.news_service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    private static final String BUCKET_NAME = "tbck-news-images";
    private static final Region AWS_REGION = Region.US_EAST_2;
   
    private final S3Client s3;

    @Autowired
    public S3Service() {

        s3 = S3Client.builder()
        .region(AWS_REGION)
        .build();
        //might need this to have the aws access key and secret key
    }

    public String uploadImage(File file, String fileName){

        String s3key = "tbck-news-image/" + fileName;

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(s3key)
                .build();

        
        s3.putObject(request, RequestBody.fromFile(file));

        return "https://" + BUCKET_NAME + ".s3." + AWS_REGION.id() + ".amazonaws.com/" + s3key;

    }

    public void deleteImage(String key) {
        s3.deleteObject(builder -> builder.bucket(BUCKET_NAME).key(key));
    }

    public void deleteImages(String[] keys) {
        for (String key : keys) {
            deleteImage(key);
        }
    }

    

    


}
