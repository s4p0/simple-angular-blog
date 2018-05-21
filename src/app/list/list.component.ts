import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Post } from '../app.models';
import { PostsService } from '../posts.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  posts$: Observable<Post[]>;
  @ViewChild(MatSelectionList) matList: MatSelectionList;
  constructor(private post: PostsService) {
    this.load();
  }

  ngOnInit() {}

  load() {
    this.posts$ = this.post.getPosts();
  }

  remove() {
    console.log('lists', this.matList.selectedOptions);
    const selection = this.matList.selectedOptions.selected;

    const observables = forkJoin(
      selection.map(item => {
        const post = item.value as Post;
        return this.post.delPost(post.permalink);
      })
    );

    observables.subscribe(
      items => console.log('excluded items: ', items),
      err => console.log('something wrong: ', err),
      () => this.load()
    );
  }
}
