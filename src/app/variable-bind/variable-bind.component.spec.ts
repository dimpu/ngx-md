import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableBindComponent } from './variable-bind.component';

describe('VariableBindComponent', () => {
	let component: VariableBindComponent;
	let fixture: ComponentFixture<VariableBindComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [VariableBindComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VariableBindComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
