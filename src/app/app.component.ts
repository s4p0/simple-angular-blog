import { Component, ViewChild, OnInit } from '@angular/core';
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
import { BreakpointObserver } from '@angular/cdk/layout';
import { pluck } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSmallScreen: boolean;
  loading: boolean;
  isOpened: boolean;
  @ViewChild(MatSidenav) sideNav: MatSidenav;
  constructor(
    router: Router,
    private loginCtrl: LoginService,
    private toolbarCtrl: ToolbarService,
    private breakpoint: BreakpointObserver,
    private loadingCtrl: LoadingService
  ) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.routerEventHandler(routerEvent);
    });
  }

  ngOnInit(): void {
    this.breakpoint
      .observe(['(max-width: 901px'])
      .pipe(pluck('matches'))
      .subscribe((n: boolean) => (this.isSmallScreen = n));
  }

  get sideMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  routerEventHandler(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationStart) {
      this.loadingCtrl.startProgress();
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loadingCtrl.stopProgress();
    }

    return routerEvent;
  }

  get inProgress() {
    return this.loadingCtrl.isProgressing;
  }
}
