### Getting started with angular-cli

#### Installing angular-cli

*Important*: please check `angular-cli` version, it should be => "1.0.0-beta.24"

*Note*: you can skip this part if you already have application generated by `ng-cli` and webpack

```bash
npm i -g angular-cli
ng new my-app
cd my-app
ng serve
```

#### Adding angular2-markdown

 - install `angular2-markdown`

 ```bash
   npm install angular2-markdown  --save
 ```

- open `src/app/app.module.ts` and add

```typescript
import { MarkdownModule } from 'angular2-markdown';
...

@NgModule({
   ...
   imports: [MarkdownModule.forRoot(), ... ],
    ...
})
```

- open `src/app/app.component.html` and add
```
<marked >
## Markdown h2 content
</marked>
```