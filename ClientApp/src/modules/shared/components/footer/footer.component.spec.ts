import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthConfig } from '../../models/authconfig';
import { usecasedata } from '../../models/usecase.model';
import { NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CustomOverlayModule } from '../../custom-overlay/custom-overlay/custom-overlay.module';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';


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

@Injectable()
class MockRouter {
  navigateByUrl(url: string) { return url; }
  navigate(url: any) { return url[0]; }
  url = "";
  events = of(new NavigationEnd(0, 'explore', 'explore'))
}
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let router: Router
  AuthConfig.usecaseObj = new usecasedata();
  AuthConfig.usecaseObj.useCaseUid = "8f496417-9142-48c1-b153-0c0bae19b48e";
  AuthConfig.workspaceUrl = "8f496417-9142-48c1-b153-0c0bae19b48e"

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [MockRouter, { provide: Router, useClass: MockRouter },
        { provide: CustomOverlay, useClass: OverlayDialogMock }
      ],
      imports: [HttpClientTestingModule,
        CustomOverlayModule.forRoot()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to transform termsofuse', () => {
    AuthConfig.transformInstance = true
    AuthConfig.showcaseInstance = false;
    AuthConfig.workspaceUrl = 'c4f368be-c97e-4c1d-a2e1-c48b31ef8dd2'
    component.goToTermsAndPrivacy('termsofuse')
  });

  it('should navigate to transform privacystatement', () => {
    AuthConfig.transformInstance = true
    AuthConfig.showcaseInstance = false
    AuthConfig.workspaceUrl = 'c4f368be-c97e-4c1d-a2e1-c48b31ef8dd2'
    component.goToTermsAndPrivacy('privacystatement')
  });

  it('should navigate to showcase termsofuse', () => {
    AuthConfig.workspaceUrl = ''
    AuthConfig.transformInstance = false
    AuthConfig.showcaseInstance = true
    component.goToTermsAndPrivacy('termsofuse')
  });

  it('should navigate to showcase privacystatement', () => {
    AuthConfig.workspaceUrl = ''
    AuthConfig.transformInstance = false
    AuthConfig.showcaseInstance = true
    component.goToTermsAndPrivacy('privacystatement')
  });

  it('should navigate to termsofuse from access denied page', () => {
    AuthConfig.workspaceUrl = ''
    AuthConfig.transformInstance = false
    AuthConfig.showcaseInstance = false
    component.goToTermsAndPrivacy('termsofuse')
  });

  it('should navigate to privacystatement from access denied page', () => {
    AuthConfig.workspaceUrl = ''
    AuthConfig.transformInstance = false
    AuthConfig.showcaseInstance = false
    component.goToTermsAndPrivacy('privacystatement')
  });

  it('should call redirectTo', ()=>{
    component.redirectTo('getHelp');
    component.redirectTo('FAQ');
    component.redirectTo('trainingLink');
    expect(component).toBeDefined();
  })
 });
