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
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;
  constructor(
    router: Router,
    private loginCtrl: LoginService,
    private toolbarCtrl: ToolbarService
  ) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.routerEventHandler(routerEvent);
    });
  }

  routerEventHandler(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationStart) {
      this.toolbarCtrl.loading = true;
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.toolbarCtrl.loading = false;
    }

    return routerEvent;
  }
}
