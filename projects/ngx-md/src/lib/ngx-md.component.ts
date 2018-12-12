
import { Component, ElementRef, OnInit, AfterViewInit, Input, PLATFORM_ID, Inject, Output, EventEmitter } from '@angular/core';
import { NgxMdService } from './ngx-md.service';
import { isPlatformBrowser } from '@angular/common';
import * as Prism from 'prismjs';
import { Subscribable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
    template: '<ng-content></ng-content>',
    styles: [
        `.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
            background: none;
        }
        .md-checkbox{
            vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px;
        }`
    ]
})
export class NgxMdComponent implements  AfterViewInit {
    _path: string;
    _data: string;
    _md: any;
    _ext: string;
    changeLog: string[] = [];
    @Output() error: EventEmitter<any>  = new EventEmitter<any>();
    @Output() loaded: EventEmitter<any>  = new EventEmitter<any>();

    constructor(
        public _mdService: NgxMdService,
        public _el: ElementRef,
        @Inject(PLATFORM_ID) public platformId: string
    ) { }

    @Input()
    set path(value: string) {
      if (value) {
        this._path = value;
        this.onPathChange();
      }
    }

    @Input()
    set data(value: string) {
      if (value) {
        this._data = value;
        this.onDataChange(value);
      }
    }


    /**
     * Boolean indicating if the markdown content should be sanitized to avoid script injections
     */
    @Input() public sanitizeHtml = true;


    // on input
    onDataChange(data: string) {
      if (data) {
        this._el.nativeElement.innerHTML = this._mdService.compile(data, this.sanitizeHtml);
      } else {
        this._el.nativeElement.innerHTML = '';
      }
      this.highlightContent(false);
    }

    /**
     *  After view init
     */
    ngAfterViewInit() {
      if (this._path) {
        this.onPathChange();
      } else if (!this._data) {
        this.processRaw();
      }
    }

    processRaw() {
      this._md = this.prepare(decodeHtml(this._el.nativeElement.innerHTML));
      this._el.nativeElement.innerHTML = this._mdService.compile(this._md, this.sanitizeHtml);
      this.highlightContent(false);
    }

    /**
     * get remote conent;
     */
    onPathChange() {
        this._ext = this._path && this._path.split('.').splice(-1).join();
        this._mdService.getContent(this._path).pipe(catchError(this.handleError))
            .subscribe(data => {
                this.loaded.emit(data);
                this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
                this._el.nativeElement.innerHTML = this._mdService.compile(this.prepare(this._md), this.sanitizeHtml);
                this.highlightContent(false);
            });
    }

    /**
     * catch http error
     */
    private handleError(error: any): Subscribable<any> {
        this.error.emit(error);
        console.error('An error occurred', error); // for demo purposes only
        return error.message || error;
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
                // If the first non-blank chars are an opening/closing code block, toggle the flag
                if (this.trimLeft(line).substring(0, 3) === '```') {
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

    /**
     * Use Prism to highlight code snippets only on the browser
     */
    private highlightContent(async: boolean): void {
      if (isPlatformBrowser(this.platformId)) {
        Prism.highlightAll(async);
      }
    }
}

function decodeHtml(html: string) { // https://stackoverflow.com/a/7394787/588521
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

