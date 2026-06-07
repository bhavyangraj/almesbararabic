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

@Component({
  selector: 'app-probe-library',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgbModule],
  templateUrl: './probe-library.component.html',
  styleUrls: ['./probe-library.component.css'],
})
export class ProbeLibraryComponent implements OnInit {
  probeinlibrarys: any[] = [];
  page = 1;
  pageSize = 15;
  pageSizes = [15, 30, 50];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'probelibrary';
  closeResult: string = '';
  data: any;
  loading = false;
  totalPages: any;

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
  }

  get() {
    if (this.loading || this.page > this.totalPages) return;

    this.loading = true;

    this.apiService
      .getAll(this.url, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.probeinlibrarys = [...this.probeinlibrarys, ...data.data];
          this.page++;
          this.totalPages = data.totalPages;
          this.loading = false;
          this.size = data.count;
        },
        (error: any) => {
          this.loading = false;
        },
      );
  }

  handlePageSizeChange(): void {
    this.page = 1;
    this.ngOnInit();
  }

  openScrollableContent(longContent: any, probeinlibrary: any) {
    this.data = probeinlibrary;
    this.modalService.open(longContent, {
      scrollable: true,
      size: 'xl',
    });
  }

  gotoDetailPage(id: any, id2: any) {
    if (this.isBrowser) {
      localStorage.setItem('id', id2);
    }

    this.router.navigate([`/probelibrary/${id}/${id2}`]);
  }

  pageChange(event: any) {
    this.page = event;

    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }

    this.get();
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
