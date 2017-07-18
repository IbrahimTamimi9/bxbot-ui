import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';

let appComponentUnderTest: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;

describe('Main Application Component tests', function () {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AppComponent);
                appComponentUnderTest = fixture.componentInstance;
            });
    }));

    it('should display original BX-bot UI title', () => {

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;

        fixture.detectChanges();
        expect(el.textContent).toContain(AppComponent.TITLE);
    });

    it('should display a different app title', () => {

        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;

        AppComponent.TITLE = 'Nostromo Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Nostromo Title');
    });
});
