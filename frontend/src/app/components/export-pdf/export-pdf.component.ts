import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../services/pdf.service';
import { ResumeService } from '../../services/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-export-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './export-pdf.component.html',
  styleUrl: './export-pdf.component.scss'
})
export class ExportPdfComponent implements OnDestroy {
  isExporting = false;
  errorMessage: string | null = null;
  private subscription = new Subscription();

  constructor(
    private pdfService: PdfService,
    private resumeService: ResumeService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  exportPdf(): void {
    this.isExporting = true;
    this.errorMessage = null;
    
    const resumeData = this.resumeService.getCurrentResumeSnapshot();

    this.subscription.add(
      this.pdfService.generatePdf(resumeData).subscribe({
        next: (blob) => {
          this.pdfService.downloadPdf(blob);
          this.isExporting = false;
        },
        error: (error) => {
          console.error('Error generating PDF:', error);
          this.errorMessage = 'Failed to generate PDF. Please try again.';
          this.isExporting = false;
        }
      })
    );
  }
}
