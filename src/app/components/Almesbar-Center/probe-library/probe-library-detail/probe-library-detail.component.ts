import { FormsModule } from '@angular/forms';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from './../../../../services/api-service.service';
import { NgxPrintDirective } from 'ngx-print';
import { SocialLinksComponent } from '../../../social-links/social-links.component';
import { EndingsectionComponent } from '../../../endingsection/endingsection.component';

@Component({
  selector: 'app-probe-library-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgxPrintDirective,
    SocialLinksComponent,
    EndingsectionComponent,
  ],
  templateUrl: './probe-library-detail.component.html',
  styleUrls: ['./probe-library-detail.component.css'],
})
export class ProbeLibraryDetailComponent implements OnInit {
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  books: any = {};
  url = 'probelibrary';
  currentUrl = '';

  bookId: string | null = null;
  itemId: string | null = null;
  id: any;

  fontSize = 28;

  items = [
    { label: 'الخط 1', value: 'YourCustomFontName2' },
    {
      label: 'الخط 2',
      value: 'Noto Kufi Arabic,ui-sans-serif,Helvetica Neue,sans-serif',
    },
    { label: 'الخط 3', value: 'Tajawal' },
    { label: 'الخط 4', value: 'Amiri Quran' },
  ];

  results: any[] = [];
  isLoading = false;
  search = '';
  pageSize = 50;
  pageSizes = [15, 30, 50];
  size = 0;
  totalPages: any;
  public isActive: any = true;

  url3 = 'getAllAuthors';
  url4 = 'researchers';

  page = 1;
  authorData: any[] = [];

  selectedItem = 'YourCustomFontName2';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('bookId');
      this.itemId = params.get('itemId');

      this.id = this.itemId;

      if (isPlatformBrowser(this.platformId)) {
        this.currentUrl = window.location.href;
      }

      this.get();
    });
  }

  get() {
    this.apiService.get(this.url, this.id).subscribe(
      (data: any) => {
        this.books = data.data;

        if (this.books.author_arabic) {
          this.getAuthor();
        }
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

  getAuthor() {
    this.apiService
      .getAll(this.url3, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.authorData = data.data.filter(
            (item: any) => item.author_arabic === this.books.author_arabic,
          );

          if (this.authorData.length === 0) {
            this.get3();
          }

          this.size = data.count;
        },
        (error) => {
          console.error(error);
        },
      );
  }

  get3() {
    this.apiService
      .getAll(this.url4, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.authorData = data.data.filter(
            (item: any) => item.author_arabic === this.books.author_arabic,
          );

          this.size = data.count;
        },
        (error) => {
          console.error(error);
        },
      );
  }

  gotoDetailPage(id: any, id2: any) {
    this.router.navigate(['/probelibrary', id, id2]);
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

  onContentClick(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

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

  changeFontSize(action: 'smaller' | 'bigger') {
    if (action === 'smaller' && this.fontSize > 10) {
      this.fontSize -= 2;
    } else if (action === 'bigger' && this.fontSize < 40) {
      this.fontSize += 2;
    }
  }

  getUrl(): string {
    return this.currentUrl;
  }
}
