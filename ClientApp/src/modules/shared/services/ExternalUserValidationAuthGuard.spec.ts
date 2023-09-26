import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalService } from '@azure/msal-angular';
import { AuthConfig } from '../models/authconfig';
import { PagenotfoundComponent } from '../components/pagenotfound/pagenotfound.component';
import { of } from 'rxjs';
import { ExternalUserValidationAuthGuard } from './ExternalUserValidationAuthGuard';
export const routes: Routes = [
  {
    path: '',
    component: PagenotfoundComponent
  }
];

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

@Injectable()
class MockMsalService {
  instance = {
    getActiveAccount() {
      return { username: 'test@test.com' };
    }
  };
  public acquireTokenSilent(): Promise<boolean> {
    return Promise.resolve(null);
  }
  logout() {}
}

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url
  } as RouterStateSnapshot;
}
describe('ExternalUserValidationAuthGuard', () => {
  let service: ExternalUserValidationAuthGuard;
  let msalService: MsalService;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  let fakeRouteState = [
    {
      path: 'accessdenied',
      component: PagenotfoundComponent
    },
    { path: 'pagenotfound', component: PagenotfoundComponent }
  ];
  let fakeroute = '';
  let router: Router;
  AuthConfig.UserProfile = 'test@mail.com';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        ExternalUserValidationAuthGuard,
        { provide: MsalService, useClass: MockMsalService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
    service = TestBed.inject(ExternalUserValidationAuthGuard);
    msalService = TestBed.inject(MsalService);
  }));

  it('should be created', fakeAsync(() => {
    expect(service).toBeTruthy();
  }));

  it('should login to the application', async(() => {
    msalService.instance.getActiveAccount();
    service.canActivate(dummyRoute, fakeRouterState(fakeRouteState[1].path));
    expect(AuthConfig.userInfo.isExternalUser).toBeTrue();
  }));
});
