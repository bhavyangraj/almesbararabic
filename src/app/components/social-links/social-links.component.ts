import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css',
})
export class SocialLinksComponent {
  @Input() shareUrl?: string;
  @Input() right?: any = null;
  @Input() position?: any = 'absolute';
  @Input() mobile?: boolean = false;

  readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private getShareUrl(): string {
    if (this.shareUrl) {
      return this.shareUrl;
    }

    if (this.isBrowser) {
      return window.location.href;
    }

    return '';
  }

  onFacebookClick(): void {
    if (!this.isBrowser) return;

    const url = encodeURIComponent(this.getShareUrl());
    const shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    this.openPopup(shareLink);
  }

  onTwitterClick(): void {
    if (!this.isBrowser) return;

    const url = encodeURIComponent(this.getShareUrl());

    const shareLink = `https://twitter.com/intent/tweet?url=${url}`;

    this.openPopup(shareLink);
  }

  onLinkedInClick(): void {
    if (!this.isBrowser) return;

    const url = encodeURIComponent(this.getShareUrl());

    const shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    this.openPopup(shareLink);
  }

  onWhatsAppClick(): void {
    if (!this.isBrowser) return;

    const url = encodeURIComponent(this.getShareUrl());

    const shareLink = `https://wa.me/?text=${url}`;

    this.openPopup(shareLink);
  }

  async onShareClick(): Promise<void> {
    if (!this.isBrowser) return;

    const url = this.getShareUrl();

    if (navigator.share) {
      try {
        await navigator.share({
          url,
        });
      } catch {}
    } else {
      this.copyToClipboard(url);
    }
  }

  private openPopup(url: string): void {
    if (!this.isBrowser) return;

    const width = 600;
    const height = 400;

    const left = (window.innerWidth - width) / 2;

    const top = (window.innerHeight - height) / 2;

    window.open(
      url,
      'share',
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`,
    );
  }

  private copyToClipboard(text: string): void {
    if (!this.isBrowser) return;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {})
        .catch((err) => {
          console.error('Failed to copy:', err);
        });

      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.select();

    document.execCommand('copy');

    document.body.removeChild(textArea);
  }
}
