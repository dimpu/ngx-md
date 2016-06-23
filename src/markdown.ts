import { Directive, OnInit, ElementRef } from '@angular/core';
import * as Showdown from 'showdown';
import * as  Prism from 'prism';
import '../node_modules/prismjs/themes/prism-okaidia.css!';

@Directive({
    selector: 'markdown'
})
export class Markdown implements OnInit {
  element: any;
  constructor (
      public elementRef:ElementRef
      ) { 
    // reference to the DOM element
    this.element = this.elementRef.nativeElement;
    
  }

  ngOnInit () {
    //   console.log(this.element);
    this.fromRAW();
  }

  fromRAW() {
    let raw = this.element.innerHTML;
   
    let html = this.process(this.prepare(raw.split('\n').map((line) => line.trim()).join('\n')));
    this.element.innerHTML = html;
    this.highlight(html);
  }


  process(markdown:string) {
    let converter = new Showdown.Converter();
    return converter.makeHtml(markdown)
  }

  highlight(html:string){
    Prism.highlightAll();
  }

}