import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true,
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.convertToEmbedUrl(url),
    );
  }

  private convertToEmbedUrl(url: string): string {
    if (!url) {
      return '';
    }

    try {
      let videoId: string | null = null;

      // youtu.be/xxxx
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }

      // youtube.com/watch?v=xxxx
      else if (url.includes('youtube.com/watch')) {
        const match = url.match(/[?&]v=([^&]+)/);
        videoId = match ? match[1] : null;
      }

      // already embedded
      else if (url.includes('youtube.com/embed/')) {
        return url;
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return url;
    }
  }
}
