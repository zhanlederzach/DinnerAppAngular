import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {ProviderService} from './services/provider.service';
import {TOKEN_KEY} from './api_config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public providerService: ProviderService,
              public authService: ProviderService) { }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(TOKEN_KEY);

    console.log('TOKEN: ', token);

    if (token) {
      request = this.addToken(request, token);
    }

    // if (this.authService.getJwtToken()) {
    //   request = this.addToken(request, token);
    // }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    })) as any;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    console.log('~~~~~~~~', token);
    return request.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.token);
          return next.handle(this.addToken(request, token.token));
        }));
    } else {
      this.isRefreshing = false;
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((token: string) => {
          return next.handle(this.addToken(request, token));
        }));
    }
  }
}
