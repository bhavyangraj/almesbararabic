import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-two',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './two.component.html',
  styleUrl: './two.component.css',
})
export class TwoComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private apiService: ApiServiceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private sharedDataService: SharedDataService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  studies_in_tolerance: any[] = [];
  iranian_studies: any[] = [];
  readonly isBrowser: boolean;

  ngOnInit(): void {
    this.get();
  }

  url = 'home2';

  get() {
    //   this.apiService.getFull2(this.url).subscribe(
    //     (data: any) => {
    //       this.studies_in_tolerance = data.studies_in_tolerance;
    //       this.iranian_studies = data.iranian_studies;
    //     },
    //     (error) => {},
    //   );
    this.apiService.getFull2(this.url).subscribe({
      next: (data: any) => {
        this.studies_in_tolerance = data.studies_in_tolerance;
        this.iranian_studies = data.iranian_studies;

        this.sharedDataService.setStudiesInTolerance(this.studies_in_tolerance);

        this.sharedDataService.setIranianStudies(this.iranian_studies);
      },
      error: (err) => {
        if (this.isBrowser) {
          console.error(err);
        }
      },
    });
  }
}
