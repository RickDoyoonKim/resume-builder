package com.resumebuilder.api.model;

import lombok.Data;
import java.util.List;

@Data
public class Resume {
    private PersonalInfo personalInfo;
    private List<WorkExperience> workExperience;
    private List<Education> education;
    private List<Skill> skills;
    private List<Project> projects;
} 