import { Injectable } from '@angular/core';
import { KEY_NAMES, MESSAGES } from './app.consts';
import { Post, LoginToken } from './app.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  observe(subject: BehaviorSubject<any>): any {
    if (!subject) {
      return;
    }
    subject.subscribe(item => {
      this.storePost(item);
    });
  }
  constructor(private snackBar: MatSnackBar) {}

  storePost(post: Post) {
    this.snackBar.open(MESSAGES.POST_SAVED, null, {
      duration: 800
    });
    localStorage.setItem(KEY_NAMES.TEMP_POST, JSON.stringify(post));
  }

  getPost() {
    const storedValue = localStorage.getItem(KEY_NAMES.TEMP_POST);
    const res = storedValue != null ? JSON.parse(storedValue) : {};
    return <Post>res;
  }

  storeLoginToken(login: LoginToken) {
    localStorage.setItem(KEY_NAMES.AUTH_KEY_NAME, JSON.stringify(login));
    this.snackBar.open(`${MESSAGES.LOGIN_SUCCESSFUL} ${login.name}!`, null, {
      duration: 800
    });
  }

  getLoginToken() {
    const storedValue = localStorage.getItem(KEY_NAMES.AUTH_KEY_NAME);
    const res = storedValue != null ? JSON.parse(storedValue) : null;
    return <LoginToken>res;
  }

  removeLoginToken() {
    localStorage.removeItem(KEY_NAMES.AUTH_KEY_NAME);
  }
}
