import { Directive, ElementRef, EventEmitter, HostListener, Input, Optional, Output, Self } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[KeyPressValidator]',
  providers: [NgModel]
})
export class KeyPressValidatorDirective {
  @Input('KeyPressValidator') regexPattern: RegExp;
  @Input('KeyPressType') type: 'Allow' | 'Restrict' = 'Allow';
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(@Optional() private model?:NgModel,
  @Optional() @Self() private ngControl?: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (this.type === 'Restrict') {
      let newValue = value.replace(new RegExp(this.regexPattern, 'g'), '');
      this.model?.valueAccessor.writeValue(newValue);
      this.ngModelChange.emit(newValue);
      this.ngControl?.control!.setValue(newValue);
  }
  }
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    return this.type === 'Allow' ? new RegExp(this.regexPattern, 'g').test(event.key) : 
      !new RegExp(this.regexPattern, 'g').test(event.key);
  }
}
