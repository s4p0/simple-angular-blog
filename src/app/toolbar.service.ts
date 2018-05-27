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
  private _subtitle: SafeHtml[];
  loading: boolean;
  constructor(private mark: MarkdownService) {
    this.title = environment.blogName;
    this._subtitle = [':wave:'];
  }

  set subtitle(value) {
    this._subtitle.push(value);
  }

  get subtitle() {
    return this._subtitle[this._subtitle.length - 1];
  }

  destroySubtitle() {
    this._subtitle.pop();
    console.log(this._subtitle);
  }
}
