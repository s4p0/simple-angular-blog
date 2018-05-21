import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './app.models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  get blogsUrl() {
    return environment.apiUrl + '/blogs';
  }

  getPosts() {
    return this.http.get<Post[]>(this.blogsUrl);
  }

  getPost(permalink: string) {
    return this.http.get<Post>(`${this.blogsUrl}/${permalink}`);
  }

  addPost(post: Post) {
    console.log('creating: ', post);
    return this.http.post(this.blogsUrl, post);
  }

  delPost(permalink: string) {
    return this.http.delete(`${this.blogsUrl}?Permalink=${permalink}`);
  }
}
