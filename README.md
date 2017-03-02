# Angular 2 Markdown

[![Build Status][travis-badge]][travis-badge-url]
[![npm][circleci-badge-url]][circleci-url]
[![version][npm-badge-url]][npm-url]
[![npm][license-badge-url]][license-url]
[![npm][dep-badge-url]][dep-url]

Source @ [https://github.com/dimpu/angular2-markdown](https://github.com/dimpu/angular2-markdown)

## Table of contents
1. [Getting Started](#getting-started)
2. [Installation instructions](#installation-instructions)
3. [Usage & Demo](#usage--demo)
4. [Contributing](#contribution)
5. [License](#license)

# Getting Started

angular2-markdown contains MarkdownModule for Angular 2.

Additionally we use [marked.js](https://github.com/chjj/marked/) and [prismjs](http://prismjs.com/) for this component.

# Installation instructions

Install `angular2-markdown` from `npm`:

```bash
npm install angular2-markdown --save
```
or using `yarn`:

```bash
yarn add angular2-markdown
```

## How to use it with:

- `angular-cli` — please refer to [Getting started with `angular-cli`](https://github.com/dimpu/angular2-markdown/tree/master/docs/getting-started/ng-cli.md)
- `angular-seed` — please refer to [Getting started with `angular-seed`](https://github.com/dimpu/angular2-markdown/tree/master/docs/getting-started/angular-seed.md)
- `system.js` (and [Angular 2 QuickStart](https://angular.io/docs/ts/latest/quickstart.html)) — please checkout [sample repository](https://github.com/dimpu/angular2-quickstart)
- `webpack` — you can view our demo page [source code](https://github.com/dimpu/angular2-markdown/tree/master/demo)
- `plnkr` — sample available [here](http://bit.ly/2kT0z20)
- `AoT` using `ngc` and `rollup` — please refer to [How to use `angular2-markdown` in Angular 2 with `AoT` compilation using `ngc` and `rollup`](https://github.com/dimpu/angular2-markdown/tree/master/docs/getting-started/aot.md)

# Usage & Demo

Main source of API documentation and usage scenarios is available at [https://dimpu.github.io/angular2-markdown/](https://dimpu.github.io/angular2-markdown/).

# Contribution

Is very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!

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

<!-- or use angular component -->

<markdown>
    ### your markdown code
</markdown>

<!-- to load from remote URL -->

<div Markdown [path]="/path/to/readme.md"></div>

<!-- load remote source code with auto syntax highlighting -->

<markdown [path]="/path/to/code.cpp"></markdown>

<markdown [path]="/path/to/code.java"></markdown>
```

## Variable binding

Now, with >1.4.x you can bind a variable to the `markdown` component. To do so:

```typescript
@Component({
    selector: 'markdown,[Markdown]',
    template: `
    <textarea [(ngModel)]="textData"></textarea>
    <markdown [data]="textData"></markdown>
    `,
})
export class MyComp {
  public textData = `## Markdown content data`;
}
```

## Example

You can find a working example inside the `demo` directory.

To serve it locally, run:

```bash
git clone https://github.com/dimpu/angular2-markdown.git

npm i

npm run demo.serve
```

## Todo

- [x] Variable binding
- [x] Code refactor
- [x] Write more unit tests
- [ ] Module configuration for markdown settings
- [ ] Module configuration for prismjs settings

[travis-badge]: https://travis-ci.org/dimpu/angular2-markdown.svg?branch=master
[travis-badge-url]: https://travis-ci.org/dimpu/angular2-markdown
[license-url]: https://opensource.org/licenses/MIT
[license-badge-url]: https://img.shields.io/npm/l/angular2-markdown.svg
[npm-url]: https://www.npmjs.com/package/angular2-markdown
[npm-badge-url]: https://img.shields.io/npm/v/angular2-markdown.svg?style=flat
[circleci-url]: https://circleci.com/gh/dimpu/angular2-markdown/master
[circleci-badge-url]: https://circleci.com/gh/dimpu/angular2-markdown/tree/master.svg?style=shield&
[demo-url]: https://github.com/dimpu/angular2-markdown
[dep-url]: https://david-dm.org/dimpu/angular2-markdown
[dep-badge-url]: https://david-dm.org/dimpu/angular2-markdown/status.svg
