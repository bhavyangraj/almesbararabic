import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-one',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './one.component.html',
  styleUrl: './one.component.css',
})
export class OneComponent implements OnInit {
  gotoDetail(slide: any) {
    if (slide.category == 'Books') {
      this.router.navigate(['/books/' + slide.id]);
    } else if (slide.category == 'Studies') {
      this.router.navigate(['/studies/' + slide._id]);
    } else if (slide.category == 'Media') {
      this.router.navigate(['/probeinmedia/' + slide._id]);
    } else if (slide.category == 'ProbeLibrary') {
      this.router.navigate([`/probelibrary/${slide.id}/${slide._id}`]);
    } else if (slide.category == 'Articles') {
      this.router.navigate(['/articles/' + slide._id]);
    } else if (slide.category == 'AudioBooks') {
      this.router.navigate(['/audiobooks/' + slide._id]);
    } else if (slide.category == 'Taliban') {
      this.router.navigate(['/taliban/' + slide._id]);
    } else if (slide.category == 'PConcepts') {
      this.router.navigate(['/philosophical/' + slide._id]);
    } else if (slide.category == 'GConcepts') {
      this.router.navigate(['/general/' + slide._id]);
    } else if (slide.category == 'Files') {
      this.router.navigate(['/files/' + slide._id]);
    } else if (slide.category == 'Interviews') {
      this.router.navigate(['/interviews/' + slide._id]);
    } else if (slide.category == 'StudiesInTolerance') {
      this.router.navigate(['/studiesintolerance/' + slide._id]);
    } else if (slide.category == 'Videos') {
      this.router.navigate(['/videos/' + slide._id]);
    } else if (slide.category == 'Summary') {
      this.router.navigate(['/summary/' + slide._id]);
    } else if (slide.category == 'HighDebate') {
      this.router.navigate(['/highdebate/' + slide._id]);
    } else if (slide.category == 'IranianStudies') {
      this.router.navigate(['/iranianstudies/' + slide._id]);
    } else if (slide.category == 'Infographics') {
      this.router.navigate(['/infographics/' + slide._id]);
    }
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private apiService: ApiServiceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private sharedDataService: SharedDataService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private isBrowser: boolean;

  ngOnInit(): void {
    this.get();

    if (this.isBrowser) {
      this.startSlideshow();
    }
  }

  slides2: any[] = [];
  menu: any[] = [];
  rightmenu: any[] = [];
  url = 'homemenus';
  currentSlide: number = 0;
  slideInterval: ReturnType<typeof setInterval> | null = null;
  studies_in_tolerance: any[] = [];
  iranian_studies: any[] = [];

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  get() {
    this.apiService.getFull2(this.url).subscribe(
      (data: any) => {
        this.slides2 = data.slider;
        // this.videos2 = data.videos;
        this.menu = data.menu;
        this.rightmenu = data.rightmenu;
        // this.selectedVideo = this.videos2[0];
        // this.studies_in_tolerance = data.studies_in_tolerance;
        // this.iranian_studies = data.iranian_studies;

        this.sharedDataService.studiesInTolerance$.subscribe((data) => {
          this.studies_in_tolerance = data;
        });

        this.sharedDataService.iranianStudies$.subscribe((data) => {
          this.iranian_studies = data;
        });
      },
      (error) => {},
    );
  }

  nextSlide() {
    if (!this.slides2.length) {
      return;
    }

    this.currentSlide = (this.currentSlide + 1) % this.slides2.length;
  }

  prevSlide() {
    if (!this.slides2.length) {
      return;
    }

    this.currentSlide =
      (this.currentSlide - 1 + this.slides2.length) % this.slides2.length;
  }

  startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  showSlide(index: number): void {
    if (index >= 0 && index < this.slides2.length) {
      this.currentSlide = index;
    }
  }

  onDotClick(index: number): void {
    this.showSlide(index);

    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startSlideshow();
    }
  }

  checkFileExists2(fileName: string) {
    return `assets/bhm/mb/title/title${fileName}.webp`;
  }
}
