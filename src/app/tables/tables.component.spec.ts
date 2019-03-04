import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesComponent } from './tables.component';
import { NgxMdModule } from 'projects/ngx-md/src/public_api';
import { HttpClientModule } from '@angular/common/http';

describe('TablesComponent', () => {
	let component: TablesComponent;
	let fixture: ComponentFixture<TablesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
      declarations: [TablesComponent],
      imports: [NgxMdModule.forRoot(), HttpClientModule]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TablesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
