import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpClient,
  HttpEventType
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ToolbarService } from './toolbar.service';
import { LoadingService } from './loading.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(
    private loginCtrl: LoginService,
    private http: HttpClient,
    private loadingCtrl: LoadingService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.loginCtrl.logged ? this.loginCtrl.model.token : '';

    const isSet = req.reportProgress;
    if (!isSet) {
      const request = req.clone({
        reportProgress: true,
        headers: req.headers.set('Auth', auth)
      });
      this.progress(request);
      return next.handle(request);
    }

    return next.handle(req);
  }

  progress(req: HttpRequest<any>) {
    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          // console.log('Request sent!');
          this.loadingCtrl.startProgress();
          break;
        case HttpEventType.ResponseHeader:
          // console.log('Response header received!');
          // this.loadingCtrl.progress = 50;
          break;
        case HttpEventType.DownloadProgress:
          // const kbLoaded = Math.round(event.loaded / 1024);
          // console.log(`Download in progress! ${kbLoaded}Kb loaded`);
          break;
        case HttpEventType.Response:
          // console.log('😺 Done!', event.body);
          // this.loadingCtrl.progress = 100;
          this.loadingCtrl.stopProgress();
      }
    });
  }
}
