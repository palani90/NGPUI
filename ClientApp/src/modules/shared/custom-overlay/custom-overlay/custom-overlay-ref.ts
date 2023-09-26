import { Observable, Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CustomOverlayCloseEvent, CustomOverlayConfigOptions } from './custom-overlay';
import { filter } from 'rxjs/operators';
import { ComponentPortal, DomPortal, TemplatePortal } from '@angular/cdk/portal';

export class CustomOverlayRef<R = any, T = any> {
  ins!: TemplatePortal | DomPortal | ComponentPortal<any>;
  componentInstance!: T;
  /** Subject for notifying the user that the toast has finished closing. */
  private _afterClosed = new Subject<CustomOverlayCloseEvent<R | undefined>>();
  /** triggered when toast is activated */
  private _activate = new Subject<void>();
  /** triggered when toast is shown */
  private _isShown = new Subject<void>();
  /** notifies the toast that it should close before the timeout */
  private _manualClose = new Subject<CustomOverlayCloseEvent<R | undefined>>();

  constructor(public customOverlay: OverlayRef, public content: T, public data: R | undefined, options?: CustomOverlayConfigOptions) {
    customOverlay
      .keydownEvents()
      .pipe(
        filter((event) => {
          return (event.key === 'Escape' && !options?.preventBackdropClick) || (false && !hasModifierKey(event));
        })
      )
      .subscribe((event) => {
        event.preventDefault();
        this._close('keyboard');
      });

    customOverlay.backdropClick().subscribe(() => {
      if (!options?.preventBackdropClick) {
        this._close('mouse');
      }
    });
  }
  /**
   * This method will close the overlay
   */
  close(dialogResult?: R) {
    this._close('close', dialogResult);
  }

  /**
   * This method will close the overlay
   */
  private _close(type: CustomOverlayCloseEvent['type'], data?: R) {
    this.customOverlay.detach();
    this.customOverlay.dispose();
    this._afterClosed.next({ type, data });
    this._manualClose.next({ type, data });
    this._afterClosed.complete();
    this._manualClose.complete();
    this._activate.complete();
    this._isShown.complete();
  }

  /**
   * This method will return the visibility of active overlay
   */
  isVisible() {
    return this.customOverlay && this.customOverlay.overlayElement;
  }

  /**
   * This method will return the is overlay attched to the screen
   */
  isAttached() {
    return this.customOverlay.hasAttached();
  }

  /**
   * This method will notify once toast is binded to UI
   */
  get isShown(): Subject<void> {
    return this._isShown;
  }

  /**
   * This method will return active overlay full element
   */
  get overlayFullElm() {
    return this.customOverlay;
  }

  /**
   * This method will return active overlay element
   */
  get overlayElement() {
    return this.customOverlay.overlayElement;
  }

  /**
   * This method will return active overlay position
   */
  getPosition() {
    return this.customOverlay.overlayElement.getBoundingClientRect();
  }

  /**
   * This method will calledfor manual close if used (optional)
   */
  manualClose() {
    this._manualClose.next(null);
    this._manualClose.complete();
  }

  /**
   * This method will return manual close subject to close overlay
   */
  get manualClosed(): Observable<any> {
    return this._manualClose.asObservable();
  }

  /**
   * This method will return afterclosed subject
   */
  get afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  /**
   * This method will return current overlay is inactive or not(used for toast)
   */
  get isInactive() {
    return this._activate.isStopped;
  }

  /**
   * This method will activet the overlay (used for toast)
   */
  activate() {
    this._activate.next();
    this._activate.complete();
  }

  /** Gets an observable that is notified when the toast has started opening. */
  get afterActivate(): Observable<any> {
    return this._activate.asObservable();
  }
}
