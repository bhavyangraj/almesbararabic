import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';

interface SlideData {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundClass: string;
}

interface ServiceData {
  icon: string;
  title: string;
  description: string;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  category: string;
  featured?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SafeUrlPipe,
    RouterModule,
    OneComponent,
    TwoComponent,
    ThreeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
// implements OnInit, OnDestroy, AfterViewInit
export class HomeComponent {
  //   @ViewChild('videoModal') videoModal!: ElementRef<HTMLDivElement>;
  //   @ViewChild('modalVideoContent')
  //   modalVideoContent!: ElementRef<HTMLDivElement>;
  //   currentSlide: number = 0;
  //   slideInterval: any;
  //   isVideoModalOpen: boolean = false;
  //   currentVideoTitle: string = '';
  //   selectedVideo: any | null = null;
  //   url = 'home';
  //   private isBrowser: boolean;
  //   private intersectionObserver!: IntersectionObserver;
  //   constructor(
  //     @Inject(PLATFORM_ID) platformId: Object,
  //     private apiService: ApiServiceService,
  //     private router: Router,
  //     private sanitizer: DomSanitizer,
  //   ) {
  //     this.isBrowser = isPlatformBrowser(platformId);
  //   }
  //   getThumbnailUrl(url: string): string {
  //     if (!url) return '';
  //     const videoId = this.extractYouTubeId(url);
  //     return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  //   }
  //   extractYouTubeId(url: string): string | null {
  //     const regex =
  //       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  //     const match = url.match(regex);
  //     return match ? match[1] : null;
  //   }
  //   tabs = [
  //     { id: 'probemedia', title: 'المسبار في الإعلام' },
  //     { id: 'articles', title: 'مقالات' },
  //     { id: 'studies', title: 'دراسات' },
  //     { id: 'summary', title: 'ملخصات' },
  //   ];
  //   selectedTab: any = 'probemedia';
  //   trackByBookId(index: number, book: any): number {
  //     return book.id;
  //   }
  //   currentBookIndex = 0;
  //   nextBook() {
  //     this.currentBookIndex = (this.currentBookIndex + 1) % this.books2.length;
  //   }
  //   prevBook() {
  //     this.currentBookIndex =
  //       (this.currentBookIndex - 1 + this.books2.length) % this.books2.length;
  //   }
  //   goToBook(index: number) {
  //     this.currentBookIndex = index;
  //   }
  //   selectTab(tabId: string) {
  //     this.selectedTab = tabId;
  //   }
  //   getPostsForSelectedTab() {
  //     if (this.selectedTab == 'probemedia') {
  //       return this.probemedia;
  //     } else if (this.selectedTab == 'articles') {
  //       return this.articles;
  //     } else if (this.selectedTab == 'summary') {
  //       return this.summary;
  //     } else {
  //       return this.studies;
  //     }
  //   }
  //   slides2: any[] = [];
  //   menu: any[] = [];
  //   rightmenu: any[] = [];
  //   articles: any;
  //   books2: any;
  //   probemedia: any;
  //   problibrary: any[] = [];
  //   books: any[] = [];
  //   studies: any;
  //   summary: any;
  //   videos2: any[] = [];
  //   studies_in_tolerance: any[] = [];
  //   iranian_studies: any[] = [];
  //   ngOnInit(): void {
  //     if (this.isBrowser) {
  //       this.setupScrollAnimations();
  //       this.setupScrollNavbar();
  //       this.get();
  //     }
  //   }
  //   fileExists2: { [key: string]: boolean } = {};
  //   get() {
  //     this.apiService.getFull2(this.url).subscribe(
  //       (data: any) => {
  //         this.slides2 = data.slider;
  //         this.videos2 = data.videos;
  //         this.menu = data.menu;
  //         this.rightmenu = data.rightmenu;
  //         this.selectedVideo = this.videos2[0];
  //         this.studies_in_tolerance = data.studies_in_tolerance;
  //         this.iranian_studies = data.iranian_studies;
  //       },
  //       (error) => {},
  //     );
  //   }
  //   ngAfterViewInit(): void {
  //     if (this.isBrowser) {
  //       this.setupKeyboardListeners();
  //       setInterval(() => this.nextBook(), 6000);
  //     }
  //   }
  //   ngOnDestroy(): void {
  //     if (this.isBrowser) {
  //       if (this.slideInterval) {
  //         clearInterval(this.slideInterval);
  //       }
  //       if (this.intersectionObserver) {
  //         this.intersectionObserver.disconnect();
  //       }
  //     }
  //   }
  //   scrollToSection(sectionId: string): void {
  //     if (!this.isBrowser) return;
  //     const element = document.getElementById(sectionId);
  //     if (element) {
  //       element.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //       });
  //     }
  //   }
  //   gotoPage(post: any) {
  //     if (this.selectedTab == 'probemedia') {
  //       this.router.navigate(['/probeinmedia/' + post._id]);
  //     } else if (this.selectedTab == 'articles') {
  //       this.router.navigate(['/articles/' + post._id]);
  //     } else if (this.selectedTab == 'summary') {
  //       this.router.navigate(['/summary/' + post._id]);
  //     } else {
  //       this.router.navigate(['/studies/' + post._id]);
  //     }
  //   }
  //   gotoBook2(post: any) {
  //     this.router.navigate(['/books/' + post.id]);
  //   }
  //   gotoVideo(post: any) {
  //     this.router.navigate(['/videos/' + post._id]);
  //   }
  //   onModalBackdropClick(event: MouseEvent): void {
  //     if (event.target === this.videoModal?.nativeElement) {
  //       this.closeVideoModal();
  //     }
  //   }
  //   private setupScrollAnimations(): void {
  //     if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
  //       setTimeout(() => {
  //         const fadeElements = document.querySelectorAll('.fade-in');
  //         fadeElements.forEach((el: Element) => {
  //           el.classList.add('visible');
  //         });
  //       }, 100);
  //       return;
  //     }
  //     const observerOptions: IntersectionObserverInit = {
  //       threshold: 0.1,
  //       rootMargin: '0px 0px -50px 0px',
  //     };
  //     this.intersectionObserver = new IntersectionObserver(
  //       (entries: IntersectionObserverEntry[]) => {
  //         entries.forEach((entry: IntersectionObserverEntry) => {
  //           if (entry.isIntersecting) {
  //             entry.target.classList.add('visible');
  //           }
  //         });
  //       },
  //       observerOptions,
  //     );
  //     setTimeout(() => {
  //       const fadeElements = document.querySelectorAll('.fade-in');
  //       fadeElements.forEach((el: Element) => {
  //         this.intersectionObserver.observe(el);
  //       });
  //     }, 100);
  //   }
  //   private setupScrollNavbar(): void {
  //     if (!this.isBrowser || typeof window === 'undefined') return;
  //     window.addEventListener('scroll', () => {
  //       const navbar = document.querySelector('.navbar') as HTMLElement;
  //       if (navbar) {
  //         if (window.scrollY > 100) {
  //           navbar.style.background = 'rgba(0, 0, 0, 0.95)';
  //         } else {
  //           navbar.style.background = 'rgba(0, 0, 0, 0.9)';
  //         }
  //       }
  //     });
  //   }
  //   private setupKeyboardListeners(): void {
  //     if (!this.isBrowser || typeof document === 'undefined') return;
  //     document.addEventListener('keydown', (event: KeyboardEvent) => {
  //       if (event.key === 'Escape' && this.isVideoModalOpen) {
  //         this.closeVideoModal();
  //       }
  //     });
  //   }
  //   trackByServiceTitle(index: number, service: ServiceData): string {
  //     return service.title;
  //   }
  //   trackBySlideIndex(index: number, slide: SlideData): number {
  //     return index;
  //   }
  //   selectVideo(video: VideoItem): void {
  //     this.selectedVideo = video;
  //   }
  //   closeVideoModal(): void {
  //     this.isVideoModalOpen = false;
  //     if (this.isBrowser && typeof document !== 'undefined') {
  //       document.body.style.overflow = 'auto';
  //     }
  //   }
  //   trackByVideoId(index: number, video: VideoItem): string {
  //     return video.id;
  //   }
}
