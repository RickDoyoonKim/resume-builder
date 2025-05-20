import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
}

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentJob?: boolean;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number; // 1-5
}

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  technologies?: string;
  url?: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private initialResumeState: Resume = {
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: []
  };

  private resumeSubject = new BehaviorSubject<Resume>(this.initialResumeState);
  
  constructor() { }

  // Get current resume data
  getResumeData(): Observable<Resume> {
    return this.resumeSubject.asObservable();
  }

  // Get current resume data snapshot
  getCurrentResumeSnapshot(): Resume {
    return this.resumeSubject.getValue();
  }

  // Update entire resume
  updateResumeData(resume: Resume): void {
    this.resumeSubject.next(resume);
  }

  // Update personal info section
  updatePersonalInfo(personalInfo: PersonalInfo): void {
    const currentResume = this.getCurrentResumeSnapshot();
    this.resumeSubject.next({
      ...currentResume,
      personalInfo
    });
  }

  // Update work experience
  updateWorkExperience(workExperience: WorkExperience[]): void {
    const currentResume = this.getCurrentResumeSnapshot();
    this.resumeSubject.next({
      ...currentResume,
      workExperience
    });
  }

  // Update education
  updateEducation(education: Education[]): void {
    const currentResume = this.getCurrentResumeSnapshot();
    this.resumeSubject.next({
      ...currentResume,
      education
    });
  }

  // Update skills
  updateSkills(skills: Skill[]): void {
    const currentResume = this.getCurrentResumeSnapshot();
    this.resumeSubject.next({
      ...currentResume,
      skills
    });
  }

  // Update projects
  updateProjects(projects: Project[]): void {
    const currentResume = this.getCurrentResumeSnapshot();
    this.resumeSubject.next({
      ...currentResume,
      projects
    });
  }

  // Reset resume
  resetResume(): void {
    this.resumeSubject.next(this.initialResumeState);
  }
}
