import { Component, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import {Http} from '@angular/http';
import * as  marked  from 'marked';
import {MarkdownService} from './markdown.service';

import 'prismjs/prism';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';



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
    ngOnInit() {
        console.log(this.path);
        console.log('The component is initialized');
    }

    constructor(
        private mdService: MarkdownService,
        private el: ElementRef,
        private http: Http
    ) { }
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
             Prism.highlightAll(false);
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
        .then(resp => {
            this.md = this.ext !== 'md' ?  '```' + this.ext + '\n' + resp.text() + '\n```' : resp.text();
            this.el.nativeElement.innerHTML = marked(this.prepare(this.md));
             Prism.highlightAll(false);
        })
        .catch(this.handleError);
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
            return raw.split('\n').map((line) => line.trim()).join('\n');
        }
        return raw;
    }

}

