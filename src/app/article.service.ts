import { Injectable } from '@angular/core';
import { PostsService } from './posts.service';
import { MarkdownService } from './markdown.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Post } from './app.models';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private postsCtrl: PostsService,
    private mdCtrl: MarkdownService
  ) {}

  loadArticleSingle(permalink): Observable<Post> {
    return this.postsCtrl.getPost(permalink).map(item => {
      item.rendered = this.mdCtrl.render(item.source);
      return item;
    });
  }
}
