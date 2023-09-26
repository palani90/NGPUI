import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PagenotfoundComponent } from './pagenotfound.component';


@Injectable()
class MockRouter {
  navigateByUrl(url: string) { return url; }
  navigate(url: any) { return url[0]; }
  public url = "";
  events = of(new NavigationEnd(0, 'explore', 'explore'))
}
describe('PagenotfoundComponent', () => {
  let component: PagenotfoundComponent;
  let fixture: ComponentFixture<PagenotfoundComponent>;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagenotfoundComponent ],
      providers:[MockRouter,{ provide: Router, useClass: MockRouter },
      ],
      imports: [HttpClientTestingModule,HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotfoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load image url', () => {
    const spy = spyOn(component,'imageLoaded').and.callThrough()
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should load image', () => {
    const spy = spyOn(component,'imageLoaded')
    component.imageLoaded(' ');
    expect(spy).toHaveBeenCalled();
  });

 
  it('should open terms of use', () => {
    const url = 'termsofuse';
    Object.defineProperty(router, url, { value: "/termsofuse" });
    component.goToTermsAndPrivacy(url);
    expect(component).toBeTruthy();
  })

  it('should open privacy statement', () => {
    const url = 'privacystatement';
    Object.defineProperty(router, url, { value: "/privacystatement" });
    component.goToTermsAndPrivacy(url);
    expect(component).toBeTruthy();
  });

});