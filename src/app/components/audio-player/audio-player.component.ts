import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css',
})
export class AudioPlayerComponent {
  @ViewChild('audioElement')
  audioElement!: ElementRef<HTMLAudioElement>;

  @Input()
  audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  trackTitle = 'Your Song Title';
  trackArtist = 'Artist Name';

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 0.7;
  isMuted = false;
  progressPercent = 0;

  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }

    setTimeout(() => {
      if (this.audioElement?.nativeElement) {
        this.audioElement.nativeElement.volume = this.volume;
      }
    });
  }

  ngOnDestroy() {
    if (!this.isBrowser) {
      return;
    }

    if (this.audioElement?.nativeElement) {
      this.audioElement.nativeElement.pause();
    }
  }

  togglePlay() {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const audio = this.audioElement.nativeElement;

    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  onPlay() {
    this.isPlaying = true;
  }

  onPause() {
    this.isPlaying = false;
  }

  onTimeUpdate() {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const audio = this.audioElement.nativeElement;

    this.currentTime = audio.currentTime;

    if (this.duration > 0) {
      this.progressPercent = (this.currentTime / this.duration) * 100;
    }
  }

  onLoadedMetadata() {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const audio = this.audioElement.nativeElement;
    this.duration = audio.duration;
  }

  seek(event: MouseEvent) {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();

    const percent = (event.clientX - rect.left) / rect.width;

    const audio = this.audioElement.nativeElement;
    audio.currentTime = percent * this.duration;
  }

  rewind() {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const audio = this.audioElement.nativeElement;

    audio.currentTime = Math.max(0, audio.currentTime - 10);
  }

  forward() {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const audio = this.audioElement.nativeElement;

    audio.currentTime = Math.min(this.duration, audio.currentTime + 10);
  }

  setVolume(event: Event) {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const input = event.target as HTMLInputElement;

    this.volume = parseFloat(input.value) / 100;

    const audio = this.audioElement.nativeElement;
    audio.volume = this.volume;

    if (this.volume > 0) {
      this.isMuted = false;
    }
  }

  toggleMute() {
    if (!this.isBrowser || !this.audioElement?.nativeElement) {
      return;
    }

    const audio = this.audioElement.nativeElement;

    this.isMuted = !this.isMuted;
    audio.muted = this.isMuted;
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) {
      return '0:00';
    }

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
