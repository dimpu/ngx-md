import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as  marked from 'marked';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class MarkdownService {

  constructor(private http: Http) {
    this.setMarkedOptions();
  }

  //get the content from remote resource
  getContent(path: string):Observable<any> {
    return this.http.get(path)
       .map(this.extractData)
       .catch(this.handleError);
   }

   // handle data
   extractData(res: Response): string {
     return res.text() || '';
   }

   //handle error
   handleError(error: Response | any):any {
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

   setMarkedOptions() {
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
   }

   // comple markdown to html
   compile(data:string) {
      return marked(data);
   }


}
