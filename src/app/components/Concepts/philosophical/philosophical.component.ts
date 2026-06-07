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
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../../services/api-service.service';
import { SocialLinksComponent } from '../../social-links/social-links.component';

@Component({
  selector: 'app-philosophical',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SocialLinksComponent,
  ],
  templateUrl: './philosophical.component.html',
  styleUrls: ['./philosophical.component.css'],
})
export class PhilosophicalComponent implements OnInit {
  philosophicals: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'philosophicals';
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
          this.philosophicals = [...this.philosophicals, ...data.data];
          this.page++;
          this.totalPages = data.totalPages;
          this.loading = false;
          this.size = data.count;
        },
        (error: any) => {},
      );
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
    this.ngOnInit();
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
    this.router.navigate(['/philosophical/' + id]);
  }
  getUrl(data: any) {
    return this.isBrowser ? window.location.href + '/' + data : '';
  }

  getName() {
    return this.apiService.getArabicName('philosophicals');
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
