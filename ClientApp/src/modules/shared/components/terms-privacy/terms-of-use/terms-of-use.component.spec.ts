import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthConfig } from 'src/modules/shared/models/authconfig';

import { TermsOfUseComponent } from './terms-of-use.component';

describe('TermsOfUseComponent', () => {
  let component: TermsOfUseComponent;
  let fixture: ComponentFixture<TermsOfUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsOfUseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('when user status is active', () => {
    AuthConfig.userInfo.status = 'Active';
    component.ngOnInit();
    expect(component.isValidUser).toEqual(true);
  });

  it('should go to privacy statement for external user', () => {
    component.goToExternalPrivacyStatement();
    expect(component).toBeTruthy();
  });
});
