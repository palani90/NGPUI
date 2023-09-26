import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthConfig } from '../../models/authconfig';
import { Applications, clientModel } from '../../models/client';
import { Client } from '../../models/clients';

import { TermsPrivacyComponent } from './terms-privacy.component';
@Injectable()
class MockRouter {
  navigateByUrl(url: string) { return url; }
  navigate(url: any) { return url[0]; }
  url = "";
  events = of(new NavigationEnd(0, 'explore', 'explore'))
}
describe('TermsPrivacyComponent', () => {
  let component: TermsPrivacyComponent;
  let fixture: ComponentFixture<TermsPrivacyComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsPrivacyComponent ],
      providers: [MockRouter, { provide: Router, useClass: MockRouter }],

      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsPrivacyComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign workspace url when present', () => {
    AuthConfig.clientObj = {} as clientModel;
    AuthConfig.clientObj.workspaceUrl = '0cbd697d-9d0c-46d2-832d-5d55464988a9';
    component.ngOnInit();
    expect(component.workspaceUrl).toEqual('0cbd697d-9d0c-46d2-832d-5d55464988a9');
  });

  it('should create application model', () => {
    let applicationModel = new Applications;
    expect(applicationModel).toBeDefined();
  })
  it('should create Client Model',() => {
    let clientsModel = new Client;
    expect(clientsModel).toBeDefined();
  })
  it('should open terms of use', () => {
    const url = '';
    Object.defineProperty(router, url, { value: "/termsofuse" });
    component.ngOnInit();
    expect(component).toBeTruthy();
  })

  it('should call go toterms function when workspaceUrl is empty', () => {
    component.workspaceUrl = "";
    const url = 'url';
    Object.defineProperty(router, url, { value: "'/privacystatement'" });
    component.ngOnInit();
    expect(component).toBeTruthy();
 
  });
  it('should call go toterms function when workspaceUrl is empty', () => {
    component.workspaceUrl = "";
    const url = 'url';
    Object.defineProperty(router, url, { value: "'/termsofuse'" });
    component.ngOnInit();
    expect(component).toBeTruthy();
 
  });
});
