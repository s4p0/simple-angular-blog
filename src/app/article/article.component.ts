import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../app.models';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  post: Post;
  constructor(
    private route: ActivatedRoute,
    private toolbarCtrl: ToolbarService
  ) {
    this.post = this.route.snapshot.data['article'];
  }

  ngOnInit() {
    this.toolbarCtrl.subtitle = this.post.title;
  }

  ngOnDestroy() {
    this.toolbarCtrl.destroySubtitle();
  }
}
