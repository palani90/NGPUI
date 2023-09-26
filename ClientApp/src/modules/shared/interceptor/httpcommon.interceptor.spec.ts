import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Injectable } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {  MatDialog,  MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MsalService } from '@azure/msal-angular';
import { Observable, of, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';
import { UseCaseViewService } from '../services/usecaseView.service';
import { HttpCommonInterceptor } from './httpcommon.interceptor';

@Component({})
class BlankComponent {}

@Injectable()
class MockMsalService {
  instance = {
    getActiveAccount() {
      return { username: 'test@mail.com' };
    }
  };

  public acquireTokenSilent(): Promise<boolean> {
    return Promise.resolve(null);
  }

  logout() {}
}
@Injectable()
class MockUseCaseViewService {
  GrantNewAccess() {
    return of({ statusCode: 200, message: 'Success' });
  }
}
describe('HttpInterceptorService', () => {
  let router: Router;
  let dialog: MatDialog;
  let httpRequestSpy;
  let msalService: MsalService;
  let usecaseservice: UseCaseViewService;
  let httpHandlerSpy;
  let errorInterceptor;
  let errorwithmessage = {
    message: 'throw403error',
    status: 403,
    error: new Error('new 403 error')
  };
  let errorwith400status = {
    message: 'throw400error',
    status: 400,
    error: new Error('new 400 error')
  };
  let errorwith404status = {
    message: 'throw404error',
    status: 404,
    error: new Error('new 404 error')
  };
  let errorwith404status1 = {
    message: 'throw404error',
    status: 404,
    error: {
      responseData: 'newuser',
      message: 'throw404error',
      error: '404 Error'
    }
  };
  let errorwith401status = {
    message: 'throw401error',
    status: 401,
    error: new Error('new 401 error')
  };
  let errorwith401status1 = {
    message: 'throw401error',
    status: 401,
    error: {
      responseData: 'newuser',
      message: 'throw401error',
      error: '401 Error'
    }
  };
  const dialogMock = {
    open: (ErrormodaldailogComponent, dialogConfig): any => {
      return {
        afterClosed(result): Observable<any> {
          let data: any = { event: 'no' };
          return of(data);
        }
      };
    },
    close: () => {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: '**', component: BlankComponent }])],
      providers: [
        HttpService,
        { provide: MatDialog, useValue: dialog },
        { provide: MatDialogRef, useValue: dialogMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpCommonInterceptor,
          multi: true
        },
        MsalService,
        { provide: MsalService, useClass: MockMsalService },
        UseCaseViewService,
        { provide: UseCaseViewService, useClass: MockUseCaseViewService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    msalService = TestBed.inject(MsalService);
    usecaseservice = TestBed.inject(UseCaseViewService);
    errorInterceptor = new HttpCommonInterceptor(dialog, router, usecaseservice, msalService);
    errorInterceptor.matDialog = dialogMock as unknown as MatDialog;
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['clone']);
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
  });

  it('should throw error and return expected message', () => {
    httpHandlerSpy.handle.and.returnValue(throwError(errorwithmessage));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => {},
      (err) => {
        expect(err).toEqual('Error Code: ' + errorwithmessage.status + '\nMessage: ' + errorwithmessage.message);
      }
    );
  });

  it('should throw instance of errorevent and return expected message', () => {
    let errorInitEvent: ErrorEventInit = {
      error: new Error(''),
      message: 'throwing error instance of errorevent'
    };
    let CustomErrorEvent = new ErrorEvent('MyErrEventType', errorInitEvent);
    let error = { error: CustomErrorEvent };
    httpHandlerSpy.handle.and.returnValue(throwError(error));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => {},
      (err) => {
        expect(err).toEqual('Error: ' + error.error.message);
      }
    );
  });

  it('should throw error with status 400 and return expected message', () => {
    httpHandlerSpy.handle.and.returnValue(throwError(errorwith400status));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => {
        expect(result.body.message).toEqual(errorwith400status.error.message);
      },
      (err) => {}
    );
  });
  it('should throw error with status 404 and return expected message', () => {
    httpHandlerSpy.handle.and.returnValue(throwError(errorwith404status));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => {
        expect(result.body.message).toEqual(errorwith404status.error.message);
      },
      (err) => {}
    );
    httpHandlerSpy.handle.and.returnValue(throwError(errorwith404status1));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => {
        expect(result.body.message).toEqual(errorwith404status1.error.message);
      },
      (err) => {}
    );
  });
  it('should throw error with status 401 and return expected message', () => {
    httpHandlerSpy.handle.and.returnValue(throwError(errorwith401status));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => {
        expect(result.body.message).toEqual(errorwith401status.error.message);
      },
      (err) => {}
    );
    httpHandlerSpy.handle.and.returnValue(throwError(errorwith401status1));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      (result) => {
        expect(result.body.message).toEqual(errorwith401status1.error.message);
      },
      (err) => {}
    );
  });
});
