import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { KeyPressValidatorDirective } from './key-press-validator.directive';

describe('KeyPressValidatorDirective', () => {
  let fixture;
  let input: DebugElement;
  let component:KeyPressTestComponent;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [KeyPressValidatorDirective, KeyPressTestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers:[NgControl]
    }).createComponent(KeyPressTestComponent);

    component = fixture.componentInstance;
    input = fixture.debugElement.query(By.directive(KeyPressValidatorDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new KeyPressValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should prevent keypress event', () => {
    const event = new KeyboardEvent('keypress', {
      key: '*',
      cancelable: true
    });

    input.nativeElement.dispatchEvent(event);
    expect(event.defaultPrevented).toBeTruthy();
  });

  it('should not prevent keypress event', () => {
    const event = new KeyboardEvent('keypress', {
      key: 'a',
      cancelable: true
    });

    input.nativeElement.dispatchEvent(event);
    expect(event.defaultPrevented).toBeFalsy();
  });

  it('should remove restricted character from given input', fakeAsync(() => {
    const spy = spyOn(component, 'namechange');
    let text = fixture.debugElement.query(By.css('input'));
    let el = text.nativeElement;
    el.value = '*&^%$#@!~';

    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('&$#@~');
  }));

  @Component({
    template: `
      <input [KeyPressValidator]="'[*^%!><]'" (ngModelChange)="namechange($event)" [KeyPressType]="'Restrict'" [(ngModel)]="name" />
    `
  })
  class KeyPressTestComponent {
    name = '';
    namechange(event) {}
  }
});
