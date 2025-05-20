import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ResumeService, Resume, WorkExperience, Education, Skill, Project } from '../../services/resume.service';
import { ExportPdfComponent } from '../export-pdf/export-pdf.component';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule, ExportPdfComponent],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.scss'
})
export class ResumePreviewComponent implements OnInit, OnDestroy {
  resume: Resume | null = null;
  private subscription = new Subscription();

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.resumeService.getResumeData().subscribe(data => {
        this.resume = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Create an array to visually represent skill level
  getSkillLevelArray(level: number): number[] {
    return Array(level).fill(0);
  }

  // Create an array to visually represent empty skill level
  getEmptySkillLevelArray(level: number): number[] {
    return Array(5 - level).fill(0);
  }

  // Format date (YYYY-MM to MMM YYYY)
  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch (e) {
      return dateString;
    }
  }
}
