import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MarkdownService } from '../markdown.service';
import { Post } from '../app.models';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  post: Post;
  rendered: any;
  title: string;
  constructor(
    route: ActivatedRoute,
    // private http: HttpClient,
    private mark: MarkdownService,
    private posts: PostsService
  ) {
    this.title = route.snapshot.paramMap.get('title');

    this.loadArticle();
  }

  loadArticle() {
    this.posts.getPost(this.title).subscribe(res => {
      res.rendered = this.mark.render(res.source);
      this.post = res;
    });
  }

  ngOnInit() {}
}

// https://api.myjson.com/bins/grxii
// const url = `https://api.myjson.com/bins/${this.id}`;
// const url = `https://api.myjson.com/bins/${this.id}`;
