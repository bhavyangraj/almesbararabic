import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';

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
  selector: 'app-three',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SafeUrlPipe],
  templateUrl: './three.component.html',
  styleUrl: './three.component.css',
})
export class ThreeComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private apiService: ApiServiceService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  readonly isBrowser: boolean;

  isVideoModalOpen: boolean = false;
  currentVideoTitle: string = '';
  selectedVideo: any | null = null;

  gotoVideo(post: any) {
    this.router.navigate(['/videos/' + post._id]);
  }

  videos2: any[] = [];
  url = 'homevideos';

  ngOnInit(): void {
    this.get();
  }
  get() {
    this.apiService.getFull2(this.url).subscribe(
      (data: any) => {
        this.videos2 = data.videos;
        this.selectedVideo = this.videos2.length > 0 ? this.videos2[0] : null;
      },
      (error) => {},
    );
  }

  getThumbnailUrl(url: string): string {
    if (!url) return '';

    const videoId = this.extractYouTubeId(url);

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  extractYouTubeId(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  selectVideo(video: VideoItem): void {
    this.selectedVideo = video;
    this.isVideoLoaded = false;
  }

  trackByVideoId(index: number, video: VideoItem): string {
    return video.id;
  }

  isVideoLoaded = false;
  videoUrl = '';

  loadVideo() {
    if (!this.selectedVideo?.media1) {
      return;
    }

    const videoId = this.extractYouTubeId(this.selectedVideo.media1);

    if (!videoId) {
      return;
    }

    this.videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    this.isVideoLoaded = true;
  }
}
