import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Post } from '../app.models';
import { MarkdownService } from '../markdown.service';
import { PostsService } from '../posts.service';

@Injectable()
export class HomeService {
  posts: Observable<Post[]>;
  constructor(
    private http: HttpClient,
    private mark: MarkdownService,
    private postCtrl: PostsService
  ) {
    this.posts = postCtrl.getPosts();
  }
}
