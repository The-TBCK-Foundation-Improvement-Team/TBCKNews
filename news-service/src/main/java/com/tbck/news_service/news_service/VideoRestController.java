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
@RequestMapping("/video")

public class VideoRestController {

    private final S3Service s3Service;
 @Autowired
    public VideoRestController(S3Service s3Service) {
        this.s3Service = s3Service;
    }
      @PostMapping(path = "/add")
    @PreAuthorize("hasRole('ADMIN')")
    public String addVideoToS3(@RequestParam("video") MultipartFile file) {
        if (file.isEmpty()) {
            return "Error: File is empty";
        }

        try {
            File convertedFile = convertMultiPartFileToFile(file);
            String fileName = file.getOriginalFilename();
            String videoUrl = s3Service.uploadVideo(convertedFile, fileName);
            convertedFile.delete();
            return videoUrl;

        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading video to S3";
        }
    }

    @PostMapping(path = "/add/many")
    @PreAuthorize("hasRole('ADMIN')")
    public List<String> addManyVideosToS3(@RequestParam("videos") List<MultipartFile> files) {
        List<String> videoUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                File convertedFile = convertMultiPartFileToFile(file);
                String fileName = file.getOriginalFilename();
                String videoUrl = s3Service.uploadVideo(convertedFile, fileName);
                videoUrls.add(videoUrl);
                convertedFile.delete();
            } catch (IOException e) {
                e.printStackTrace();
                videoUrls.add("Error uploading video: " + file.getOriginalFilename());
            }
        }

        return videoUrls;
    }

    @DeleteMapping(path = "/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteVideoFromS3(@RequestParam("key") String key) {
        try {
            s3Service.deleteVideo(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @DeleteMapping(path = "/delete/many")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteManyVideosFromS3(@RequestParam("keys") String[] keys) {
        for (String key : keys) {
            try {
                s3Service.deleteVideo(key);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @PatchMapping(path = "/update")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateVideoInS3(@RequestParam("key") String key, @RequestParam("video") MultipartFile file) {
        try {
            s3Service.deleteVideo(key);
            File convertedFile = convertMultiPartFileToFile(file);
            String fileName = file.getOriginalFilename();
            String videoUrl = s3Service.uploadVideo(convertedFile, fileName);
            convertedFile.delete();
            return videoUrl;

        } catch (Exception e) {
            e.printStackTrace();
            return "Error updating video";
        }
    }

    @PatchMapping(path = "/update/many")
    @PreAuthorize("hasRole('ADMIN')")
    public List<String> updateManyVideosInS3(@RequestParam("keys") String[] keys, @RequestParam("videos") List<MultipartFile> files) {
        List<String> videoUrls = new ArrayList<>();

        for (int i = 0; i < keys.length; i++) {
            try {
                s3Service.deleteVideo(keys[i]);
                File convertedFile = convertMultiPartFileToFile(files.get(i));
                String fileName = files.get(i).getOriginalFilename();
                String videoUrl = s3Service.uploadVideo(convertedFile, fileName);
                videoUrls.add(videoUrl);
                convertedFile.delete();
            } catch (Exception e) {
                e.printStackTrace();
                videoUrls.add("Error updating video: " + keys[i]);
            }
        }

        return videoUrls;
    }

    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }
}