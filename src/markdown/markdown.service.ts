import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as  markedNs from 'marked';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map'



@Injectable()
export class MarkdownService {
  private _renderer:any = new markedNs.Renderer();
  constructor() {
    this.extendRenderer();
    this.setMarkedOptions({});
  }

  //get the content from remote resource
  getContent(path: string):Promise<any> {
       return fetch(path).then(this.extractData).catch(this.handleError);
   }

   public get renderer() {
     return this._renderer;
   }

   // handle data
   public extractData(res: any): string {
     return res.text() || '';
   }


   public setMarkedOptions(options: any) {
     options = Object.assign({
       gfm: true,
       tables: true,
       breaks: false,
       pedantic: false,
       sanitize: false,
       smartLists: true,
       smartypants: false
     }, options);
     options.renderer = this._renderer;
     markedNs.setOptions(options);
   }

   // comple markdown to html
   public compile(data:string) {
      return markedNs(data);
   }

   //handle error
   private handleError(error: any):any {
     let errMsg: string;
     if (error instanceof fetch) {
       const body = error.json() || '';
       const err = body.error || JSON.stringify(body);
       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
     } else {
       errMsg = error.message ? error.message : error.toString();
     }
     return Observable.throw(errMsg);
   }

   // extend marked render to support todo checkbox
   private extendRenderer() {
     this._renderer.listitem = function(text:string) {
      if (/^\s*\[[x ]\]\s*/.test(text)) {
      text = text
        .replace(/^\s*\[ \]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " disabled> ')
        .replace(/^\s*\[x\]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " checked disabled> ');
          return '<li style="list-style: none">' + text + '</li>';
        } else {
          return '<li>' + text + '</li>';
        }
      };
   }
}
