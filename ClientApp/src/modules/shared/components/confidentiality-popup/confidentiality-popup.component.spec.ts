import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CUSTOM_OVERLAY_DATA } from '../../custom-overlay/custom-overlay/custom-overlay';
import { CustomOverlayRef } from '../../custom-overlay/custom-overlay/custom-overlay-ref';
import { CustomOverlayModule } from '../../custom-overlay/custom-overlay/custom-overlay.module';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';
import { ConfidentialityPopupComponent } from './confidentiality-popup.component';

class OverlayDialogMock {
  open() {
    return {
      afterClosed: of({ data: { value: 'Ok' } }, { data: { value: 'Cancel' } })
    };
  }
}
describe('ConfidentialityPopupComponent', () => {
  let component: ConfidentialityPopupComponent;
  let fixture: ComponentFixture<ConfidentialityPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfidentialityPopupComponent],
      imports: [CustomOverlayModule.forRoot()],
      providers: [
        { provide: CustomOverlay, useClass: OverlayDialogMock },
        { provide: CustomOverlayRef, useValue: { close() {} } },
        { provide: CUSTOM_OVERLAY_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfidentialityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close popup', () => {
    component.closedialog();
    expect(component.closedialog).toBeDefined();
  });
});
