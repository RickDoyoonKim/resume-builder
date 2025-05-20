import { Routes } from '@angular/router';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { ResumePreviewComponent } from './components/resume-preview/resume-preview.component';

export const routes: Routes = [
  { path: '', component: ResumeFormComponent },
  { path: 'preview', component: ResumePreviewComponent },
  { path: '**', redirectTo: '' }
];
