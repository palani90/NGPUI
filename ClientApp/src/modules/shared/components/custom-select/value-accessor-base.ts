import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  disabled: boolean = false;
  selected!: T;

  /**
   * This method are called on change any value of form variable
   */
  public onChange = (_: any) => { };
  public onTouched = () => { };

  /**
   * This method is called to get active values
   */
  get value(): T {
    return this.selected;
  }


  /**
   * This method is called to set active values
   */
  set value(value: T) {
    if (this.selected !== value) {
      this.selected = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  /**
   * This method is called on change in value
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * This method is called on touch
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * This method is called on set disable form variable
   */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  /**
   * This method is called to set default value to form variable
   * can be overwritten in child imports if needed
   */
  public writeValue(obj: any): void {
    this.selected = obj;
  }
}
