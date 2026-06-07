import { FormsModule } from '@angular/forms';
import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../services/api-service.service';

import { SelectDropDownModule } from 'ngx-select-dropdown';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SelectDropDownModule,
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  results: any[] = [];
  dropDownList: any[] = [];
  dropDownList2: any[] = [];
  page = 1;
  pageSize = 50;
  pageSizes = [15, 30, 50];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'books';
  url2 = 'dropdown';
  closeResult: string = '';
  data: any;
  filter: any;
  config = {
    search: false,
    noResultsFound: 'No results found!',
    height: '300px',
    customComparator: (a: any, b: any): number => {
      return a.value - b.value;
    },

    placeholder: 'Select Year',
  };
  dataModel: any;
  loading = false;
  isLoading = false;
  totalPages: any;
  selectedFilter: string = 'all';
  isBrowser = false;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.get();
    this.getDropDown();
  }

  get2() {
    let page = 1;
    if (this.isLoading) return;
    this.isLoading = true;

    this.apiService
      .getBooks(this.url, this.search, page, this.pageSize, this.filter || '')
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

  get() {
    if (this.loading || this.page > this.totalPages) return;
    this.loading = true;

    this.apiService
      .getBooks(
        this.url,
        this.search,
        this.page,
        this.pageSize,
        this.filter || '',
      )
      .subscribe(
        (data: any) => {
          this.books = [...this.books, ...data.data];
          this.page++;
          this.totalPages = data.totalPages;
          this.loading = false;

          this.size = data.count;
        },
        (error) => {},
      );
  }

  handlePageSizeChange(): void {
    this.page = 1;
    this.ngOnInit();
  }

  openScrollableContent(longContent: any, book: any) {
    this.data = book;
    this.modalService.open(longContent, { scrollable: true, size: 'xl' });
  }

  gotoDetailPage(id: any, id2: any) {
    if (this.isBrowser) {
      localStorage.setItem('id', id2);
    }

    this.router.navigate(['/books/' + id]);
  }

  pageChange(event: any) {
    this.page = event;

    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }

    this.get();
  }

  getDropDown() {
    this.apiService.getList(this.url2).subscribe(
      (data: any) => {
        this.dropDownList = data.data;
        this.dropDownList2 = this.dropDownList
          .sort((a, b) => b - a)
          .map((item, index) => ({ id: item, value: item }));
        this.dropDownList = this.dropDownList.sort((a, b) => b - a);
      },
      (error) => {},
    );
  }

  selectionChanged(event: any, data: any) {
    this.books = [];
    this.page = 1;
    if (data == 'all') {
      this.filter = '';
      this.selectedFilter = 'all';
    } else {
      this.filter = data.value;
      this.selectedFilter = data.id;
    }

    this.ngOnInit();
  }

  backToTop() {
    if (!this.isBrowser) {
      return;
    }

    window.scrollTo(0, 0);
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
