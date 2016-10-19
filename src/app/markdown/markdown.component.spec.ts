import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,  Component, OnInit, ElementRef } from '@angular/core';
import * as  marked  from 'marked';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { HttpModule} from '@angular/http';

let fixture, comp, el, de, mdService;

describe('1st tests', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, MarkdownComponent],
            providers: [MarkdownService]
        });

        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;
    });

    it('get ng-content', () => {
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.simple-p'));
        expect(de.nativeElement.innerHTML).toContain(marked('I am using __markdown__.'));
    });

});

describe('testing $http', () => {
    let spy,testHtml;
      beforeEach(() => {
        TestBed.configureTestingModule({
              imports: [HttpModule],
            declarations: [TestComponent, MarkdownComponent],
            providers: [MarkdownService]
        });
        fixture = TestBed.createComponent(TestComponent);

        mdService = fixture.debugElement.injector.get(MarkdownService);
        // Setup spy on the `get` method
        spy = spyOn(mdService, 'getContent')
          .and.returnValue(Promise.resolve(testHtml));

        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('.using-http-md'));
        el = de.nativeElement;
    });

    it('get http content', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();        // update view with quote
            console.log(testHtml);
        });

    }));

    //  it('should show quote after getQuote promise (async)', async(() => {
    //     fixture.detectChanges();
    //     fixture.whenStable().subscribe(() => { // wait for async getQuote
    //         fixture.detectChanges();        // update view with quote
    //         // expect(el.textContent).toBe(testQuote);
    //     });
    // }));
});



@Component({
    selector: 'app-test-comp',
    template: `
    <div class="my"> 
        <markdown class="simple-p">
            I am using __markdown__.
        </markdown>
        <markdown class="using-http-md" path="./demo.md"></markdown>
    </div>`
})
export class TestComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}



