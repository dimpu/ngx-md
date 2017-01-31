import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as marked from 'marked';
import { MarkdownService } from './markdown.service';

import 'prismjs/prism';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-diff';

@Component({
  selector: 'markdown, [Markdown]', // tslint:disable-line:component-selector
  template: '<ng-content></ng-content>',
  styles: [
    `.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
       background: none;
     }`
  ],
})
export class MarkdownComponent implements AfterViewInit, OnChanges {
  @Input() path: string;

  constructor(
    public mdService: MarkdownService,
    public element: ElementRef,
  ) { }

  ngAfterViewInit() {
    if (this.path) {
      this.setRemoteContent();
    } else {
      this.setInnerHTML(this.element.nativeElement.innerHTML);
    }
  }

  // SimpleChanges parameter is required for AoT compilation (do not remove)
  ngOnChanges(changes: SimpleChanges) {
    if ('path' in changes) {
      this.setRemoteContent();
    }
  }

  setRemoteContent() {
    let extension: string;

    if (this.path) {
      extension = this.path.split('.').splice(-1).join();
    }

    return this.mdService.getContent(this.path)
      .then(response => {
        const raw = extension !== 'md'
          ? '```' + extension + '\n' + response.text() + '\n```'
          : response.text();
        this.setInnerHTML(raw);
      })
      .catch(this.handleError);
  }

  setInnerHTML(raw: string) {
    const markdown = this.prepare(raw);
    this.element.nativeElement.innerHTML = marked(markdown);
    Prism.highlightAll(false);
  }

  handleError(error: Error): Promise<never> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  prepare(raw: string) {
    if (!raw) {
      return '';
    }
    let indentStart: number;
    return raw.split('\n').map((line: string) => {
      // find position of 1st non-whitespace character
      // to determine the markdown indentation start
      if (line.length > 0 && isNaN(indentStart)) {
        indentStart = line.search(/\S|$/);
      }
      // remove whitespaces before indentation start
      return indentStart
        ? line.substring(indentStart)
        : line;
    }).join('\n');
  }
}
