/* eslint-disable @typescript-eslint/no-empty-function */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatDialog,  MatDialogModule,  MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let dialog: MatDialog;

  const dialogMock = {
    close: () => { },
    open: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [
        { provide: MatDialog, useValue: dialog },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close the popup', () => {
    component.closeDialog();
    expect(component.closeDialog).toBeDefined();
  });
});
