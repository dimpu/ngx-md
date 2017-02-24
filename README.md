# Angular 2 Markdown

[![Build Status][travis-badge]][travis-badge-url]
[![npm][circleci-badge-url]][circleci-url]
[![version][npm-badge-url]][npm-url]
[![npm][license-badge-url]][license-url]


 Source @ [[source-url]]()

 Demo @ [[demo-url]]()


## Setup
```bash
npm i angular2-markdown --save
```

## How to use it
### app.module.js
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownModule } from 'angular2-markdown';
import { AppComponent } from '../src/app.component';

@NgModule({
  imports: [
    BrowserModule,
    MarkdownModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})

```

### app.component.html
```html
 <div Markdown>
    ### your markdown code
 </div>

or use angular component

<markdown>
    ### your markdown code
</markdown>

// to load from remote url

<div Markdown path="/path/to/readme.md"></div>

// load remote source code with auto syantax helight.

<markdown path="/path/to/code.cpp"></markdown>

<markdown path="/path/to/code.java"></markdown>
```

## Example

You can found the working example inside the `src/app/demo directory`.

```
git clone https://github.com/dimpu/angular2-markdown.git

npm i

ng serve
```
now you should see working example at [http://localhost:4200]()




[travis-badge]: https://travis-ci.org/dimpu/angular2-markdown.svg?branch=master
[travis-badge-url]: https://travis-ci.org/dimpu/angular2-markdown
[license-url]: https://opensource.org/licenses/MIT
[license-badge-url]: https://img.shields.io/npm/l/angular2-markdown.svg
[npm-url]: https://www.npmjs.com/package/angular2-markdown
[npm-badge-url]: https://img.shields.io/npm/v/angular2-markdown.svg?style=flat
[circleci-url]: https://circleci.com/gh/dimpu/angular2-markdown/master
[circleci-badge-url]: https://circleci.com/gh/dimpu/angular2-markdown/tree/master.svg?style=shield&
[demo-url]: https://github.com/dimpu/angular2-markdown
[source-url]: https://github.com/dimpu/angular2-markdown
