import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { CUSTOM_OVERLAY_DATA } from '../../custom-overlay/custom-overlay/custom-overlay';
import { CustomOverlayRef } from '../../custom-overlay/custom-overlay/custom-overlay-ref';
import { CustomOverlayModule } from '../../custom-overlay/custom-overlay/custom-overlay.module';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';
import { OutsideClickDirective } from '../../directives/outside-click.directive';
import { FilterPipe } from '../../pipe/filter.pipe';
import { SharedModule } from '../../shared.module';
import { CustomSelectComponent, DropdownItems } from './custom-select.component';

class OverlayDialogMock {
  open() {
    return {
      afterClosed: of({ data: { value: 'Ok' } }, { data: { value: 'Cancel' } })
    };
  }
}
export class TestNgControl {
  valueAccessor: any = null;
}
describe('CustomSelectComponent', () => {
  let component: CustomSelectComponent;
  let componentHost: TestselectComponent;
  let fixture: ComponentFixture<CustomSelectComponent>;
  let fixtureHost: ComponentFixture<TestselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestselectComponent, CustomSelectComponent, FilterPipe, OutsideClickDirective],
      imports: [CustomOverlayModule.forRoot(), SharedModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: CustomOverlay, useClass: OverlayDialogMock },
        { provide: NgControl, useClass: TestNgControl },
        { provide: CustomOverlayRef, useValue: { close() {} } },
        { provide: CUSTOM_OVERLAY_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixtureHost = TestBed.createComponent(TestselectComponent);
    componentHost = fixtureHost.componentInstance;
    fixtureHost.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnChanges', () => {
    componentHost.items = [
      { label: 'one', id: '1' },
      { label: 'two', id: '2' }
    ];
    spyOn(componentHost.customSelectComponent, 'ngOnChanges').and.callThrough();
    fixtureHost.detectChanges();
    expect(componentHost.customSelectComponent.items.length).toBe(2);

    componentHost.items = ['one', 'two'];
    fixtureHost.detectChanges();
    expect(componentHost.customSelectComponent.items.length).toBe(2);
  });
  it('should enable selection', () => {
    componentHost.items = [
      { label: 'one', id: '1' },
      { label: 'two', id: '2' }
    ];
    spyOn(componentHost.customSelectComponent, 'ngOnChanges').and.callThrough();
    fixtureHost.detectChanges();
    componentHost.multi = true;
    componentHost.customSelectComponent.items[0].isSelected = true;
    componentHost.customSelectComponent.onOptionSelection(0);
    expect(componentHost.customSelectComponent.selected).toEqual(['1']);

    componentHost.customSelectComponent.items[1].isSelected = true;
    componentHost.customSelectComponent.onOptionSelection(1);
    expect(componentHost.customSelectComponent.selected).toEqual(['1', '2']);

    componentHost.customSelectComponent.items[0].isSelected = false;
    componentHost.customSelectComponent.items[1].isSelected = false;
    componentHost.customSelectComponent.onOptionSelection(0);
    componentHost.customSelectComponent.onOptionSelection(1);
    expect(componentHost.customSelectComponent.selected).toEqual([]);

    componentHost.items = ['one', 'two'];
    componentHost.multi = false;
    fixtureHost.detectChanges();
    componentHost.customSelectComponent.onSelect({ label: 'one', id: '1' });
    expect(componentHost.customSelectComponent.selected).toEqual('1');
    componentHost.customSelectComponent.onSelect({ label: 'one', id: '1' });
    expect(componentHost.customSelectComponent.selected).toEqual('1');
  });

  it('should toggle dropdown', () => {
    componentHost.items = [
      { label: 'one', id: '1' },
      { label: 'two', id: '2' }
    ];
    spyOn(componentHost.customSelectComponent, 'ngOnChanges').and.callThrough();
    fixtureHost.detectChanges();
    componentHost.customSelectComponent.open();
    expect(componentHost.customSelectComponent.isActive).toBeTruthy();
    componentHost.customSelectComponent.close();
    expect(componentHost.customSelectComponent.isActive).toBeFalsy();
    componentHost.customSelectComponent.toggleActive();
    expect(componentHost.customSelectComponent.isActive).toBeTruthy();
    document.dispatchEvent(new MouseEvent('click'));
    expect(componentHost.customSelectComponent.isActive).toBeFalsy();
  });

  it('should call apply all func', () => {
    componentHost.items = [
      { label: 'one', id: '1' },
      { label: 'two', id: '2' }
    ];
    spyOn(componentHost.customSelectComponent, 'ngOnChanges').and.callThrough();
    fixtureHost.detectChanges();
    componentHost.customSelectComponent.bindLabel = 'label';
    componentHost.customSelectComponent.isAllFilterSelected = true;
    componentHost.customSelectComponent.applyAllFilter();
    expect(componentHost.customSelectComponent.selected).toEqual(['1', '2']);

    componentHost.customSelectComponent.isAllFilterSelected = false;
    componentHost.customSelectComponent.applyAllFilter();
    expect(componentHost.customSelectComponent.selected).toEqual([]);
  });
  it('should call value accessor base', () => {
    component.onChange('');
    component.onTouched ();
    component.registerOnChange(() => {});
    component.registerOnTouched(() => {});
    component.setDisabledState(true);
    component.writeValue({ name: 'hi' });
    component.value = 10;
    expect(component.value).toBe(10);
  });

  it('should preselect values, popups, validation', async () => {
    componentHost.items = [
      { label: 'one', id: '1' },
      { label: 'two', id: '2' }
    ];
    spyOn(componentHost.customSelectComponent, 'ngOnChanges').and.callThrough();
    fixtureHost.detectChanges();
    componentHost.customSelectComponent.multiSelectCheckbox = true;
    componentHost.select.patchValue(['1', '2']);
    componentHost.customSelectComponent.updateComponentValue();
    expect(componentHost.customSelectComponent.checkedItems.length).toBe(2);
    componentHost.customSelectComponent.multiSelectCheckbox = false;
    componentHost.select.patchValue('1');
    componentHost.customSelectComponent.updateComponentValue();
    expect(componentHost.customSelectComponent.selected).toBe('1');

    componentHost.select.setValidators([Validators.required]);
    componentHost.select.updateValueAndValidity();
    componentHost.select.patchValue('1');
    expect(componentHost.customSelectComponent.invalid).toBeFalsy();
    componentHost.select.patchValue(['1', '2']);
    expect(componentHost.customSelectComponent.invalid).toBeFalsy();
    componentHost.select.patchValue('');
    expect(componentHost.customSelectComponent.invalid).toBeTruthy();
    expect(componentHost.customSelectComponent.showError).toBeTruthy();
  });

  it('should popups confirmation validation', async () => {
    componentHost.items = [
      { label: 'one', id: '1' },
      { label: 'two', id: '2' },
      { label: 'All', id: '', enableAllOption: true }
    ];
    spyOn(componentHost.customSelectComponent, 'ngOnChanges').and.callThrough();
    fixtureHost.detectChanges();

    componentHost.multi = true;
    componentHost.customSelectComponent.items[0].isSelected = false;
    componentHost.customSelectComponent.validateUnselection = { all: true, options: true };
    componentHost.customSelectComponent.isAllFilterSelected = false;
    componentHost.customSelectComponent.updateUnselectValidationArrays(['1']);
    componentHost.customSelectComponent.onOptionSelection(0);
    componentHost.customSelectComponent.applyAllFilter();
    componentHost.customSelectComponent.customAllOption = true;
    componentHost.customSelectComponent.customAllOptionIndex = 2;
    componentHost.customSelectComponent.items[2].isSelected = true;
    componentHost.customSelectComponent.onOptionSelection(2);
    componentHost.customSelectComponent.items[2].isSelected = false;
    componentHost.customSelectComponent.onOptionSelection(2);
    componentHost.customSelectComponent.sortOutput = true;
    componentHost.customSelectComponent.items[0].isSelected = true;
    componentHost.customSelectComponent.items[1].isSelected = false;
    componentHost.customSelectComponent.items[2].isSelected = false;
    componentHost.customSelectComponent.onOptionSelection(0);
    expect(componentHost.customSelectComponent.selected).toBeTruthy();
  });

  it('should call onselect', async () => {
    componentHost.items = [
      { label: 'one', id: '1' },
      { label: 'two', id: '2' },
      { label: 'All', id: '', enableAllOption: true }
    ];
    spyOn(componentHost.customSelectComponent, 'ngOnChanges').and.callThrough();
    fixtureHost.detectChanges();
    componentHost.customSelectComponent.sameValueReset = true;
    componentHost.customSelectComponent.onSelect({ label: 'one', id: '1' });
    componentHost.customSelectComponent.sameValueReset = true;
    componentHost.customSelectComponent.onSelect({ label: 'one', id: '1' });
    componentHost.customSelectComponent.bindObject = true;
    componentHost.customSelectComponent.sameValueReset = false;
    componentHost.customSelectComponent.onSelect({ label: 'one', id: '1' });
    componentHost.customSelectComponent.isActive = true;
    componentHost.customSelectComponent.toggleActive();
    expect(componentHost.customSelectComponent.dropdownSearch).toEqual('');
  });

  it('should call encodecustomURIComponent', () => {
    component.encodecustomURIComponent('test url string');
    expect(component.encodecustomURIComponent).toBeTruthy();
  });

  it('should call isAllDisabled', () => {
    let obj: DropdownItems[] = [
      {
        key: 'value',
        disabled: true,
        isVisible: true
      }
    ];
    component.isAllDisabled(obj);
    expect(component.isAllDisabled).toBeTruthy();
  });
});
@Component({
  selector: '',
  template: `
    <app-custom-select
      [items]="items"
      (ngModalChange)="change($event)"
      [bindLabel]="'label'"
      [formControl]="select"
      [bindValue]="'id'"
      [multiSelectCheckbox]="multi"
      [validateUnselection]="popupConfirmValidation"
    ></app-custom-select>
  `
})
class TestselectComponent {
  @ViewChild(CustomSelectComponent) public customSelectComponent: any;
  items: any;
  multi = true;
  select: UntypedFormControl = new UntypedFormControl();
  popupConfirmValidation = {};
  change(eve: any) {}
}
