import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async,fakeAsync,TestBed } from '@angular/core/testing';
import { AuthConfig } from '../models/authconfig';
import { ClientService } from './client.service';
import { HttpService } from './http.service';


describe('clientservice', () => {
  let service: ClientService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let httpService:HttpService;
  AuthConfig.userInfo.userUid = "dde974e5-d5e9-4bad-a437-ab8665bad69a";


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        ClientService
      ]
    })
      .compileComponents();
    service = TestBed.inject(ClientService);
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create username',()=>{
    service.getUserId();
    expect(service.getUserId).toBeTruthy();
  })

  it('should getUseremail', fakeAsync(()=>{
    AuthConfig.userInfo.emailId = "sohini.a.mitra@ds.dev.accenture.com";
    service.getUserEmail()
  }))

  it('should getclientdatabyName', fakeAsync(() => {
    service.getclientdataByName("AIWAYS");
    }));

});
