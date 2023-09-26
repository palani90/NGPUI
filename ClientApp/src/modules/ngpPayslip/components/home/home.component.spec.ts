import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AuthorizationComponent } from 'src/modules/shared/components/authorization/authorization.component';
import { HomeService } from '../../services/home.service';
import { HomeComponent } from './home.component';
import * as getusecase from '../../../../assets/mock-data/getUseCaseView.json';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthConfig } from 'src/modules/shared/models/authconfig';
import { usecasedata } from 'src/modules/shared/models/usecase.model';
import { maturities, metricdetails, usecaseview } from '../../models/usecaseview.model';
import { environment } from 'src/environments/environment';
import { CustomOverlay } from 'src/modules/shared/custom-overlay/custom-overlay/custom-overlay.service';
import { CUSTOM_OVERLAY_DATA } from 'src/modules/shared/custom-overlay/custom-overlay/custom-overlay';
import { CustomOverlayRef } from 'src/modules/shared/custom-overlay/custom-overlay/custom-overlay-ref';
import { CustomOverlayRefMock } from 'src/modules/shared/custom-overlay/custom-overlay/custom-overlay.spec';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
export const routes: Routes = [
  {
    path: 'error',
    component: AuthorizationComponent
  }
];

export class mockhomeService {
  getusecasedetails = getusecase;
  UseCaseView(usecaseid: string): Observable<any> {
    return of(this.getusecasedetails.responseData);
  }

  SendMetrics() {
    const usecaseMetrics: metricdetails = {
      metricType: 'UsecaseMetric',
      feature: 'UsecasePreview',
      pageName: null,
      metricValue: AuthConfig.usecaseObj.useCaseUid
    };
    return of(usecaseMetrics);
  }
  SaveFavourites() {
    const responsedata = {
      favorite: 'true',
      useCaseUid: '96c558bd-2196-4684-82c1-e32f2456c9ce'
    };
    return responsedata;
  }
  getMyFavoritesSolutionsData(id, isFav) {
    return of({ statusCode: 200, responseData: true });
  }
}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeService: HomeService;
  let mockService: mockhomeService;
  let spy: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: HomeService, useClass: mockhomeService },
        { provide: CustomOverlayRef, useValue: CustomOverlayRefMock },
        { provide: CUSTOM_OVERLAY_DATA, useValue: {} },
        CustomOverlay,
        Overlay,
        mockhomeService
      ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)]
    }).compileComponents();
  });

  beforeEach(() => {
    AuthConfig.usecaseObj = new usecasedata();
    AuthConfig.usecaseObj.useCaseUid = '4694b9af-5e46-467f-a59c-f5e409bf7ee8';
    AuthConfig.usecaseObj.useCaseName = 'Data Sensitivity';
    fixture = TestBed.createComponent(HomeComponent);
    homeService = TestBed.inject(HomeService);
    mockService = TestBed.inject(mockhomeService);
    component = fixture.componentInstance;
    component.windowOBJ = { solutionTileTxt: () => {} };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open preview', () => {
    component.usecasedata = new usecaseview();
    spyOn(homeService, 'SendMetrics').and.returnValue(of());
    component.usecasedata.previewLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.openpreview();
    expect(component.usecasedata.previewLink).toEqual(environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea');
  });

  it('should scroll to Overviewview', () => {
    const element = document.createElement('div');
    element.id = 'Overview';
    component.scrolltoView('Overview');
    expect(component.scrolltab).toEqual('Overview');
  });

  it('should call Toggletooltip', () => {
    component.toggleTooltip(true, 'one');
    expect(component.tooltipList.length).toBe(1);
    component.toggleTooltip(false, 'one');
    expect(component.tooltipList.length).toBe(0);
  });

  it('should click Favourites', () => {
    const data = mockService.SaveFavourites;
    spyOn(homeService, 'SaveFavourites').and.returnValue(of(data));
    component.clickFavourites();
  });

  it('should click Favourites', () => {
    const data = mockService.SaveFavourites;
    spyOn(homeService, 'SaveFavourites').and.returnValue(throwError('error'));
    component.clickFavourites();
  });

  it('on window scroll', () => {
    const dummyElement = document.createElement('input');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.scrollflag = false;
    component.onWindowScroll({ target: { className: '' } });
    expect(component.scrolltab).toEqual('');
  });

  it('on window scroll for scrollflag', () => {
    component.scrollflag = true;
    component.onWindowScroll({ target: { className: 'Overview' } });
    expect(component.scrolltab).toEqual('Overview');
  });

  it('should call redirectToSolution function', () => {
    component.redirectFromShowcase = true;
    component.redirectToSolutionView('40127397-a1a3-4159-bc13-a1784f11303f');
    expect(component.redirectFromShowcase).toBe(true);
  });

  it('should call redirectToSolution function when not redirect from showcase', () => {
    component.redirectFromShowcase = false;
    component.redirectToSolutionView('40127397-a1a3-4159-bc13-a1784f11303f');
    expect(component.redirectFromShowcase).toBe(false);
  });

  it('should launch for external user', () => {
    component.usecasedata = new usecaseview();
    spyOn(homeService, 'SendMetrics').and.returnValue(of());
    component.usecasedata.demoLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.previewLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.isDemoLinkInternal = 'false';
    component.usecasedata.isPreviewLinkInternal = 'false';
    component.getExternalLaunch();
    expect(component.isLaunchExpand).toBeTrue();
  });

  it('should launch for external user and land on preview link', () => {
    component.usecasedata = new usecaseview();
    spyOn(homeService, 'SendMetrics').and.returnValue(of());
    component.usecasedata.demoLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.isDemoLinkInternal = 'true';
    component.usecasedata.previewLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.isPreviewLinkInternal = 'false';
    component.getExternalLaunch();
    expect(component.usecasedata.previewLink).toEqual(environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea');
  });

  it('should launch for external user and land on demo link', () => {
    component.usecasedata = new usecaseview();
    spyOn(homeService, 'SendMetrics').and.returnValue(of());
    component.usecasedata.demoLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.isDemoLinkInternal = 'false';
    component.usecasedata.previewLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.isPreviewLinkInternal = 'true';
    component.getExternalLaunch();
    expect(component.usecasedata.demoLink).toEqual(environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea');
  });

  it('should launch for accenture user', () => {
    component.usecasedata = new usecaseview();
    spyOn(homeService, 'SendMetrics').and.returnValue(of());
    component.usecasedata.demoLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.previewLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.getLaunchOption();
    expect(component.isLaunchExpand).toBe(true);
  });

  it('should launch for accenture user and land on preview link', () => {
    component.usecasedata = new usecaseview();
    spyOn(homeService, 'SendMetrics').and.returnValue(of());
    component.usecasedata.demoLink = null;
    component.usecasedata.previewLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.getLaunchOption();
    expect(component.usecasedata.previewLink).toEqual(environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea');
  });

  it('should launch for accenture user and land on demo link', () => {
    component.usecasedata = new usecaseview();
    spyOn(homeService, 'SendMetrics').and.returnValue(of());
    component.usecasedata.demoLink = environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea';
    component.usecasedata.previewLink = null;
    component.getLaunchOption();
    expect(component.usecasedata.demoLink).toEqual(environment.showcaseURL + '/usecase/3bcbf643-8b1d-40cd-bbd5-c2e7245843ea');
  });

  it('should disable launch button', () => {
    component.usecasedata = new usecaseview();
    component.usecasedata.demoLink = null;
    component.usecasedata.previewLink = null;
    component.usecasedata.isDemoLinkInternal = null;
    component.usecasedata.isPreviewLinkInternal = null;
    component.getButtondisable();
    component.usecasedata.previewLink = 'null';
    component.usecasedata.demoLink = 'null';
    component.usecasedata.isDemoLinkInternal = 'true';
    component.usecasedata.isPreviewLinkInternal = 'true';
    component.getButtondisable();
    component.usecasedata.previewLink = 'null';
    component.usecasedata.demoLink = null;
    component.usecasedata.isDemoLinkInternal = null;
    component.usecasedata.isPreviewLinkInternal = 'true';
    component.getButtondisable();
    component.usecasedata.demoLink = 'null';
    component.usecasedata.isDemoLinkInternal = 'true';
    component.usecasedata.isPreviewLinkInternal = null;
    component.getButtondisable();

    expect(component.usecasedata).toBeDefined();
  });

  it('should hide arrow launch button', () => {
    component.usecasedata = new usecaseview();
    component.usecasedata.demoLink = null;
    component.usecasedata.previewLink = null;
    component.usecasedata.isDemoLinkInternal = null;
    component.usecasedata.isPreviewLinkInternal = null;
    component.getArrowhide();
    component.usecasedata.demoLink = 'null';
    component.usecasedata.previewLink = 'null';
    component.usecasedata.isDemoLinkInternal = 'true';
    component.usecasedata.isPreviewLinkInternal = 'true';
    component.getArrowhide();
    component.usecasedata.demoLink = null;
    component.usecasedata.previewLink = 'null';
    component.usecasedata.isDemoLinkInternal = null;
    component.usecasedata.isPreviewLinkInternal = 'true';
    component.getArrowhide();
    component.usecasedata.demoLink = 'null';
    component.usecasedata.isDemoLinkInternal = 'true';
    component.usecasedata.isPreviewLinkInternal = null;
    component.getArrowhide();
    component.usecasedata.demoLink = null;
    component.usecasedata.previewLink = 'null';
    component.usecasedata.isDemoLinkInternal = null;
    component.usecasedata.isPreviewLinkInternal = 'false';
    component.getArrowhide();
    expect(component.getArrowhide).toBeDefined();
  });
  
  it('should call rendercss', () => {
    component.windowOBJ['SolutionCarousel'] = SolutionCarousel;
    // component.usecasedata = mockData.getUseCasedata.responseData.selectedUseCase;
    component.usecasedata = {
      useCaseSolutions: [
        {
          solutionUid: '1',
          solutionName: '1',
          solutionUrl: '1',
          solutionTypeUid: '1',
          solutionType: '1',
          description: '1',
          isSustain: '1',
          createdOn: '1',
          isMostUsedSolution: false,
          isMostPopular: false,
          isSolutionNew: false,
        }
      ]
    } as any;
    component.isIndustryXCarouselLoaded = false;
    component.renderCarousel();
    expect(component.renderCarousel).toBeDefined();
  });
  it('should open redirecttoIntelligentModel', () => {
    component.redirecttoIntelligentModel('123');
    component.redirectFromShowcase = true;
    component.redirecttoIntelligentModel('123');
    expect(component.redirecttoIntelligentModel).toBeTruthy();
  });

  it('should open global search', () => {
    component.openGlobalSearch('q');
    expect(component.openGlobalSearch).toBeDefined();
  });

  it('should call resizeeventIA', () => {
    component.usecasedata = {
      useCaseIntelligentAlgorithms: [
        {
          intelligentAlgorithmUId: 'id',
          intelligentAlgorithmUrl: 'url',
          intelligentAlgorithmName: 'name',
          intelligentAlgorithmDescription: 'desc'
        }
      ]
    } as any;
    var dummyElement = document.createElement('div');
    var dummyElementParent = document.createElement('div');
    dummyElementParent.setAttribute('id', 'intelligent-algorithm-carousel');
    dummyElementParent.append(dummyElement);
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.resizeeventIA();
    expect(component.resizeeventIA).toBeDefined();
  });

  it('should call resizeeventCS', () => {
    component.usecasedata = {
      caseStudies: [
        {
          caseStudyDescription: 'desc',
          caseStudyName: 'name',
          caseStudyParentUid: 'id',
          caseStudyURL: 'url',
          caseStudyClientLogo: 'img'
        }
      ]
    } as any;
    var dummyElement = document.createElement('div');
    var dummyElementParent = document.createElement('div');
    dummyElementParent.setAttribute('id', 'case-study-carousel');
    dummyElementParent.append(dummyElement);
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.resizeeventCS();
    expect(component.resizeeventCS).toBeDefined();
  });

  it('should call resizeevent', () => {
    component.usecasedata = {
      useCaseSolutions: [
        {
          solutionUid: '1',
          solutionName: '1',
          solutionUrl: '1',
          solutionTypeUid: '1',
          solutionType: '1',
          description: '1',
          isSustain: '1',
          createdOn: '1',
          isMostUsedSolution: false,
          isMostPopular: false,
          isSolutionNew: false,
        }
      ]
    } as any;
    var dummyElement = document.createElement('div');
    var dummyElementParent = document.createElement('div');
    dummyElementParent.setAttribute('id', 'carousel-wrapper');
    dummyElementParent.append(dummyElement);
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    component.resizeevent();
    expect(component.resizeevent).toBeDefined();
  });

  it('should open global search', () => {
    const obj = {
      solutionUid: '1',
      solutionName: '1',
      solutionUrl: '1',
      solutionTypeUid: '1',
      solutionType: '1',
      description: '1',
      isSustain: '1',
      createdOn: '1',
      isMostUsedSolution: false,
      isMostPopular: false,
      isSolutionNew: false,
      isFavourite: false
    };
    component.myFavClick(obj);
    obj.isFavourite = true;
    component.myFavClick(obj);
    expect(component.myFavClick).toBeDefined();
    spyOn(homeService, 'getMyFavoritesSolutionsData').and.returnValue(throwError('error'));
    component.myFavClick(obj);
    spyOn(homeService, 'UseCaseView').and.returnValue(throwError('error'));
    component.getUsecaseView();
  });
  it('tests timeouts', fakeAsync(() => {
    component.showToast(true, 'hi');
    component.showToastMessage = true;
    tick(5000);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.showToastMessage).toBeFalsy();
    });
    component.renderSustainabilityFlag();
    tick(300);
    expect(component.renderSustainabilityFlag).toBeDefined();
    flush();
  }));
  it('render IA carousel', () => {
    component.windowOBJ['SolutionCarousel'] = SolutionCarousel;
    component.usecasedata = {
      useCaseIntelligentAlgorithms: [
        {
          intelligentAlgorithmUId: 'id',
          intelligentAlgorithmUrl: 'url',
          intelligentAlgorithmName: 'name',
          intelligentAlgorithmDescription: 'desc'
        }
      ]
    } as any;
    component.isIACarouselLoaded = false;
    component.renderCarouselIA();
    expect(component.renderCarouselIA).toBeDefined();
  });
  it('render CS carousel', () => {
    component.windowOBJ['SolutionCarousel'] = SolutionCarousel;
    component.usecasedata = {
      caseStudies: [
        {
          caseStudyDescription: 'desc',
          caseStudyName: 'name',
          caseStudyParentUid: 'id',
          caseStudyURL: 'url',
          caseStudyClientLogo: 'img'
        }
      ]
    } as any;
    component.isCSCarouselLoaded = false;
    component.renderCarouselCS();
    expect(component.renderCarouselCS).toBeDefined();
  });

  it('should show value tree', () => {
    component.checkVT('');
    expect(component.checkVT).toBeDefined();
  });
  class SolutionCarousel {
    constructor(id, obj) {}
  }
});
