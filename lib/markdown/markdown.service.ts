import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import * as markedNs from "marked";

@Injectable()
export class MarkdownService {
  private _renderer: any = new markedNs.Renderer();
  constructor(private _http: HttpClient) {
    this.extendRenderer();
    this.setMarkedOptions({});
  }

  //get the content from remote resource
  getContent(path: string): Observable<Object> {
    return this._http
      .get(path, { responseType: "text" })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public get renderer() {
    return this._renderer;
  }

  // handle data
  public extractData(res: string): string {
    return res || "";
  }

  public setMarkedOptions(options: any) {
    options = Object.assign(
      {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      },
      options
    );
    options.renderer = this._renderer;
    markedNs.setOptions(options);
  }

  // comple markdown to html
  public compile(data: string) {
    return markedNs(data);
  }

  //handle error
  private handleError(error: any): any {
    let errMsg: string;
    if (error instanceof fetch) {
      const body = error.json() || "";
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  // extend marked render to support todo checkbox
  private extendRenderer() {
    this._renderer.listitem = function(text: string) {
      if (/^\s*\[[x ]\]\s*/.test(text)) {
        text = text
          .replace(
            /^\s*\[ \]\s*/,
            '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " disabled> '
          )
          .replace(
            /^\s*\[x\]\s*/,
            '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " checked disabled> '
          );
        return '<li style="list-style: none">' + text + "</li>";
      } else {
        return "<li>" + text + "</li>";
      }
    };
  }
}
