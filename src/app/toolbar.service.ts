import { Injectable } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { SafeHtml } from '@angular/platform-browser';
import { environment } from '../environments/environment';

const twemoji = window['twemoji'];

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  loading: boolean;
  title: SafeHtml;
  constructor(private mark: MarkdownService) {
    this.title = environment.blogName;
  }
}
