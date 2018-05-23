import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGES } from './app.consts';
import { Login, LoginToken } from './app.models';
import { DbService } from './db.service';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

const empty = { token: '', email: '', name: '' };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUrl: string;
  model: LoginToken;
  constructor(
    private usersCtrl: UsersService,
    private snackBar: MatSnackBar,
    private dbCtrl: DbService,
    private router: Router
  ) {
    this.model = dbCtrl.getLoginToken();
    console.log('db value: ', this.model);
  }

  login(user: Login) {
    this.model = null;
    this.usersCtrl.login(user).subscribe(
      res => {
        this.model = res;
        this.dbCtrl.storeLoginToken(res);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.dbCtrl.removeLoginToken();
        this.snackBar.open(`${MESSAGES.LOGIN_FAILED}: ${err.status}`, null, {
          duration: 800
        });
      }
    );
  }

  logoff() {
    this.model = null;
    this.dbCtrl.removeLoginToken();
    this.snackBar.open(MESSAGES.LOGOFF, null, { duration: 800 });
    this.router.navigate(['/login']);
  }

  get token() {
    return this.model && this.model.token;
  }

  get logged() {
    return this.model != null;
  }
}
