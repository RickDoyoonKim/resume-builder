package com.resumebuilder.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Resume Builder API. Use /api/resume/pdf endpoint for PDF generation.";
    }
} 