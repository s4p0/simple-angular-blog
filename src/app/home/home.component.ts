import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../app.models';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  constructor(postsCtrl: PostsService, http: HttpClient) {
    postsCtrl.getPosts().subscribe(items => {
      this.posts = items;
    });
  }

  get notEmpty() {
    return this.posts !== undefined && this.posts.length > 0;
  }

  ngOnInit() {}
}
