import { ComponentType, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ElementRef, InjectionToken, TemplateRef, ViewContainerRef } from '@angular/core';

export const CUSTOM_OVERLAY_DATA = new InjectionToken<{}>('CUSTOM_OVERLAY_DATA');

export type CustomDefaultOverlayPositions<T> = 'center' | 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' | 'dropdown' | 'popover';
export type CustomOverlayParams<T> = {
  component: ComponentType<T> | TemplateRef<T> | ElementRef<HTMLElement> | HTMLElement;
  data?: any;
  position?: PositionStrategy | CustomDefaultOverlayPositions<T>;
  origin?: ElementRef<HTMLElement>;
  options?: CustomOverlayConfigOptions;
};

export type CustomOverlayCloseEvent<T = any> = {
  type: 'backdropClick' | 'close' | 'keyboard' | 'mouse';
  data: T;
};

export type ScrollType = 'close' | 'noop' | 'reposition' | 'block';

export interface CustomOverlayConfigOptions {
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  panelClass?: string[];
  backdropClass?: string[];
  boundBoxClass?: string;
  hasBackdrop?: boolean;
  containerRef?: ViewContainerRef;
  content?: CustomOverlayContent;
  disposeClass?: string;
  closePrevious?: boolean;
  toastOverlay?: OverlayRef;
  outsideClick?: boolean;
  preventBackdropClick?: boolean;
  scrollType?: ScrollType;
}
export type CustomOverlayContent = TemplateRef<any> | null;
