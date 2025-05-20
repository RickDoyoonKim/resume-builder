package com.resumebuilder.api.service;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Text;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.resumebuilder.api.model.*;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfGenerationService {

    private static final DeviceRgb HEADER_BACKGROUND = new DeviceRgb(52, 152, 219);
    private static final DeviceRgb SECTION_TITLE_COLOR = new DeviceRgb(41, 128, 185);

    public byte[] generateResumePdf(Resume resume) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        // Setup fonts
        PdfFont fontRegular = PdfFontFactory.createFont();
        PdfFont fontBold = PdfFontFactory.createFont();

        // Header information (name, job title)
        createHeader(document, resume.getPersonalInfo(), fontBold, fontRegular);
        
        // Contact information
        createContactInfo(document, resume.getPersonalInfo(), fontRegular);
        
        // Summary information
        if (resume.getPersonalInfo().getSummary() != null && !resume.getPersonalInfo().getSummary().isEmpty()) {
            createSection(document, "Profile Summary", fontBold);
            document.add(new Paragraph(resume.getPersonalInfo().getSummary())
                    .setFont(fontRegular)
                    .setMarginBottom(15));
        }
        
        // Work experience
        if (resume.getWorkExperience() != null && !resume.getWorkExperience().isEmpty()) {
            createSection(document, "Work Experience", fontBold);
            createWorkExperience(document, resume.getWorkExperience(), fontBold, fontRegular);
        }
        
        // Education
        if (resume.getEducation() != null && !resume.getEducation().isEmpty()) {
            createSection(document, "Education", fontBold);
            createEducation(document, resume.getEducation(), fontBold, fontRegular);
        }
        
        // Technical skills
        if (resume.getSkills() != null && !resume.getSkills().isEmpty()) {
            createSection(document, "Skills", fontBold);
            createSkills(document, resume.getSkills(), fontBold, fontRegular);
        }
        
        // Projects
        if (resume.getProjects() != null && !resume.getProjects().isEmpty()) {
            createSection(document, "Projects", fontBold);
            createProjects(document, resume.getProjects(), fontBold, fontRegular);
        }

        document.close();
        return outputStream.toByteArray();
    }

    private void createHeader(Document document, PersonalInfo personalInfo, PdfFont fontBold, PdfFont fontRegular) {
        Paragraph name = new Paragraph(personalInfo.getFullName())
                .setFont(fontBold)
                .setFontSize(20)
                .setTextAlignment(TextAlignment.CENTER);
        
        Paragraph jobTitle = new Paragraph(personalInfo.getJobTitle())
                .setFont(fontRegular)
                .setFontSize(14)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(15);
        
        document.add(name);
        document.add(jobTitle);
    }

    private void createContactInfo(Document document, PersonalInfo personalInfo, PdfFont fontRegular) {
        Table table = new Table(3)
                .setWidth(UnitValue.createPercentValue(100))
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(15);
        
        if (personalInfo.getEmail() != null && !personalInfo.getEmail().isEmpty()) {
            Cell cell = new Cell().add(new Paragraph("Email: " + personalInfo.getEmail()))
                    .setBorder(null)
                    .setFont(fontRegular);
            table.addCell(cell);
        }
        
        if (personalInfo.getPhone() != null && !personalInfo.getPhone().isEmpty()) {
            Cell cell = new Cell().add(new Paragraph("Phone: " + personalInfo.getPhone()))
                    .setBorder(null)
                    .setFont(fontRegular);
            table.addCell(cell);
        }
        
        if (personalInfo.getAddress() != null && !personalInfo.getAddress().isEmpty()) {
            Cell cell = new Cell().add(new Paragraph("Address: " + personalInfo.getAddress()))
                    .setBorder(null)
                    .setFont(fontRegular);
            table.addCell(cell);
        }
        
        document.add(table);
    }

    private void createSection(Document document, String title, PdfFont fontBold) {
        Paragraph sectionTitle = new Paragraph(title)
                .setFont(fontBold)
                .setFontSize(14)
                .setFontColor(SECTION_TITLE_COLOR)
                .setBorderBottom(new SolidBorder(1))
                .setMarginBottom(10);
        
        document.add(sectionTitle);
    }

    private void createWorkExperience(Document document, List<WorkExperience> experiences, 
                                     PdfFont fontBold, PdfFont fontRegular) {
        for (WorkExperience exp : experiences) {
            // Company name and employment period
            Paragraph company = new Paragraph(exp.getCompany())
                    .setFont(fontBold)
                    .setFontSize(12);
            
            String dateRange = exp.getStartDate() + " - " + (exp.isCurrentJob() ? "Present" : exp.getEndDate());
            Paragraph dates = new Paragraph(dateRange)
                    .setFont(fontRegular)
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.RIGHT);
            
            Table header = new Table(2).setWidth(UnitValue.createPercentValue(100));
            header.addCell(new Cell().add(company).setBorder(null));
            header.addCell(new Cell().add(dates).setBorder(null));
            
            document.add(header);
            
            // Job title
            Paragraph position = new Paragraph(exp.getPosition())
                    .setFont(fontRegular)
                    .setFontSize(11)
                    .setMarginBottom(5);
            
            document.add(position);
            
            // Job description
            if (exp.getDescription() != null && !exp.getDescription().isEmpty()) {
                Paragraph description = new Paragraph(exp.getDescription())
                        .setFont(fontRegular)
                        .setFontSize(10)
                        .setMarginBottom(15);
                
                document.add(description);
            }
        }
    }

    private void createEducation(Document document, List<Education> educations, 
                               PdfFont fontBold, PdfFont fontRegular) {
        for (Education edu : educations) {
            // Institution and graduation date
            Paragraph institution = new Paragraph(edu.getInstitution())
                    .setFont(fontBold)
                    .setFontSize(12);
            
            Paragraph date = new Paragraph(edu.getGraduationDate())
                    .setFont(fontRegular)
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.RIGHT);
            
            Table header = new Table(2).setWidth(UnitValue.createPercentValue(100));
            header.addCell(new Cell().add(institution).setBorder(null));
            header.addCell(new Cell().add(date).setBorder(null));
            
            document.add(header);
            
            // Degree and major
            String degreeField = edu.getDegree();
            if (edu.getField() != null && !edu.getField().isEmpty()) {
                degreeField += " - " + edu.getField();
            }
            
            Paragraph degree = new Paragraph(degreeField)
                    .setFont(fontRegular)
                    .setFontSize(11);
            
            document.add(degree);
            
            // GPA
            if (edu.getGpa() != null && !edu.getGpa().isEmpty()) {
                Paragraph gpa = new Paragraph("GPA: " + edu.getGpa())
                        .setFont(fontRegular)
                        .setFontSize(10);
                
                document.add(gpa);
            }
            
            // Description
            if (edu.getDescription() != null && !edu.getDescription().isEmpty()) {
                Paragraph description = new Paragraph(edu.getDescription())
                        .setFont(fontRegular)
                        .setFontSize(10)
                        .setMarginBottom(15);
                
                document.add(description);
            } else {
                document.add(new Paragraph("").setMarginBottom(15));
            }
        }
    }

    private void createSkills(Document document, List<Skill> skills, PdfFont fontBold, PdfFont fontRegular) {
        Table skillsTable = new Table(UnitValue.createPercentArray(new float[]{2, 1}))
                .setWidth(UnitValue.createPercentValue(100))
                .setMarginBottom(15);
        
        for (Skill skill : skills) {
            Cell nameCell = new Cell().add(new Paragraph(skill.getName())
                    .setFont(fontRegular))
                    .setBorder(null);
            
            // Visual representation of skill level
            StringBuilder levelStr = new StringBuilder();
            for (int i = 0; i < 5; i++) {
                if (i < skill.getLevel()) {
                    levelStr.append("★ ");
                } else {
                    levelStr.append("☆ ");
                }
            }
            
            Cell levelCell = new Cell().add(new Paragraph(levelStr.toString())
                    .setFont(fontRegular))
                    .setBorder(null);
            
            skillsTable.addCell(nameCell);
            skillsTable.addCell(levelCell);
        }
        
        document.add(skillsTable);
    }

    private void createProjects(Document document, List<Project> projects, PdfFont fontBold, PdfFont fontRegular) {
        for (Project project : projects) {
            // Project name and duration
            Paragraph title = new Paragraph(project.getTitle())
                    .setFont(fontBold)
                    .setFontSize(12);
            
            String dateRange = "";
            if (project.getStartDate() != null && !project.getStartDate().isEmpty()) {
                dateRange = project.getStartDate();
                if (project.getEndDate() != null && !project.getEndDate().isEmpty()) {
                    dateRange += " - " + project.getEndDate();
                } else {
                    dateRange += " - Present";
                }
            }
            
            Paragraph dates = new Paragraph(dateRange)
                    .setFont(fontRegular)
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.RIGHT);
            
            Table header = new Table(2).setWidth(UnitValue.createPercentValue(100));
            header.addCell(new Cell().add(title).setBorder(null));
            header.addCell(new Cell().add(dates).setBorder(null));
            
            document.add(header);
            
            // Technologies used
            if (project.getTechnologies() != null && !project.getTechnologies().isEmpty()) {
                Paragraph technologies = new Paragraph("Technologies: " + project.getTechnologies())
                        .setFont(fontRegular)
                        .setFontSize(10)
                        .setFontColor(ColorConstants.DARK_GRAY);
                
                document.add(technologies);
            }
            
            // Project description
            if (project.getDescription() != null && !project.getDescription().isEmpty()) {
                Paragraph description = new Paragraph(project.getDescription())
                        .setFont(fontRegular)
                        .setFontSize(10)
                        .setMarginBottom(5);
                
                document.add(description);
            }
            
            // Project URL
            if (project.getUrl() != null && !project.getUrl().isEmpty()) {
                Paragraph url = new Paragraph("URL: " + project.getUrl())
                        .setFont(fontRegular)
                        .setFontSize(10)
                        .setMarginBottom(15);
                
                document.add(url);
            } else {
                document.add(new Paragraph("").setMarginBottom(15));
            }
        }
    }
} 