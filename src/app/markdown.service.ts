import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as markdown from 'markdown-it';
import * as emoji from 'markdown-it-emoji';
import * as marked from 'markdown-it-mark';

// require('markdown-it-mark')

const hljs = window['hljs'];

const twemoji = window['twemoji'];

const md = markdown({
  langPrefix: 'language-',
  // html: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<section class="mat-typography hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></section>'
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  }
});

@Injectable()
export class MarkdownService {
  constructor(private sanitizer: DomSanitizer) {
    this.setup();
    // console.log('new markdown instantiated');
  }

  private setup() {
    md.use(marked);
    md.use(emoji);
    md.renderer.rules.emoji = function(token, idx) {
      return twemoji.parse(token[idx].content);
    };
  }

  render(mdText) {
    if (!mdText) {
      return null;
    }
    const rendered = md.render(mdText);
    return this.sanitizer.bypassSecurityTrustHtml(rendered);
  }
}
