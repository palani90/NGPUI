import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValueAccessorBase } from './value-accessor-base';
import { environment } from 'src/environments/environment';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';

export type DropdownItems = { [key: string]: any; disabled?: boolean; isVisible?: boolean; enableAllOption?: boolean };
@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent extends ValueAccessorBase<any> implements OnInit, OnChanges, AfterViewInit {
  @Input() items: DropdownItems[] = [];
  @Input() multiSelectCheckbox: boolean = false;
  @Input() useCaseDropdownIcon: boolean = false;
  @Input() id: string = '_id';
  @Input() sameValueReset: boolean = false;
  @Input() placeholder: string = 'Sort By';
  @Input() regexPattern: string = '';
  @Input() patternType: string = 'Restrict';
  @Input() bindLabel: string = 'label';
  @Input() bindValue: string = 'data';
  @Input() bindObject: boolean = false;
  @Input() readOnlyFlag: boolean = false;
  @Input() enableAllOption: boolean = true;
  @Input() isScrollable: boolean = false;
  @Input() enableSearch: boolean = true;
  @Input() sortOutput: boolean = false;
  @Input() titleTooltip: boolean = false;
  @Input() customAllOption: boolean = false;
  @Input() displayLabel: string = '';
  @Input() disableTooltip: string = '';
  @Input() singleSelectSearch: boolean = false;
  @Input() pagination: boolean = false;
  @Input() dropUp: boolean = false;
  @Output() ngModalChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() validateUnselection: { options: boolean; all: boolean } = { options: false, all: false };
  @Input() editEnabled: boolean = false;
  @Input() deleteEnabled: boolean = false;
  @Input() addNewEnabled: boolean = false;
  @Input() dropDownType: string = '';
  @Input() scrollIntoView: boolean = false;
  @Output() emitObj = new EventEmitter<any>();
  isActive: boolean = false;
  dropdownSearch = '';
  customAllOptionIndex: number = null;
  selectedItem: any = {};
  checkedItems: DropdownItems[] = [];
  checkedItemsTitle: string = '';
  isAllFilterSelected = false;
  activeatOutsideClick = true;
  private unselectValidationIds = [];
  @ViewChild('selectSingle', { static: false }) selectRole: ElementRef<HTMLElement>;
  @ViewChild('selectMulti', { static: false }) selectStatus: ElementRef<HTMLElement>;
  constructor(private overlay: CustomOverlay, @Self() @Optional() private control: NgControl) {
    super();
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  /**
   * This method is called to default value from parent component
   */
  public override writeValue(value: any): void {
    this.selected = value;
    this.updateComponentValue();
  }

  /**
   * This method is called to update dropdown collection and setting default value
   */
  ngOnChanges(change: SimpleChanges) {
    if (change?.items?.currentValue) {
      let src = change.items.currentValue;
      if (src && src?.length) {
        src = src.map((item: any, index: number) => {
          if (item?.enableAllOption && this.customAllOptionIndex === null) {
            this.customAllOptionIndex = index;
          }
          const multiSelection = {
            isSelected: false,
            index,
            disabled: false,
            isVisible: true
          };
          if (typeof item === 'string') {
            return { ...{ label: item, data: item }, ...multiSelection };
          }
          return { ...multiSelection, ...item };
        });
      }
      this.items = [...src];
      this.updateComponentValue();
    }
  }

  /**
   * This method is called to update default value after viewinitialized
   */
  ngAfterViewInit(): void {
    this.updateComponentValue();
  }

  encodecustomURIComponent(url: string) {
    return encodeURIComponent(url).replace(/[-_.!~*'()/&,]/g, function (ch) {
      return '%' + ch.charCodeAt(0).toString(16);
    });
  }

  /**
   * This method is called to update default value from parent component
   */
  public updateComponentValue(): void {
    if (
      this.selected &&
      ((Array.isArray(this.selected) && this.selected.length) ||
        (typeof this.selected === 'object' && Object.keys(this.selected).length) ||
        typeof this.selected === 'string' ||
        typeof this.selected === 'number')
    ) {
      let selectedItem = {};
      if (this.multiSelectCheckbox) {
        if (this.items && this.items.length) {
          this.checkedItems = [];
          this.items.forEach((item) => {
            item.isSelected = false;
          });
          this.items
            .filter((item) => this.selected.includes(item[this.bindValue]))
            .forEach((item) => {
              item.isSelected = true;
              this.checkedItems.push(item);
            });
          if (this.checkedItems && this.checkedItems.length) {
            this.onOptionSelection(undefined);
          }
        }
      } else {
        if (typeof this.selected === 'string' || typeof this.selected === 'number') {
          selectedItem = this.items?.filter((item) => this.selected === item[this.bindValue])[0];
        } else if (typeof this.selected === 'object' && !Array.isArray(this.selected)) {
          selectedItem = this.items?.filter((item) => this.selected[this.bindValue] === item[this.bindValue])[0];
        }
        setTimeout(() => {
          this.selectedItem = selectedItem;
        }, 0);
      }
    } else {
      this.selectedItem = this.selected;
      this.checkedItems = [];
      this.checkedItemsTitle = '';
      this.isAllFilterSelected = false;
      if (this.items && this.items.length) {
        this.items.forEach((item) => {
          if (item?.hasOwnProperty('isSelected')) {
            item.isSelected = false;
          }
        });
      }
    }
  }

  /**
   * This method is called to set selected item value when checkbox dropdown is selected
   * Multi select dropdown
   */
  async onOptionSelection(index: number | undefined) {
    if (index !== undefined) {
      if (this.items[index]?.isSelected) {
        if (!this.items[index]?.enableAllOption) {
          this.checkedItems.push(this.items[index]);
          if (this.sortOutput) {
            this.checkedItems.sort((a, b) => a['index'] - b['index']);
          }
        }
      } else {
        let fIndex = this.checkedItems.findIndex((item) => item[this.bindValue] === this.items[index][this.bindValue]);

        this.checkedItems.splice(fIndex, 1);

        if (this.customAllOption) {
          this.items[this.customAllOptionIndex].isSelected = false;
        }
      }
      if (this.items[index]?.enableAllOption) {
        if (this.items[index]?.isSelected) {
          this.isAllFilterSelected = true;
          this.applyAllFilter(false);
        } else {
          this.isAllFilterSelected = false;
          this.applyAllFilter(false);
        }
      }
    }
    if (this.checkedItems.length === this.items.length) {
      this.isAllFilterSelected = true;
    } else if (this.customAllOption && this.checkedItems.length + 1 === this.items.length) {
      if (!this.items[this.customAllOptionIndex].isSelected) {
        this.items[this.customAllOptionIndex].isSelected = true;
      }
    } else {
      this.isAllFilterSelected = false;
    }
    this.checkedItemsTitle = this.checkedItems.map((item) => item[this.bindLabel]).join(', ');
    this.onSelectCheckBoxs();
  }

  /**
   * This method is called to enable all checkbox and disable all checkbox
   */
  async applyAllFilter(emitOutput = true) {
    this.checkedItems = [];
    this.checkedItemsTitle = '';
    if (this.isAllFilterSelected) {
      this.items.forEach((cap, index) => {
        if (!cap?.disabled) {
          cap.isSelected = true;
          if (!this.items[index]?.enableAllOption) {
            this.checkedItems.push({
              [this.bindValue]: cap[this.bindValue],
              index,
              [this.bindLabel]: cap[this.bindLabel]
            });
          }
        }
      });
      this.checkedItemsTitle = this.checkedItems.map((v) => v[this.bindLabel]).join(', ');
    } else {
      this.items.forEach((cap) => {
        cap.isSelected = false;
      });
    }
    if (emitOutput) {
      this.onSelectCheckBoxs();
    }
  }

  /**
   * This method is called to open the dropdown
   */
  isAllDisabled(data: DropdownItems[]) {
    return data.every((item) => item?.disabled);
  }
  /**
   * This method is called to open the dropdown
   */
  open() {
    this.isActive = true;
  }

  /**
   * This method is called to cloase the dropdown
   */
  close() {
    this.isActive = false;
  }

  /**
   * This method is called to open and close the dropdown
   */
  toggleActive() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.dropdownSearch = '';
    } else {
      if (this.scrollIntoView) {
        setTimeout(() => {
          this.selectRole?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.selectStatus?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }

  /**
   * This method is will return value of paticular key from selected object
   */
  getValue(key: string) {
    return this.selectedItem && this.selectedItem.hasOwnProperty(key) ? this.selectedItem[key] : '';
  }

  /**
   * This method is called to on clicking outside dropdown and close it
   */
  onOutsideClick(event: any) {
    // if (this.activeatOutsideClick) {
    this.dropdownSearch = '';
    if (event) {
      this.isActive = false;
    }
    // }
  }

  /**
   * This method is called to set selected value to form variable from default dropdown
   */
  onSelect(data: any) {
    this.onTouched();
    if (this.sameValueReset && data[this.bindValue] && this.selectedItem && data[this.bindValue] === this.selectedItem[this.bindValue]) {
      this.selectedItem = {};
      this.selected = '';
    } else {
      this.selectedItem = data;
      if (this.bindObject) {
        const obj = {};
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'index' && key !== 'isSelected') {
            obj[key] = value;
          }
        });
        this.selected = obj;
      } else {
        this.selected = data[this.bindValue];
      }
    }
    this.onChange(this.selected);
    this.ngModalChange.emit();
  }

  /**
   * This method is called to set checkbox value to form variable
   */
  onSelectCheckBoxs() {
    this.onTouched();
    this.selectedItem = this.checkedItems.map((item) => item[this.bindValue]);
    this.selected = this.checkedItems.map((item) => item[this.bindValue]);

    this.onChange(this.selected);
    this.ngModalChange.emit();
  }

  validate(control: NgControl): boolean {
    let val = control.value;
    let invalid = true;
    if (val === undefined || val === null || val === '') {
      invalid = true;
    } else if (typeof val === 'string') {
      invalid = false;
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      invalid = !Object.keys(val).length ? true : false;
    } else if (typeof val === 'object' && Array.isArray(val)) {
      invalid = !val.length ? true : false;
    }
    console.log({
      control,
      value: this.selected,
      id: this.id,
      invalid: invalid
    });
    return invalid;
  }

  public get invalid(): boolean {
    return this.validate(this.control);
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? dirty || touched : false;
  }

  updateUnselectValidationArrays(data = []) {
    this.unselectValidationIds = data;
  }
  // async editItems(data, event) {
  //   event.preventDefault();
  //   // this.activeatOutsideClick = false;
  //   let name = '';
  //   if (this.dropDownType == 'Tags') name = data.tagName;
  //   else if (this.dropDownType == 'Ecosystem Partner') name = data.solutionTypeName;
  //   else if (this.dropDownType == 'User Personas') name = data.userPersonaName;
  //   const res = await this.sharedService.openAddNewPopup(this.dropDownType, true, name, this.items, 'edit');
  //   event.preventDefault();
  //   if (res.state == 'SUBMIT') {
  //     if (this.dropDownType == 'Tags') data.tagName = res.name;
  //     else if (this.dropDownType == 'Ecosystem Partner') data.solutionTypeName = res.name;
  //     else if (this.dropDownType == 'User Personas') data.userPersonaName = res.name;
  //     this.isActive = true;
  //     this.onOptionSelection(data.index);
  //   }
  //   this.updateComponentValue();
  // }
}
