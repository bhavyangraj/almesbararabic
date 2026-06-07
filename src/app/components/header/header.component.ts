import { CommonModule } from '@angular/common';
import { Component, Inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  RouterModule,
  RouterOutlet,
  NavigationEnd,
  Router,
} from '@angular/router';
import { CommonsearchComponent } from '../commonsearch/commonsearch.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    CommonsearchComponent,
    NgbTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  show = false;
  show2 = false;
  show3 = false;
  show4 = false;
  navbutton = false;
  date = new Date();
  weekday = this.date.toLocaleDateString('en-US', { weekday: 'long' } as const);
  day = this.date.toLocaleDateString('en-US', { day: 'numeric' } as const);
  month = this.date.toLocaleDateString('en-US', { month: 'long' } as const);
  year = this.date.toLocaleDateString('en-US', { year: 'numeric' } as const);
  today: any;
  url: any;
  monthnow: any;
  isBrowser = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isBrowser) {
        this.url = this.router.url.split('/');

        this.closeMenu();
      }
    });

    if (this.weekday == 'Monday') {
      this.today = 'الإثنين ';
    } else if (this.weekday == 'Tuesday') {
      this.today = 'الثلاثاء';
    } else if (this.weekday == 'Wednesday') {
      this.today = 'الأربعاء ';
    } else if (this.weekday == 'Thursday') {
      this.today = 'الخميس ';
    } else if (this.weekday == 'Friday') {
      this.today = 'الجمعة ';
    } else if (this.weekday == 'Saturday') {
      this.today = 'السبت';
    } else if (this.weekday == 'Sunday') {
      this.today = 'الأحد';
    }

    if (this.month == 'January') {
      this.monthnow = 'يناير ';
    } else if (this.month == 'February') {
      this.monthnow = 'فبراير';
    } else if (this.month == 'March') {
      this.monthnow = 'مارس';
    } else if (this.month == 'April') {
      this.monthnow = 'أبريل';
    } else if (this.month == 'May') {
      this.monthnow = 'مايو';
    } else if (this.month == 'June') {
      this.monthnow = 'يونيو';
    } else if (this.month == 'July') {
      this.monthnow = 'يوليو';
    } else if (this.month == 'August') {
      this.monthnow = 'أغسطس';
    } else if (this.month == 'September') {
      this.monthnow = 'سبتمبر';
    } else if (this.month == 'October') {
      this.monthnow = 'أكتوبر';
    } else if (this.month == 'November') {
      this.monthnow = 'نوفمبر';
    } else {
      this.monthnow = 'ديسمبر';
    }
  }

  mobileMenu = false;

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }

    this.closeMenu();
  }

  closeMenu() {
    if (!this.isBrowser) {
      return;
    }

    const checkbox = this.document.getElementById(
      'navi-toggle',
    ) as HTMLInputElement | null;

    if (checkbox) {
      checkbox.checked = false;
      this.navbutton = false;
    }
  }

  getClass() {
    return this.url?.[1] === 'presidentspeech'
      ? 'nav-link text-white bg-transparent'
      : 'nav-link bg-transparent';
  }

  getClass2() {
    return 'nav-link bg-transparent';
  }
}
