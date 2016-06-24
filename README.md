# Angular 2 Markdown

##setup

```bash
    npm i angular2-markdown    
```

if you are using sytemjs configure.

```javascript
     System.config({
         map: {
            'markdown': 'node_modules/angular2-markdown/src/markdown.js' 
        }
     });
```

##How to use it
```typescript
import {Component} from '@angular/core';
import {Markdown} from '../src/markdown';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [Markdown]


})
export class AppComponent {
    
 }

```
app.component.html
```html
 <markdown>
    ### your markdown code
 </markdown>

```

## exmaple

You can found the working example inside the app directory.



