import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[outSideClick]'
})
export class OutsideClickDirective {
  constructor(private _elementRef: ElementRef) {}

  @Output() clickOutside: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement) {
    const clickInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickInside) {
      this.clickOutside.emit(true);
    }
  }
}
