import { Directive, OnInit, ElementRef } from '@angular/core';
import * as Showdown from 'Showdown';
import * as Prism from 'PrismJS';


@Directive({
  selector: '[Markdown]'
})
export class MarkdownDirective implements OnInit {
    private ele: any;

    constructor(private elRef: ElementRef) {
      // reference to the DOM element
      this.ele = this.elRef.nativeElement;
    }

    ngOnInit () {
      this.fromRAW();
    }

    fromRAW() {
      let raw = this.ele.innerHTML;
      let html = this.process(this.prepare(raw));
      this.ele.innerHTML = html;
      this.highlight(html);
    }

    prepare(raw: string) {
      return raw.split('\n').map((line) => line.trim()).join('\n');
    }

    process(markdown: string) {
      let converter = new Showdown.Converter();
      return converter.makeHtml(markdown);
    }

    highlight(html: string) {
      Prism.highlightAll(false);
    }
}


