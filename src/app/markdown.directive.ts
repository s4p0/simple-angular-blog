import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  SecurityContext
} from '@angular/core';
import { MarkdownService } from './markdown.service';
import { DomSanitizer } from '@angular/platform-browser';
import { createElement } from '@angular/core/src/view/element';

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnInit {
  @Input() appMarkdown: any;
  constructor(
    private el: ElementRef,
    private markdown: MarkdownService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const rendered = this.markdown.render(this.appMarkdown);
    this.el.nativeElement.innerHTML = this.sanitizer.sanitize(
      SecurityContext.HTML,
      rendered
    );
  }
}
