import { Injectable, SecurityContext } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../environments/environment';

const twemoji = window['twemoji'];

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  title: SafeHtml;
  private _subtitle: SafeHtml[];

  constructor(private mark: MarkdownService, private dom: DomSanitizer) {
    this.title = environment.blogName;
    this._subtitle = [environment.subtitle];
    // this._subtitle = [':wave:'];
  }

  set subtitle(value) {
    this._subtitle.push(value);
    this.changeTitle();
  }

  get subtitle() {
    return (
      this._subtitle.length > -1 && this._subtitle[this._subtitle.length - 1]
    );
  }

  destroySubtitle() {
    this._subtitle.pop();
    this.changeTitle();
  }

  changeTitle() {
    const value = this.subtitle;
    document.title = this.dom.sanitize(SecurityContext.HTML, value);
  }
}
