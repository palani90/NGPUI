import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  CAPTURE_METRIC_API,
  GET_GLOBAL_SEARCH,
  GET_POPULAR_RESULTS,
  GET_USECASEVIEW_API,
  GET_VALUE_TREE_DETAILS,
  MYFAVORITES_SOLUTIONS_API,
  POST_CAPTURE_METRIC,
  SAVE_FAVOURITES,
  SAVE_SEARCH,
} from 'src/modules/shared/config/api-constant';
import { ALLOWED_STATUS_CODE } from 'src/modules/shared/config/app-constants';
import { AuthConfig } from 'src/modules/shared/models/authconfig';
import { HttpService } from 'src/modules/shared/services/http.service';
import {
  metricdetails,
  UseCaseViewModelResponse,
} from '../models/usecaseview.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private httpService: HttpService,
    private httpClient: HttpClient
  ) {}

  //usecase view api to get usecase details
  //param - pass usecase id
  public UseCaseView(usecaseId: string): Observable<any> {
    const params = { useCaseUid: usecaseId };
    return this.httpService
      .get<UseCaseViewModelResponse>(GET_USECASEVIEW_API, params)
      .pipe(
        map((usecaseview: UseCaseViewModelResponse) => {
          if (
            ALLOWED_STATUS_CODE.find(
              (element) => element == usecaseview.statusCode
            ) &&
            !usecaseview.isException
          ) {
            return usecaseview.responseData;
          }
        })
      );
  }

  public SaveFavourites(data): Observable<any> {
    return this.httpService.post<any>(SAVE_FAVOURITES, data).pipe(
      map((favourite: any) => {
        if (
          ALLOWED_STATUS_CODE.find(
            (element) => element == favourite.statusCode
          ) &&
          !favourite.isException
        ) {
          return favourite.responseData;
        } else throw new Error(favourite.message);
      })
    );
  }

  //send metric details of usecase view page, usecaseMetrics data provided by api team
  SendMetrics(): Observable<any> {
    const usecaseMetrics: metricdetails = {
      metricType: 'UsecaseMetric',
      feature: 'UsecasePreview',
      pageName: null,
      metricValue: AuthConfig.usecaseObj.useCaseUid,
    };
    return this.httpService.post<any>(POST_CAPTURE_METRIC, usecaseMetrics);
  }

  public getMyFavoritesSolutionsData(
    solutionUid: any,
    favourite: boolean
  ): Observable<any> {
    const params = { solutionUid: solutionUid, favourite: favourite };
    return this.httpService.post<any>(MYFAVORITES_SOLUTIONS_API, params).pipe(
      map((myFavoritesSolutionResponse: any) => {
        if (
          ALLOWED_STATUS_CODE.find(
            (element) => element == myFavoritesSolutionResponse.statusCode
          )
        ) {
          return myFavoritesSolutionResponse.responseData;
        } else {
          throw new Error(myFavoritesSolutionResponse.message);
        }
      })
    );
  }
  getValueTreeData(usecaseUid) {
    const params = { useCaseUid: usecaseUid };
    const formData = new FormData();
    return this.httpService
      .post<any>(GET_VALUE_TREE_DETAILS, formData, params, {
        contentType: 'multipart',
      })
      .pipe(
        map((data) => {
          var resultData: any;
          resultData = data;
          if (
            resultData &&
            ALLOWED_STATUS_CODE.find(
              (element) => element == resultData.statusCode
            )
          ) {
            return resultData.responseData;
          } else {
            return {};
          }
        })
      );
  }

  getGlobalSearch(searchText):Observable<any>{
    const params = { SearchKey:searchText };
    const formData = new FormData();
    return this.httpService
      .post<any>(GET_GLOBAL_SEARCH, params)
      .pipe(
        map((data) => {
          var resultData: any;
          resultData = data;
          if (
            resultData &&
            ALLOWED_STATUS_CODE.find(
              (element) => element == resultData.statusCode
            )
          ) {
            return resultData.responseData;
          } else {
            return {};
          }
        })
      );
  }

  public saveSearchResults(data: any): Observable<any> {
    const params = {};

    return this.httpService.post<any>(SAVE_SEARCH, data, params).pipe(
      map((searchAPIResponse: any) => {
        if (ALLOWED_STATUS_CODE.find(element=>element==searchAPIResponse.statusCode)) {
          return searchAPIResponse.responseData;
        } else {
          throw new Error(searchAPIResponse.message);
        }
      })
    );

  }

  public getPopularSearch(): Observable<any> {
    const params = {};

    return this.httpService.get<any>(GET_POPULAR_RESULTS, params).pipe(
      map((searchAPIResponse: any) => {
        if (ALLOWED_STATUS_CODE.find(element=>element==searchAPIResponse.statusCode)) {
          return searchAPIResponse.responseData;
        } else {
          throw new Error(searchAPIResponse.message);
        }
      })
    );

  }
  public stopRequest: Subject<void> = new Subject<void>();

  getSearchSugestion(searchKey: string) {
    const params = {"SearchKey":searchKey};
     return this.httpService.get<any>(GET_GLOBAL_SEARCH, params).pipe(takeUntil(this.stopRequest))
    }
    captureMetric(data: any): Observable<any> {
      return this.httpService.post<any>(CAPTURE_METRIC_API, data);
  }
  public getSearchResult(searchKey: string): Observable<any> {
    const params = {"SearchKey":searchKey};
    return this.httpService.get<any>(GET_GLOBAL_SEARCH, params).pipe(
      map((searchAPIResponse: any) => {
        if (ALLOWED_STATUS_CODE.find(element=>element==searchAPIResponse.statusCode)) {
          return searchAPIResponse.responseData;
        } else {
          throw new Error(searchAPIResponse.message);
        }
      })
    );

  }


}
