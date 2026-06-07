import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { SocialLinksComponent } from '../../social-links/social-links.component';
import { AudioPlayerHorizontalComponent } from '../../audio-player-horizontal/audio-player-horizontal.component';
import { NgxPrintDirective } from 'ngx-print';
import { EndingsectionComponent } from '../../endingsection/endingsection.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-iranianstudies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SafeUrlPipe,
    SocialLinksComponent,
    RouterModule,
    AudioPlayerHorizontalComponent,
    NgxPrintDirective,
    EndingsectionComponent,
    NgxExtendedPdfViewerModule,
  ],
  templateUrl: './iranianstudies.component.html',
  styleUrl: './iranianstudies.component.css',
})
export class IranianstudiesComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  books: any = {};
  studies: any[] = [];
  url: any = 'iranianstudies';
  url2: any = 'home';
  id: any;
  id2: any;
  private isPaused = false;
  fontSize = 28;
  items = [
    { label: 'الخط 1', value: 'YourCustomFontName2' },
    {
      label: 'الخط 2',
      value: 'Noto Kufi Arabic,ui-sans-serif,Helvetica Neue,sans-serif',
    },

    {
      label: 'الخط 3',
      value: 'Tajawal',
    },
    {
      label: 'الخط 4',
      value: 'Amiri Quran',
    },
  ];

  selectedItem = 'YourCustomFontName2';

  private scrollAnimationId: number | null = null;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    let url = decodeURIComponent(this.router.url).split('/');

    this.id = url[1];
  }

  results: any[] = [];
  authorData: any[] = [];
  isLoading = false;
  search = '';
  filter: any;
  pageSize = 50;
  pageSizes = [15, 30, 50];
  size = 0;
  totalPages: any;
  public isActive: any = true;
  url3 = 'getAllAuthors';
  url4 = 'researchers';
  page = 1;
  pdfURL: any;
  readonly isBrowser: boolean;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id2 = params.get('id');
      this.get();
    });

    if (
      this.id != 'editorialboard' &&
      this.id != 'distributors' &&
      this.id != 'videos'
    ) {
      this.getFull();
    }
  }

  getFull() {
    this.apiService.getFull(this.url2).subscribe(
      (data: any) => {
        this.studies = data.slider;
      },
      (error) => {},
    );
  }

  getAuthor() {
    this.apiService
      .getAll(this.url3, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.authorData = data.data;
          this.authorData = data.data.filter(
            (item: any) => item.author_arabic === this.books.author_arabic,
          );
          if (this.authorData.length == 0) {
            this.get3();
          }

          this.size = data.count;
        },
        (error) => {},
      );
  }

  get3() {
    this.apiService
      .getAll(this.url4, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.authorData = data.data;
          this.authorData = data.data.filter(
            (item: any) => item.author_arabic === this.books.author_arabic,
          );

          this.size = data.count;
        },
        (error) => {},
      );
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.startAutoScroll();
  }

  byPassId(htmlString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

  get() {
    this.apiService.get(this.url, this.id2).subscribe(
      (data: any) => {
        this.books = data.data;
        this.pdfURL = this.apiService.getPdfProxyUrl(this.books.PDFURL);
        this.books.description = this.sanitizer.bypassSecurityTrustHtml(
          data.data.description,
        );
        if (this.books.author_arabic) {
          this.getAuthor();
        }
      },
      (error) => {},
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

  getSantizeUrl(url: string) {
    url = this.getYouTubeEmbedUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getYouTubeEmbedUrl(url: string): string {
    let videoId: string | null = null;

    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
      try {
        const params = new URL(url).searchParams;
        videoId = params.get('v');
      } catch {
        videoId = null;
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }

  toggleReadMore(study: any) {
    study.showFull = !study.showFull;
  }

  isYouTubeUrl(url: string): boolean {
    if (!url) return false;

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)[\w\-]{11}/;

    return youtubeRegex.test(url);
  }

  startAutoScroll() {
    if (!this.isBrowser || !this.scrollContainer?.nativeElement) {
      return;
    }
    setTimeout(() => {
      const container = this.scrollContainer.nativeElement;
      const step = () => {
        if (!this.isPaused) {
          container.scrollLeft -= 3;

          const firstSetWidth = container.scrollWidth / 2;
          if (container.scrollLeft >= firstSetWidth) {
            container.scrollLeft = 0;
          }
        }
        if (this.isBrowser) {
          this.scrollAnimationId = requestAnimationFrame(step);
        }
      };

      if (this.isBrowser) {
        this.scrollAnimationId = requestAnimationFrame(step);
      }
    }, 3000);
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.scrollAnimationId != null) {
      cancelAnimationFrame(this.scrollAnimationId);
    }
  }

  onContentClick(event: Event) {
    if (!this.isBrowser) {
      return;
    }

    const target = event.target as HTMLElement;

    if (target.tagName.toLowerCase() === 'a') {
      const href = target.getAttribute('href');

      if (href && href.startsWith('#')) {
        event.preventDefault();

        const el = document.querySelector(href);

        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    }
  }

  // hasDescription(desc: any): boolean {
  //   // console.log(desc);
  //   // return desc?.length > 0;
  // }

  gotoDetail(slide: any) {
    if (slide.category == 'Books') {
      this.router.navigate(['/books/' + slide.id]);
    } else if (slide.category == 'Studies') {
      this.router.navigate(['/studies/' + slide._id]);
    } else if (slide.category == 'Media') {
      this.router.navigate(['/probeinmedia/' + slide._id]);
    } else if (slide.category == 'ProbeLibrary') {
      this.router.navigate([`/probelibrary/${slide.id}/${slide._id}`]);
    } else if (slide.category == 'Articles') {
      this.router.navigate(['/articles/' + slide._id]);
    } else if (slide.category == 'AudioBooks') {
      this.router.navigate(['/audiobooks/' + slide._id]);
    } else if (slide.category == 'Taliban') {
      this.router.navigate(['/taliban/' + slide._id]);
    } else if (slide.category == 'PConcepts') {
      this.router.navigate(['/philosophical/' + slide._id]);
    } else if (slide.category == 'GConcepts') {
      this.router.navigate(['/general/' + slide._id]);
    } else if (slide.category == 'Files') {
      this.router.navigate(['/files/' + slide._id]);
    } else if (slide.category == 'Interviews') {
      this.router.navigate(['/interviews/' + slide._id]);
    } else if (slide.category == 'StudiesInTolerance') {
      this.router.navigate(['/studiesintolerance/' + slide._id]);
    } else if (slide.category == 'Videos') {
      this.router.navigate(['/videos/' + slide._id]);
    } else if (slide.category == 'Summary') {
      this.router.navigate(['/summary/' + slide._id]);
    } else if (slide.category == 'HighDebate') {
      this.router.navigate(['/highdebate/' + slide._id]);
    } else if (this.url == 'infographics') {
      this.router.navigate(['/infographics/' + slide._id]);
    } else if (this.url == 'iranianstudies') {
      this.router.navigate(['/iranianstudies/' + slide._id]);
    }
  }

  changeFontSize(action: 'smaller' | 'bigger') {
    if (action === 'smaller' && this.fontSize > 10) {
      this.fontSize -= 2;
    } else if (action === 'bigger' && this.fontSize < 40) {
      this.fontSize += 2;
    }
  }

  getUrl(data: any): string {
    return this.isBrowser ? window.location.href : '';
  }
}
