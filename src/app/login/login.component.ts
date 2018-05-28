import { Component, OnInit } from '@angular/core';
import { Login } from '../app.models';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: Login;

  constructor(private loginCtrl: LoginService) {
    this.model = { email: '', password: '' };
  }

  ngOnInit() {}

  send() {
    // console.log(this.model);
    this.loginCtrl.login(this.model);
  }
}
