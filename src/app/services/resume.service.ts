import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Resume data model interfaces
export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address?: string;
  linkedIn?: string;
  website?: string;
}

export interface WorkExperience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking?: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id?: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  // Default empty resume
  private defaultResume: Resume = {
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: ''
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: []
  };

  // BehaviorSubject to store and share resume data
  private resumeDataSubject: BehaviorSubject<Resume> = new BehaviorSubject<Resume>(this.defaultResume);
  
  // Observable to subscribe to resume data changes
  resumeData$: Observable<Resume> = this.resumeDataSubject.asObservable();

  constructor() { }

  // Get current resume data
  getResumeData(): Resume {
    return this.resumeDataSubject.getValue();
  }

  // Update resume data
  updateResumeData(resume: Resume): void {
    this.resumeDataSubject.next(resume);
  }

  // Update a specific section of the resume
  updateResumeSection<K extends keyof Resume>(section: K, data: Resume[K]): void {
    const currentResume = this.getResumeData();
    this.updateResumeData({ ...currentResume, [section]: data });
  }

  // Reset resume to default values
  resetResume(): void {
    this.resumeDataSubject.next(this.defaultResume);
  }

  // Generate PDF (to be implemented later with backend integration)
  generatePdf(): Observable<any> {
    // This will be implemented when we connect to the backend
    // For now, just return the current resume data
    return this.resumeData$;
  }
} 