import { ElementRef, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy, OverlayConfig, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal, DomPortal } from '@angular/cdk/portal';
import { CustomOverlayRef } from './custom-overlay-ref';
import { CUSTOM_OVERLAY_DATA, CustomDefaultOverlayPositions, CustomOverlayConfigOptions, CustomOverlayParams } from './custom-overlay';

export class CustomOverlayBaseClass {
  private CustomOverlayRef: OverlayRef | undefined;
  private overlayPosition: PositionStrategy | undefined;
  private customOverlayHoverRef: OverlayRef | undefined;

  constructor(private overlay: Overlay, private _customDialogRefConstructor: Type<CustomOverlayRef<any>>) {}

  /**
   * This method will create overlay with component or template or html elements
   */
  open<T, R = any>({ component, data, position, origin, options }: CustomOverlayParams<T>): CustomOverlayRef<T, R> {
    if (options?.closePrevious === undefined || options?.closePrevious) {
      this.dispose(options?.disposeClass);
    }
    this.CustomOverlayRef = this.overlay.create(this.getOverlayConfig(position, origin, options));
    if (options?.boundBoxClass) {
      this.CustomOverlayRef.hostElement.classList.add(options.boundBoxClass);
    }
    const customRefference = new this._customDialogRefConstructor(this.CustomOverlayRef, options?.content, data, options);

    const injector: Injector = this.getInjector(data, customRefference);

    if (component instanceof TemplateRef) {
      customRefference.ins = new TemplatePortal(component, options?.containerRef, <any>{
        $implicit: data,
        customRefference
      });
    } else if (component instanceof HTMLElement || component instanceof ElementRef) {
      customRefference.ins = new DomPortal(component);
    } else {
      customRefference.ins = new ComponentPortal(component, null, injector);
    }
    customRefference.componentInstance = this.CustomOverlayRef.attach(customRefference.ins);
    if (options?.outsideClick) {
      this.CustomOverlayRef.outsidePointerEvents().subscribe((res) => {
        if (res instanceof MouseEvent && (origin as any) !== res.target) {
          this.dispose(options?.disposeClass);
        }
      });
    }

    return customRefference;
  }

  /**
   * This method will destroy the overlay based on id or all of it
   */
  dispose(data?: string) {
    if (this.CustomOverlayRef && this.CustomOverlayRef.hasAttached()) {
      if (data) {
        let panelClass = this.CustomOverlayRef.getConfig().panelClass;
        if (
          (typeof panelClass === 'string' && panelClass.includes(data)) ||
          (Array.isArray(panelClass) && panelClass.join('').includes(data))
        ) {
          this.CustomOverlayRef.dispose();
        }
      } else {
        this.CustomOverlayRef.dispose();
      }
    }
  }

  /**
   * This method will create overlay with component or template or html elements
   * this method will called on hover action (ex: popovers)
   */
  openHover<T, R = any>({ component, data, position, origin, options }: CustomOverlayParams<T>): CustomOverlayRef<T, R> {
    this.disposeHover('popover');
    this.customOverlayHoverRef = this.overlay.create(this.getOverlayConfig(position, origin, options));
    if (options?.boundBoxClass) {
      this.customOverlayHoverRef.hostElement.classList.add(options.boundBoxClass);
    }
    const customRefference = new this._customDialogRefConstructor(this.customOverlayHoverRef, options?.content, data, options);

    const injector: Injector = this.getInjector(data, customRefference);
    if (component instanceof TemplateRef) {
      customRefference.ins = new TemplatePortal(component, options?.containerRef, <any>{
        $implicit: data,
        customRefference
      });
    } else if (component instanceof HTMLElement || component instanceof ElementRef) {
      customRefference.ins = new DomPortal(component);
    } else {
      customRefference.ins = new ComponentPortal(component, null, injector);
    }
    customRefference.componentInstance = this.customOverlayHoverRef.attach(customRefference.ins);

    return customRefference;
  }

  /**
   * This method will remove hover overlays
   */
  disposeHover(data?: string) {
    if (this.customOverlayHoverRef && this.customOverlayHoverRef.hasAttached()) {
      this.customOverlayHoverRef.dispose();
    }
  }

  /**
   * This method will return overlay configurations
   */
  private getOverlayConfig(
    position?: PositionStrategy | CustomDefaultOverlayPositions<any>,
    origin?: ElementRef<HTMLElement>,
    options?: CustomOverlayConfigOptions
  ): OverlayConfig {
    let positions;
    let scrollStrategy;
    if (typeof position === 'string') {
      switch (position) {
        case 'bottomLeft':
          positions = this.getOverlayPositionBottomLeft();
          break;
        case 'bottomRight':
          positions = this.getOverlayPositionBottomRight();
          break;
        case 'topLeft':
          positions = this.getOverlayPositionTopLeft();
          break;
        case 'topRight':
          positions = this.getOverlayPositionTopRight();
          break;
        case 'center':
          positions = this.getOverlayPositionCenter();
          scrollStrategy = this.overlay.scrollStrategies.block();
          break;
        case 'dropdown':
          positions = this.getOverlayPositionForDropdown(origin);
          break;
        case 'popover':
          positions = this.getOverlayPositionForPopover(origin);
          break;
      }
    } else {
      positions = position;
    }
    if (options?.scrollType === 'block') {
      scrollStrategy = this.overlay.scrollStrategies.block();
    } else if (options?.scrollType === 'noop') {
      scrollStrategy = this.overlay.scrollStrategies.noop();
    } else if (options?.scrollType === 'close') {
      scrollStrategy = this.overlay.scrollStrategies.close();
    } else if (options?.scrollType === 'reposition' || !scrollStrategy) {
      scrollStrategy = this.overlay.scrollStrategies.reposition();
    }
    return new OverlayConfig({
      width: options?.width,
      height: options?.height,
      minWidth: options?.minWidth,
      minHeight: options?.minWidth,
      positionStrategy: positions,
      scrollStrategy: scrollStrategy,
      hasBackdrop: options?.hasBackdrop ? options?.hasBackdrop : false,
      panelClass: [...['custom-overlay-pannel'], ...(options?.panelClass ? options?.panelClass : [])],
      backdropClass: [...['custom-overlay-backdrop'], ...(options?.backdropClass ? options?.backdropClass : [])]
    });
  }

  /**
   * This method will return overlay position to top right
   */
  private getOverlayPositionTopRight(): PositionStrategy {
    this.overlayPosition = this.overlay.position().global().top().right();
    return this.overlayPosition;
  }

  /**
   * This method will return overlay position to top left
   */
  private getOverlayPositionTopLeft(): PositionStrategy {
    this.overlayPosition = this.overlay.position().global().top().left();
    return this.overlayPosition;
  }

  /**
   * This method will return overlay position to bottom right
   */
  private getOverlayPositionBottomRight(): PositionStrategy {
    this.overlayPosition = this.overlay.position().global().bottom().right();
    return this.overlayPosition;
  }

  /**
   * This method will return overlay position to bottom left
   */
  private getOverlayPositionBottomLeft(): PositionStrategy {
    this.overlayPosition = this.overlay.position().global().bottom().left();
    return this.overlayPosition;
  }

  /**
   * This method will return overlay position to center of the screen
   */
  private getOverlayPositionCenter(): PositionStrategy {
    this.overlayPosition = this.overlay.position().global().centerHorizontally().centerVertically();
    return this.overlayPosition;
  }

  /**
   * This method will return overlay position for dropdown based on its parent position
   */
  private getOverlayPositionForDropdown(origin?: ElementRef<HTMLElement>): PositionStrategy {
    this.overlayPosition = this.overlay
      .position()
      .flexibleConnectedTo(origin ? origin : document.body)
      .withPositions(this.getDropdownDefaultPositions())
      .withPush(true);
    return this.overlayPosition;
  }

  /**
   * This method will return overlay position popover based on parent position
   */
  private getOverlayPositionForPopover(origin?: ElementRef<HTMLElement> | HTMLElement): PositionStrategy {
    this.overlayPosition = this.overlay
      .position()
      .flexibleConnectedTo(origin ? origin : document.body)
      .withPositions(this.getPopoverDefaultPositions())
      .withPush(false);
    return this.overlayPosition;
  }

  /**
   * This method will inject value to overlay elements
   */
  private getInjector(data: any, customRefference: CustomOverlayRef): Injector {
    return Injector.create({
      providers: [
        { provide: CustomOverlayRef, useValue: customRefference },
        { provide: CUSTOM_OVERLAY_DATA, useValue: data }
      ]
    });
  }

  /**
   * This method will return default dropdown position
   */
  private getDropdownDefaultPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }
    ];
  }
  /**
   * This method will return default popover position
   */
  private getPopoverDefaultPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        panelClass: 'right-bottom',
        offsetX: 10
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
        panelClass: 'right-top',
        offsetX: 10
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top',
        panelClass: 'left-bottom',
        offsetX: -10
      },
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom',
        panelClass: 'left-top',
        offsetX: -10
      }
    ];
  }
}

/**
 * This class is a wrapper for above class
 */
@Injectable()
export class CustomOverlay extends CustomOverlayBaseClass {
  constructor(overlay: Overlay) {
    super(overlay, CustomOverlayRef);
  }
}
