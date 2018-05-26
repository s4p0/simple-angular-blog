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
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menus$: Observable<IMenu[]>;

  constructor(private loginCtrl: LoginService) {
    const menus = [];
    menus.push({ caption: 'Início', link: '/home' });
    menus.push({ caption: 'Sobre mim', link: '/about' });
    menus.push({
      caption: 'Entrar',
      link: '/login',
      condition: _ => !this.loginCtrl.logged
    });
    menus.push({
      caption: 'Compor',
      link: '/you-should-not-be-here',
      condition: _ => this.loginCtrl.logged
    });
    menus.push({
      caption: 'Painel',
      link: '/dashboard',
      condition: _ => this.loginCtrl.logged
    });
    menus.push({
      caption: 'Sair',
      condition: _ => this.loginCtrl.logged,
      action: _ => loginCtrl.logoff()
    });
    this.menus$ = of(menus);
  }

  ngOnInit() {}

  get name() {
    return this.loginCtrl.logged ? this.loginCtrl.model.name : '';
  }
}
