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
import { DomSanitizer } from '@angular/platform-browser';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SocialLinksComponent,
    SafeUrlPipe,
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent implements OnInit {
  readonly isBrowser: boolean;

  studiesintolerances: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'videos';
  hideImages = true;
  loading = false;
  totalPages: any;
  results: any[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
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
            ...(data?.data || []),
          ];

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
    this.studiesintolerances = [];
    this.get();
  }

  pageChange(event: any): void {
    this.page = event;

    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }

    this.get();
  }

  isLongText(text: any): boolean {
    return text && text.length > 300;
  }

  openInNewTab(id: string): void {
    this.router.navigate(['/videos', id]);
  }

  getName(): string {
    return this.apiService.getArabicName('videos');
  }

  getSantizeUrl(url: string) {
    url = this.getYouTubeEmbedUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';

    let videoId: string | null = null;

    try {
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      } else if (url.includes('youtube.com/watch')) {
        if (this.isBrowser) {
          const params = new URL(url).searchParams;
          videoId = params.get('v');
        } else {
          const match = url.match(/[?&]v=([^&]+)/);
          videoId = match ? match[1] : null;
        }
      }
    } catch {
      return '';
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
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
      this.get();
    }
  }
}
