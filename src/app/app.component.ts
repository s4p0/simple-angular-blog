import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent
} from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;
  title = 'Blog';
  constructor(private loginCtrl: LoginService, router: Router) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.routerEventHandler(routerEvent);
    });
  }

  routerEventHandler(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
      console.log(this.loading);
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
      console.log(this.loading);
    }

    return routerEvent;
  }
}
