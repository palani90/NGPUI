/* eslint-disable @typescript-eslint/no-empty-function */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
class MockLayerService {

  public close() {}
}


describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let sidenav: MatSidenav;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [Router, MockLayerService, { provide: MatSidenav, useClass: MockLayerService }],
      imports: [HttpClientTestingModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    sidenav = TestBed.inject(MatSidenav);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
