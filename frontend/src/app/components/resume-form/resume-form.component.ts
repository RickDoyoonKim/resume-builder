import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResumeService, Resume, WorkExperience, Education, Skill, Project } from '../../services/resume.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {
  resumeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // Load any existing resume data
    this.resumeService.getResumeData().subscribe(resumeData => {
      if (resumeData && Object.keys(resumeData.personalInfo).some(key => 
          resumeData.personalInfo[key as keyof typeof resumeData.personalInfo])) {
        this.resumeForm.patchValue(resumeData);
        
        // Clear existing arrays
        (this.resumeForm.get('workExperience') as FormArray).clear();
        (this.resumeForm.get('education') as FormArray).clear();
        (this.resumeForm.get('skills') as FormArray).clear();
        (this.resumeForm.get('projects') as FormArray).clear();
        
        // Add work experience
        resumeData.workExperience.forEach(job => {
          this.workExperienceArray.push(this.createWorkExperienceGroup(job));
        });
        
        // Add education
        resumeData.education.forEach(edu => {
          this.educationArray.push(this.createEducationGroup(edu));
        });
        
        // Add skills
        resumeData.skills.forEach(skill => {
          this.skillsArray.push(this.createSkillGroup(skill));
        });
        
        // Add projects
        resumeData.projects.forEach(project => {
          this.projectsArray.push(this.createProjectGroup(project));
        });
      } else {
        // Add default empty items
        this.addWorkExperience();
        this.addEducation();
        this.addSkill();
      }
    });
  }

  initForm(): void {
    this.resumeForm = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', Validators.required],
        jobTitle: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        address: [''],
        summary: ['']
      }),
      workExperience: this.fb.array([]),
      education: this.fb.array([]),
      skills: this.fb.array([]),
      projects: this.fb.array([])
    });
  }

  // Getters for form arrays
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

  // Form group creators
  createWorkExperienceGroup(data?: WorkExperience): FormGroup {
    return this.fb.group({
      id: [data?.id || this.getNextId(this.workExperienceArray)],
      company: [data?.company || '', Validators.required],
      position: [data?.position || '', Validators.required],
      startDate: [data?.startDate || ''],
      endDate: [data?.endDate || ''],
      isCurrentJob: [data?.isCurrentJob || false],
      description: [data?.description || '']
    });
  }

  createEducationGroup(data?: Education): FormGroup {
    return this.fb.group({
      id: [data?.id || this.getNextId(this.educationArray)],
      institution: [data?.institution || '', Validators.required],
      degree: [data?.degree || ''],
      field: [data?.field || ''],
      graduationDate: [data?.graduationDate || ''],
      gpa: [data?.gpa || ''],
      description: [data?.description || '']
    });
  }

  createSkillGroup(data?: Skill): FormGroup {
    return this.fb.group({
      id: [data?.id || this.getNextId(this.skillsArray)],
      name: [data?.name || '', Validators.required],
      level: [data?.level || 3]
    });
  }

  createProjectGroup(data?: Project): FormGroup {
    return this.fb.group({
      id: [data?.id || this.getNextId(this.projectsArray)],
      title: [data?.title || '', Validators.required],
      description: [data?.description || ''],
      startDate: [data?.startDate || ''],
      endDate: [data?.endDate || ''],
      technologies: [data?.technologies || ''],
      url: [data?.url || '']
    });
  }

  // Helper to generate IDs
  private getNextId(formArray: FormArray): number {
    return formArray.length + 1;
  }

  // Add methods
  addWorkExperience(): void {
    this.workExperienceArray.push(this.createWorkExperienceGroup());
  }

  addEducation(): void {
    this.educationArray.push(this.createEducationGroup());
  }

  addSkill(): void {
    this.skillsArray.push(this.createSkillGroup());
  }

  addProject(): void {
    this.projectsArray.push(this.createProjectGroup());
  }

  // Remove methods
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

  // Form actions
  saveResume(): void {
    if (this.resumeForm.valid) {
      const resumeData = this.resumeForm.value as Resume;
      this.resumeService.updateResumeData(resumeData);
      alert('Resume saved successfully!');
      this.router.navigate(['/preview']);
    } else {
      this.markFormGroupTouched(this.resumeForm);
      alert('Please fill in all required fields correctly.');
    }
  }

  resetForm(): void {
    if (confirm('Are you sure you want to reset the form? All your entered data will be lost.')) {
      this.resumeService.resetResume();
      this.resumeForm.reset();
      
      // Re-initialize with empty form groups
      this.workExperienceArray.clear();
      this.educationArray.clear();
      this.skillsArray.clear();
      this.projectsArray.clear();
      
      this.addWorkExperience();
      this.addEducation();
      this.addSkill();
    }
  }

  // Helper to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(c => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          }
        });
      }
    });
  }
}
