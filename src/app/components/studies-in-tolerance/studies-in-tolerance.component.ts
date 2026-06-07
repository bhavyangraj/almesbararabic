import {
  Component,
  HostListener,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-studies-in-tolerance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SocialLinksComponent,
  ],
  templateUrl: './studies-in-tolerance.component.html',
  styleUrls: ['./studies-in-tolerance.component.css'],
})
export class StudiesInToleranceComponent implements OnInit {
  readonly isBrowser: boolean;

  studiesintolerances: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'studiesintolerance';
  hideImages = true;
  loading = false;
  totalPages: any;
  results: any[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    if (this.loading || (this.totalPages && this.page > this.totalPages)) {
      return;
    }

    this.loading = true;

    this.apiService
      .getAll(this.url, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.studiesintolerances = [
            ...this.studiesintolerances,
            ...data.data,
          ];

          this.page++;
          this.totalPages = data.totalPages;
          this.loading = false;
          this.size = data.count;
        },
        () => {
          this.loading = false;
        },
      );
  }

  get2() {
    const page = 1;

    if (this.isLoading) return;

    this.isLoading = true;

    this.apiService
      .getAll(this.url, this.search, page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.results = data.data;
          this.totalPages = data.totalPages;
          this.isLoading = false;
          this.size = data.count;
        },
        () => {
          this.isLoading = false;
        },
      );
  }

  handlePageSizeChange(): void {
    this.page = 1;
    this.studiesintolerances = [];
    this.get();
  }

  pageChange(event: any) {
    this.page = event;

    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }

    this.get();
  }

  isLongText(text: any): boolean {
    return text && text.length > 300;
  }

  openInNewTab(id: string) {
    this.router.navigate(['/studiesintolerance/' + id]);
  }

  getUrl(data: any): string {
    return this.isBrowser ? window.location.href + '/' + data : '';
  }

  getName() {
    return this.apiService.getArabicName('studies_in_tolerances');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) {
      return;
    }

    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;

    const max = document.documentElement.scrollHeight;

    if (pos >= max - 2000) {
      this.get();
    }
  }
}
