package com.resumebuilder.api.model;

import lombok.Data;

@Data
public class WorkExperience {
    private String company;
    private String position;
    private String startDate;
    private String endDate;
    private boolean isCurrentJob;
    private String description;
} 