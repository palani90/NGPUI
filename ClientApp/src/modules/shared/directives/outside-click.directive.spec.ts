import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { OutsideClickDirective } from './outside-click.directive';

describe('OutsideClickDirective', () => {
  let fixture;
  let component: OutsideClickComponent;
  beforeEach(waitForAsync(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [OutsideClickDirective, OutsideClickComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).createComponent(OutsideClickComponent);
  }));

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return true or close', fakeAsync(() => {
    component.dropdown = true;
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.dropdown).toBe(false);
  }));

  @Component({
    template: `
      <div #ClickIn id="ClickIn" outSideClick (clickOutside)="outsideClickCall($event)"><h2>OutsideClick</h2></div>
    `
  })
  class OutsideClickComponent {
    dropdown = true;
    outsideClickCall(event) {
      if (event) {
        this.dropdown = false;
      }
    }
  }
});
