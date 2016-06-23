import {Component} from '@angular/core';
import {Markdown} from './markdown';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [Markdown]

})
export class AppComponent { }
