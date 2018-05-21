import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  posts$: Observable<Object>;

  constructor(hs: HomeService, http: HttpClient) {
    this.posts$ = hs.posts;
  }

  ngOnInit() {}
}
