import { Users } from './../shared/models/users';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MsalBroadcastService, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE } from '@azure/msal-angular';
import { Injectable } from '@angular/core';
import { AuthConfigService } from '../shared/services/auth-config.service';
import { Observable, of } from 'rxjs';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HttpClient } from '@angular/common/http';

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6',
      redirectUri: 'http://localhost:4200'
    }
  });
}
  
@Injectable()
class MockIndustryService {
  constructor(private http: HttpClient) { }

  public getUserPhoto(): Observable<any> {
    return of(null)
  }

}

@Injectable()
class MockMsalService {
    instance = {
      getAllAccounts() {
        return [{ name: "Gauri Jha" }];
      },
      enableAccountStorageEvents() {
        return true;
      },
      getActiveAccount(){
        return undefined;
      },
      setActiveAccount(data: any) {
      }
    };
    
    public acquireTokenSilent():Promise<boolean>{
      return Promise.resolve(null);
    }
}
@Injectable()
class MockAuthConfigService {
  public getUserPhoto(): Observable<any> {
    return of({ photo: null })
  }
}

@Injectable()
class MockMsalBroadcastService {
  msalSubject$: Observable<any> = of({ eventType: 'msal:accountAdded' });
  inProgress$: Observable<any> = of('none');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [AppComponent ],
      providers:[ MsalService, MsalBroadcastService, 
        { provide: MsalBroadcastService,
           useClass: MockMsalBroadcastService },
            { provide: MSAL_INSTANCE,
               useFactory: MSALInstanceFactory },
      { provide: MSAL_GUARD_CONFIG, 
        useFactory: MSALInstanceFactory },
      { provide: MsalService, 
        useClass: MockMsalService }, AuthConfigService,
      { provide: AuthConfigService, useClass: MockAuthConfigService },
       MockIndustryService,  Users]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //Users.name = "Gauri Jha";
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get User Photo', () => {
    component.getUserPhoto();
  });

  it('should check and set active account', () => {
    component.checkAndSetActiveAccount();
  });
  it('should close window', () => {
    component.popupActionClick();
  });


});