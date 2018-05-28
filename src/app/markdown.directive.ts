import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  SecurityContext,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MarkdownService } from './markdown.service';
import { DomSanitizer } from '@angular/platform-browser';
import { createElement } from '@angular/core/src/view/element';
import { Subject, Observable } from 'rxjs';

@Directive({
  selector: '[appMarkdown]'
})
export class MarkdownDirective implements OnInit, OnDestroy, OnChanges {
  @Input() appMarkdown: string;
  constructor(
    private el: ElementRef,
    private markdown: MarkdownService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appMarkdown'] && this.appMarkdown) {
      this.renderIt(this.appMarkdown);
    }
  }
  ngOnDestroy(): void {}

  renderIt(text: string) {
    const rendered = this.markdown.render(text);
    this.el.nativeElement.innerHTML = this.sanitizer.sanitize(
      SecurityContext.HTML,
      rendered
    );
  }
}
