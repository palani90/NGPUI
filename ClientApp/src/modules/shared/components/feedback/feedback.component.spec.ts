import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';
import { CustomOverlayModule } from '../../custom-overlay/custom-overlay/custom-overlay.module';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_OVERLAY_DATA } from '../../custom-overlay/custom-overlay/custom-overlay';
import { CustomOverlayRef } from '../../custom-overlay/custom-overlay/custom-overlay-ref';
import { HttpClientTestingModule } from '@angular/common/http/testing';
class OverlayDialogMock {
  open() {
    return {
      afterClosed: of({ data: { value: true } }),
      isAttached: () => true,
      customOverlay: {
        updatePositionStrategy: (args) => {}
      },
      activate: () => {}
    };
  }
}

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        CustomOverlayModule.forRoot()
      ],
      providers:[ {
        provide: CustomOverlayRef,
        useValue: {}
      },
      {
        provide: CUSTOM_OVERLAY_DATA,
        useValue: {}
      },
        { provide: CustomOverlay, useClass: OverlayDialogMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
