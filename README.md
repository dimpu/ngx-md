# Angular 2 Markdown

[![Build Status][travis-badge]][travis-badge-url]
[![npm][circleci-badge-url]][circleci-url]
[![version][npm-badge-url]][npm-url]
[![npm][license-badge-url]][license-url]


 Source @ [https://github.com/dimpu/angular2-markdown]()



 ## Table of contents
 1. [Getting Started](#getting-started)
 2. [Installation instructions](#installation-instructions)
 3. [Usage & Demo](#usage--demo)
 4. [Contributing](#contribution)
 5. [License](#license)



 # Getting Started

angular2-markdown contains MarkdownModule by Angular 2.

Additionally we are using [marked.js](http://https://github.com/chjj/marked/) and [prismjs](http://prismjs.com/) for this component.


# Installation instructions

Install `angular2-markdown` from `npm`
```bash
npm install angular2-markdown --save
```

or
```bash
yarn add  angular2-markdown
```

## How to use it with:
 - `angular-cli` please refer to [getting-started-with-ng-cli](https://github.com/dimpu/angular2-markdown/tree/master/docs/getting-started/ng-cli.md)
 - `angular-seed` please refer to [getting-started-with-angular-seed](https://github.com/dimpu/angular2-markdown/tree/master/docs/getting-started/angular-seed.md)
 - `system.js` (and [angular2 quickstart](https://angular.io/docs/ts/latest/quickstart.html)) please checkout [sample repository](https://github.com/dimpu/angular2-quickstart)
 - `webpack` you can view our demo page [source code](https://github.com/dimpu/angular2-markdown/tree/master/demo)
 - `plnkr` sample available [here](http://bit.ly/2kT0z20)
 - `AoT using ngc and rollup` please refer to [angular2-markdown-with-aot](https://github.com/dimpu/angular2-markdown/tree/master/docs/getting-started/aot.md)


 # Usage & Demo

 Main source of API documentation and usage scenarious available here:
 [https://dimpu.github.io/angular2-markdown/](https://dimpu.github.io/angular2-markdown/)


 # Contribution

 Are very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!



## Quick Guide
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

You can found the working example inside the `/demo directory`.

```
git clone https://github.com/dimpu/angular2-markdown.git

npm i

npm run demo.serve
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
