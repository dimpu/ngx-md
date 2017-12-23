import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MarkdownService } from "ngx-md";
import * as extras from "marked-extras";

@Component({
  selector: "md-home",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "home.component.html",
  styles: [
    `
    #textbox {
      width: 100%;
      height: 100vh;
    }

    table.table2 {
      font-size: 14px;
      color: #212121;
      margin: 0 auto;
      border-collapse: collapse;
    }

    table.table2 thead th {
      font-size: 20px;
      color: #212121;
      height: 40px;
      border: 1px solid #e6e6e6;
      border-top: 0;
      border-right: 0;
      border-left: 0;
    }

    table.table2 tbody tr:nth-child(odd) {
      background-color: #f6f6f6;
    }

    table.table2 td {
      height: 40px;
      width: 230px;
      border-bottom: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
    }

    table.table2 td:last-of-type {
      border-right: 0;
    }

    /* From https://codepen.io/maxds/pen/DcveB */
    blockquote.king-quote {
      display:block;
      background: #fff;
      padding: 15px 20px 15px 45px;
      margin: 0 0 20px;
      position: relative;

      /*Font*/
      font-family: Georgia, serif;
      font-size: 16px;
      line-height: 1.2;
      color: #666;
      text-align: justify;

      /*Borders - (Optional)*/
      border-left: 15px solid #c76c0c;
      border-right: 2px solid #c76c0c;

      /*Box Shadow - (Optional)*/
      -moz-box-shadow: 2px 2px 15px #ccc;
      -webkit-box-shadow: 2px 2px 15px #ccc;
      box-shadow: 2px 2px 15px #ccc;
    }

    blockquote.king-quote::before {
      content: "\\201C"; /*Unicode for Left Double Quote*/

      /*Font*/
      font-family: Georgia, serif;
      font-size: 60px;
      font-weight: bold;
      color: #999;

      /*Positioning*/
      position: absolute;
      left: 10px;
      top:5px;
    }

    blockquote.king-quote::after{
      /*Reset to make sure*/
      content: "";
    }

    blockquote.king-quote a{
      text-decoration: none;
      background: #eee;
      cursor: pointer;
      padding: 0 3px;
      color: #c76c0c;
    }

    blockquote.king-quote a:hover{
      color: #666;
    }

    blockquote.king-quote em{
      font-style: italic;
    }
  `
  ]
})
export class HomeComponent implements OnInit {
  /*
  ngContent1:string = [
    "```javascript",
    "setTimeout(_ => alert('Hello'));",
    "```",
   ].join("\n");
  ngContent2:string = [
    "```html",
    "<div>Hello html</div>",
    "```",
   ].join("\n");
  */

  public markdownContent = `
# Headers

# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------



# Emphasis

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

# Lists

1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses


# Links

There are two ways to create links.

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com



# Images

Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

# Code and Syntax Highlighting

Inline \`code\` has \`back-ticks around\` it.

\`\`\`javascript
var s = "JavaScript syntax highlighting";
alert(s);
\`\`\`

\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`

\`\`\`
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.

\`\`\`


# Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.


# Horizontal Rule

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

# Tables

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders]\` | **nicely**
1 | 2 | 3

`;

  constructor(private _markdown: MarkdownService) {}

  ngOnInit() {
    extras.init();
    this._markdown.setMarkedOptions({});

    this._markdown.setMarkedOptions(
      Object.assign(extras.markedDefaults, {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
    );
    this._markdown.renderer.table = (header: string, body: string) => {
      return `
      <table class="table2">
        <thead>
          ${header}
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
      `;
    };
    this._markdown.renderer.blockquote = (quote: string) => {
      return `<blockquote class="king-quote">${quote}</blockquote>`;
    };
  }
}
