import {
  Component,
  HostListener,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-viewcomponent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SocialLinksComponent,
  ],
  templateUrl: './viewcomponent.component.html',
  styleUrl: './viewcomponent.component.css',
})
export class ViewcomponentComponent implements OnInit {
  readonly isBrowser: boolean;

  studies: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  public isActive: any = true;
  search = '';
  url = 'studies';
  hideImages = true;
  loading = false;
  totalPages: any;
  results: any[] = [];
  isLoading = false;

  private routeMap: Record<string, string> = {
    areports: 'areport',
    dialouges: 'dialouge',
    ediorspicks: 'ediorpick',
    selections: 'selection',
    amessagefromnewyork: 'AMessageFromNewyork',
    popefrancisvisit: 'PopeFrancisVisit',
    readingreport: 'ReadingReport',
    thecenterwrotes: 'TheCenterWrote',
    otherpaths: 'OtherPaths',
    editorials: 'Editorials',
    readingabooks: 'readingabook',
    mainmajors: 'Mainmajor',
    supportingwomenweakensextremism: 'SupportingWomenWeakensExtremism',
    covid19pandemics: 'Covid19Pandemic',
    weeklyreports: 'WeeklyReports',
    translations: 'Translations',
    teachingphilosophies: 'TeachingPhilosophy',
    lebaneseislamists: 'LebaneseIslamists',
    centernews: 'CenterNews',
    immigrations: 'Immigration',
    september11events: 'September11Events',
  };

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const routeName = this.router.url.split('/')[1];

    if (this.routeMap[routeName]) {
      this.url = this.routeMap[routeName];
    }

    this.get();
  }

  reset(): void {
    this.studies = [];
    this.page = 1;
  }

  getName(): string {
    return this.apiService.getArabicName(this.url);
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
          this.studies = [...this.studies, ...(data?.data || [])];

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
    this.studies = [];
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
    const routeName = this.router.url.split('/')[1];
    this.router.navigate(['/', routeName, id]);
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

  getUrl(data: any): string {
    return this.isBrowser ? `${window.location.href}/${data}` : '';
  }
}
