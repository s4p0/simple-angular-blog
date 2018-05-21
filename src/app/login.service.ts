import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MESSAGES } from './app.consts';
import { Login, LoginToken } from './app.models';
import { DbService } from './db.service';
import { UsersService } from './users.service';

const empty = { token: '', email: '', name: '' };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  model: LoginToken;
  constructor(
    private usersCtrl: UsersService,
    private snackBar: MatSnackBar,
    private dbCtrl: DbService
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
  }

  get token() {
    return this.model && this.model.token;
  }

  get logged() {
    return this.model != null;
  }
}
