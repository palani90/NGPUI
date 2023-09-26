import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import {
  GET_GLOBAL_SEARCH,
  GET_POPULAR_RESULTS,
  GET_USECASEVIEW_API,
  GET_VALUE_TREE_DETAILS,
  MYFAVORITES_SOLUTIONS_API,
  SAVE_FAVOURITES,
  SAVE_SEARCH,
} from 'src/modules/shared/config/api-constant';
const mockUseCaseViewData: any = require('../../../assets/mock-data/getUseCaseView.json');
const globalSearchData = require('src/assets/mock-data/globalSearchData.json');
const vtmData = require('src/assets/mock-data/VTMResponse.json');
describe('HomeService', () => {
  let service: HomeService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(HomeService);
    TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should get all usecase details', () => {
  //   const response:any = getusecase as UseCaseViewModelResponse
  //   service.UseCaseView("771567c2-a680-4e7b-8a90-000620821200")
  //     .subscribe((data: any) => {
  //       expect(data).toEqual(response.responseData);

  //     });
  //   const req = httpMock.expectOne(GET_USECASEVIEW_API + "?useCaseUid=771567c2-a680-4e7b-8a90-000620821200")
  //   expect(req.request.method).toBe("GET");
  //   req.flush(response)
  //   httpMock.verify();
  // })

  // it('should save favourites', () => {
  //   const savefav:any = UseCaseViewModelResponse;
  //   service.SaveFavourites('')
  //     .subscribe((data: any) => {
  //       expect(data).toEqual(savefav.responseData);

  //     });

  //   const req = httpMock.expectOne(SAVE_FAVOURITES)
  //   expect(req.request.method).toBe("POST");
  //   req.flush(savefav)
  //   httpMock.verify();
  // })

  //   it('get Usecase View', () => {
  //    const useCaseUid = "96c558bd-2196-4684-82c1-e32f2456c9ce"
  //     const getUseCaseView = mockUseCaseViewData.useCaseUid;
  //     const url = environment.baseURL + API_VERSION + environment.APIVersion + '/UseCase/UseCaseDetails?useCaseUid=96c558bd-2196-4684-82c1-e32f2456c9ce';
  //     service.UseCaseView(useCaseUid).subscribe(t => {
  //         expect(t).toEqual(getUseCaseView.responseData);
  //     });
  //     const req = httpMock.expectOne(url);
  //     expect(req.request.method).toBe("GET");
  //     req.flush(getUseCaseView);
  // });

  it('to send metrics', () => {
    service.SendMetrics();
    expect(service.SendMetrics).toBeTruthy();
  });

  it('should call UseCaseView', () => {
    service.UseCaseView('usecaseUid').subscribe();
    let url = GET_USECASEVIEW_API + '?useCaseUid=usecaseUid';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockUseCaseViewData);
    httpTestingController.verify();
    expect(service.UseCaseView).toBeTruthy();
  });

  it('should call SaveFavourites', () => {
    service.SaveFavourites('').subscribe();
    let url = SAVE_FAVOURITES;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(mockUseCaseViewData);
    httpTestingController.verify();
    expect(service.SaveFavourites).toBeTruthy();
  });

  it('should call getMyFavoritesSolutionsData', () => {
    service.getMyFavoritesSolutionsData('', true).subscribe();
    const req = httpTestingController.expectOne(MYFAVORITES_SOLUTIONS_API);
    expect(req.request.method).toBe('POST');
    req.flush(mockUseCaseViewData);
    httpTestingController.verify();
    expect(service.getMyFavoritesSolutionsData).toBeTruthy();
  });

  it('should call getValueTreeData', () => {
    service.getValueTreeData('').subscribe();
    const req = httpTestingController.expectOne(GET_VALUE_TREE_DETAILS);
    expect(req.request.method).toBe('POST');
    req.flush(vtmData);
    httpTestingController.verify();
    expect(service.getValueTreeData).toBeTruthy();
  });

  it('should call getGlobalSearch', () => {
    service.getGlobalSearch('asset').subscribe();
    let url = GET_GLOBAL_SEARCH + '?SearchKey=asset';
    const req = httpTestingController.expectOne(GET_GLOBAL_SEARCH);
    expect(req.request.method).toBe('POST');
    req.flush(globalSearchData);
    httpTestingController.verify();
    expect(service.getGlobalSearch).toBeTruthy();
  });

  it('should call saveSearchResults', () => {
    service.saveSearchResults('');
    expect(service.saveSearchResults).toBeTruthy();
  });

  it('should call getPopularSearch', () => {
    service.getPopularSearch().subscribe();
    const req = httpTestingController.expectOne(GET_POPULAR_RESULTS);
    req.flush(globalSearchData);
    httpTestingController.verify();
    expect(service.getPopularSearch).toBeTruthy();
  });

  it('should call getSearchSugestion', () => {
    service.getSearchSugestion('asset').subscribe();
    let url = GET_GLOBAL_SEARCH + '?SearchKey=asset';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(globalSearchData);
    httpTestingController.verify();
    expect(service.getSearchSugestion).toBeTruthy();
  });

  it('should call captureMetric', () => {
    service.captureMetric('');
    expect(service.getSearchSugestion).toBeTruthy();
  });

  it('should call getSearchResult', () => {
    service.getSearchResult('asset').subscribe();
    let url = GET_GLOBAL_SEARCH + '?SearchKey=asset';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(globalSearchData);
    httpTestingController.verify();
  });

  it('should call saveSearchResults', () => {
    service.saveSearchResults('asset').subscribe();
    const req = httpTestingController.expectOne(SAVE_SEARCH);
    expect(req.request.method).toBe('POST');
    req.flush(globalSearchData);
    httpTestingController.verify();
  });
});
