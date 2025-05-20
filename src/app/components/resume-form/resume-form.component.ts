import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResumeService, Resume, WorkExperience, Education, Skill, Project } from '../../services/resume.service';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit, OnDestroy {
  resumeForm!: FormGroup;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Subscribe to form value changes and update service
    this.subscription.add(
      this.resumeForm.valueChanges.subscribe(formValue => {
        this.resumeService.updateResumeData(formValue);
      })
    );

    // Load any existing data
    const currentResume = this.resumeService.getResumeData();
    if (currentResume) {
      this.patchFormValues(currentResume);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Initialize form structure
  private initForm(): void {
    this.resumeForm = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', Validators.required],
        jobTitle: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: [''],
        linkedIn: [''],
        website: ['']
      }),
      summary: [''],
      workExperience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      projects: this.fb.array([])
    });
  }

  // Patch form with existing data
  private patchFormValues(resume: Resume): void {
    if (resume.personalInfo) {
      this.resumeForm.get('personalInfo')?.patchValue(resume.personalInfo);
    }
    
    this.resumeForm.get('summary')?.setValue(resume.summary || '');
    
    this.clearFormArray(this.workExperienceArray);
    if (resume.workExperience && resume.workExperience.length) {
      resume.workExperience.forEach(exp => this.addWorkExperience(exp));
    }
    
    this.clearFormArray(this.educationArray);
    if (resume.education && resume.education.length) {
      resume.education.forEach(edu => this.addEducation(edu));
    }
    
    this.clearFormArray(this.skillsArray);
    if (resume.skills && resume.skills.length) {
      resume.skills.forEach(skill => this.addSkill(skill));
    }
    
    this.clearFormArray(this.projectsArray);
    if (resume.projects && resume.projects.length) {
      resume.projects.forEach(proj => this.addProject(proj));
    }
  }

  // Helper to clear form arrays
  private clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  // Getters for form controls
  get personalInfo(): FormGroup {
    return this.resumeForm.get('personalInfo') as FormGroup;
  }
  
  get workExperienceArray(): FormArray {
    return this.resumeForm.get('workExperience') as FormArray;
  }
  
  get educationArray(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }
  
  get skillsArray(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }
  
  get projectsArray(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }

  // Methods to add new items to form arrays
  addWorkExperience(exp?: WorkExperience): void {
    this.workExperienceArray.push(
      this.fb.group({
        id: [exp?.id || crypto.randomUUID()],
        company: [exp?.company || '', Validators.required],
        position: [exp?.position || '', Validators.required],
        startDate: [exp?.startDate || '', Validators.required],
        endDate: [exp?.endDate || ''],
        currentlyWorking: [exp?.currentlyWorking || false],
        description: [exp?.description || '', Validators.required],
        achievements: this.fb.array(exp?.achievements?.map(a => this.fb.control(a)) || [])
      })
    );
  }

  addEducation(edu?: Education): void {
    this.educationArray.push(
      this.fb.group({
        id: [edu?.id || crypto.randomUUID()],
        institution: [edu?.institution || '', Validators.required],
        degree: [edu?.degree || '', Validators.required],
        fieldOfStudy: [edu?.fieldOfStudy || '', Validators.required],
        startDate: [edu?.startDate || '', Validators.required],
        endDate: [edu?.endDate || '', Validators.required],
        gpa: [edu?.gpa || ''],
        description: [edu?.description || '']
      })
    );
  }

  addSkill(skill?: Skill): void {
    this.skillsArray.push(
      this.fb.group({
        id: [skill?.id || crypto.randomUUID()],
        name: [skill?.name || '', Validators.required],
        level: [skill?.level || 'Intermediate']
      })
    );
  }

  addProject(project?: Project): void {
    this.projectsArray.push(
      this.fb.group({
        id: [project?.id || crypto.randomUUID()],
        title: [project?.title || '', Validators.required],
        description: [project?.description || '', Validators.required],
        technologies: this.fb.array(project?.technologies?.map(t => this.fb.control(t)) || []),
        link: [project?.link || ''],
        startDate: [project?.startDate || ''],
        endDate: [project?.endDate || '']
      })
    );
  }

  // Methods to remove items from form arrays
  removeWorkExperience(index: number): void {
    this.workExperienceArray.removeAt(index);
  }

  removeEducation(index: number): void {
    this.educationArray.removeAt(index);
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  removeProject(index: number): void {
    this.projectsArray.removeAt(index);
  }

  // Methods to handle nested arrays
  getAchievementsArray(experienceIndex: number): FormArray {
    return this.workExperienceArray.at(experienceIndex).get('achievements') as FormArray;
  }

  addAchievement(experienceIndex: number, achievement: string = ''): void {
    this.getAchievementsArray(experienceIndex).push(this.fb.control(achievement));
  }

  removeAchievement(experienceIndex: number, achievementIndex: number): void {
    this.getAchievementsArray(experienceIndex).removeAt(achievementIndex);
  }

  getTechnologiesArray(projectIndex: number): FormArray {
    return this.projectsArray.at(projectIndex).get('technologies') as FormArray;
  }

  addTechnology(projectIndex: number, technology: string = ''): void {
    this.getTechnologiesArray(projectIndex).push(this.fb.control(technology));
  }

  removeTechnology(projectIndex: number, technologyIndex: number): void {
    this.getTechnologiesArray(projectIndex).removeAt(technologyIndex);
  }

  // Reset the entire form
  resetForm(): void {
    this.resumeForm.reset();
    this.clearFormArray(this.workExperienceArray);
    this.clearFormArray(this.educationArray);
    this.clearFormArray(this.skillsArray);
    this.clearFormArray(this.projectsArray);
    this.resumeService.resetResume();
  }
} 