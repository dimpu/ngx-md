# Angular 2 Markdown
Source @ [https://github.com/dimpu/angular2-markdown]()


##setup

```bash
npm i angular2-markdown   --save
```

##How to use it
### app.module.js
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MarkdownModule} from 'angular2-markdown';
import {AppComponent} from '../src/app.component';

@NgModule({
  imports: [
    BrowserModule,
    MarkdownModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

```

app.component.html
```html
 <div Markdown>
    ### your markdown code
 </div>

```

## exmaple

You can found the working example inside the src/app/demo directory.

```
git clone https://github.com/dimpu/angular2-markdown.git

npm i

ng serve
```
now you should see working example at [http://localhost:4200]()


