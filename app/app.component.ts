import {Component} from '@angular/core';
import {Markdown} from '../src/markdown';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [Markdown]

})
export class AppComponent {
    html = `<h2>Heasding</h2>
            ###Headings....
            
  `;
 }
