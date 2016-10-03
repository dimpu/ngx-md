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
})
export class AppComponent {
    
 }

```
app.component.html
```html
 <div Markdown>
    ### your markdown code
 </div>

```

## exmaple

You can found the working example inside the src/app/demo directory.



