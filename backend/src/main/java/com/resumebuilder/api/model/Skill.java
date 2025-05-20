package com.resumebuilder.api.model;

import lombok.Data;

@Data
public class Skill {
    private String name;
    private int level; // 1-5 scale
} 