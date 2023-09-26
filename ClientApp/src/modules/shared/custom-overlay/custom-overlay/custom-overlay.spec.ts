import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CUSTOM_OVERLAY_DATA } from './custom-overlay';
import { CustomOverlayRef } from './custom-overlay-ref';
import { CustomOverlayModule } from './custom-overlay.module';
import { CustomOverlay } from './custom-overlay.service';
export class MockElementRef extends ElementRef {
  nativeElement = {};
}
export class CustomOverlayRefMock {
  outsidePointerEvents(): Observable<any> {
    return new Observable();
  }
}

describe('CustomOverlay', () => {
  let fixture: any;
  let overlay: CustomOverlay;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [OverlayTestComponent],
      imports: [CustomOverlayModule.forRoot()],
      providers: [
        CustomOverlay,
        { provide: CustomOverlayRef, useValue: CustomOverlayRefMock },
        { provide: CUSTOM_OVERLAY_DATA, useValue: {} },
        { provide: ElementRef, useValue: new MockElementRef('') }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayTestComponent);
    fixture.detectChanges();

    overlay = TestBed.inject(CustomOverlay);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create an instance', () => {
    overlay.open({
      component: OverlayTestComponent
    });

    expect(overlayContainerElement.textContent).toContain('Test overlay');
    overlay.dispose();
    expect(overlayContainerElement.childNodes.length).toBe(0);
    expect(overlayContainerElement.textContent).toBe('');
  });

  it('should create an mouseover instance', () => {
    overlay.openHover({
      component: OverlayTestComponent,
      options: { boundBoxClass: 'test-overlay-hover', disposeClass: 'test-overlay' }
    });

    expect(overlayContainerElement.textContent).toContain('Test overlay');
    overlay.disposeHover();
    expect(overlayContainerElement.childNodes.length).toBe(0);
    expect(overlayContainerElement.textContent).toBe('');
  });

  it('should load a DOM portal', () => {
    const testAppComponent = fixture.componentInstance;
    const domPortal = overlay.open({
      component: testAppComponent.domPortalContent,
      options: { boundBoxClass: 'test-overlay-hover', disposeClass: 'test-overlay' }
    });
    expect(domPortal.customOverlay.hasAttached()).toBe(true);
    const domPortal1 = overlay.openHover({
      component: testAppComponent.domPortalContent,
      options: { boundBoxClass: 'test-overlay-hover', disposeClass: 'test-overlay' }
    });
    expect(domPortal1.customOverlay.hasAttached()).toBe(true);
  });

  it('should load a Compoenet portal', () => {
    const componentPortal = overlay.open({
      component: OverlayTestComponent,
      options: { boundBoxClass: 'test-overlay-hover', disposeClass: 'test-overlay' }
    });
    expect(componentPortal.customOverlay.hasAttached()).toBe(true);
  });

  it('should load a Template portal', () => {
    const testAppComponent = fixture.componentInstance;
    const templatePortal = overlay.open({
      component: testAppComponent.templateRef,
      options: { boundBoxClass: 'test-overlay-hover', disposeClass: 'test-overlay', containerRef: testAppComponent.alternateContainer }
    });
    expect(templatePortal.customOverlay.hasAttached()).toBe(true);

    const templatePortal1 = overlay.openHover({
      component: testAppComponent.templateRef,
      options: { boundBoxClass: 'test-overlay-hover', disposeClass: 'test-overlay', containerRef: testAppComponent.alternateContainer }
    });
    expect(templatePortal1.customOverlay.hasAttached()).toBe(true);
  });

  it('should create as popover', () => {
    const ovly = overlay.open({
      component: OverlayTestComponent,
      position: 'popover'
    });
    expect(overlayContainerElement.textContent).toContain('Test overlay');
    const visible = ovly.isVisible();
    expect(visible).toBeTruthy();
    const active = ovly.isInactive;
    expect(active).toBe(false);
    ovly.manualClose();
  });

  it('should create as dropdown', () => {
    overlay.open({
      component: OverlayTestComponent,
      position: 'dropdown'
    });

    expect(overlayContainerElement.textContent).toContain('Test overlay');
  });

  it('should create in four corners', () => {
    const ref1 = overlay.open({
      component: OverlayTestComponent,
      position: 'bottomLeft'
    });
    expect(ref1.getPosition().left).toBeDefined();
    expect(ref1.getPosition().bottom).toBeDefined();
    ref1.close();
    const ref2 = overlay.open({
      component: OverlayTestComponent,
      position: 'bottomRight'
    });
    expect(ref2.getPosition().right).toBeDefined();
    expect(ref2.getPosition().bottom).toBeDefined();
    ref2.close();
    const ref3 = overlay.open({
      component: OverlayTestComponent,
      position: 'topLeft'
    });
    expect(ref3.getPosition().left).toBeDefined();
    expect(ref3.getPosition().top).toBeDefined();
    ref3.close();
    const ref4 = overlay.open({
      component: OverlayTestComponent,
      position: 'topRight',
      options: {
        outsideClick: true
      }
    });
    document.dispatchEvent(new MouseEvent('click'));
    expect(ref4.getPosition().right).toBeDefined();
    expect(ref4.getPosition().top).toBeDefined();
    ref4.close();
  });

  it('should close', () => {
    let dispose = spyOn(overlay, 'dispose');
    const ref = overlay.open({
      component: OverlayTestComponent,
      position: 'center'
    });
    ref.close();
    expect(dispose).toHaveBeenCalled();
  });

  it('should get full overlay element', () => {
    const ref = overlay.open({
      component: OverlayTestComponent,
      position: 'center'
    });
    expect(ref.overlayFullElm).toBeTruthy();
  });
  it('should cover additional ref function', () => {
    const ref = overlay.open({
      component: OverlayTestComponent,
      position: 'center'
    });

    expect(ref.manualClosed).toBeDefined();
    expect(ref.afterClosed).toBeDefined();
    expect(ref.isAttached()).toBeDefined();
    expect(ref.isShown).toBeDefined();
    expect(ref.afterActivate).toBeDefined();
    expect(ref.activate()).toBeUndefined();
  });

  it('should apply the style and classed set in the options', () => {
    const overlayRef = overlay.open({
      component: OverlayTestComponent,
      position: 'center',
      options: {
        width: 100,
        height: 100,
        minWidth: 100,
        minHeight: 100,
        panelClass: ['test-overlay'],
        backdropClass: ['test-overlay-bkdrop'],
        boundBoxClass: 'test-overlay-cont',
        hasBackdrop: true,
        disposeClass: 'test-overlay',
        closePrevious: false,
        outsideClick: false
      }
    });
    expect(overlayRef.overlayElement.style.width).toBe('100px');
    expect(overlayRef.overlayElement.style.height).toBe('100px');
    expect(overlayRef.overlayElement.style.minWidth).toBe('100px');
    expect(overlayRef.overlayElement.style.minHeight).toBe('100px');
    expect(overlayRef.overlayElement.className).toContain('test-overlay');
    overlay.dispose('test-overlay');
  });
});

@Component({
  selector: 'app-overlay-test',
  template: `
    <p>Test overlay</p>
    <ng-template #templateRef let-data>{{ fruit }} - {{ data?.status }}!</ng-template>
    <div class="dom-portal-parent">
      <div #domPortalContent>
        <p class="dom-portal-inner-content">Hello there</p>
      </div>
    </div>
    <ng-container #alternateContainer></ng-container>
  `,
  styleUrls: []
})
export class OverlayTestComponent {
  @ViewChild('templateRef', { read: TemplateRef, static: false }) templateRef!: TemplateRef<any>;
  @ViewChild('domPortalContent') domPortalContent!: ElementRef<HTMLElement>;
  @ViewChild('alternateContainer', { read: ViewContainerRef }) alternateContainer!: ViewContainerRef;
  fruit: string = 'Banana';
  constructor(public viewContainerRef: ViewContainerRef) {}
}
