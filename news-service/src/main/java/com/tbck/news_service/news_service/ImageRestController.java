package com.tbck.news_service.news_service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
public class ImageRestController {

    private final S3Service s3Service;

    @Autowired
    public ImageRestController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @PostMapping(path = "/add")
    @PreAuthorize("hasRole('ADMIN')")
    public String addImageToS3( @RequestParam("image") MultipartFile file) {
        System.out.println("WE IN POST NEWS");

        if(file.isEmpty()) {
            return "Error: File is empty";
        }

        try {
            // Convert MultipartFile to File
            File convertedFile = convertMultiPartFileToFile(file);
            
            // Generate a unique filename or use the original filename
            String fileName = file.getOriginalFilename();
            
            // Upload the file to S3
            String imageUrl = s3Service.uploadImage(convertedFile, fileName);
            
            // Return the URL of the uploaded image
            return imageUrl;

        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file to S3";
        }

    }

    @PostMapping(path = "/add/many")
    @PreAuthorize("hasRole('ADMIN')")
    public List<String> addManyImagesToS3(@RequestParam("images") List<MultipartFile> files) {

        List<String> imageUrls = new ArrayList<>();
        
        for (MultipartFile file : files) {
            try {
                // Convert MultipartFile to File
                File convertedFile = convertMultiPartFileToFile(file);

                // Generate a unique filename or use the original filename
                String fileName = file.getOriginalFilename();

                // Upload the file to S3
                String imageUrl = s3Service.uploadImage(convertedFile, fileName);
                
                // Add the URL to the list of URLs
                imageUrls.add(imageUrl);
            } catch (IOException e) {
                e.printStackTrace();
                imageUrls.add("Error uploading file: " + file.getOriginalFilename());
            }
        }

        // Return the list of image URLs
        return imageUrls;
    }

    @DeleteMapping(path = "/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteImageFromS3() {
        
    }

    @PatchMapping(path = "/update")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateImageInS3() {

    }

    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        // Convert MultipartFile to File
        File convFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }
   

}
