import { Injectable } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { SafeHtml } from '@angular/platform-browser';
import { environment } from '../environments/environment';

const twemoji = window['twemoji'];

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  title: SafeHtml;
  constructor(private mark: MarkdownService) {
    this.title = environment.blogName;
  }

  // set title(value: SafeHtml) {
  //   this._title = this.mark.render(value);
  // }

  // get title(): SafeHtml {
  //   return this._title;
  // }
}
