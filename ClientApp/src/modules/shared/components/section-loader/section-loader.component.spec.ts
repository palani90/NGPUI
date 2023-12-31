import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLoaderComponent } from './section-loader.component';

describe('SectionLoaderComponent', () => {
  let component: SectionLoaderComponent;
  let fixture: ComponentFixture<SectionLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
