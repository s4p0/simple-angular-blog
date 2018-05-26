import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToolbarService } from '../toolbar.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(
    private toolbarCtrl: ToolbarService,
    public loginCtrl: LoginService
  ) {}

  @Output() menu = new EventEmitter<boolean>();

  menuToggle(event) {
    this.menu.emit(true);
  }

  ngOnInit() {}

  get title() {
    return this.toolbarCtrl.title;
  }

  get loading() {
    return this.toolbarCtrl.loading;
  }
}
