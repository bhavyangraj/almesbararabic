import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-taliban',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SocialLinksComponent,
  ],
  templateUrl: './taliban.component.html',
  styleUrls: ['./taliban.component.css'],
})
export class TalibanComponent implements OnInit {
  readonly isBrowser: boolean;

  talibans: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'taliban';
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
    this.getTalibans();
  }

  getTalibans(): void {
    if (this.loading || (this.totalPages && this.page > this.totalPages)) {
      return;
    }

    this.loading = true;

    this.apiService
      .getAll(this.url, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.talibans = [...this.talibans, ...(data?.data || [])];

          this.page++;
          this.totalPages = data.totalPages;
          this.size = data.count;
          this.loading = false;
        },
        () => {
          this.loading = false;
        },
      );
  }

  get2(): void {
    const page = 1;

    if (this.isLoading) return;

    this.isLoading = true;

    this.apiService
      .getAll(this.url, this.search, page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.results = data.data;
          this.totalPages = data.totalPages;
          this.size = data.count;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        },
      );
  }

  handlePageSizeChange(): void {
    this.page = 1;
    this.talibans = [];
    this.getTalibans();
  }

  pageChange(event: any): void {
    this.page = event;

    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }

    this.getTalibans();
  }

  isLongText(text: any): boolean {
    return text && text.length > 300;
  }

  openInNewTab(id: string): void {
    this.router.navigate(['/taliban', id]);
  }

  getName(): string {
    return this.apiService.getArabicName('taliban');
  }

  getUrl(data: any): string {
    return this.isBrowser ? `${window.location.href}/${data}` : '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.isBrowser) return;

    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;

    const max = document.documentElement.scrollHeight;

    if (pos >= max - 2000) {
      this.getTalibans();
    }
  }
}
