import { FormsModule } from '@angular/forms';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AudioPlayerComponent } from '../../audio-player/audio-player.component';
import { AudioPlayerMinComponent } from '../../audio-player-min/audio-player-min.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SocialLinksComponent } from '../../social-links/social-links.component';
import { AudioPlayerHorizontalComponent } from '../../audio-player-horizontal/audio-player-horizontal.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintDirective } from 'ngx-print';
import { EndingsectionComponent } from '../../endingsection/endingsection.component';

@Component({
  selector: 'app-books-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    AudioPlayerMinComponent,
    AudioPlayerComponent,
    SocialLinksComponent,
    AudioPlayerHorizontalComponent,
    NgbCarouselModule,
    NgxPrintDirective,
    EndingsectionComponent,
  ],
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.css'],
})
export class BooksDetailsComponent implements OnInit {
  downloadUrl!: string;
  isBrowser = false;
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  books: any = {};
  url = 'booksbyId';
  url2 = 'books';
  id: any;
  number: any;
  pauseOnHover = true;
  pauseOnFocus = true;
  nobutton = false;
  fileExists: { [key: string]: boolean } = {};
  fileExists2: { [key: string]: boolean } = {};
  fileExists3: { [key: string]: boolean } = {};
  fileExists4: { [key: string]: boolean } = {};
  check: any;
  fontSize = 28;
  audio: any;
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

  results: any[] = [];
  isLoading = false;
  search = '';
  filter: any;
  pageSize = 50;
  pageSizes = [15, 30, 50];
  size = 0;
  totalPages: any;
  public isActive: any = true;

  selectedItem = 'YourCustomFontName2';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.number = this.id.split('mb');

      this.get();
      this.checkFileExists(this.number[1]);

      this.checkFileExists4(this.number[1]);
    });
  }

  onImageError(type: 'front' | 'back') {
    this.books[type + 'image'] = null;
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  gotoDetailPage(id: any, id2: any) {
    if (this.isBrowser) {
      localStorage.setItem('id', id2);
    }

    this.router.navigate(['/books/' + id]);

    if (this.isBrowser) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  checkFileExists(fileName: string): void {
    const filePath = `https://www.almesbar.net/assets/bhm/mb/TOC/${fileName}.pdf`;

    this.http.get(filePath, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const isPdf = blob.type === 'application/pdf';
        this.fileExists[fileName] = isPdf;
      },
      error: () => {
        this.fileExists[fileName] = false;
      },
    });
  }

  checkFileExists4(fileName: string): void {
    const filePath = `https://www.almesbar.net/assets/bhm/mb/intro_of_books/${fileName}.pdf`;

    this.http.get(filePath, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const isPdf = blob.type === 'application/pdf';
        this.fileExists4[fileName] = isPdf;
      },
      error: () => {
        this.fileExists4[fileName] = false;
      },
    });
  }

  get() {
    this.apiService.get(this.url, this.id).subscribe(
      (data: any) => {
        this.books = data.data[0];
        this.books.introduction = this.sanitizer.bypassSecurityTrustHtml(
          data.data[0].introduction,
        );
      },
      (error) => {},
    );
  }

  get2() {
    let page = 1;
    if (this.isLoading) return;
    this.isLoading = true;

    this.apiService
      .getBooks(this.url2, this.search, page, this.pageSize, this.filter || '')
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

  changeFontSize(action: 'smaller' | 'bigger') {
    if (action === 'smaller' && this.fontSize > 10) {
      this.fontSize -= 2;
    } else if (action === 'bigger' && this.fontSize < 40) {
      this.fontSize += 2;
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

  getUrl(data: any) {
    return this.isBrowser ? window.location.href : '';
  }
}
