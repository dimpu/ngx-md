import { Component } from '@angular/core';

@Component({
    selector: 'md-variable-bind',
    templateUrl: './variable-bind.component.html',
    styleUrls: ['./variable-bind.component.scss'],
    standalone: false
})
export class VariableBindComponent {
	public marked = '# Heading';
}
