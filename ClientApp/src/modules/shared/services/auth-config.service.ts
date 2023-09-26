/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { USECASEVIEW_URL } from '../config/app-constants';
import { HttpService } from './http.service';




@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {
  private http: HttpClient;
  public appConfig: any;



  constructor(private handler: HttpBackend, private sanitizer: DomSanitizer,private httpService: HttpService) {
    this.http = new HttpClient(this.handler);
  }



  async getconfiguration(): Promise<any> {

    return environment;
  }

  createImageFromBlob(image: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      if (image) reader.readAsDataURL(image);
    });
  }

}
