import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  public self: any;
  public tmpl: string;

  constructor() {
      this.self = this;
      this.tmpl = `
          <div>
            <p>Dynamic Component</p>
          </div>`;
      // console.log(new createComponent);
  }

  ngOnInit() {
  }

}

function createComponent() {
  class Test {

  }
  (Component({
    selector: 'test',
    template: '<h2>TEst</h2>'
  }))(Test);

  class TestModule {}

  NgModule({
    exports: [Test],
    // imports: [HttpModule],
    declarations: [Test],
  })(TestModule);

  return TestModule;
}


