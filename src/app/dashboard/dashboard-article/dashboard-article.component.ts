import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { PostsService } from '../../posts.service';
import { Observable } from 'rxjs';
import { Post } from '../../app.models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-article',
  templateUrl: './dashboard-article.component.html'
})
export class DashboardArticleComponent implements OnInit, OnDestroy {
  @ViewChild('dialog') dialog: TemplateRef<any>;
  posts$: Observable<Post[]>;
  constructor(private postsCtrl: PostsService, private dialogCtrl: MatDialog) {
    this.posts$ = postsCtrl.getPosts();
  }
  delete(post: Post) {
    const ref = this.dialogCtrl.open(
      this.dialog /*, { data: post }// add in the future */
    );
    ref.afterClosed().subscribe(item => this.removePost(item, post));
  }

  removePost(result, post) {
    if (result) {
      this.postsCtrl
        .delPost(post.permalink)
        .subscribe(res => console.log('ok'), err => console.log(err));
    }
  }

  ngOnDestroy(): void {}
  ngOnInit(): void {}
}
