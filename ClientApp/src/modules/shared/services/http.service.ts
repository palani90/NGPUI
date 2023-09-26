import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Cache-Control', 'no-cache');

  constructor(private http: HttpClient) {}

  private get_headers(headers: { [key: string]: string }) {
    const contentType = headers['contentType'];
    delete headers['contentType'];
    if (Object.keys(headers).length) {
      Object.keys(headers).forEach((key) => {
        this.setHeader(key, headers[key]);
      });
    }
    if (contentType === 'multipart') {
      this.deleteHeader('Content-Type');
    } else if (contentType === 'url-encoded') {
      this.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    } else {
      this.setHeader('Content-Type', 'application/json');
    }
  }

  public get<T>(url: string, params = {}, headers = {}): Observable<T> {
    return this.request('GET', url, {}, params, headers);
  }

  public getimage(url: string, headers = {}): Observable<Blob> {
    return this.imageRequest('GET', url, headers);
  }

  public post<T>(url: string, body: any = {}, params = {}, headers = {}): Observable<T> {
    return this.request('POST', url, body, params, headers);
  }

  public put<T>(url: string, body: any = {}, params = {}, headers = {}): Observable<T> {
    return this.request('PUT', url, body, params, headers);
  }

  public addFile<T>(url: string, body: any, params = {}, headers = {}): Observable<T> {
    return this.fileRequest('POST', url, body, params, headers);
  }

  public putFile<T>(url: string, body: any, params = {}, headers = {}): Observable<T> {
    return this.fileRequest('PUT', url, body, params, headers);
  }

  public patch<T>(url: string, body: any = {}, params = {}, headers = {}): Observable<T> {
    return this.request('PATCH', url, body, params, headers);
  }

  public delete<T>(url: string, body: any = {}, params = {}, headers = {}): Observable<T> {
    return this.request('DELETE', url, body, params, headers);
  }

  public request<T>(method: string, url: string, body: any = {}, params = {}, headers = {}): Observable<T> {
    this.get_headers(headers);
    return this.http
      .request<T>(method, url, {
        body: body,
        headers: this.headers,
        params: this.buildParams(params),
        observe: 'response'
      })
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body;
        }),
        catchError((err: HttpErrorResponse) => throwError(err))
      );
  }

  public fileRequest<T>(method: string, url: string, body: any = {}, params = {}, headers = {}): Observable<T> {
    this.get_headers({ ...headers, ...{ ctype: 'multipart' } });
    return this.http
      .request<T>(method, url, {
        body: body,
        headers: this.headers,
        params: this.buildParams(params),
        observe: 'response'
      })
      .pipe(
        map((res: HttpResponse<any>) => {
          return res.body;
        }),
        catchError((err: HttpErrorResponse) => throwError(err))
      );
  }

  public buildParams(paramsObj: any): HttpParams {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach((key) => {
      if (paramsObj[key]){
        params = params.set(key, paramsObj[key]);
      }
    });
    return params;
  }

  public resetHeaders(): void {
    this.headers = new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json');
  }

  public setHeader(key: string, value: string): void {
    this.headers = this.headers.set(key, value);
  }

  public deleteHeader(key: string): void {
    this.headers = this.headers.delete(key);
  }

  public imageRequest(method: string, url: string, headers = {}): Observable<Blob> {
    this.get_headers(headers);
    return this.http
      .request(method, url, {
        headers: this.headers,
        responseType: 'blob'
      })      
      .pipe(
        map((res: Blob) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => throwError(err))
      );

  }

}
