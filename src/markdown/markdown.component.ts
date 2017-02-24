import { Component, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import * as  marked from 'marked';
// import { marked } from 'marked/lib/marked';
import { MarkdownService } from './markdown.service';
declare var Prism: any;
import 'prismjs/prism';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-diff';



marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

@Component({
    selector: 'markdown,[Markdown]',
    template: '<ng-content></ng-content>',
    styles: [
        `.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
            background: none;
        }`
    ]
})
export class MarkdownComponent implements OnInit, AfterViewInit {
    @Input() path: string;

    private md: any;
    private ext: string;

    constructor(
        private mdService: MarkdownService,
        private el: ElementRef,
        private http: Http
    ) { }

    ngOnInit() {

    }

    /**
     * on path input change
     */
    ngOnChanges() {
        this.getContent();
    }

    /**
     *
     */
    ngAfterViewInit() {
        if (!this.path) {
            this.md = this.prepare(this.el.nativeElement.innerHTML);
            this.el.nativeElement.innerHTML = marked(this.md);
            // Prism.highlightAll(false);
        } else {
            this.getContent();
        }
    }

    /**
     * get remote conent;
     */
    getContent() {
        if (!!this.path) {
            this.ext = this.path.split('.').splice(-1).join();
        }

        this.mdService.getContent(this.path)
            .subscribe(data => {
                this.md = this.ext !== 'md' ? '```' + this.ext + '\n' + data + '\n```' : data;
                this.el.nativeElement.innerHTML = marked(this.prepare(this.md));
                Prism.highlightAll(false);
            },
            err => this.handleError);
    }

    /**
     * catch http error
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    /**
     * Prepare string
     */
    prepare(raw: any) {
        if (!raw) {
            return '';
        }
        if (this.ext === 'md' || !this.path) {
            let isCodeBlock = false;
            return raw.split('\n').map((line: string) => {
                if (this.trimLeft(line).substring(0, 3) === "```") {
                    isCodeBlock = !isCodeBlock;
                }
                return isCodeBlock ? line : line.trim();
            }).join('\n');
        }
        return raw;
    }

    /**
     * Trim left whitespace
     */
    trimLeft(line: string) {
        return line.replace(/^\s+|\s+$/g, '');
    }
}
