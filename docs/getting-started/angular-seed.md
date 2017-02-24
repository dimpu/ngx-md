# Documenting full steps to install and test with [angular-seed](https://github.com/mgechev/angular-seed)  

  ```bash
  npm install --save angular2-markdown
  ```

### In **project.config.ts**

  ```
  //uncomment this
  import { ExtendPackages } from './seed.config.interfaces';

  // *towards the bottom, replace extended packages with this:

  let additionalPackages: ExtendPackages[] = [
  // required for dev build
  {
    name:'angular2-markdown',
    path:'node_modules/angular2-markdown/bundles/angular2-markdown.umd.min.js'
  },    

  // required for prod build
  {
    name:'angular2-markdown/*',
    path:'node_modules/angular2-markdown/bundles/angular2-markdown.umd.min.js'
  },
  ];    
  this.addPackagesBundles(additionalPackages);
  ```


## Verify by adding an alert to the home module and html:

### In **home.module.ts:**

  ```
  import { MarkdownModule } from 'angular2-markdown/alert';

  @NgModule({
    imports: [CommonModule, HomeRoutingModule, SharedModule, MarkdownModule.forRoot()],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [NameListService]
  })
  ```

### In **home.component.html:**

  ```
  <marked>
  ## Markdown h2 content
  </marked>
  ```
