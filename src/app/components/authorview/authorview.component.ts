import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Router, RouterModule } from '@angular/router';
import { SocialLinksComponent } from '../social-links/social-links.component';

interface Tab {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  content: string;
}

@Component({
  selector: 'app-authorview',
  standalone: true,
  imports: [CommonModule, RouterModule, SocialLinksComponent],
  templateUrl: './authorview.component.html',
  styleUrl: './authorview.component.css',
})
export class AuthorviewComponent implements OnInit {
  url: any;
  authorname: any;
  authors: any[] = [];
  data: any[] = [];
  page = 1;
  pageSize = 10;
  pageSizes = [10, 50, 100, 200, 300, 400];
  size = 0;
  totalPages: any;
  search = '';
  url2 = 'getAllAuthors';
  url3 = 'researchers';
  keys: any = [];
  isBrowser = false;
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.url = router.url.split('/');
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.get2();
  }

  selectedTab: any;
  get() {
    this.apiService.getAuthorData(this.data[0]?.author_arabic).subscribe(
      (data: any) => {
        this.authors = data.results;
        this.authorname = data.author;

        this.keys = Object.keys(this.authors);
        this.selectedTab = this.keys[0];
      },
      (error) => {},
    );
  }

  get2() {
    this.apiService
      .getAll(this.url2, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.data = data.data;
          this.data = data.data.filter(
            (item: any) => item.name === this.url[2],
          );
          if (this.data.length == 0) {
            this.get3();
          } else {
            this.get();
          }

          this.size = data.count;
        },
        (error) => {},
      );
  }

  get3() {
    this.apiService
      .getAll(this.url3, this.search, this.page, this.pageSize)
      .subscribe(
        (data: any) => {
          this.data = data.data;
          this.data = data.data.filter(
            (item: any) => item.name === this.url[2],
          );
          this.get();

          this.size = data.count;
        },
        (error) => {},
      );
  }

  selectedIndex = 0;
  chapters: any[] = [];
  select(i: number) {
    this.selectedIndex = i;
    this.selectedTab = this.keys[i];
    this.chapters = [];
    if (this.selectedTab == 'books') {
      for (let a of this.authors[this.selectedTab].data) {
        for (let b of a.listOfChapters) {
          if (b.author_arabic == this.authorname) {
            this.chapters.push(b);
            this.chapters[this.chapters.length - 1].id = a.id;
            this.chapters[this.chapters.length - 1].id_number = a.id_number;
            this.chapters[this.chapters.length - 1].frontimage = a.frontimage;
          }
        }
      }
    }
  }

  getImage(data: any) {
    return 'assets/title/title' + data.id_number + '.jpg';
  }

  onKeydown(ev: KeyboardEvent, i: number) {
    const max = this.keys.length - 1;
    if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      this.selectedIndex = i === max ? 0 : i + 1;
      (ev.target as HTMLElement)?.focus();
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      this.selectedIndex = i === 0 ? max : i - 1;
      (ev.target as HTMLElement)?.focus();
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      this.selectedIndex = 0;
    } else if (ev.key === 'End') {
      ev.preventDefault();
      this.selectedIndex = max;
    }
  }

  getUrl() {
    return this.isBrowser ? window.location.href : '';
  }

  gotoPage(data: any) {
    let url: any;
    if (this.selectedTab == 'articles') {
      url = 'articles';
    } else if (this.selectedTab == 'generals') {
      url = 'general';
    } else if (this.selectedTab == 'philosophicals') {
      url = 'philosophical';
    } else if (this.selectedTab == 'audiobooks') {
      url = 'audiobooks';
    } else if (this.selectedTab == 'interviews') {
      url = 'interviews';
    } else if (this.selectedTab == 'studies') {
      url = 'studies';
    } else if (this.selectedTab == 'studies_in_tolerances') {
      url = 'studiesintolerance';
    } else if (this.selectedTab == 'taliban') {
      url = 'taliban';
    } else if (this.selectedTab == 'probe_in_medias') {
      url = 'probeinmedia';
    } else if (this.selectedTab == 'files') {
      url = 'files';
    } else if (this.selectedTab == 'videos') {
      url = 'videos';
    } else if (this.selectedTab == 'highdebates') {
      url = 'highdebate';
    } else if (this.selectedTab == 'summary') {
      url = 'summary';
    } else if (this.selectedTab == 'probe_libraries') {
      url = 'probelibrary';
    } else if (this.selectedTab == 'september_11_events') {
      url = 'september11events';
    } else if (this.selectedTab == 'lebanese_islamists') {
      url = 'lebaneseislamists';
    } else if (this.selectedTab == 'center_news') {
      url = 'centernews';
    } else if (this.selectedTab == 'immigrations') {
      url = 'immigrations';
    } else if (this.selectedTab == 'teaching_philosophies') {
      url = 'teachingphilosophies';
    } else if (this.selectedTab == 'translations') {
      url = 'translations';
    } else if (this.selectedTab == 'weekly_reports') {
      url = 'weeklyreports';
    } else if (this.selectedTab == 'covid_19_pandemics') {
      url = 'covid19pandemics';
    } else if (this.selectedTab == 'supporting_women_weakens_extremism') {
      url = 'supportingwomenweakensextremism';
    } else if (this.selectedTab == 'main_majors') {
      url = 'mainmajors';
    } else if (this.selectedTab == 'a_message_from_newyork') {
      url = 'amessagefromnewyork';
    } else if (this.selectedTab == 'pope_francis_visit') {
      url = 'popefrancisvisit';
    } else if (this.selectedTab == 'reading_report') {
      url = 'readingreport';
    } else if (this.selectedTab == 'the_center_wrotes') {
      url = 'thecenterwrotes';
    } else if (this.selectedTab == 'other_paths') {
      url = 'otherpaths';
    } else if (this.selectedTab == 'editorials') {
      url = 'editorials';
    } else if (this.selectedTab == 'reading_a_books') {
      url = 'readingabooks';
    } else if (this.selectedTab == 'a_reports') {
      url = 'areports';
    } else if (this.selectedTab == 'dialouges') {
      url = 'dialouges';
    } else if (this.selectedTab == "edior's_picks") {
      url = 'ediorspicks';
    } else if (this.selectedTab == 'selections') {
      url = 'selections';
    }
    if (url == 'probelibrary') {
      this.router.navigate(['/' + url + '/' + data.id + '/' + data._id]);
    } else {
      this.router.navigate(['/' + url + '/' + data._id]);
    }
  }

  getArabicName(data: any) {
    if (data == 'articles') {
      return 'مقالات';
    } else if (data == 'generals') {
      return 'مفاهيم عامة';
    } else if (data == 'philosophicals') {
      return 'مفاهيم فلسفية';
    } else if (data == 'audiobooks') {
      return 'كتب صوتية';
    } else if (data == 'interviews') {
      return 'مقابلات';
    } else if (data == 'studies') {
      return 'دراسات';
    } else if (data == 'studies_in_tolerances') {
      return 'دراسات في التسامح';
    } else if (data == 'taliban') {
      return 'طالبان';
    } else if (data == 'probe_in_medias') {
      return 'المسبار في الإعلام';
    } else if (data == 'files') {
      return 'ملفات';
    } else if (data == 'videos') {
      return 'فيديو المسبار';
    } else if (data == 'highdebates') {
      return 'سجالات رفيعة';
    } else if (data == 'summary') {
      return 'ملخصات';
    } else if (data == 'probe_libraries') {
      return 'مكتبة المسبار';
    } else if (data == 'books') {
      return 'كتب المركز';
    } else if (data == 'september_11_events') {
      return 'أحداث 11سبتمبر';
    } else if (data == 'lebanese_islamists') {
      return 'إسلاميو لبنان';
    } else if (data == 'center_news') {
      return 'اخبار المركز';
    } else if (data == 'immigrations') {
      return 'الهجرة';
    } else if (data == 'teaching_philosophies') {
      return 'تدريس الفلسفة';
    } else if (data == 'translations') {
      return 'ترجمات';
    } else if (data == 'weekly_reports') {
      return 'تقارير أسبوعية';
    } else if (data == 'covid_19_pandemics') {
      return 'جائحة (كوفيد -19)';
    } else if (data == 'supporting_women_weakens_extremism') {
      return 'دعم المرأة يمرض التطرف';
    } else if (data == 'main_majors') {
      return 'رئيسي';
    } else if (data == 'a_message_from_newyork') {
      return 'رسالة من نيويورك';
    } else if (data == 'pope_francis_visit') {
      return 'زيارة البابا فرنسيس';
    } else if (data == 'reading_report') {
      return 'قراءة في تقرير';
    } else if (data == 'the_center_wrotes') {
      return 'كتب المركز';
    } else if (data == 'other_paths') {
      return 'مسارات أخرى';
    } else if (data == 'editorials') {
      return 'مقالات رئيس التحرير';
    } else if (data == 'reading_a_books') {
      return 'قراءة في كتاب';
    } else if (data == 'a_reports') {
      return 'تقرير';
    } else if (data == 'dialouges') {
      return 'حوارات';
    } else if (data == "edior's_picks") {
      return 'اختيارات المحرر';
    } else if (data == 'selections') {
      return 'مختارات';
    } else {
      return 'Others';
    }
  }
}
