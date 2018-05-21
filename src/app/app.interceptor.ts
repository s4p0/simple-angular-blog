import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private loginCtrl: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.loginCtrl.logged ? this.loginCtrl.model.token : '';

    const request = req.clone({
      headers: req.headers.set('Auth', auth)
    });
    return next.handle(request);
  }
}
