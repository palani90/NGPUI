import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthConfig } from '../models/authconfig';
import { SafeUrl } from '@angular/platform-browser';
import { ALLOWED_STATUS_CODE, App_Name, USECASEVIEW_URL } from '../config/app-constants';
import * as constant from '../config/api-constant';
import { BenchmarkDropDownValuesResponse, BenchmarkResultsResponse, FeedbackResponse, KpiDetailsResponse, usecaseURLResponse } from '../models/usecase.model';
import {
  BENCHMARK_DROPDOWN_VALUE,
  BENCHMARK_RESULTS,
  FEEDBACK_API,
  GET_CLIENT_DETAILS_API,
  GRANT_NEW_ACCESS_API,
  KPI_DETAILS,
  REQUEST_ACCESS_API,
  WORKSPACE_REQUEST_API
} from '../config/api-constant';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class UseCaseViewService {
  private flagsource = new Subject<boolean>();
  flag$ = this.flagsource.asObservable();
  userImage: any = '';
  constructor(private httpService: HttpService) {}

  sendflag(data: boolean) {
    this.flagsource.next(data);
  }

  async getUserInfo(): Promise<any> {
    let apiURL = '';
    const formData = new FormData();
    formData.append('applicationName', this.getApplicationName());
    if (AuthConfig.showcaseInstance && AuthConfig.workspaceUrl == '') {
      apiURL = environment.showcaseBaseURL + '/api/v' + environment.APIVersion + '/Users/GetUserStatus';
    } else {
      apiURL = environment.transformBaseURL + '/api/v' + environment.APIVersion + '/Users/GetUserStatus';
    }

    return await this.httpService.post(apiURL, formData, {}, { contentType: 'multipart' }).toPromise();
  }

  getUserPhoto(): Observable<SafeUrl> {
    return this.httpService.getimage(USECASEVIEW_URL.GRAPH_API_URL).pipe(
      map(async (result: Blob) => {
        let img = await this.createImageFromBlob(result);
        this.userImage = img;
        return img;
      })
    );
  }

  createImageFromBlob(image: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      if (image) reader.readAsDataURL(image);
    });
  }

  public getWorkspaceRequest(isrequest: boolean = false,data?): Observable<any> {
    const apiurl = isrequest ? WORKSPACE_REQUEST_API : REQUEST_ACCESS_API;
    const formData = new FormData();
    formData.append('emailId', AuthConfig.email);
    return this.httpService.post<any>(apiurl, isrequest ? data : formData, {},
      { contentType: 'multipart' });
  }

  async getclientdataByClientURL(clienturl: string): Promise<any> {
    const params = { workspaceUrl: clienturl, allowMetric: false, applicationName: App_Name };
    return await this.httpService.get<any>(GET_CLIENT_DETAILS_API, params).toPromise();
  }

  async getUseCaseByUseCaseUrl(clienturl: string): Promise<usecaseURLResponse> {
    const params = { useCaseUrl: clienturl };
    return await this.httpService.get<usecaseURLResponse>(constant.GET_USECASEBYUSECASEURL, params).toPromise();
  }

  getUserId() {
    return AuthConfig.userInfo.userUid;
  }

  getApplicationName() {
    return App_Name;
  }

  public GrantNewAccess(): Observable<any> {
    return this.httpService.post<any>(GRANT_NEW_ACCESS_API, AuthConfig.userInfo).pipe(
      map((AccessResponse: any) => {
        if (ALLOWED_STATUS_CODE.find((element) => element == AccessResponse.statusCode)) {
          return AccessResponse;
        } else {
          throw new Error(AccessResponse.message);
        }
      })
    );
  }

  public getBenchmarkDropdown(): Observable<BenchmarkDropDownValuesResponse> {
    return this.httpService.post<BenchmarkDropDownValuesResponse>(BENCHMARK_DROPDOWN_VALUE, {});
  }

  public getBenchmarkResults(KpiUid: string): Observable<BenchmarkResultsResponse> {
    const formData = new FormData();
    formData.append('kpiUid', KpiUid);
    return this.httpService.post<BenchmarkResultsResponse>(BENCHMARK_RESULTS, formData, {}, { contentType: 'multipart' });
  }

  public getKpiDetails(KpiUid: string): Observable<KpiDetailsResponse> {
    const formData = new FormData();
    formData.append('kpiUid', KpiUid);
    return this.httpService.post<KpiDetailsResponse>(KPI_DETAILS, formData, {}, { contentType: 'multipart' });
  }

  sendFeedbackDetails(feedbacktype: string, feedbackdescription: string) {
    const formData = new FormData();
    formData.append('FeedbackDescription', feedbackdescription);
    formData.append('FeedbackType', feedbacktype);
    return this.httpService.post<FeedbackResponse>(FEEDBACK_API,formData,{},{ contentType: 'multipart' })
  }
}
