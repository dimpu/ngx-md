import { Directive, OnInit, ElementRef , Input, Component} from '@angular/core';
import {Http} from '@angular/http';
import * as Showdown from 'Showdown';
import * as Prism from 'PrismJS';

const DYNAMIC_COMPONENTS = [];

@Directive({
  selector: '[Markdown]'
})
export class MarkdownDirective implements OnInit {
    @Input() path: string;
    private ele: any;

    /**
     * constructor
     */
    constructor(private elRef: ElementRef, public http: Http) {
      // reference to the DOM element
      this.ele = this.elRef.nativeElement;
    }

    /**
     * ngoninit
     */
    ngOnInit () {
      if (this.path) {
        this.fromHttp();
      } else {
        this.fromRAW();
      }
    }

    /**
     * fromHttp 
     */
    fromHttp() {
      this.http.get(this.path).subscribe(
        html => this.fromHttpHtml(html)
      );
    }

    /**
     * fromHttpHtml
     */
    fromHttpHtml(html) {
        var h = '';
        if (this.path.lastIndexOf('.md') < 0) {
          let ext: any = this.path.split('.');
          ext = ext[ext.length - 1];
          var h: string = `
                    \`\`\`${ext}  
                    ${html.text()} 
                    \`\`\`
            `;
        } else {
          h = html.text();
        }
        h  = this.process(this.prepare(h));
        this.ele.innerHTML = h;
        this.highlight(h);
    }

    /**
     * fromRAW
     */
    fromRAW() {
      let raw = this.ele.innerHTML;
      let html = this.process(this.prepare(raw));
      this.ele.innerHTML = html;
      this.highlight(html);
    }

    /**
     * prepare
     */
    prepare(raw: string) { 
      if(raw)
        return raw.split('\n').map((line) => line.trim()).join('\n');
    }

    /**
     * process
     */
    process(markdown: string) {
      let converter = new Showdown.Converter();
      return converter.makeHtml(markdown);
    }

    /**
     * highlight
     */
    highlight(html: string) {
      Prism.highlightAll(false);
    }
}



