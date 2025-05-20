# Resume Builder Test Plan

This document outlines the integration test plan for the Resume Builder application.

## Prerequisites

1. Run the frontend application:
   ```
   cd frontend
   ng serve
   ```

2. Run the backend application:
   ```
   cd backend
   mvn spring-boot:run
   ```

## Test Scenarios

### 1. Resume Form Completion

- Navigate to the application homepage (http://localhost:4200)
- Complete the resume form with the following information:

  **Personal Information**:
  - Name: "John Doe"
  - Job Title: "Software Developer"
  - Email: "john@example.com"
  - Phone: "123-456-7890"
  - Address: "123 Main St, New York"
  - Summary: "Passionate full-stack developer with experience in various web application development projects."

  **Work Experience**:
  - Click the '+' button to add work experience
  - Company: "ABC Technology"
  - Position: "Senior Developer"
  - Start Date: "2020-01"
  - End Date: "2023-01"
  - Current Job: Unchecked
  - Description: "Web application development and maintenance, cloud infrastructure management"

  **Education**:
  - Click the '+' button to add education
  - Institution: "University of Technology"
  - Degree: "Bachelor's"
  - Field: "Computer Science"
  - Graduation Date: "2019-02"
  - GPA: "4.0"
  - Description: "Computer science and algorithm studies"

  **Skills**:
  - Click the '+' button to add a skill
  - Skill Name: "JavaScript"
  - Level: 4
  - Click the '+' button to add another skill
  - Skill Name: "Angular"
  - Level: 4
  - Click the '+' button to add another skill
  - Skill Name: "Spring Boot"
  - Level: 3

  **Projects**:
  - Click the '+' button to add a project
  - Title: "Resume Builder"
  - Description: "Resume generation and PDF export application using Angular and Spring Boot"
  - Technologies: "Angular, Spring Boot, iText PDF"
  - Start Date: "2023-01"
  - End Date: "2023-03"
  - URL: "https://github.com/sample/resume-builder"

### 2. Resume Preview Check

- Click the "Preview" button to navigate to the preview screen
- Verify that all entered information is correctly displayed in the preview:
  - Check that name and job title are displayed at the top of the page
  - Check that contact information is displayed
  - Check that summary is displayed
  - Check that work experience is displayed
  - Check that education is displayed
  - Check that skills are displayed with appropriate level indicators
  - Check that project information is displayed

### 3. PDF Export

- Click the "Export as PDF" button on the preview screen
- Verify that a loading state is displayed during generation
- Verify that the PDF file is downloaded
- Open the downloaded PDF file and verify that all information is correctly included

## Expected Results

- All input fields should accept information
- All entered information should be correctly displayed on the preview screen
- Clicking the PDF export button should download a PDF file
- The downloaded PDF file should contain all resume information

## Error Handling Tests

1. Click the PDF export button when the backend server is not running:
   - An error message should be displayed
   - The application should not crash

2. Submit the form with required fields (name, job title, etc.) left empty:
   - Validation error messages should be displayed
   - Error fields should be highlighted

## Troubleshooting

- If PDF generation doesn't work:
  1. Check network requests in the browser console
  2. Check the backend server logs
  3. Verify that the backend server is running
  4. Verify that CORS settings are correct
  5. Verify that the JSON data format is correct

- If form submission fails:
  1. Check error messages in the browser console
  2. Verify form state validity (via console.log)
  3. Verify that all required fields are filled out 