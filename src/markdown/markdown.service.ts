import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as  marked from 'marked';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class MarkdownService {
  private _renderer:any = new marked.Renderer();
  constructor(private http: Http) {
    this.extendRenderer();
    this.setMarkedOptions({});
  }

  //get the content from remote resource
  getContent(path: string):Observable<any> {
    return this.http.get(path)
       .map(this.extractData)
       .catch(this.handleError);
   }

   get renderer() {
     return this._renderer;
   }

   // handle data
   public extractData(res: Response): string {
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
     marked.setOptions(options);
   }

   // comple markdown to html
   public compile(data:string) {
      return marked(data);
   }

   //handle error
   private handleError(error: Response | any):any {
     let errMsg: string;
     if (error instanceof Response) {
       const body = error.json() || '';
       const err = body.error || JSON.stringify(body);
       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
     } else {
       errMsg = error.message ? error.message : error.toString();
     }
     console.error(errMsg);
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
