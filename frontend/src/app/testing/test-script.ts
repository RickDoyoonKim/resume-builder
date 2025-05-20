// This file is a script for manual testing.
// It must be run in a browser for actual integration testing.

// Check if the Resume object type is compatible with the backend
import { Resume, PersonalInfo, WorkExperience, Education, Skill, Project } from '../services/resume.service';

// Sample resume data for testing
export const sampleResume: Resume = {
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Software Developer',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, New York',
    summary: 'Passionate full-stack developer with experience in various web application development projects.'
  },
  workExperience: [
    {
      id: 1,
      company: 'ABC Technology',
      position: 'Senior Developer',
      startDate: '2020-01',
      endDate: '2023-01',
      isCurrentJob: false,
      description: 'Web application development and maintenance, cloud infrastructure management'
    }
  ],
  education: [
    {
      id: 1,
      institution: 'University of Technology',
      degree: 'Bachelor\'s',
      field: 'Computer Science',
      graduationDate: '2019-02',
      gpa: '4.0',
      description: 'Computer science and algorithm studies'
    }
  ],
  skills: [
    {
      id: 1,
      name: 'JavaScript',
      level: 4
    },
    {
      id: 2,
      name: 'Angular',
      level: 4
    },
    {
      id: 3,
      name: 'Spring Boot',
      level: 3
    }
  ],
  projects: [
    {
      id: 1,
      title: 'Resume Builder',
      description: 'Resume generation and PDF export application using Angular and Spring Boot',
      technologies: 'Angular, Spring Boot, iText PDF',
      startDate: '2023-01',
      endDate: '2023-03',
      url: 'https://github.com/sample/resume-builder'
    }
  ]
};

// Integration test steps guidance
export const integrationTestSteps = [
  '1. Run the frontend server: cd frontend && ng serve',
  '2. Run the backend server: cd backend && mvn spring-boot:run',
  '3. Access http://localhost:4200 in your browser',
  '4. Complete the resume form',
  '5. Click the Preview button to check the preview',
  '6. Click the Export as PDF button to download the PDF file',
  '7. Check logs and error messages in the browser console'
];

// Verify the backend API URL is correct
export const API_ENDPOINT = 'http://localhost:8080/api/resume/pdf';

// Function to check backend server health (run directly in console)
export function checkBackendHealth(): void {
  console.log('Checking backend server status...');
  fetch('http://localhost:8080/api/resume/health', { method: 'GET' })
    .then(response => {
      if (response.ok) {
        console.log('Backend server is running.');
        return response.text();
      }
      throw new Error('Backend server is not responding.');
    })
    .then(data => console.log('Server response:', data))
    .catch(error => {
      console.error('Backend server connection error:', error);
      console.log('Please check the following:');
      console.log('1. Verify the backend server is running');
      console.log('2. Verify CORS settings are correct');
      console.log('3. Verify firewall or network settings are not blocking communication');
    });
}

// Test PDF generation request (run directly in console)
export function testPdfGeneration(): void {
  console.log('Testing PDF generation request...');
  fetch('http://localhost:8080/api/resume/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sampleResume)
  })
    .then(response => {
      if (response.ok) {
        console.log('PDF generation request successful');
        return response.blob();
      }
      throw new Error(`PDF generation request failed: ${response.status} ${response.statusText}`);
    })
    .then(blob => {
      console.log('PDF data received:', blob);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'test-resume.pdf';
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('Test PDF download complete');
    })
    .catch(error => {
      console.error('PDF generation request error:', error);
      console.log('Please check the following:');
      console.log('1. Verify the backend server is running');
      console.log('2. Verify the Resume object structure matches the backend API');
      console.log('3. Check request/response details in the Network tab');
    });
}

// Usage instructions
console.log('Integration test script loaded.');
console.log('You can run the following functions in the browser console to test:');
console.log('- checkBackendHealth(): Check backend server status');
console.log('- testPdfGeneration(): Test PDF generation functionality');
console.log('- sampleResume: Sample resume data for testing'); 