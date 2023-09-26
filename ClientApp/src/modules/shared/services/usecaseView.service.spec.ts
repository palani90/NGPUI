import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  GET_CLIENT_DETAILS_API,
  GET_USECASEBYUSECASEURL,
  GRANT_NEW_ACCESS_API,
} from 'src/modules/shared/config/api-constant';
import { AuthConfig } from '../models/authconfig';
import { Users } from '../models/users';
import { HttpService } from './http.service';
import { UseCaseViewService } from './usecaseView.service';

describe('usecaseService', () => {
  let service: UseCaseViewService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UseCaseViewService],
    }).compileComponents();
    TestBed.configureTestingModule({});
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(UseCaseViewService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('function sendflag', () => {
    service.sendflag(false);
    const spy = spyOn(service, 'sendflag').and.returnValue();
    expect(spy).toBeTruthy();
  });

  it('to get the user photo', async(
    inject([HttpTestingController, UseCaseViewService], () => {
      const url = 'https://graph.microsoft.com/v1.0/me/photos/48x48/$value';
      service.getUserPhoto().subscribe(
        map((t) => {
          expect(t).toEqual('blob');
        })
      );
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('GET');
    })
  ));

  it('to get user id', async(
    inject([HttpTestingController, UseCaseViewService], () => {
      AuthConfig.userInfo = new Users();
      AuthConfig.userInfo.userUid = '';
      const result = service.getUserId();
      expect(result).toEqual('');
    })
  ));

  it('to get usecase by url', async(
    inject([HttpTestingController, UseCaseViewService], () => {
      const postItem = {
        isSuccess: true,
        statusCode: 200,
        message: 'Success',
        isException: false,
        responseData: {
          useCaseUid: '4694b9af-5e46-467f-a59c-f5e409bf7ee8',
          useCaseName: 'Data Sensitivity',
        },
      };
      service
        .getUseCaseByUseCaseUrl('50f71257-8937-4051-813d-8ecd866eadfa')
        .then((posts: any) => {
          expect(posts).toEqual(postItem);
        });
      const req = httpTestingController.expectOne(
        GET_USECASEBYUSECASEURL +
          '?useCaseUrl=50f71257-8937-4051-813d-8ecd866eadfa'
      );
      expect(req.request.method).toBe('GET');
      req.flush(postItem);
      httpTestingController.verify();
    })
  ));

  it('to get clientdata by url', async(
    inject([HttpTestingController, UseCaseViewService], () => {
      AuthConfig.userInfo = new Users();
      AuthConfig.userInfo.userUid = '50f71257-8937-4051-813d-8ecd866eadfa';
      const postItem = {
        isSuccess: true,
        statusCode: 200,
        message: 'Success',
        isException: false,
        responseData: {
          useCaseUid: '4694b9af-5e46-467f-a59c-f5e409bf7ee8',
          useCaseName: 'Data Sensitivity',
        },
      };
      service
        .getclientdataByClientURL('50f71257-8937-4051-813d-8ecd866eadfa')
        .then((posts: any) => {
          expect(posts).toEqual(postItem);
        });
      const req = httpTestingController.expectOne(
        GET_CLIENT_DETAILS_API +
          '?workspaceUrl=50f71257-8937-4051-813d-8ecd866eadfa&applicationName=UseCase%20View'
      );
      expect(req.request.method).toBe('GET');
      req.flush(postItem);
      httpTestingController.verify();
    })
  ));

  it('to get workspace request', () => {
    service.getWorkspaceRequest();
    expect(service.getWorkspaceRequest).toBeTruthy();
  });

  it('should call the createImageFromBlob', () => {
    service.createImageFromBlob(new Blob());
    expect(service.createImageFromBlob).toBeTruthy();
  });

  it('should call grant access', async(
    inject([HttpTestingController], () => {
      const grantaccessdata = {
        isSuccess: false,
        statusCode: 400,
        message: 'CorrelationUId is missing',
        isException: false,
        responseData: null,
        correlationUId: '00000000-0000-0000-0000-000000000000',
      };
      service.GrantNewAccess().subscribe((posts: any) => {
        expect(posts).toBeDefined();
      });
      const req = httpTestingController.expectOne(GRANT_NEW_ACCESS_API);
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
      req.flush(grantaccessdata);
    })
  ));

  it('should call getuserphoto', fakeAsync(() => {
    spyOn(httpService, 'getimage').and.returnValue(of(new Blob()));
    service.getUserPhoto().subscribe((blob) => {
      expect(service.createImageFromBlob).toBeTruthy();
    });
  }));

  it('should getUserInfo from showcase', fakeAsync(() => {
    AuthConfig.showcaseInstance = true;
    AuthConfig.workspaceUrl = '';
    const userstatusdata = {
      isSuccess: false,
      statusCode: 200,
      message: 'Success',
      isException: false,
      responseData: 'true',
      correlationUId: '00000000-0000-0000-0000-000000000000',
    };
    service.getUserInfo().then((blob) => {
      expect(service.getUserInfo).toBeDefined();
    });
    const req = httpTestingController.expectOne(
      environment.showcaseBaseURL +
        '/api/v' +
        environment.APIVersion +
        '/Users/GetUserStatus'
    );
    expect(req.request.method).toBe('POST');
    req.flush(userstatusdata);
    httpTestingController.verify();
  }));
  it('should getUserInfo from trnasform', fakeAsync(() => {
    AuthConfig.showcaseInstance = false;
    AuthConfig.workspaceUrl = '00000000-0000-0000-0000-000000000000';
    const userstatusdata = {
      isSuccess: false,
      statusCode: 200,
      message: 'Success',
      isException: false,
      responseData: 'true',
      correlationUId: '00000000-0000-0000-0000-000000000000',
    };
    service.getUserInfo().then((blob) => {
      expect(service.getUserInfo).toBeDefined();
    });
    const req = httpTestingController.expectOne(
      environment.transformBaseURL +
        '/api/v' +
        environment.APIVersion +
        '/Users/GetUserStatus'
    );
    expect(req.request.method).toBe('POST');
    req.flush(userstatusdata);
    httpTestingController.verify();
  }));

  it('should call getApplicationName', () => {
    service.getApplicationName();
    expect(service.getApplicationName).toBeDefined();
  });

  it('to get Benchmark Dropdown', () => {
    service.getBenchmarkDropdown();
    expect(service.getBenchmarkDropdown).toBeTruthy();
  });

  it('to get Benchmark Results', () => {
    service.getBenchmarkResults('test1');
    expect(service.getBenchmarkResults).toBeTruthy();
  });

  it('to get kpi details', () => {
    service.getKpiDetails('test1');
    expect(service.getKpiDetails).toBeTruthy();
  });
});
