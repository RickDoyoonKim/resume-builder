package com.resumebuilder.api.model;

import lombok.Data;

@Data
public class Project {
    private String title;
    private String description;
    private String technologies;
    private String startDate;
    private String endDate;
    private String url;
} 