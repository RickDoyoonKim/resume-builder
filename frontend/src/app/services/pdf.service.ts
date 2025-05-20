import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Resume } from './resume.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'http://localhost:8081/api/resume/pdf';

  constructor(private http: HttpClient) { }

  // Generate and download resume PDF
  generatePdf(resume: Resume): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    console.log('Sending resume data to backend API:', JSON.stringify(resume));
    
    return this.http.post(this.apiUrl, resume, {
      headers,
      responseType: 'blob'
    }).pipe(
      tap(_ => console.log('PDF generated successfully')),
      catchError(this.handleError)
    );
  }

  // Helper method to trigger file download
  downloadPdf(blob: Blob, filename: string = 'resume.pdf'): void {
    // Create a blob URL
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    window.URL.revokeObjectURL(url);
    
    console.log(`PDF downloaded with filename: ${filename}`);
  }
  
  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred while generating PDF';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 