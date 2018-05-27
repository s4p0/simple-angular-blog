import { Component, OnInit, Predicate } from '@angular/core';
import { LoginService } from '../login.service';
import { FunctionCall } from '@angular/compiler';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, filter, flatMap } from 'rxjs/operators';

interface IMenu {
  caption: string;
  link?: string;
  condition?: Predicate<boolean>;
  action?: FunctionCall;
  icon?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menus$: Observable<IMenu[]>;

  constructor(private loginCtrl: LoginService) {}

  ngOnInit() {
    this.buildMenu();
  }

  get name() {
    return this.loginCtrl.logged ? this.loginCtrl.model.name : '';
  }

  buildMenu() {
    const menus = [];
    menus.push({ caption: 'Início', link: '/home', icon: 'home' });
    menus.push({ caption: 'Sobre mim', link: '/about', icon: 'face' });
    menus.push({
      caption: 'Entrar',
      link: '/login',
      condition: _ => !this.loginCtrl.logged,
      icon: 'lock'
    });
    menus.push({
      caption: 'Compor',
      link: '/you-should-not-be-here',
      condition: _ => this.loginCtrl.logged,
      icon: 'insert_comment'
    });
    menus.push({
      caption: 'Painel',
      link: '/dashboard',
      condition: _ => this.loginCtrl.logged,
      icon: 'dashboard'
    });
    menus.push({
      caption: 'Sair',
      condition: _ => this.loginCtrl.logged,
      action: _ => this.loginCtrl.logoff(),
      icon: 'lock_open'
    });
    this.menus$ = of(menus);
  }
}
