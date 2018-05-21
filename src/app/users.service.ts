import { Injectable } from '@angular/core';
import { User, Login, LoginToken } from './app.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  get userUrl() {
    return `${environment.apiUrl}/users`;
  }

  get loginUrl() {
    return `${environment.apiUrl}/login`;
  }

  addUser(user: User) {
    return this.http.post<User>(this.userUrl, user);
  }

  delUser(user: User) {
    return this.http.delete(`${this.userUrl}?Email=${user.email}`);
  }

  getUser(user: User) {
    return this.http.get<User>(`${this.userUrl}/${user.email}`);
  }
  getUsers() {
    return this.http.get<User[]>(this.userUrl);
  }

  login(login: Login) {
    return this.http.post<LoginToken>(this.loginUrl, login);
  }
  auth() {}
}
