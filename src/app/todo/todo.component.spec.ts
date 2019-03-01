import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { NgxMdModule } from 'projects/ngx-md/src/public_api';

describe('TodoComponent', () => {
	let component: TodoComponent;
	let fixture: ComponentFixture<TodoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [NgxMdModule.forRoot()]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TodoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
