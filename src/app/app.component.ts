import { Component, ViewChild } from '@angular/core';
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
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;
  isOpened: boolean;
  @ViewChild(MatSidenav) sideNav: MatSidenav;
  constructor(
    router: Router,
    private loginCtrl: LoginService,
    private toolbarCtrl: ToolbarService
  ) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.routerEventHandler(routerEvent);
    });
  }

  handleMenu(evt) {
    if (evt) {
      this.sideNav.open();
    }
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
