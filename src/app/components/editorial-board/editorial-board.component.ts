import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editorial-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgbModule],
  templateUrl: './editorial-board.component.html',
  styleUrl: './editorial-board.component.css',
})
export class EditorialBoardComponent implements OnInit {
  studiesintolerances: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  totalPages: any;
  public isActive: any = true;
  search = '';
  url = 'getAllAuthors';
  hideImages = true;
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
    if (isPlatformBrowser(this.platformId)) {
      this.get();
    }
  }

  get() {
    this.apiService
      .getAll(this.url, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.studiesintolerances = data.data;
          this.studiesintolerances = data.data.sort(
            (a: any, b: any) => a.id - b.id,
          );
          this.size = data.count;
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
    this.router.navigate(['/editorialboard/' + id]);
  }
}
