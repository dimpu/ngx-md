import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'md-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    standalone: false
})
export class TablesComponent implements OnInit {
	data = `
  | Tables   |      Are      |  Cool |
  |----------|:-------------:|------:|
  | col 1 is |  left-aligned | $1600 |
  | col 2 is |    centered   |   $12 |
  | col 3 is | right-aligned |    $1 |`;

	constructor() {}

	ngOnInit() {}
}
