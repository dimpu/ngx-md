# ngx-md (Previously Angular 2 Markdown)

[![Build Status][travis-badge]][travis-badge-url]
[![npm][circleci-badge-url]][circleci-url]
[![version][npm-badge-url]][npm-url]
[![npm][license-badge-url]][license-url]
[![npm][dep-badge-url]][dep-url]

Source @ [https://github.com/dimpu/ngx-md](https://github.com/dimpu/ngx-md)

## Table of contents

1. [Getting Started](#getting-started)
2. [Installation instructions](#installation-instructions)
3. [Usage & Demo](#usage--demo)
4. [Contributing](#contribution)
5. [License](#license)

# Getting Started

ngx-md contains MarkdownModule for Angular.

Additionally we use [marked.js](https://github.com/chjj/marked/) and [prismjs](http://prismjs.com/) for this component.

# Installation instructions

Install `ngx-md` from `npm`:

```bash
npm install ngx-md --save
```

or using `yarn`:

```bash
yarn add ngx-md
```

## How to use it with:

* `angular-cli` — please refer to [Getting started with `angular-cli`](https://github.com/dimpu/ngx-md/tree/master/docs/getting-started/ng-cli.md)
* `angular-seed` — please refer to [Getting started with `angular-seed`](https://github.com/dimpu/ngx-md/tree/master/docs/getting-started/angular-seed.md)
* `system.js` (and [Angular 2 QuickStart](https://angular.io/docs/ts/latest/quickstart.html)) — please checkout [sample repository](https://github.com/dimpu/angular2-quickstart)
* `webpack` — you can view our demo page [source code](https://github.com/dimpu/ngx-md/tree/master/demo)
* `plnkr` — sample available [here](http://bit.ly/2kT0z20)
* `AoT` using `ngc` and `rollup` — please refer to [How to use `ngx-md` in Angular 2 with `AoT` compilation using `ngc` and `rollup`](https://github.com/dimpu/ngx-md/tree/master/docs/getting-started/aot.md)

# Usage & Demo

Main source of API documentation and usage scenarios is available at [https://dimpu.github.io/ngx-md/](https://dimpu.github.io/ngx-md/).

# Contribution

Is very welcome! And remember, contribution is not only PRs and code, but any help with docs or helping other developers to solve issues are very appreciated! Thanks in advance!

## Quick Guide

### app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MarkdownModule } from 'ngx-md';
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

### index.html

If you want syntax highlighting you need to import the prism css file.

Alternative 1: Import from cdn

```html
<head>
    <meta charset="utf-8">
    <base href="/">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism.min.css" rel="stylesheet" />
  </head>
```

Alternative 2: Download the css file (or copy it from `node_modules/prismjs/themes/`, place it somewhere in your src folder and import

```html
<link href="/css/prism.min.css" rel="stylesheet" />
```

Alternative 3: Include the prism css file in your sass style file

```css
@import "prismjs/themes/prism.css";
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

<div Markdown path="/path/to/readme.md"></div>

<!-- load remote source code with auto syntax highlighting -->

<markdown path="/path/to/code.cpp"></markdown>

<markdown path="/path/to/code.java"></markdown>

<!-- load remote source code from url stored in variable
(see additional details about variable binding in the next section) -->

<markdown [path]="urlVariable"></markdown>
```

## Variable binding

Now, with >1.4.x you can bind a variable to the `markdown` component. To do so:

```typescript
@Component({
  selector: "markdown,[Markdown]",
  template: `
    <textarea [(ngModel)]="textData"></textarea>
    <markdown [data]="textData"></markdown>
    `
})
export class MyComp {
  public textData = `## Markdown content data`;
}
```

## Marked customization

Marked can be customized/extended by accessing the renderer from the MarkdownService:

```typescript
import { MarkdownService } from 'ngx-md';
@Component({
    selector='my-comp',
    template: `
    <markdown>
     > Block
     > quote
     > here
    </markdown>
    `,
})
export class MyComp {
  constructor(private _markdown: MarkdownService) {}

  ngOnInit() {
    this._markdown.renderer.blockquote = (quote: string) => {
      return `<blockquote class="king-quote">${quote}</blockquote>`;
    }
  }
```

See [marked documentation](https://github.com/chjj/marked) for all renderer extension points.

## Example

You can find a working example inside the `demo` directory.

To serve it locally, run:

```bash
git clone https://github.com/dimpu/ngx-md.git

npm i

npm run demo.serve
```

## Todo

* [x] Variable binding
* [x] Code refactor
* [x] Write more unit tests
* [x] Angular 5 support
* [ ] Module configuration for markdown settings
* [ ] Module configuration for prismjs settings

<h2 id="contributors">Contributors</h2>

The following is a list of all the people that have helped build this project. Thanks for your contributions!

[<img alt="glenngr" src="https://avatars3.githubusercontent.com/u/1271995?s=460&v=4" width="117">](https://github.com/dimpu)
[<img alt="glenngr" src="https://avatars2.githubusercontent.com/u/8955488?v=3&s=460" width="117">](https://github.com/glenngr)
[<img alt="paullryan" src="https://avatars2.githubusercontent.com/u/3146164?v=3&s=460" width="117">](https://github.com/paullryan)

[travis-badge]: https://travis-ci.org/dimpu/ngx-md.svg?branch=master
[travis-badge-url]: https://travis-ci.org/dimpu/ngx-md
[license-url]: https://opensource.org/licenses/MIT
[license-badge-url]: https://img.shields.io/npm/l/ngx-md.svg
[npm-url]: https://www.npmjs.com/package/ngx-md
[npm-badge-url]: https://img.shields.io/npm/v/ngx-md.svg?style=flat
[circleci-url]: https://circleci.com/gh/dimpu/ngx-md/master
[circleci-badge-url]: https://circleci.com/gh/dimpu/ngx-md/tree/master.svg?style=shield&
[demo-url]: https://github.com/dimpu/ngx-md
[dep-url]: https://david-dm.org/dimpu/ngx-md
[dep-badge-url]: https://david-dm.org/dimpu/ngx-md/status.svg
