import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthConfig } from 'src/modules/shared/models/authconfig';
import { PrivacyStatementComponent } from './privacy-statement.component';

describe('PrivacyStatementComponent', () => {
  let component: PrivacyStatementComponent;
  let fixture: ComponentFixture<PrivacyStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyStatementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should open', () => {
    component.isValidUser = false;
    AuthConfig.userInfo.status = 'Active';
    component.ngOnInit();
    expect(component.isValidUser).toEqual(true);
  });

  it('should open as an invalidUser', () => {
    component.isValidUser = true;
    AuthConfig.userInfo.status = 'Inactive';
    component.ngOnInit();
    expect(component.isValidUser).toEqual(false);
  });

  it('should open external link', () => {
    jasmine.getEnv().allowRespy(true);
    spyOn(window, 'open');
    component.navigateTo('privacy-policy');
    expect(window.open).toHaveBeenCalledWith(
      'https://www.accenture.com/us-en/about/privacy-policy',
      '_blank'
    );
    component.navigateTo('binding-corporate-rules');
    expect(window.open).toHaveBeenCalledWith(
      'https://www.accenture.com/us-en/about/binding-corporate-rules',
      '_blank'
    );
    component.navigateTo('cookie-definitions');
    expect(window.open).toHaveBeenCalledWith(
      'https://docs.microsoft.com/en-us/azure/active-directory-b2c/cookie-definitions',
      '_blank'
    );
    component.navigateTo('similar-technology');
    expect(window.open).toHaveBeenCalledWith(
      'https://www.accenture.com/us-en/support/company-cookies-similar-technology',
      '_blank'
    );
  });
});
