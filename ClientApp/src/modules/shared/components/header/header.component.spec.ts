import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
   MatDialog,
   MatDialogModule,
   MatDialogRef,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalService } from '@azure/msal-angular';
import { Observable, of } from 'rxjs';
import { AuthConfig } from '../../models/authconfig';
import { HeaderComponent } from './header.component';
import { CustomOverlayModule } from '../../custom-overlay/custom-overlay/custom-overlay.module';
import { CustomOverlay } from '../../custom-overlay/custom-overlay/custom-overlay.service';

@Injectable()
class MockMsalService {
  logout() {}
}

export const routes = [];

@Injectable()
class dialogMock {
  open() {
    return {
      afterClosed: () => of('no'),
    };
  }

  close: () => {};

  afterClosed(): Observable<any> {
    return of('no');
  }
}
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
class MockEVService {
  constructor(private http: HttpClient) {}
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let spy: any;

  let dialog: MatDialog;
  let router: Router;
  let msalService: MsalService;

  AuthConfig.UserProfile = 'U name,';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        MsalService,
        dialogMock,
        AuthConfig,
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MsalService, useClass: MockMsalService },
        { provide: CustomOverlay, useClass: OverlayDialogMock }
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        CustomOverlayModule.forRoot()
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
    msalService = TestBed.inject(MsalService);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current scroll position', () => {
    const scrollvalue = component.getCurrentScrollPosition();
    expect(scrollvalue).toBe(window.scrollY);
  });

  it('should close when pressed popup action', () => {
    const spy = spyOn(window, 'close');
    component.popupActionClick('Ok');
    expect(spy).toHaveBeenCalled();
  });

  it('should close window on pressing logout', () => {
    const spy = spyOn(window, 'close');
    component.logOut();
    expect(spy).toHaveBeenCalled();
  });

  it('should update Url', () => {
    component.isRetry = 2;
    component.updateUrl('error');
    expect(component.isRetry).toBe(3);
  });

  it('should go back to home', () => {
    const spy = spyOn(router, 'navigate');
    component.gotoHome();
    expect(spy).toHaveBeenCalledWith(['/']);
  });

  it('should get profile images', () => {
    component.getProfileImages();
    expect(component.getProfileImages).toBeDefined();
  });
  
  it('should listen to window scroll', () => {
    component.onWindowScroll();
    expect(component.headersticky).toBeDefined();
  });
  
  it('should get userProfile is not null', () => {
    AuthConfig.UserProfile = 'U,name';
    component.ngOnInit();
  });
  
  it('should return images if url is error', () => {
    const error = { type: 'error' };
    component.isRetry = 1;
    component.updateUrl(error);
    expect(component.updateUrl).toBeDefined();
  });
  
  it('should redirect to showcase', () => {
    component.redirectToShowcase();
    expect(component.redirectToShowcase).toBeDefined();
  });
});
