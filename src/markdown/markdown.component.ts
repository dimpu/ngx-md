import { Component, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { MarkdownService } from './markdown.service';
import './prism.languages';

@Component({
    selector: 'markdown,[Markdown]',
    template: '<ng-content></ng-content>',
    styles: [
        `.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
            background: none;
        }`
    ]
})
export class MarkdownComponent implements OnInit {
    private _path: string;
    private _data: string;
    private _md: any;
    private _ext: string;
    changeLog: string[] = [];

    constructor(
        private mdService: MarkdownService,
        private el: ElementRef,
        private http: Http
    ) { }

    ngOnInit() {

    }

    @Input()
    set path(value:string) {
      this._path = value;
      this.onPathChange();
    }

    @Input()
    set data(value:string) {
      this._data = value;
      this.onDataChange(value);
    }


    // on input
    onDataChange(data:string){
      this.el.nativeElement.innerHTML = this.mdService.compile(data);
      Prism.highlightAll(false);
    }

    /**
     *  After view init
     */
    ngAfterViewInit() {
      if(this._path) {
        this.onPathChange();
      } else if (!this._data) {
        this.processRaw();
      }
    }

    processRaw() {
      this._md = this.prepare(this.el.nativeElement.innerHTML);
      this.el.nativeElement.innerHTML = this.mdService.compile(this._md);
      Prism.highlightAll(false);
    }

    /**
     * get remote conent;
     */
    onPathChange() {
        this._ext = this._path && this._path.split('.').splice(-1).join();
        this.mdService.getContent(this._path)
            .subscribe(data => {
                this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
                this.el.nativeElement.innerHTML = this.mdService.compile(this.prepare(this._md));
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
     prepare(raw: string) {
        if (!raw) {
            return '';
        }
        if (this._ext === 'md' || !this.path) {
            let isCodeBlock = false;
            return raw.split('\n').map((line: string) => {
                if (this.trimLeft(line).substring(0, 3) === "```") {
                    isCodeBlock = !isCodeBlock;
                }
                return isCodeBlock ? line : line.trim();
            }).join('\n');
        }
        return raw.replace(/\"/g, '\'');
    }

    /**
     * Trim left whitespace
     */
    private trimLeft(line: string) {
        return line.replace(/^\s+|\s+$/g, '');
    }
}
