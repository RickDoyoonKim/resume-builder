package com.resumebuilder.api.model;

import lombok.Data;

@Data
public class Education {
    private String institution;
    private String degree;
    private String field;
    private String graduationDate;
    private String gpa;
    private String description;
} 