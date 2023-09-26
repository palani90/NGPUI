import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalService } from '@azure/msal-angular';
import { Observable, of, throwError } from 'rxjs';
import { AuthConfig } from '../../models/authconfig';
import { Users } from '../../models/users';
import { UseCaseViewService } from '../../services/usecaseView.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { AuthorizationComponent } from './authorization.component';
@Injectable()
class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
  navigate(url: any) {
    return url[0];
  }
  url = '';
  events = of(new NavigationEnd(0, 'explore', 'explore'));
}

class MockUseCaseService {
  emailId = 'test@test.com';
  getWorkspaceRequest(): Observable<any> {
    return of({
      isSuccess: true,
      statusCode: 200,
      message: 'Success',
      isException: false,
      responseData: true,
      correlationUId: '305c6004-07a3-9dc9-4cca-b84baf2fb581'
    });
  }
}

@Injectable()
class MockMsalService {
  instance = {
    getActiveAccount() {
      return { username: 'mail@mail.com' };
    }
  };
  public acquireTokenSilent(): Promise<boolean> {
    return Promise.resolve(null);
  }
}

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  let spy;
  let router: Router;
  let usecaseservice: UseCaseViewService;
  let mockusecaseservice: MockUseCaseService;
  let _service: MockMsalService;
  AuthConfig.userInfo = new Users();
  AuthConfig.userInfo.isExternalUser = false;
  AuthConfig.workspaceUrl = '41e4245f-ed3c-4c42-9359-0d6dea7767r5';
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationComponent, PageLoaderComponent, HeaderComponent, FooterComponent],
      providers: [
        MsalService,
        MockMsalService,
        MockRouter,
        { provide: Router, useClass: MockRouter },
        UseCaseViewService,
        MockUseCaseService,
        { provide: MsalService, useClass: MockMsalService }
      ],

      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    usecaseservice = TestBed.inject(UseCaseViewService);
    _service = TestBed.inject(MockMsalService);
    mockusecaseservice = TestBed.inject(MockUseCaseService);
    AuthConfig.workspaceUrl = '41e4245f-ed3c-4c42-9359-0d6dea7767r5';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call load image url', () => {
    expect(component.ngAfterViewInit).toBeTruthy();
  });

  it('should load image', () => {
    component.imageLoaded(' ');
    expect(component.imageLoaded).toBeTruthy();
  });

  it('should open MyIndustryX', () => {
    const mySpy = jasmine.createSpy('name');
    window.open = mySpy;
    component.openMyIndustryX();
    expect(mySpy).toHaveBeenCalled();
  });

  it('should go to terms and privacy', () => {
    let data = mockusecaseservice.getWorkspaceRequest();
    spyOn(usecaseservice, 'getWorkspaceRequest').and.returnValue(data);
    component.goToTermsAndPrivacy('termsofuse');
    component.goToTermsAndPrivacy('privacystatement');
    expect(component.goToTermsAndPrivacy).toBeDefined();
  });

  it('should call contact support', () => {
    component.ngOnInit();
    let data = mockusecaseservice.getWorkspaceRequest();
    spyOn(usecaseservice, 'getWorkspaceRequest').and.returnValue(data);
    component.contactSupport();
    expect(component.emailData).toBeDefined();
  });

  it('should call contact support2', () => {
    component.ngOnInit();
    let data = mockusecaseservice.getWorkspaceRequest();
    spyOn(usecaseservice, 'getWorkspaceRequest').and.returnValue(throwError({ status: 404 }));
    component.contactSupport();
    expect(component.emailData).toBeDefined();
  });

  it('should check access', () => {
    component.ngOnInit();
    let data = mockusecaseservice.getWorkspaceRequest();
    spyOn(usecaseservice, 'getWorkspaceRequest').and.returnValue(data);
    component.checkAccess();
  });

  it('should check access2', () => {
    component.ngOnInit();
    let data = mockusecaseservice.getWorkspaceRequest();
    spyOn(usecaseservice, 'getWorkspaceRequest').and.returnValue(throwError({ status: 404 }));
    component.checkAccess();
  });

  it('should call checkAccess for workspcase Url is not there', () => {
    AuthConfig.workspaceUrl = null;
    component.checkAccess();
    expect(component.checkAccess).toBeTruthy();
  });
});
