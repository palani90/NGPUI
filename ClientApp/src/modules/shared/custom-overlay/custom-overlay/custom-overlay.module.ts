import { ModuleWithProviders, NgModule } from '@angular/core';
import { CustomOverlay } from './custom-overlay.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [OverlayModule, PortalModule]
})
export class CustomOverlayModule {
  static forRoot(): ModuleWithProviders<CustomOverlayModule> {
    return {
      ngModule: CustomOverlayModule,
      providers: [CustomOverlay]
    };
  }
}
