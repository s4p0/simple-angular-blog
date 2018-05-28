import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Post } from './app.models';
import { Observable } from 'rxjs';
import { ArticleService } from './article.service';

@Injectable()
export class ArticleResolver implements Resolve<Post> {
  constructor(private articleCtrl: ArticleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> {
    const permalink = route.paramMap.get('permalink');
    return this.articleCtrl.loadArticleSingle(permalink);
  }
}
