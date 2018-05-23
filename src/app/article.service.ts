import { Injectable } from '@angular/core';
import { PostsService } from './posts.service';
import { MarkdownService } from './markdown.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private postsCtrl: PostsService,
    private mdCtrl: MarkdownService
  ) {}

  loadArticleSingle(permalink) {
    return this.postsCtrl.getPost(permalink).map(item => {
      item.rendered = this.mdCtrl.render(item.source);
      return item;
    });
  }
}
