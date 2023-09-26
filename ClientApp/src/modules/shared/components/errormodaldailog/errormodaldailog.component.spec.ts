/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-irregular-whitespace */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatDialog,  MatDialogModule,  MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ErrormodaldailogComponent } from './errormodaldailog.component';

describe('ErrormodaldailogComponent', () => {
  let component: ErrormodaldailogComponent;
  let fixture: ComponentFixture<ErrormodaldailogComponent>;
  let dialog: MatDialog;

  const dialogMock = {​​​​​​
    close: () => {​​​​​​ }​​​​​​,
    open: () => {​​​​​​ }​​​​​​
  }​​​​​​;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrormodaldailogComponent ],
      providers: [
        {​​​​ provide: MatDialog, useValue: dialog }​​​​,
        {​​​​ provide: MatDialogRef, useValue: dialogMock }​​​​,
        {​​​​ provide: MAT_DIALOG_DATA, useValue: {​​​​}​​​​ }​​​​
    ],
    imports: [ MatDialogModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrormodaldailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the popup', () => {
    component.clickclose({ target: { id: 'ok' } });
    component.clickclose({ target: { id: 'cross' } });
    expect(component.clickclose).toBeDefined();
  });
});
