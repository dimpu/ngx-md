import { Component } from '@angular/core';
let fileContent = require('raw!./demo.cpp');

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  public fileContent = fileContent;
}
