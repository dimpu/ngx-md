import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  data = `
  ## Todo example

  - [x] Variable binding
  - [x] Code refactor
  - [x] Write more unit tests
  - [ ] Module configuration for markdown settings
  - [ ] Module configuration for prismjs settings`;
  
  constructor() { }

  ngOnInit() {
  }

}
