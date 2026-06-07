import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    private loaderService: LoaderService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  private removeRequest(req: HttpRequest<any>): void {
    const index = this.requests.indexOf(req);

    if (index !== -1) {
      this.requests.splice(index, 1);
    }

    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  private handleError(error: HttpErrorResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      console.error('HTTP Error:', error);
    } else {
      console.error('SSR HTTP Error:', error);
    }
  }

  private activeRequests = 0;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.activeRequests++;
    this.loaderService.isLoading.next(true);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests <= 0) {
          this.activeRequests = 0;
          this.loaderService.isLoading.next(false);
        }
      }),
    );
  }
}
