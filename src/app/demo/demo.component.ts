import { Component } from '@angular/core';
const fileContent = require('raw-loader!./demo.py');

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent {
  public fileContent = fileContent;
}
