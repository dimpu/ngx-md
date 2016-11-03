import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MarkdownService {

  constructor(private http: Http) { }
  getContent(path) {
    return this.http.get(path).toPromise();
  }
}
