import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { MarkdownService } from './markdown.service';
import { DomSanitizer } from '@angular/platform-browser';
import { createElement } from '@angular/core/src/view/element';

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnInit {
  @Input() appMarkdown: any;
  private sanitizerString = 'changingThisBreaksApplicationSecurity';
  constructor(
    private el: ElementRef,
    private markdown: MarkdownService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const rendered = this.markdown.render(this.appMarkdown);
    if (this.sanitizerString in rendered) {
      this.el.nativeElement.innerHTML = rendered[this.sanitizerString];
    } else {
      this.el.nativeElement.innerHTML = rendered;
    }
  }
}
