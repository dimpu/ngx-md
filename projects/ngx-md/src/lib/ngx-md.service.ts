import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Renderer, setOptions, parse } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class NgxMdService {
  private _renderer: any = new Renderer();
  constructor(private _http: HttpClient) {
    this.extendRenderer();
    this.setMarkedOptions({});
  }

  // get the content from remote resource
  getContent(path: string): Observable<any> {
    return this._http.get(path, {responseType: 'text'})
      .pipe(
        map(res => this.extractData(res)),
        catchError(this.handleError));
  }

   public get renderer() {
     return this._renderer;
   }

   // handle data
   public extractData(res: any): string {
     return res || '';
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
     setOptions(options);
   }

   // comple markdown to html
   public compile(data: string) {
      return parse(data);
   }

   // handle error
   private handleError(error: any): any {
     let errMsg: string;
     if (error instanceof fetch) {
       const body = error.json() || '';
       const err = body.error || JSON.stringify(body);
       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
     } else {
       errMsg = error.message ? error.message : error.toString();
     }
     return throwError(errMsg);
   }

   // extend marked render to support todo checkbox
   private extendRenderer() {
     this._renderer.listitem = function(text: string) {
      if (/^\s*\[[x ]\]\s*/.test(text)) {
      text = text
        .replace(/^\s*\[ \]\s*/, '<input type="checkbox" class="md-checkbox" disabled> ')
        .replace(/^\s*\[x\]\s*/, '<input type="checkbox" class="md-checkbox" checked disabled> ');
          return '<li style="list-style: none">' + text + '</li>';
        } else {
          return '<li>' + text + '</li>';
        }
      };
   }
}
