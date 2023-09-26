import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthConfigService } from './auth-config.service';
import { HttpService } from './http.service';


describe('AuthConfigService', () => {
  let service: AuthConfigService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let httpService:HttpService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        AuthConfigService
      ]
    })
      .compileComponents();
    service = TestBed.inject(AuthConfigService);
    httpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }));


  it('should be created', () => {

    expect(service).toBeTruthy();
  });
  it('get User related information', async(inject([HttpTestingController],
    () => {
      const postItem = {
        "local": {
          "tenant": "f3211d0e-125b-42c3-86db-322b19a65a22",
          "clientId": "84dc9481-e8af-4943-958d-941383498b3c",
          "redirectUri": "https://localhost:44314",
          "postLogoutRedirectUri": "https://localhost:44314",
          "consentScope": "bd955669-fe01-440b-b801-8eace14966b7/user_impersonation",
          "apiUrl": "https://transformapi-dev.myx0platform.com"
        },
        "test": {
          "tenant": "e0793d39-0939-496d-b129-198edd916feb",
          "clientId": "7c674509-5dec-4b2a-94f1-c0f54f2726c9",
          "redirectUri": "https://transform2-test.myx0platform.com",
          "postLogoutRedirectUri": "https://transform2-test.myx0platform.com",
          "consentScope": "c17d9be2-5ce1-4931-bbc9-726ca0628ca5/user_impersonation",
          "apiUrl": "https://transform2api-test.myx0platform.com"
        },
        "dev": {
          "tenant": "f3211d0e-125b-42c3-86db-322b19a65a22",
          "clientId": "747ec326-89a5-43a1-967a-c300d78e05e8",
          "redirectUri": "https://transform-dev.myx0platform.com",
          "postLogoutRedirectUri": "https://transform-dev.myx0platform.com",
          "consentScope": "bd955669-fe01-440b-b801-8eace14966b7/user_impersonation",
          "apiUrl": "https://transformapi-dev.myx0platform.com"

        },
        "stage": {
          "tenant": "e0793d39-0939-496d-b129-198edd916feb",
          "clientId": "b8e91702-9fe6-4236-8ccc-7517f9aa7335",
          "redirectUri": "https://showcase-uat.myx0platform.com",
          "postLogoutRedirectUri": "https://showcase-uat.myx0platform.com",
          "consentScope": "7ca9c2e9-8bcf-437c-abfd-f4daa30866e1/user_impersonation",
          "apiUrl": "https://showcaseapi-uat.myx0platform.com"
        },
        "demo": {
          "tenant": "e0793d39-0939-496d-b129-198edd916feb",
          "clientId": "dc38511c-1905-4b17-9881-dac8c3a99896",
          "redirectUri": "https://transform-training.accenture.com",
          "postLogoutRedirectUri": "https://transform-training.accenture.com",
          "consentScope": "5563f872-dd4d-46b3-980e-bab32f59f1de/user_impersonation",
          "apiUrl": "https://transformapi-training.accenture.com"
        },
        "prod": {
          "tenant": "e0793d39-0939-496d-b129-198edd916feb",
          "clientId": "fd6293ef-4c9b-44c6-8b2a-07ef7bb74438",
          "redirectUri": "https://transform.accenture.com",
          "postLogoutRedirectUri": "https://transform.accenture.com",
          "consentScope": "a2359332-b412-4cb5-aa26-50cdcb1e716d/user_impersonation",
          "apiUrl": "https://transformapi.accenture.com"
        },
        "myindustryxprod": {
          "tenant": "e0793d39-0939-496d-b129-198edd916feb",
          "clientId": "7286547e-9adb-45d0-be80-45b8e32417c7",
          "redirectUri": "https://myindustryx.accenture.com",
          "postLogoutRedirectUri": "https://myindustryx.accenture.com",
          "consentScope": "c0ed42f4-c184-4e3e-a7e8-86d37014e4d8/user_impersonation",
          "apiUrl": "https://myindustryxapi.accenture.com"
        }
      }


      service.getconfiguration()
        .then((posts: any) => {});
      httpTestingController.verify();

    })));


  it('should call the createImageFromBlob', () => {
    service.createImageFromBlob(new Blob());
    expect(service.createImageFromBlob).toBeTruthy();
  });

});
