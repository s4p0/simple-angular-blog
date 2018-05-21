import { Injectable } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { SafeHtml } from '@angular/platform-browser';

const twemoji = window['twemoji'];

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private _title: SafeHtml;
  constructor(private mark: MarkdownService) {
    this.title = 'Felipe Correa   :nerd_face: :frog:';
  }

  set title(value: SafeHtml) {
    this._title = this.mark.render(value);
  }

  get title(): SafeHtml {
    return this._title;
  }
}
