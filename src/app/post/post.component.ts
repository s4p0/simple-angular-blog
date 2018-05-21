import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../app.models';
import { MarkdownService } from '../markdown.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  subbed: Subscription;
  @Input() data: Post;
  @Input() showMore: boolean;
  constructor(private mark: MarkdownService) {}

  ngOnInit() {}

  get post() {
    return this.renderedData;
  }

  get renderedData() {
    if (this.data.rendered == null) {
      // this.data.rendered = this.mark.render(this.data.source);
      this.data.rendered = this.mark.render(this.text);
    }
    return this.data;
  }

  shorter(text: string) {
    const lines = text.split('\n');
    const remainer = lines.splice(0, 5);
    return remainer.join('\n');
  }

  get excerpt() {
    return this.shorter(this.data.source);
  }

  get fullText() {
    return this.data.source;
  }

  get text() {
    if (this.showMore) {
      return this.excerpt;
    }
    return this.fullText;
  }
}
