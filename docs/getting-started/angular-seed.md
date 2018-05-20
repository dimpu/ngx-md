# Documenting full steps to install and test with [angular-seed](https://github.com/mgechev/angular-seed)  

  ```bash
  npm install --save ngx-md
  ```

### In **project.config.ts**

  ```
  //uncomment this
  import { ExtendPackages } from './seed.config.interfaces';

  // *towards the bottom, replace extended packages with this:

  let additionalPackages: ExtendPackages[] = [
  // required for dev build
  {
    name:'ngx-md',
    path:'node_modules/ngx-md/bundles/ngx-md.umd.min.js'
  },    

  // required for prod build
  {
    name:'ngx-md/*',
    path:'node_modules/ngx-md/bundles/ngx-md.umd.min.js'
  },
  ];    
  this.addPackagesBundles(additionalPackages);
  ```

### In your index.html

```html
<head>
...
...
+ <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.min.css>
</head>

```

## Verify by adding an NgxMdModule to the home module and html:

### In **home.module.ts:**

  ```
  import { NgxMdModule } from 'ngx-md';

  @NgModule({
    imports: [CommonModule, HomeRoutingModule, SharedModule, NgxMdModule.forRoot()],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [NameListService]
  })
  ```

### In **home.component.html:**

  ```
  <markdown>
  ## Markdown h2 content
  </markdown>
  ```
