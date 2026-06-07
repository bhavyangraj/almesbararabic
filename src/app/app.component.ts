import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    FormsModule,
    MyLoaderComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  title = 'almesbar_net_new';

  isShown = false;
  scrollProgress = 0;
  radius = 24;
  circumference = 2 * Math.PI * this.radius;

  get strokeDashoffset() {
    return (
      this.circumference - (this.scrollProgress / 100) * this.circumference
    );
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBrowser) {
      return;
    }

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    this.scrollProgress = (scrollTop / docHeight) * 100;
    this.isShown = scrollTop > 200;
  }

  scrollToTop() {
    if (!this.isBrowser) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
