import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { LoginService } from '../login.service';
import { ToolbarService } from '../toolbar.service';
import { takeUntil } from 'rxjs/operators';
const SCROLL_CONTENT = '.mat-drawer-content';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  swapText: boolean;
  toDestroy = new Subject();
  @Output() menu = new EventEmitter<boolean>();
  @Input() showMenuButton: boolean;

  constructor(
    private toolbarCtrl: ToolbarService,
    public loginCtrl: LoginService
  ) {}

  menuToggle(event) {
    this.menu.emit(true);
  }

  ngOnInit() {
    const container = document.querySelector(SCROLL_CONTENT);
    fromEvent(container, 'scroll')
      .pipe(takeUntil(this.toDestroy))
      .subscribe(_ => this.headerPosition(container.scrollTop));
  }

  headerPosition(top: number) {
    this.swapText = top > 98;
  }

  get title() {
    return this.toolbarCtrl.title;
  }

  get subtitle() {
    return this.toolbarCtrl.subtitle;
  }

  ngOnDestroy() {
    this.toDestroy.next();
  }
}
