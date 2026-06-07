import {
  Component,
  Input,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-audio-player-horizontal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player-horizontal.component.html',
  styleUrl: './audio-player-horizontal.component.css',
})
export class AudioPlayerHorizontalComponent {
  private audio: HTMLAudioElement | null = null;

  isPlaying = false;
  isLoaded = false;
  currentTime = '0:00';
  duration = '0:00';
  progressScale = 0;

  isBrowser = false;

  @Input()
  trackUrl =
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/xLA6bn00SGeEeP49aPxxwnpyolaECLhfhXRc5fr0.mp3';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.initAudio();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isBrowser) {
      return;
    }

    if (changes['trackUrl'] && changes['trackUrl'].currentValue) {
      if (this.audio) {
        this.audio.pause();
      }

      this.audio = new Audio(this.trackUrl);
      this.initAudioEvents();
    }
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }

  private initAudio(): void {
    this.audio = new Audio(this.trackUrl);
    this.initAudioEvents();
  }

  private initAudioEvents(): void {
    if (!this.audio) {
      return;
    }

    this.audio.addEventListener('loadeddata', () => {
      this.isLoaded = true;

      if (this.audio) {
        this.duration = this.formatTime(this.audio.duration);
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.currentTime = this.formatTime(this.audio.currentTime);

        this.progressScale =
          this.audio.duration > 0
            ? this.audio.currentTime / this.audio.duration
            : 0;
      }
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;

      if (this.audio) {
        this.audio.currentTime = 0;
      }
    });
  }

  togglePlay(): void {
    if (!this.isBrowser || !this.audio || !this.isLoaded) {
      return;
    }

    if (this.audio.paused) {
      this.audio.play();
      this.isPlaying = true;
    } else {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  private formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    let seconds: number | string = Math.floor(time % 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  seekAudio(event: MouseEvent): void {
    if (!this.isBrowser || !this.audio || !this.isLoaded) {
      return;
    }

    const progressContainer = event.currentTarget as HTMLElement;

    const rect = progressContainer.getBoundingClientRect();

    const width = rect.width;

    const distanceFromRight = rect.right - event.clientX;

    const clickedRatio = distanceFromRight / width;

    const ratio = Math.max(0, Math.min(1, clickedRatio));

    this.audio.currentTime = this.audio.duration * ratio;

    this.progressScale = ratio;

    this.currentTime = this.formatTime(this.audio.currentTime);

    if (this.audio.paused) {
      this.audio.play();
      this.isPlaying = true;
    }
  }
}
