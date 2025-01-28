import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'md-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    standalone: false
})
export class TodoComponent implements OnInit {
	data = `
  ## Todo example

  - [x] Variable binding
  - [x] Code refactor
  - [x] Write more unit tests
  - [ ] Module configuration for markdown settings
  - [ ] Module configuration for prismjs settings`;

	constructor() {}

	ngOnInit() {}
}
