import {
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLinksComponent } from '../../social-links/social-links.component';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SocialLinksComponent,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent implements OnInit {
  studiesintolerances: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'files';
  hideImages = true;
  loading = false;
  totalPages: any;
  results: any[] = [];
  isLoading = false;
  isBrowser = false;

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
    if (this.loading || this.page > this.totalPages) return;
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
        (error) => {},
      );
  }

  getName() {
    return this.apiService.getArabicName('files');
  }

  get2() {
    let page = 1;
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
        (error) => {},
      );
  }

  handlePageSizeChange(): void {
    this.page = 1;
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
    this.router.navigate(['/files', id]);
  }

  getUrl(data: any) {
    return this.isBrowser ? window.location.href + '/' + data : '';
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
