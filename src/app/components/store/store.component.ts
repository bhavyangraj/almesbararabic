import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../../services/api-service.service';

import { SelectDropDownModule } from 'ngx-select-dropdown';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SelectDropDownModule,
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent {
  books: any[] = [];
  dropDownList: any[] = [];
  page = 1;
  pageSize = 50;
  pageSizes = [15, 30, 50];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'shop';
  url2 = 'dropdown';
  closeResult: string = '';
  data: any;
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
  totalPages: any;
  results: any[] = [];
  isLoading = false;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    if (this.loading || this.page > this.totalPages) return;
    this.loading = true;
    if (
      this.selectedFilter.includes('ebook') ||
      this.selectedFilter.includes('physical')
    ) {
      this.apiService
        .getShop(
          this.url,
          this.search,
          this.page,
          this.pageSize,
          this.selectedFilter.includes('general')
            ? 'GB'
            : this.selectedFilter.includes('monthly')
              ? 'MB'
              : '',
          this.selectedFilter.includes('ebook') ? true : false,
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
    } else {
      this.apiService
        .getShop(
          this.url,
          this.search,
          this.page,
          this.pageSize,
          this.selectedFilter.includes('general')
            ? 'GB'
            : this.selectedFilter.includes('monthly')
              ? 'MB'
              : '',
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
  }

  get2() {
    let page = 1;
    if (this.isLoading) return;
    this.isLoading = true;

    this.apiService
      .getShop(this.url, this.search, page, this.pageSize, '')
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

  openScrollableContent(longContent: any, book: any) {
    this.data = book;
    this.modalService.open(longContent, { scrollable: true, size: 'xl' });
  }

  selectedFilter: any[] = ['all'];

  setFilter(type: string) {
    this.page = 1;
    this.books = [];
    this.results = [];
    if (type == 'all') {
      this.selectedFilter = [];
      this.selectedFilter.push('all');
    } else {
      this.selectedFilter.push(type);
    }
    this.get();
  }

  gotoDetailPage(id: any, id2: any, type: any) {
    localStorage.setItem('id', id2);

    if (type == 'GB') {
      this.router.navigate([`/probelibrary/${id}/${id2}`]);
    } else {
      this.router.navigate(['/books/' + id]);
    }
  }

  pageChange(event: any) {
    this.page = event;
    window.scrollTo(0, 0);

    this.get();
  }

  getDropDown() {
    this.apiService.getList(this.url2).subscribe(
      (data: any) => {
        this.dropDownList = data.data;
        this.dropDownList = this.dropDownList.sort((a, b) => b - a);
      },
      (error) => {},
    );
  }

  selectionChanged(event: any) {
    this.books = [];
    this.page = 1;
    this.ngOnInit();
  }

  backToTop() {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 2000) {
      this.get();
    }
  }
}
