import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../app.models';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  post: Post;
  constructor(private route: ActivatedRoute) {
    this.post = this.route.snapshot.data['article'];
  }

  ngOnInit() {}
}
